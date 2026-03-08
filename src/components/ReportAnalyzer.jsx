import { useState, useRef } from 'react';
import { FileText, Upload, CheckCircle2, AlertCircle, Loader2, FileUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Modules.css';

export default function ReportAnalyzer() {
    const { t, getLanguageName } = useLanguage();
    const fileInputRef = useRef(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            simulateAnalysis(file.name);
        }
    };

    const simulateAnalysis = (fileName) => {
        setIsAnalyzing(true);
        setError(null);
        setReportData(null);

        
        setTimeout(() => {
            setIsAnalyzing(false);
            const data = {
                fileName: fileName,
                glucose: '138 mg/dL',
                hba1c: '6.8%',
                cholesterol: '195 mg/dL',
                interpretationKey: 'rep.simInterpretation',
                actionKeys: [
                    'rep.simAction1',
                    'rep.simAction2',
                    'rep.simAction3'
                ]
            };
            setReportData(data);

            
            localStorage.setItem('diadetect_report_analysis', JSON.stringify(data));
        }, 2500);
    };

    return (
        <div className="module-container">
            <header className="module-header">
                <h2 className="gradient-text">{t('rep.title')}</h2>
                <p>{t('rep.desc')}</p>
            </header>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden-input"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg"
            />

            <div className={`upload-zone glass-panel ${selectedFile ? 'has-file' : ''}`} onClick={handleFileClick}>
                {isAnalyzing ? (
                    <div className="analyzing-state">
                        <Loader2 className="spin-icon" size={48} color="var(--primary)" />
                        <p>{t('rep.processing')}</p>
                    </div>
                ) : selectedFile ? (
                    <div className="file-selected">
                        <FileText size={48} color="var(--primary)" />
                        <p><strong>{selectedFile.name}</strong></p>
                        <span className="status-badge safe">{t('rep.fileReady')}</span>
                    </div>
                ) : (
                    <>
                        <Upload size={48} color="var(--primary)" />
                        <p><strong>{t('rep.clickUpload')}</strong></p>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('rep.formats')}</span>
                    </>
                )}
            </div>

            {reportData && (
                <div className="analysis-results animate-fade-in">
                    <div className="glass-panel" style={{ padding: '30px' }}>
                        <div className="result-metric">
                            <span className="metric-label">{t('rep.glucose')}</span>
                            <span className="metric-value">{reportData.glucose}</span>
                        </div>
                        <div className="result-metric">
                            <span className="metric-label">{t('rep.hba1c')}</span>
                            <span className="metric-value">{reportData.hba1c}</span>
                        </div>
                        <div className="result-metric">
                            <span className="metric-label">{t('rep.chol')}</span>
                            <span className="metric-value">{reportData.cholesterol}</span>
                        </div>

                        <div className="interpretation-box" style={{ marginTop: '25px', padding: '15px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px' }}>
                            <strong style={{ display: 'block', marginBottom: '10px', color: 'var(--primary)' }}>{t('rep.aiInterp')}</strong>
                            <p>{t(reportData.interpretationKey, { fileName: reportData.fileName })}</p>
                        </div>

                        <div className="recommendations-box" style={{ marginTop: '25px' }}>
                            <h4 style={{ marginBottom: '15px' }}>{t('rep.actions')}</h4>
                            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {reportData.actionKeys.map((key, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                        <CheckCircle2 size={16} color="var(--success)" style={{ marginTop: '3px' }} />
                                        <span>{t(key)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
