import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const getLanguageLabel = (lng) => {
        switch (lng) {
            case 'hi': return 'हिंदी';
            case 'mr': return 'मराठी';
            case 'gu': return 'ગુજરાતી';
            default: return 'English';
        }
    };

    return (
        <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500 transition-all shadow-sm">
                <Languages className="w-4 h-4 text-sky-600" />
                <span>{getLanguageLabel(i18n.language)}</span>
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 hidden group-hover:block z-50">
                <button
                    onClick={() => changeLanguage('en')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-sky-50 transition-colors ${i18n.language === 'en' ? 'text-sky-600 font-semibold bg-sky-50' : 'text-gray-700'}`}
                >
                    English
                </button>
                <button
                    onClick={() => changeLanguage('hi')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-sky-50 transition-colors ${i18n.language === 'hi' ? 'text-sky-600 font-semibold bg-sky-50' : 'text-gray-700'}`}
                >
                    हिंदी
                </button>
                <button
                    onClick={() => changeLanguage('mr')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-sky-50 transition-colors ${i18n.language === 'mr' ? 'text-sky-600 font-semibold bg-sky-50' : 'text-gray-700'}`}
                >
                    मराठी
                </button>
                <button
                    onClick={() => changeLanguage('gu')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-sky-50 transition-colors ${i18n.language === 'gu' ? 'text-sky-600 font-semibold bg-sky-50' : 'text-gray-700'}`}
                >
                    ગુજરાતી
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
