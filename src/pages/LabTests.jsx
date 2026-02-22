import React, { useEffect } from 'react';
import { TestTube, Home, Shield } from 'lucide-react';
import { labTestPackages } from '../data/mockData';
import Button from '../components/Button';
import { trackPageView } from '../utils/analytics';

const LabTests = () => {
    useEffect(() => {
        trackPageView('LabTests');
    }, []);
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-900">Book Lab Tests</h1>
                <p className="text-sm text-gray-500 mt-0.5">Home collection • Reports in 24–48 hrs</p>
            </header>

            <div className="p-4 space-y-4">
                {/* Info strip */}
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 flex items-start gap-3">
                    <Home className="h-5 w-5 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">
                        <p className="font-medium text-gray-900">Free home collection</p>
                        <p className="text-gray-600">Our phlebotomist will visit you at your preferred time.</p>
                    </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900">Popular packages</h2>
                <div className="space-y-3">
                    {labTestPackages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`bg-white rounded-xl shadow-sm border overflow-hidden ${pkg.popular ? 'border-sky-200 ring-1 ring-sky-100' : 'border-gray-100'}`}
                        >
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <TestTube className="h-6 w-6 text-teal-600" />
                                    </div>
                                    <div>
                                        {pkg.popular && (
                                            <span className="text-xs font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full">Popular</span>
                                        )}
                                        <h3 className="font-semibold text-gray-900 mt-1">{pkg.name}</h3>
                                        <p className="text-xs text-gray-500">{pkg.tests}</p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-lg font-bold text-sky-600">₹{pkg.price}</p>
                                    {pkg.originalPrice && (
                                        <p className="text-xs text-gray-400 line-through">₹{pkg.originalPrice}</p>
                                    )}
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                <Button variant="primary" size="sm" className="w-full">
                                    Book now
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>NABL accredited labs • 100% accurate reports</span>
                </div>
            </div>
        </div>
    );
};

export default LabTests;
