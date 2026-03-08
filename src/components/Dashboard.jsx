import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    Activity,
    LineChart,
    LogOut,
    Menu,
    X,
    Stethoscope,
    Leaf,
    ScanSearch,
    Bot,
    Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DiabetesPredictor from './DiabetesPredictor';
import Chatbot from './Chatbot';
import ReportAnalyzer from './ReportAnalyzer';
import AIDietGenerator from './AIDietGenerator';
import FoodFinder from './FoodFinder';
import HealthHistory from './HealthHistory';
import './Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, language, setLanguage, availableLanguages } = useLanguage();

    const handleLogout = () => {
        navigate('/login');
    };

    const modules = [
        { path: '/dashboard', icon: <Activity size={20} />, label: t('nav.riskAnalysis') },
        { path: '/dashboard/reports', icon: <Stethoscope size={20} />, label: t('nav.reports') },
        { path: '/dashboard/diet', icon: <Leaf size={20} />, label: t('nav.diet') },
        { path: '/dashboard/food', icon: <ScanSearch size={20} />, label: t('nav.food') },
        { path: '/dashboard/chatbot', icon: <Bot size={20} />, label: t('nav.chatbot') },
        { path: '/dashboard/history', icon: <LineChart size={20} />, label: t('nav.history') }
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="dashboard-layout">
            {}
            <nav className="top-nav glass-panel">
                <div className="nav-brand">
                    <h2 className="gradient-text">{t('login.diaDetect')}</h2>
                </div>

                <div className="mobile-menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    {modules.map((mod) => (
                        <NavLink
                            key={mod.path}
                            to={mod.path}
                            end={mod.path === '/dashboard'}
                            className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {mod.icon}
                            <span>{mod.label}</span>
                        </NavLink>
                    ))}
                    <div className="language-selector" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0 10px' }}>
                        <Globe size={18} color="var(--primary)" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{
                                background: 'transparent',
                                color: 'var(--text-main)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '5px',
                                padding: '5px',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {availableLanguages.map(lang => (
                                <option key={lang.code} value={lang.code} style={{ background: 'var(--bg-dark)' }}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="nav-logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>{t('nav.logout')}</span>
                    </button>
                </div>
            </nav>

            {}
            <main className="main-content">
                <div className="content-container animate-fade-in">
                    <Routes>
                        <Route path="/" element={<DiabetesPredictor />} />
                        <Route path="/chatbot" element={<Chatbot />} />
                        <Route path="/reports" element={<ReportAnalyzer />} />
                        <Route path="/diet" element={<AIDietGenerator />} />
                        <Route path="/food" element={<FoodFinder />} />
                        <Route path="/history" element={<HealthHistory />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}
