import React, { useEffect } from 'react';
import { healthTips } from '../data/mockData';
import { BookOpen, Clock } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const HealthTips = () => {
    useEffect(() => {
        trackPageView('HealthTips');
    }, []);
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-900">Health Tips</h1>
                <p className="text-sm text-gray-500 mt-0.5">Expert-backed articles for your wellness</p>
            </header>

            <div className="p-4 space-y-4">
                {healthTips.map((tip) => (
                    <article
                        key={tip.id}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <BookOpen className="h-5 w-5 text-sky-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-xs font-medium text-sky-600">{tip.category}</span>
                                <h2 className="font-semibold text-gray-900 mt-0.5">{tip.title}</h2>
                                <p className="text-sm text-gray-600 mt-1">{tip.excerpt}</p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                                    <Clock className="h-3 w-3" />
                                    {tip.readTime} read
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default HealthTips;
