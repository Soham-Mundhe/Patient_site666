import React, { useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import { doctors } from '../data/mockData';
import { Search } from 'lucide-react';

const SPECIALIZATIONS = ['All', 'General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Gynecologist'];

const Doctors = () => {
    const [search, setSearch] = useState('');
    const [spec, setSpec] = useState('All');

    const filtered = doctors.filter((d) => {
        const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
        const matchSpec = spec === 'All' || d.specialization === spec;
        return matchSearch && matchSpec;
    });

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-900">Find a Doctor</h1>
                <p className="text-sm text-gray-500 mt-0.5">Book consultation · Video or in-clinic</p>
                <div className="relative mt-3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Search by name or specialization"
                    />
                </div>
                <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
                    {SPECIALIZATIONS.map((s) => (
                        <button
                            key={s}
                            onClick={() => setSpec(s)}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${spec === s ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </header>

            <div className="p-4 space-y-4">
                <p className="text-sm text-gray-500">{filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found</p>
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                        No doctors match your filters. Try changing specialization or search.
                    </div>
                ) : (
                    filtered.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Doctors;
