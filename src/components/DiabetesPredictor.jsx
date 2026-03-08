import { useState } from 'react';
import { Activity, Thermometer, Droplets, HeartPulse, ShieldAlert, CheckCircle2, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { askGemini, extractJson } from '../utils/gemini';
import './DiabetesPredictor.css';

export default function DiabetesPredictor() {
    const { t, language, getLanguageName } = useLanguage();
    const [formData, setFormData] = useState({
        glucose: '100',
        bloodPressure: '80',
        bmi: '22',
        age: '30',
        insulin: '80',
        hba1c: '5.4',
        familyHistory: 'No'
    });

    const [whatIfData, setWhatIfData] = useState({
        glucose: '100',
        bmi: '22'
    });

    const [isPredicting, setIsPredicting] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const predictLocally = () => {
        const glucose = Number(whatIfData.glucose || formData.glucose);
        const bmi = Number(whatIfData.bmi || formData.bmi);
        const bp = Number(formData.bloodPressure);
        const age = Number(formData.age);
        const insulin = Number(formData.insulin);
        const hba1c = Number(formData.hba1c);
        const family = formData.familyHistory === 'Yes';

        let score = 0;
        const factors = [];

        if (glucose >= 200) { score += 30; factors.push(`${t('risk.factorGlucoseHigh')}: ${glucose} mg/dL`); }
        else if (glucose >= 126) { score += 20; factors.push(`${t('risk.factorGlucoseEl')}: ${glucose} mg/dL`); }
        else if (glucose >= 100) { score += 10; }

        if (hba1c >= 6.5) { score += 25; factors.push(`${t('risk.factorHba1cHigh')}: ${hba1c}%`); }
        else if (hba1c >= 5.7) { score += 15; factors.push(`${t('risk.factorHba1cBorder')}: ${hba1c}%`); }

        if (bmi >= 35) { score += 15; factors.push(`${t('risk.factorBmiObese')}: ${bmi}`); }
        else if (bmi >= 30) { score += 10; factors.push(`${t('risk.factorBmiOver')}: ${bmi}`); }
        else if (bmi >= 25) { score += 5; }

        if (age >= 60) { score += 10; factors.push(`${t('risk.factorAge')}: ${age}`); }
        else if (age >= 45) { score += 5; }

        if (bp >= 140) { score += 8; factors.push(`${t('risk.factorBp')}: ${bp} mmHg`); }
        if (insulin > 200) { score += 7; factors.push(`${t('risk.factorInsulin')}: ${insulin}`); }
        if (family) { score += 10; factors.push(t('risk.factorFamily')); }

        score = Math.min(score, 100);

        let riskKey, messageKey;
        if (score >= 55) {
            riskKey = 'risk.high';
            messageKey = 'risk.msgHigh';
        } else if (score >= 30) {
            riskKey = 'risk.medium';
            messageKey = 'risk.msgMedium';
        } else {
            riskKey = 'risk.low';
            messageKey = 'risk.msgLow';
        }

        return { riskKey, score, messageKey, topFactors: factors.slice(0, 3), isAI: false };
    };

    const handlePredict = async (e) => {
        if (e) e.preventDefault();
        setIsPredicting(true);
        setResult(null);

        
        const localResult = predictLocally();
        setResult(localResult);

        
        const historyEntry = {
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            risk: localResult.riskKey.split('.')[1].toUpperCase(),
            score: localResult.score,
            glucose: Number(formData.glucose),
            trend: localResult.score > 50 ? 'up' : 'down'
        };
        const existing = JSON.parse(localStorage.getItem('diadetect_history') || '[]');
        existing.unshift(historyEntry);
        localStorage.setItem('diadetect_history', JSON.stringify(existing.slice(0, 10)));

        if (!result) {
            setWhatIfData({ glucose: formData.glucose, bmi: formData.bmi });
        }

        
        try {
            const currentGlucose = whatIfData.glucose || formData.glucose;
            const currentBmi = whatIfData.bmi || formData.bmi;
            const prompt = `You are DiaDetect AI. Given: Glucose ${currentGlucose} mg/dL, BP ${formData.bloodPressure} mmHg, BMI ${currentBmi}, Age ${formData.age}, Insulin ${formData.insulin}, HbA1c ${formData.hba1c}%, Family History: ${formData.familyHistory}. Local model predicted risk score: ${localResult.score}/100.
Give ONLY a valid JSON (no markdown): {"message": "2-sentence personalized advice in ${getLanguageName()}", "topFactors": ["factor1", "factor2", "factor3"]}. Reply with ONLY the JSON.`;

            const text = await askGemini(prompt);
            const aiData = extractJson(text);
            setResult(prev => ({
                ...prev,
                message: aiData.message,
                topFactors: aiData.topFactors?.length ? aiData.topFactors : prev.topFactors,
                isAI: true
            }));
        } catch (_) {
            
        } finally {
            setIsPredicting(false);
        }
    };

    const handleWhatIfChange = (e) => {
        setWhatIfData({ ...whatIfData, [e.target.name]: e.target.value });
    };

    return (
        <div className="module-container">
            <header className="module-header">
                <h2 className="gradient-text">{t('pred.title')}</h2>
                <p>{t('pred.desc')}</p>
            </header>

            <div className="predictor-card glass-panel">
                <form onSubmit={handlePredict} className="predictor-form">
                    <div className="form-grid">
                        <div className="input-group">
                            <label className="input-label">{t('pred.glucose')}</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    name="glucose"
                                    type="number"
                                    className="input-field"
                                    placeholder=""
                                    value={formData.glucose}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">{t('pred.bp')}</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    name="bloodPressure"
                                    type="number"
                                    className="input-field"
                                    placeholder=""
                                    value={formData.bloodPressure}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">{t('pred.bmi')}</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    name="bmi"
                                    type="number"
                                    step="0.1"
                                    className="input-field"
                                    placeholder=""
                                    value={formData.bmi}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">{t('pred.age')}</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    name="age"
                                    type="number"
                                    className="input-field"
                                    placeholder=""
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">{t('pred.insulin')}</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    name="insulin"
                                    type="number"
                                    className="input-field"
                                    placeholder=""
                                    value={formData.insulin}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">{t('pred.hba1c')}</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    name="hba1c"
                                    type="number"
                                    step="0.1"
                                    className="input-field"
                                    placeholder=""
                                    value={formData.hba1c}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary predict-btn" disabled={isPredicting}>
                        {isPredicting ? t('pred.predicting') : t('pred.calc')}
                    </button>
                </form>

                {result && (
                    <div className={`result-section animate-fade-in ${result.riskKey?.split('.')[1] || 'low'}`}>
                        <div className="result-header">
                            <ShieldAlert size={32} />
                            <h3>{t(result.riskKey)}</h3>
                        </div>
                        <div className="risk-score-bar">
                            <div className="score-fill" style={{ width: `${result.score}%` }}></div>
                        </div>

                        {result.aiErrorKey ? (
                            <p className="result-message ai-error" style={{ color: '#fbbf24', fontSize: '0.9rem' }}>
                                {t(result.aiErrorKey)}
                            </p>
                        ) : (
                            <p className="result-message">
                                {result.isAI ? result.message : t(result.messageKey)}
                            </p>
                        )}

                        {result.topFactors && result.topFactors.length > 0 && (
                            <div className="top-factors">
                                <h4>{t('pred.keyFactors')}</h4>
                                <ul>
                                    {result.topFactors.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
