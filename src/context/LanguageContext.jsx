import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('diadetect_lang') || 'ta';
    });

    useEffect(() => {
        localStorage.setItem('diadetect_lang', language);
    }, [language]);

    
    const t = (key, params = {}) => {
        const langData = translations[language];
        let text = langData?.[key] || translations['en'][key] || key;

        
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
        });

        return text;
    };

    
    const getLanguageName = () => {
        switch (language) {
            case 'ta': return 'Tamil';
            case 'te': return 'Telugu';
            case 'hi': return 'Hindi';
            default: return 'English';
        }
    };

    const value = {
        language,
        setLanguage,
        t,
        getLanguageName,
        availableLanguages: [
            { code: 'en', name: 'English' },
            { code: 'ta', name: 'தமிழ்' }, 
            { code: 'te', name: 'తెలుగు' }, 
            { code: 'hi', name: 'हिन्दी' } 
        ]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
