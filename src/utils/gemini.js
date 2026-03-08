


export async function askGemini(prompt) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        const err = new Error('No Gemini API key configured.');
        err.status = 0;
        throw err;
    }

    
    const models = [
        'gemini-2.0-flash',
        'gemini-1.5-flash',
        'gemini-1.5-flash-latest'
    ];

    let lastError;
    for (const model of models) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.4, maxOutputTokens: 1024 }
                })
            });

            if (response.status === 404) {
                
                continue;
            }

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                const errMsg = errBody?.error?.message || `HTTP ${response.status}`;
                console.error(`[Gemini ${model}] Error:`, errMsg);
                const err = new Error(errMsg);
                err.status = response.status;
                throw err;
            }

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) throw new Error('Empty response from Gemini');
            console.log(`[Gemini] Success with model: ${model}`);
            return text;
        } catch (e) {
            if (e.status === 404) { continue; }
            lastError = e;
            throw e;
        }
    }

    const err = new Error('All Gemini models unavailable');
    err.status = 503;
    throw err;
}

export function extractJson(text) {
    
    const cleaned = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
    // Find JSON object in the text
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
        try { return JSON.parse(match[0]); } catch (_) { }
    }
    try {
        return JSON.parse(cleaned);
    } catch (e) {
        console.error('[Gemini] JSON parse error. Text was:', cleaned.substring(0, 200));
        throw new Error('Invalid JSON from Gemini: ' + cleaned.substring(0, 100));
    }
}
