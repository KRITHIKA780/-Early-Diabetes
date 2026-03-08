import { useState } from 'react';
import { Search, Apple, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalFoodData } from '../utils/localAI';
import { askGemini, extractJson } from '../utils/gemini';
import './Modules.css';

export default function FoodFinder() {
    const { t, language, getLanguageName } = useLanguage();
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [foodData, setFoodData] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setFoodData(null);

        // Step 1: Show local AI result IMMEDIATELY (always works)
        const localResult = getLocalFoodData(query, language);
        setFoodData(localResult);
        setIsSearching(false);

        // Step 2: Try to enhance with Gemini in the background (optional)
        try {
            const prompt = `Evaluate the food item "${query}" for a diabetic patient.
Return ONLY a valid JSON object with these exact keys:
- "name": (string) food name in ${getLanguageName()}
- "sugarImpact": (string) 'Low', 'Medium', or 'High' in ${getLanguageName()}
- "portion": (string) recommended safe serving size in ${getLanguageName()}
- "safety": (string) 'Safe', 'Caution', or 'Avoid' in ${getLanguageName()}
- "details": (string) 2 helpful sentences about safety for diabetics in ${getLanguageName()}
- "status": (string) exactly 'safe', 'caution', or 'danger'

No markdown. Just the JSON.`;

            const text = await askGemini(prompt);
            const aiResult = extractJson(text);
            if (aiResult && aiResult.name) {
                setFoodData(aiResult); // Upgrade to AI result if better
            }
        } catch (_) {
            // Gemini unavailable — keep local result already shown
        }
    };

    const statusIcon = foodData?.status === 'safe' ? '✅' : foodData?.status === 'danger' ? '🚫' : '⚠️';
    const statusColor = foodData?.status === 'safe' ? '#34d399' : foodData?.status === 'danger' ? '#f87171' : '#fbbf24';

    return (
        <div className="module-container">
            <header className="module-header">
                <h2 className="gradient-text">{t('food.title')}</h2>
                <p>{t('food.desc')}</p>
            </header>

            <div className="glass-panel" style={{ padding: '30px' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flexGrow: 1, position: 'relative' }}>
                        <input
                            type="text"
                            className="input-field"
                            placeholder={t('food.placeholder')}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={isSearching} style={{ whiteSpace: 'nowrap' }}>
                        {isSearching ? <Loader2 size={18} className="spin" /> : t('food.findBtn')}
                    </button>
                </form>

                {foodData && (
                    <div className="animate-fade-in" style={{ marginTop: '30px' }}>
                        {/* Main food card */}
                        <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', fontSize: '2.5rem', lineHeight: 1 }}>
                                🍽️
                            </div>
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                    <h3 style={{ fontSize: '1.8rem', textTransform: 'capitalize' }}>{foodData.name}</h3>
                                    <span
                                        style={{
                                            padding: '4px 14px',
                                            borderRadius: '20px',
                                            background: `${statusColor}22`,
                                            color: statusColor,
                                            border: `1px solid ${statusColor}`,
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {statusIcon} {foodData.safety}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '20px', fontSize: '0.95rem', flexWrap: 'wrap' }}>
                                    <span>{t('food.sugarImpact')} <strong style={{ color: statusColor }}>{foodData.sugarImpact}</strong></span>
                                    <span>{t('food.portion')} <strong>{foodData.portion}</strong></span>
                                </div>
                            </div>
                        </div>

                        {}
                        <div style={{ marginTop: '20px', padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', lineHeight: '1.7', fontSize: '1rem' }}>
                            {foodData.details}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
