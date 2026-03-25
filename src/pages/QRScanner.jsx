import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, FileText } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';
import Button from '../components/Button';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const QRScanner = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [docCount, setDocCount] = useState(0);

  const handleScan = async (detectedCodes) => {
    if (detectedCodes.length > 0) {
      const hospitalSession = detectedCodes[0].rawValue;

      const savedData = localStorage.getItem('patientHealthProfileRisk');
      if (!savedData) {
        setErrorMsg('No patient health profile found. Please fill it out first in Profile.');
        return;
      }

      const patientData = JSON.parse(savedData);

      const user = auth.currentUser;
      let documents = [];

      if (user) {
        const storageKey = `documents_${user.uid}`;
        const rawDocs = JSON.parse(localStorage.getItem(storageKey) || '[]');
        // Now safe to include url — it's a Firebase Storage download URL (not base64)
        documents = rawDocs.map(doc => {
          // ENSURE the URL is a real cloud URL, skip if it's a huge base64 string
          const isBase64 = doc.url?.startsWith('data:');
          return {
            id: doc.id,
            name: doc.name,
            size: doc.size,
            createdAt: doc.createdAt,
            url: isBase64 ? '' : (doc.url || ''),
          };
        });
      }
      
      let facilityId = '';
      try {
        if (hospitalSession.startsWith('http')) {
          const urlObj = new URL(hospitalSession);
          facilityId = urlObj.searchParams.get('facility');
        } else {
          facilityId = hospitalSession;
        }
      } catch (e) {
        facilityId = hospitalSession;
      }

      if (!facilityId) {
        setErrorMsg('Invalid QR code format. Could not extract facility ID.');
        return;
      }

      try {
        await addDoc(collection(db, 'facilities', facilityId, 'checkins'), {
          patient_id: patientData.patient_id || `P-${String(Math.floor(Math.random() * 90000) + 10000)}`,
          name: patientData.full_name?.trim() || 'Unknown Patient',
          age: Number(patientData.age || 0),
          gender: patientData.gender || 'Other',
          phone_number: patientData.phone_number || '',
          disease: patientData.chronic_diseases?.trim() || 'Routine Checkup',
          previous_admissions: Number(patientData.previous_hospital_admissions || 0),
          previous_surgeries: patientData.previous_surgeries || 'No',
          family_medical_history: patientData.family_medical_history || '',
          medications: patientData.current_medications?.trim() || 'None',
          smoking_status: patientData.smoking_status || 'No',
          alcohol_consumption: patientData.alcohol_consumption || 'No',
          physical_activity_level: patientData.physical_activity_level || 'Medium',
          height: patientData.height || '',
          weight: patientData.weight || '',
          bmi: patientData.bmi || '',
          known_allergies: patientData.known_allergies || '',
          blood_pressure: '',
          glucose_level: '',
          visit_date: new Date().toISOString().slice(0, 10),
          createdAt: serverTimestamp(),
          documents: documents, // patient's medical documents
        });

        setDocCount(documents.length);
        setSuccess(true);
        setErrorMsg('');
      } catch (error) {
        console.error('Error sharing data:', error);
        // Show slightly more helpful error message
        if (error.code === 'permission-denied') {
          setErrorMsg('Permission denied. Please ensure you are logged in.');
        } else if (error.message?.includes('too large')) {
          setErrorMsg('Data too large to share. Try removing some documents.');
        } else {
          setErrorMsg('Network error. Check your connection and try again.');
        }
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-3 p-1 rounded-full hover:bg-gray-100">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Hospital QR Scan</h1>
      </header>

      <div className="p-4 flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        {success ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center w-full max-w-sm">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check-In Complete!</h2>
            <p className="text-gray-600 mb-3">Patient data successfully shared with the hospital.</p>
            {docCount > 0 ? (
              <div className="flex items-center gap-2 mb-5 px-4 py-2 bg-sky-50 text-sky-700 rounded-lg border border-sky-100 text-sm w-full justify-center">
                <FileText size={16} />
                <span><strong>{docCount}</strong> document{docCount !== 1 ? 's' : ''} also sent to hospital</span>
              </div>
            ) : (
              <p className="text-xs text-amber-600 mb-5 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                No documents found — upload documents in <strong>My Documents</strong> to share them next time.
              </p>
            )}
            <Button onClick={() => navigate('/profile')} className="w-full flex justify-center py-3">
              Return to Profile
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-sm">
            <div className="bg-white p-4 rounded-t-xl shadow-sm border border-gray-100">
              <p className="text-center text-gray-700 font-medium">Scan code on hospital dashboard</p>
            </div>
            <div className="overflow-hidden rounded-b-xl shadow-sm border border-gray-100 bg-black aspect-square">
              <Scanner
                onScan={handleScan}
                onError={(err) => setErrorMsg(err?.message || 'Camera error')}
              />
            </div>
            
            {errorMsg && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-center text-sm border border-red-100">
                {errorMsg}
              </div>
            )}
            
            <div className="mt-8 text-center px-4">
              <p className="text-sm text-gray-500 mb-4">Make sure you have filled out your Health Profile first.</p>
              <Button variant="outline" onClick={() => navigate('/health-profile')} className="w-full flex justify-center py-3 bg-white">
                Edit Health Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
