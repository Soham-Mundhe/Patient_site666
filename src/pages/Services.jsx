import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, TestTube, Calendar, BookOpen, ChevronRight } from 'lucide-react';

const services = [
    { name: 'Order Medicine', path: '/medicine', icon: Pill, desc: 'Home delivery', iconClass: 'bg-emerald-50 text-emerald-600' },
    { name: 'Lab Tests', path: '/lab-tests', icon: TestTube, desc: 'Home collection', iconClass: 'bg-teal-50 text-teal-600' },
    { name: 'My Appointments', path: '/appointments', icon: Calendar, desc: 'Upcoming & past', iconClass: 'bg-violet-50 text-violet-600' },
    { name: 'Health Tips', path: '/health-tips', icon: BookOpen, desc: 'Articles & wellness', iconClass: 'bg-sky-50 text-sky-600' },
];

const Services = () => {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-900">Services</h1>
                <p className="text-sm text-gray-500 mt-0.5">Medicine, tests, appointments & more</p>
            </header>

            <div className="p-4 space-y-3">
                {services.map((s) => (
                    <Link
                        key={s.path}
                        to={s.path}
                        className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.iconClass}`}>
                                <s.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{s.name}</h3>
                                <p className="text-sm text-gray-500">{s.desc}</p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Services;
