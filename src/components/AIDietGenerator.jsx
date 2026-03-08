import { useState } from 'react';
import { Utensils, Coffee, Sun, Moon, Apple, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { askGemini, extractJson } from '../utils/gemini';
import { getLocalDietPlan } from '../utils/localAI';
import './Modules.css';

export default function AIDietGenerator() {
    const { t, language, getLanguageName } = useLanguage();
    const [isGenerating, setIsGenerating] = useState(false);
    const [dietPlan, setDietPlan] = useState(null);

    const reportDataStr = localStorage.getItem('diadetect_report_analysis');
    const hasReport = !!reportDataStr;

    const generateDiet = async () => {
        setIsGenerating(true);
        setDietPlan(null);

        try {
            const reportData = reportDataStr ? JSON.parse(reportDataStr) : null;
            const contextStr = reportData
                ? `Patient medical report: Glucose ${reportData.glucose}, HbA1c ${reportData.hba1c}, Cholesterol ${reportData.cholesterol}.`
                : `Patient profile: Typical diabetic patient needing a healthy low-GI diet.`;

            const prompt = `You are a professional diabetic nutritionist.
${contextStr}
Generate a 1-day personalized diet plan for this diabetic patient.
Return ONLY a valid JSON object with these exact keys:
- "type": (string) diet plan name like 'Low-GI Diabetic Control Plan' in ${getLanguageName()}
- "meals": (array of 4 objects) for Breakfast, Lunch, Snack, Dinner. Each object has:
    - "time": (string) meal name in ${getLanguageName()} (e.g. Breakfast = காலை உணவு in Tamil)
    - "menu": (string) meal description in ${getLanguageName()}
    - "calories": (string) e.g. '350 kcal'
- "tips": (array of 3 strings) health tips for diabetics in ${getLanguageName()}

No markdown blocks. Just the JSON.`;

            let resultData;
            try {
                const text = await askGemini(prompt);
                resultData = extractJson(text);
            } catch (apiErr) {
                
                resultData = getLocalDietPlan(language);
            }

            const icons = [<Coffee />, <Sun />, <Apple />, <Moon />];
            const enrichedMeals = resultData.meals.map((m, idx) => ({
                ...m,
                icon: icons[idx] || <Utensils />
            }));

            setDietPlan({ ...resultData, meals: enrichedMeals });
        } catch (error) {
            const is429 = error.status === 429;
            setDietPlan({
                type: t(is429 ? 'common.aiBusy' : 'diet.errAI'),
                meals: [
                    { time: t('common.error'), icon: <Utensils />, menu: is429 ? t('common.aiBusy') : t('diet.errFail'), calories: '-' },
                ],
                tips: [t('diet.errCheck'), t('diet.errKey')]
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="module-container">
            <header className="module-header">
                <h2 className="gradient-text">{t('diet.title')}</h2>
                <p>{t('diet.desc')}</p>
            </header>

            {!dietPlan ? (
                <div className="glass-panel animate-fade-in" style={{ padding: '40px', textAlign: 'center' }}>
                    <Calendar size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
                    {!hasReport ? (
                        <>
                            <h3>{t('diet.reqTitle')}</h3>
                            <p style={{ margin: '15px 0 25px', color: 'var(--text-muted)' }}>
                                {t('diet.readyDesc')}
                            </p>
                            <button className="btn-primary" onClick={generateDiet} disabled={isGenerating}>
                                {isGenerating ? t('diet.generating') : t('diet.genBtn')}
                            </button>
                        </>
                    ) : (
                        <>
                            <h3>{t('diet.readyTitle')}</h3>
                            <p style={{ margin: '15px 0 25px', color: 'var(--text-muted)' }}>
                                {t('diet.readyDesc')}
                            </p>
                            <button className="btn-primary" onClick={generateDiet} disabled={isGenerating}>
                                {isGenerating ? t('diet.generating') : t('diet.genBtn')}
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <div className="diet-results animate-fade-in">
                    <div className="plan-meta">
                        <span className="status-badge safe">{dietPlan.type}</span>
                    </div>

                    <div className="meal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
                        {dietPlan.meals.map((meal, i) => (
                            <div
                                key={i}
                                className="glass-panel animate-slide-down"
                                style={{ padding: '25px', animationDelay: `${i * 0.15}s`, opacity: 0 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)' }}>
                                        {meal.icon}
                                        <strong style={{ fontSize: '1.1rem' }}>{meal.time}</strong>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{meal.calories}</span>
                                </div>
                                <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>{meal.menu}</p>
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel" style={{ marginTop: '30px', padding: '30px' }}>
                        <h4 style={{ marginBottom: '15px', color: 'var(--primary)' }}>{t('diet.healthTips')}</h4>
                        <ul className="tips-list">
                            {dietPlan.tips.map((tip, i) => (
                                <li key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button className="btn-secondary" onClick={() => setDietPlan(null)}>
                            {t('diet.newPlan')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
