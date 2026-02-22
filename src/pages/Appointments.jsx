import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userProfile } from '../data/mockData';
import { Calendar, Clock, ChevronRight, Video, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import { trackPageView } from '../utils/analytics';

const Appointments = () => {
    useEffect(() => {
        trackPageView('Appointments');
    }, []);
    const [activeTab, setActiveTab] = useState('upcoming');
    const upcoming = userProfile.appointments.filter((a) => a.status === 'Confirmed');
    const past = userProfile.appointments.filter((a) => a.status === 'Completed');

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-900">My Appointments</h1>
                <p className="text-sm text-gray-500 mt-0.5">Upcoming and past visits</p>
                <div className="flex gap-2 mt-3 p-1 bg-gray-100 rounded-lg">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'upcoming' ? 'bg-white shadow text-sky-600' : 'text-gray-500'}`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'past' ? 'bg-white shadow text-sky-600' : 'text-gray-500'}`}
                    >
                        Past
                    </button>
                </div>
            </header>

            <div className="p-4 space-y-4">
                {activeTab === 'upcoming' && (
                    <>
                        {upcoming.length === 0 ? (
                            <div className="bg-white rounded-xl p-8 text-center">
                                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500">No upcoming appointments</p>
                                <Link to="/doctors" className="inline-block mt-3">
                                    <Button variant="primary" size="sm">Book a doctor</Button>
                                </Link>
                            </div>
                        ) : (
                            upcoming.map((apt) => (
                                <div key={apt.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-semibold text-gray-900">{apt.doctor}</h3>
                                        <span className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700 font-medium">
                                            {apt.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 gap-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" /> {apt.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" /> {apt.time}
                                        </span>
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Video className="h-4 w-4 mr-1" /> Join call
                                        </Button>
                                        <Button variant="primary" size="sm" className="flex-1">Reschedule</Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}

                {activeTab === 'past' && (
                    <>
                        {past.length === 0 ? (
                            <div className="bg-white rounded-xl p-8 text-center">
                                <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500">No past appointments yet</p>
                            </div>
                        ) : (
                            past.map((apt) => (
                                <div key={apt.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 opacity-90">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900">{apt.doctor}</h3>
                                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                            {apt.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
                                    <button className="mt-2 text-sm text-sky-600 font-medium flex items-center gap-1">
                                        View prescription <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </>
                )}
                <Link to="/doctors" className="block">
                    <Button variant="primary" className="w-full">Book new appointment</Button>
                </Link>
            </div>
        </div>
    );
};

export default Appointments;
