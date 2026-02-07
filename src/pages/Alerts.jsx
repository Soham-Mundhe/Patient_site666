import React from 'react';
import { alerts } from '../data/mockData';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const Alerts = () => {
    const getIcon = (level) => {
        switch (level) {
            case 'warning': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
            case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
            default: return <Info className="h-5 w-5 text-sky-500" />;
        }
    };

    const getBgColor = (level) => {
        switch (level) {
            case 'warning': return 'bg-orange-50 border-orange-100';
            case 'critical': return 'bg-red-50 border-red-100';
            default: return 'bg-sky-50 border-sky-100';
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-900">Health Alerts</h1>
            </header>

            <div className="p-4 space-y-4">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-xl border ${getBgColor(alert.level)} shadow-sm`}>
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 flex-shrink-0">
                                {getIcon(alert.level)}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-gray-900">{alert.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                                <p className="text-xs text-gray-400 mt-2">{alert.date}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400">
                    <CheckCircle className="h-12 w-12 mb-2 opacity-50" />
                    <p>You're all caught up!</p>
                </div>
            </div>
        </div>
    );
};

export default Alerts;
