import { History, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Modules.css';

export default function HealthHistory() {
    const { t } = useLanguage();
    
    const storedHistory = JSON.parse(localStorage.getItem('diadetect_history') || '[]');

    const hasData = storedHistory.length > 0;

    
    const getRiskLabel = (riskVal) => {
        const riskMap = {
            'HIGH': t('risk.high'),
            'MEDIUM': t('risk.medium'),
            'LOW': t('risk.low'),
            
            'high': t('risk.high'),
            'medium': t('risk.medium'),
            'low': t('risk.low'),
            'High': t('risk.high'),
            'Medium': t('risk.medium'),
            'Low': t('risk.low'),
        };
        return riskMap[riskVal] || riskVal;
    };

    const avgGlucose = hasData
        ? Math.round(storedHistory.reduce((sum, e) => sum + e.glucose, 0) / storedHistory.length)
        : '--';

    const latestScore = hasData ? storedHistory[0].score : 0;
    const trend = hasData
        ? (storedHistory[0].score <= (storedHistory[1]?.score ?? storedHistory[0].score) ? t('common.improving') : t('common.worsening'))
        : '--';
    const trendColor = trend === t('common.improving') ? '#34d399' : trend === t('common.worsening') ? '#f87171' : 'var(--text-muted)';

    return (
        <div className="module-container">
            <header className="module-header">
                <h2 className="gradient-text">{t('hist.title')}</h2>
                <p>{t('hist.desc')}</p>
            </header>

            {!hasData ? (
                <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <History size={48} style={{ opacity: 0.3, marginBottom: '20px' }} />
                    <h3 style={{ marginBottom: '10px' }}>{t('hist.noRecords')}</h3>
                    <p>{t('hist.noRecordsDesc')}</p>
                </div>
            ) : (
                <>
                    <div className="history-summary glass-panel" style={{ padding: '30px', marginBottom: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', textAlign: 'center' }}>
                        <div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '5px' }}>{t('common.avgGlucose')}</p>
                            <h4 style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>{avgGlucose} mg/dL</h4>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '5px' }}>{t('common.totalScans')}</p>
                            <h4 style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>{storedHistory.length}</h4>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '5px' }}>{t('common.riskTrend')}</p>
                            <h4 style={{ fontSize: '1.8rem', color: trendColor }}>{trend}</h4>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <th style={{ padding: '15px 20px', textAlign: 'left' }}>{t('hist.date')}</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left' }}>{t('hist.riskLevel')}</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left' }}>{t('pred.glucose')}</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left' }}>{t('hist.score')}</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left' }}>{t('hist.trend')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {storedHistory.map((entry, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '15px 20px' }}>{entry.date}</td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <span className={`status-badge ${entry.risk.toLowerCase()}`}>{getRiskLabel(entry.risk)}</span>
                                        </td>
                                        <td style={{ padding: '15px 20px' }}>{entry.glucose} mg/dL</td>
                                        <td style={{ padding: '15px 20px', fontWeight: '700', color: entry.score > 66 ? '#f87171' : entry.score > 33 ? '#fbbf24' : '#34d399' }}>
                                            {entry.score}%
                                        </td>
                                        <td style={{ padding: '15px 20px' }}>
                                            {entry.trend === 'up'
                                                ? <TrendingUp size={18} color="#f87171" />
                                                : <TrendingUp size={18} color="#34d399" style={{ transform: 'rotate(180deg)' }} />
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <button className="btn-secondary" onClick={() => { localStorage.removeItem('diadetect_history'); window.location.reload(); }}>
                            {t('common.clearBtn')}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
