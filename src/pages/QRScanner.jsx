import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';
import Button from '../components/Button';

const QRScanner = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleScan = async (detectedCodes) => {
    if (detectedCodes.length > 0) {
      const hospitalSession = detectedCodes[0].rawValue;

      const savedData = localStorage.getItem('patientHealthProfileRisk');
      if (!savedData) {
        setErrorMsg('No patient health profile found. Please fill it out first in Profile.');
        return;
      }

      const patientData = JSON.parse(savedData);
      
      const payload = {
        hospital_session: hospitalSession,
        ...patientData,
        age: Number(patientData.age || 0),
        previous_admissions: Number(patientData.previous_hospital_admissions || 0),
        height: Number(patientData.height || 0),
        weight: Number(patientData.weight || 0)
      };

      try {
        const response = await fetch('/api/scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setSuccess(true);
          setErrorMsg('');
        } else {
          setErrorMsg('Failed to share data with the hospital. Please try again.');
        }
      } catch (error) {
        console.error('Error sharing data:', error);
        setErrorMsg('Network error. Please try again.');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">Patient data successfully shared with the hospital.</p>
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
