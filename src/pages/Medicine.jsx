import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, ChevronRight, Pill } from 'lucide-react';
import { medicineCategories, popularMedicines } from '../data/mockData';
import { trackPageView } from '../utils/analytics';

const Medicine = () => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        trackPageView('Medicine');
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-900">Order Medicine</h1>
                <p className="text-sm text-gray-500 mt-0.5">Get delivered to your doorstep</p>
                <div className="relative mt-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search medicines, OTC..."
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                </div>
            </header>

            <div className="p-4 space-y-6">
                {/* Categories */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Shop by category</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {medicineCategories.map((cat) => (
                            <div
                                key={cat.id}
                                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
                            >
                                <span className="text-2xl">{cat.icon}</span>
                                <div className="flex-1 ml-3 min-w-0">
                                    <p className="font-medium text-gray-900 text-sm truncate">{cat.name}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Popular medicines</h2>
                    <div className="space-y-2">
                        {popularMedicines.map((med) => (
                            <div
                                key={med.id}
                                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center">
                                        <Pill className="h-5 w-5 text-sky-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{med.name}</p>
                                        <p className="text-xs text-gray-500">{med.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-sky-600">₹{med.price}</span>
                                    <button className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-600 transition-colors">
                                        <ShoppingCart className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-center text-sm text-gray-400">Upload prescription for scheduled medicines</p>
            </div>
        </div>
    );
};

export default Medicine;
