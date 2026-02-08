import React from 'react';
import { Link } from 'react-router-dom';
import { userProfile } from '../data/mockData';
import { User, Phone, Mail, Droplet, LogOut, ChevronRight, Calendar, Users, MapPin } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Mock logout
        navigate('/');
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-900">{t('my_profile')}</h1>
            </header>

            <div className="p-4 space-y-6">
                {/* User Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="h-16 w-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                        <User size={32} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">{userProfile.name}</h2>
                        <p className="text-sm text-gray-500">{t('patient_id')}: #PAT-2023-88</p>
                    </div>
                </div>

                {/* Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-50 flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">{userProfile.phone}</span>
                    </div>
                    <div className="p-4 border-b border-gray-50 flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">{userProfile.email}</span>
                    </div>
                    <div className="p-4 flex items-center">
                        <Droplet className="h-5 w-5 text-red-400 mr-3" />
                        <span className="text-gray-700">{t('blood_group')}: <span className="font-semibold">{userProfile.bloodGroup}</span></span>
                    </div>
                </div>

                {/* Appointments */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{t('my_appointments')}</h3>
                        <Link to="/appointments" className="text-sm text-sky-500 font-medium">{t('view_all')}</Link>
                    </div>

                    <div className="space-y-3">
                        {userProfile.appointments.slice(0, 2).map(apt => (
                            <div key={apt.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-gray-900">{apt.doctor}</h4>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${apt.status === 'Confirmed' ? 'bg-sky-100 text-sky-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                        {apt.status}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {apt.date} at {apt.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick links */}
                <div className="font-medium text-gray-700 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <Link to="/appointments" className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50">
                        <span className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-sky-500" />
                            {t('my_appointments')}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50">
                        <span className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-sky-500" />
                            {t('family_profiles')}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50">
                        <span className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-sky-500" />
                            {t('saved_addresses')}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50">
                        <span>{t('help_support')}</span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                        <span>{t('settings')}</span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                </div>

                <Button variant="danger" className="w-full" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" /> {t('logout')}
                </Button>

                <p className="text-center text-xs text-gray-400 pt-4">{t('app_version')} 1.0.0</p>
            </div>
        </div>
    );
};

export default Profile;
