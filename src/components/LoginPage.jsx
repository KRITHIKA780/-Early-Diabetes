import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, User, Mail, UserPlus, CheckCircle2, Phone, Globe } from 'lucide-react';
import './LoginPage.css';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
    const { t, language, setLanguage, availableLanguages } = useLanguage();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');

        // Simulate API call for both login and signup
        setTimeout(() => {
            setIsLoading(false);
            if (!isLogin) {
                setSuccessMessage(t('login.signupSuccess'));
                setIsLogin(true);
                setFormData({ username: '', email: '', phone: '', password: '' });
            } else {
                navigate('/dashboard');
            }
        }, 1500);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ username: '', email: '', phone: '', password: '' });
        setSuccessMessage('');
    };

    return (
        <div className="login-container">
            <div style={{ position: 'absolute', top: '20px', right: '30px', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 10 }}>
                <Globe size={18} color="var(--primary)" />
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{
                        background: 'rgba(15, 23, 42, 0.8)',
                        color: 'var(--text-main)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        outline: 'none',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    {availableLanguages.map(lang => (
                        <option key={lang.code} value={lang.code} style={{ background: 'var(--bg-dark)' }}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={`login-card glass-panel animate-fade-in ${isLogin ? 'mode-login' : 'mode-signup'}`}>
                <div className="login-header">
                    <h1 className="gradient-text">{t('login.diaDetect')}</h1>
                    <p>{isLogin ? t('login.welcome') : t('login.joinMessage')}</p>

                    {successMessage && (
                        <div className="success-banner animate-fade-in">
                            <CheckCircle2 size={18} />
                            <span>{successMessage}</span>
                        </div>
                    )}
                </div>

                <form key={isLogin ? 'login' : 'signup'} onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label className="input-label">{t('login.username')}</label>
                        <div className="input-wrapper">
                            <User size={18} className="input-icon" />
                            <input
                                name="username"
                                type="text"
                                className="input-field with-icon"
                                placeholder=""
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {!isLogin && (
                        <>
                            <div className="input-group">
                                <label className="input-label">{t('login.email')}</label>
                                <div className="input-wrapper">
                                    <Mail size={18} className="input-icon" />
                                    <input
                                        name="email"
                                        type="email"
                                        className="input-field with-icon"
                                        placeholder=""
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="input-label">{t('login.phone')}</label>
                                <div className="input-wrapper">
                                    <Phone size={18} className="input-icon" />
                                    <input
                                        name="phone"
                                        type="tel"
                                        className="input-field with-icon"
                                        placeholder=""
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="input-group">
                        <label className="input-label">{t('login.password')}</label>
                        <div className="input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                name="password"
                                type="password"
                                className="input-field with-icon"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary login-btn" disabled={isLoading}>
                        {isLoading ? t('login.authenticating') : (
                            <>
                                <span>{isLogin ? t('login.signInBtn') : t('login.createAcctBtn')}</span>
                                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? t('login.noAccount') : t('login.hasAccount')}
                        <button className="toggle-auth-btn" onClick={toggleMode} style={{ marginLeft: '8px' }}>
                            {isLogin ? t('login.signUpLink') : t('login.loginLink')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
