import { useState, useEffect, useCallback, useRef } from 'react';

export const useSpeechRecognition = (onResult) => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [error, setError] = useState('');

    const onResultRef = useRef(onResult);

    useEffect(() => {
        onResultRef.current = onResult;
    }, [onResult]);

    useEffect(() => {
        // Check for browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError('Speech recognition is not supported in this browser.');
            return;
        }

        const rec = new SpeechRecognition();
        rec.continuous = false; // Stop when they stop speaking
        rec.interimResults = false; // Only final results
        // Language will be set before starting

        rec.onstart = () => {
            setIsListening(true);
            setError('');
        };

        rec.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (onResultRef.current) {
                onResultRef.current(transcript);
            }
        };

        rec.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            if (event.error !== 'no-speech') {
                alert(`Microphone error: ${event.error}. Please ensure microphone permissions are granted in your browser.`);
            }
            setError(`Microphone error: ${event.error} `);
            setIsListening(false);
        };

        rec.onend = () => {
            setIsListening(false);
        };

        setRecognition(rec);

        return () => {
            if (rec) {
                try { rec.abort(); } catch (e) { }
            }
        };
    }, []); 

    const startListening = useCallback((langCode = 'en-US') => {
        if (!recognition) return;

        
        const localeMap = {
            'en': 'en-US',
            'ta': 'ta-IN',
            'te': 'te-IN',
            'hi': 'hi-IN'
        };

        recognition.lang = localeMap[langCode] || 'en-US';

        try {
            recognition.start();
        } catch (e) {
            console.error("Could not start recognition", e);
            
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            try { recognition.stop(); } catch (e) { }
        }
    }, [recognition]);

    return {
        isListening,
        startListening,
        stopListening,
        error,
        hasSupport: !!recognition
    };
};
