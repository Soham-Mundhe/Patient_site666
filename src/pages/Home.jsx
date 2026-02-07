import { Link } from 'react-router-dom';
import { Search, Stethoscope, Bell, ChevronRight, ShieldCheck, Calendar, Pill, Phone, BookOpen, Tag } from 'lucide-react';
import consultationImg from '../assets/consultation.png';
import hospitalImg from '../assets/hospital.png';
import healthCheckImg from '../assets/health_check.png';
import ambulanceImg from '../assets/ambulance.png';
import { alerts, userProfile, healthTips, offers, emergencyContacts } from '../data/mockData';
import HealthStories from '../components/HealthStories';

const Home = () => {
    const nextAppointment = userProfile.appointments.find((a) => a.status === 'Confirmed');

    return (
        <div className="bg-gray-50 min-h-screen pb-24">
            {/* Header */}
            <header className="bg-white px-4 pt-4 pb-2 sticky top-0 z-20">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Hello, Soham 👋</h1>
                        <p className="text-sm text-gray-500">How are you feeling today?</p>
                    </div>
                    <Link to="/alerts" className="bg-sky-50 p-2 rounded-full relative">
                        <Bell className="h-6 w-6 text-sky-600" />
                        <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </Link>
                </div>

                <div className="relative shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-gray-100/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium"
                        placeholder="Search doctors, medicines..."
                    />
                </div>
            </header>

            <div className="p-4 space-y-6">
                {/* Stories Section */}
                <HealthStories />

                {/* Upcoming appointment card */}
                {nextAppointment && (
                    <Link to="/appointments" className="block bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl p-4 border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-sky-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-sky-600">Next appointment</p>
                                    <p className="font-semibold text-gray-900">{nextAppointment.doctor}</p>
                                    <p className="text-sm text-gray-500">{nextAppointment.date} · {nextAppointment.time}</p>
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                    </Link>
                )}

                {/* Main Action Grid - 6 tiles like Practo/1mg */}
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/doctors" className="col-span-1 bg-gradient-to-br from-sky-50 to-white p-4 rounded-2xl shadow-sm border border-sky-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-sky-100/50 rounded-bl-full -mr-4 -mt-4"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                                <img src={consultationImg} alt="Doctor" className="w-10 h-10 object-contain drop-shadow-sm" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 leading-tight">Find Doctors</h3>
                                <p className="text-xs text-sky-600 font-medium mt-1">Book Appointment</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/map" className="col-span-1 bg-gradient-to-br from-indigo-50 to-white p-4 rounded-2xl shadow-sm border border-indigo-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100/50 rounded-bl-full -mr-4 -mt-4"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                                <img src={hospitalImg} alt="Hospital" className="w-10 h-10 object-contain drop-shadow-sm" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 leading-tight">Hospitals</h3>
                                <p className="text-xs text-indigo-600 font-medium mt-1">Nearby · Map</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/medicine" className="col-span-1 bg-gradient-to-br from-emerald-50 to-white p-4 rounded-2xl shadow-sm border border-emerald-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100/50 rounded-bl-full -mr-4 -mt-4"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                                <Pill className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 leading-tight">Order Medicine</h3>
                                <p className="text-xs text-emerald-600 font-medium mt-1">Home delivery</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/lab-tests" className="col-span-1 bg-gradient-to-br from-teal-50 to-white p-4 rounded-2xl shadow-sm border border-teal-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-teal-100/50 rounded-bl-full -mr-4 -mt-4"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                                <img src={healthCheckImg} alt="Lab" className="w-10 h-10 object-contain drop-shadow-sm" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 leading-tight">Lab Tests</h3>
                                <p className="text-xs text-teal-600 font-medium mt-1">Home collection</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/appointments" className="col-span-1 bg-gradient-to-br from-violet-50 to-white p-4 rounded-2xl shadow-sm border border-violet-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-violet-100/50 rounded-bl-full -mr-4 -mt-4"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                                <Calendar className="h-6 w-6 text-violet-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 leading-tight">Appointments</h3>
                                <p className="text-xs text-violet-600 font-medium mt-1">Upcoming & past</p>
                            </div>
                        </div>
                    </Link>

                    <a href="tel:102" className="col-span-1 bg-gradient-to-br from-rose-50 to-white p-4 rounded-2xl shadow-sm border border-rose-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-rose-100/50 rounded-bl-full -mr-4 -mt-4"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                                <img src={ambulanceImg} alt="Ambulance" className="w-10 h-10 object-contain drop-shadow-sm" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 leading-tight">Ambulance</h3>
                                <p className="text-xs text-rose-600 font-medium mt-1">Emergency 102</p>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Full body checkup banner */}
                <Link to="/lab-tests" className="block bg-gradient-to-r from-sky-500 to-indigo-600 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white">
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="max-w-[60%]">
                            <h3 className="text-lg font-bold mb-1">Full Body Checkup</h3>
                            <p className="text-sm text-sky-100 mb-3">60+ tests. Home collection.</p>
                            <span className="inline-block bg-white text-sky-600 text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
                                Book at ₹999
                            </span>
                        </div>
                        <ShieldCheck size={80} className="opacity-30" />
                    </div>
                </Link>

                {/* Today's offers */}
                <div>
                    <div className="flex justify-between items-center mb-3 px-1">
                        <h2 className="text-lg font-bold text-gray-900">Offers for you</h2>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Tag className="h-4 w-4" /> {offers.length} active
                        </span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {offers.map((offer) => (
                            <div key={offer.id} className="flex-shrink-0 w-[280px] bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                                <p className="font-medium text-gray-900 text-sm">{offer.title}</p>
                                <p className="text-xs text-amber-600 font-mono mt-1">Code: {offer.code}</p>
                                <p className="text-xs text-gray-400 mt-1">Valid: {offer.validTill}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Specializations */}
                <div>
                    <div className="flex justify-between items-center mb-3 px-1">
                        <h2 className="text-lg font-bold text-gray-900">Specializations</h2>
                        <Link to="/doctors" className="text-sm text-sky-500 font-medium flex items-center hover:underline">
                            View all <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                        {['General Physician', 'Cardiologist', 'Dentist', 'Neurologist', 'Orthopedic'].map((spec, i) => (
                            <Link key={i} to="/doctors" className="flex-shrink-0 flex flex-col items-center space-y-2">
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center hover:border-sky-200 hover:shadow-md transition-all">
                                    <Stethoscope className="text-sky-500 w-7 h-7" />
                                </div>
                                <span className="text-xs font-medium text-gray-700">{spec.split(' ')[0]}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Health tips */}
                <div>
                    <div className="flex justify-between items-center mb-3 px-1">
                        <h2 className="text-lg font-bold text-gray-900">Health tips</h2>
                        <Link to="/health-tips" className="text-sm text-sky-500 font-medium flex items-center hover:underline">
                            See all <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {healthTips.slice(0, 3).map((tip) => (
                            <Link key={tip.id} to="/health-tips" className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="h-5 w-5 text-sky-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="text-xs font-medium text-sky-600">{tip.category}</span>
                                        <h3 className="font-semibold text-gray-900 mt-0.5">{tip.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tip.excerpt}</p>
                                        <p className="text-xs text-gray-400 mt-1">{tip.readTime} read</p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Emergency quick dial */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-red-500" /> Emergency
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        {emergencyContacts.map((c) => (
                            <a
                                key={c.name}
                                href={`tel:${c.number}`}
                                className="bg-white rounded-xl p-3 text-center border border-red-100 hover:bg-red-50 transition-colors"
                            >
                                <p className="font-bold text-red-600">{c.number}</p>
                                <p className="text-xs text-gray-600">{c.name}</p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Health Alerts preview */}
                <div>
                    <div className="flex justify-between items-center mb-3 px-1">
                        <h2 className="text-lg font-bold text-gray-900">Health Alerts</h2>
                        <Link to="/alerts" className="text-sm text-sky-500 font-medium hover:underline">See all</Link>
                    </div>
                    <Link to="/alerts" className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                                <Bell className="h-5 w-5 text-orange-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{alerts[0].title}</h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{alerts[0].description}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
