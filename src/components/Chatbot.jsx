import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Zap, Heart, Apple, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { askGemini } from '../utils/gemini';
import { getLocalChatResponse } from '../utils/localAI';
import './Chatbot.css';

export default function Chatbot() {
    const { t, language, getLanguageName } = useLanguage();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    // Update greeting whenever language changes
    useEffect(() => {
        setMessages(prev => {
            if (prev.length === 0 || (prev.length === 1 && prev[0].id === 'greeting')) {
                return [{ id: 'greeting', sender: 'bot', text: t('chat.greeting') }];
            }
            
            return prev.map(m => m.id === 'greeting' ? { ...m, text: t('chat.greeting') } : m);
        });
    }, [language]);

    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const suggestions = [
        { icon: <Heart size={14} />, text: t('chat.suggest1') },
        { icon: <Activity size={14} />, text: t('chat.suggest2') },
        { icon: <Apple size={14} />, text: t('chat.suggest3') },
        { icon: <Zap size={14} />, text: t('chat.suggest4') },
    ];

    const sendSuggestion = (text) => {
        setInput(text);
        setTimeout(() => {
            handleSend({ preventDefault: () => { } }, text);
        }, 100);
    };

    const handleSend = async (e, override) => {
        e.preventDefault();
        const msg = override || input;
        if (!msg.trim()) return;

        const userMessage = { id: Date.now(), sender: 'user', text: msg };
        const newConversation = [...messages, userMessage];
        setMessages(newConversation);
        setInput('');
        setIsTyping(true);

        try {
            const conversationHistory = newConversation
                .filter(m => m.sender === 'user')
                .map(m => m.text)
                .join('\n');

            const prompt = `You are DiaDetect, an AI health assistant for a diabetes prediction app. 
Answer concisely about health, diet, diabetes, and exercise. Always advise consulting a real doctor.
IMPORTANT: Reply ONLY in ${getLanguageName()} language. Never switch language.

Conversation so far:
${conversationHistory}

Reply to the latest message.`;

            let botResponse;
            try {
                botResponse = await askGemini(prompt);
            } catch (apiErr) {
                
                botResponse = getLocalChatResponse(msg, language);
            }

            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, sender: 'bot', text: botResponse }
            ]);
        } catch (error) {
            
            const botResponse = getLocalChatResponse(msg, language);
            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, sender: 'bot', text: botResponse }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chatbot-page">
            <div className="chat-hero">
                <div className="chat-hero-avatar">
                    <Bot size={36} color="white" />
                    <span className="hero-pulse"></span>
                </div>
                <div className="chat-hero-text">
                    <h2>{t('chat.heroTitle')} <Sparkles size={20} className="sparkle-icon" /></h2>
                    <p>{t('chat.heroDesc')}</p>
                </div>
                <div className="chat-suggestions">
                    {suggestions.map((s, i) => (
                        <button key={i} className="suggestion-chip" onClick={() => sendSuggestion(s.text)}>
                            {s.icon} {s.text}
                        </button>
                    ))}
                </div>
            </div>
            <div className="chatbot-container glass-panel animate-fade-in">
                <div className="chat-header">
                    <div className="bot-info">
                        <div className="bot-avatar-wrapper">
                            <Bot size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <h3>{t('chat.botName')}</h3>
                            <p className="online-status">{t('chat.poweredBy')} <Sparkles size={12} className="sparkle" /></p>
                        </div>
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                            <div className={`message-bubble ${msg.sender}`}>
                                {msg.sender === 'bot' && <Bot size={16} className="msg-icon msg-bot-icon" />}
                                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                            </div>
                            <span className="msg-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message-wrapper bot">
                            <div className="message-bubble bot typing">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className="chat-input-area">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder={t('chat.placeholder')}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" className="chat-send-btn" disabled={!input.trim()}>
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
