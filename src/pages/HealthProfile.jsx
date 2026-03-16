import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../components/Button';

const HealthProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('patientHealthProfileRisk');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      patient_id: 'P' + Math.floor(1000 + Math.random() * 9000), 
      full_name: '',
      age: '',
      gender: 'Male',
      phone_number: '',
      chronic_diseases: '',
      previous_hospital_admissions: '0',
      previous_surgeries: 'No',
      family_medical_history: '',
      current_medications: '',
      smoking_status: 'No',
      alcohol_consumption: 'No',
      physical_activity_level: 'Medium',
      height: '',
      weight: '',
      bmi: '',
      known_allergies: ''
    };
  });

  useEffect(() => {
    // Save initial generated ID if it's the first time
    if (!localStorage.getItem('patientHealthProfileRisk')) {
       localStorage.setItem('patientHealthProfileRisk', JSON.stringify(formData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const newData = { ...prev, [name]: value };
        
        // Auto-calculate BMI if height or weight changes
        if (name === 'height' || name === 'weight') {
            const h = parseFloat(newData.height) / 100; // cm to m
            const w = parseFloat(newData.weight);
            if (h > 0 && w > 0) {
                newData.bmi = (w / (h * h)).toFixed(1);
            } else {
                newData.bmi = '';
            }
        }
        return newData;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('patientHealthProfileRisk', JSON.stringify(formData));
    alert('Health Profile saved successfully!');
    navigate('/profile');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <header className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-3 p-1 rounded-full hover:bg-gray-100">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Patient Health Profile</h1>
      </header>

      <div className="p-4">
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
              <input type="text" name="patient_id" value={formData.patient_id} readOnly className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Medical History</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chronic Diseases</label>
              <input type="text" name="chronic_diseases" value={formData.chronic_diseases} onChange={handleChange} placeholder="e.g. Diabetes, Hypertension" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prev. Admissions</label>
                <input type="number" name="previous_hospital_admissions" value={formData.previous_hospital_admissions} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prev. Surgeries</label>
                <select name="previous_surgeries" value={formData.previous_surgeries} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Family Medical History</label>
              <input type="text" name="family_medical_history" value={formData.family_medical_history} onChange={handleChange} placeholder="e.g. Heart disease, Diabetes" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
              <input type="text" name="current_medications" value={formData.current_medications} onChange={handleChange} placeholder="e.g. Paracetamol, Metformin" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Lifestyle Information</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Smoking Status</label>
                <select name="smoking_status" value={formData.smoking_status} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alcohol Consumption</label>
                <select name="alcohol_consumption" value={formData.alcohol_consumption} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Physical Activity Level</label>
              <select name="physical_activity_level" value={formData.physical_activity_level} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">General Health Condition</h2>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BMI</label>
                <input type="text" name="bmi" value={formData.bmi} readOnly className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Known Allergies</label>
              <input type="text" name="known_allergies" value={formData.known_allergies} onChange={handleChange} placeholder="e.g. Peanuts, Penicillin" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
            </div>
          </div>

          <div className="pt-4 pb-8">
            <Button type="submit" className="w-full flex justify-center items-center py-4 text-lg">
              <Save className="h-6 w-6 mr-2" /> Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthProfile;
