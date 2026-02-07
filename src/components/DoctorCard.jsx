import React from 'react';
import { Star, MapPin } from 'lucide-react';
import Button from './Button';

const DoctorCard = ({ doctor }) => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-sky-500 font-medium">{doctor.specialization}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {doctor.hospital}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-bold mb-1">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {doctor.rating}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${doctor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {doctor.available ? 'Available' : 'Unavailable'}
                    </span>
                </div>
            </div>

            <div className="pt-2 border-t border-gray-50">
                <Button variant="primary" size="sm" className="w-full" disabled={!doctor.available}>
                    Book Appointment
                </Button>
            </div>
        </div>
    );
};

export default DoctorCard;
