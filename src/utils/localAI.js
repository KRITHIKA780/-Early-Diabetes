


const responses = {
    chatbot: {
        en: {
            greeting: "Hello! I'm DiaDetect AI. I can help you manage diabetes with diet, exercise, and lifestyle tips. What would you like to know?",
            food: "For diabetics, focus on **low-GI foods**: oats, barley, legumes, non-starchy vegetables, and whole grains. Limit white rice, sugary drinks, and processed foods. Always eat small portions every 3-4 hours to maintain stable blood sugar.",
            sugar: "To lower blood sugar naturally: 1) Walk 30 minutes after meals, 2) Eat more fiber and protein, 3) Drink plenty of water, 4) Reduce refined carbs, 5) Get 7-8 hours of sleep. Always monitor your levels and consult your doctor for medication adjustments.",
            diet: "The best diabetes diet includes: **Breakfast** - oats/eggs with vegetables. **Lunch** - brown rice with lentils and salad. **Dinner** - grilled fish or chicken with steamed vegetables. Avoid sugary snacks and drink 8 glasses of water daily.",
            exercise: "Excellent exercise choices for diabetics: 1) Brisk walking 30 mins/day, 2) Swimming, 3) Cycling, 4) Yoga and stretching. Start slowly and monitor blood sugar before and after. Exercise can lower blood sugar by 20-30 mg/dL naturally!",
            hba1c: "HbA1c measures your average blood sugar over 3 months. Target for diabetics: below 7%. To improve it: follow a low-carb diet, exercise regularly, take medications as prescribed, and monitor blood sugar daily.",
            risk: "Your key diabetes risk factors include: high glucose, high HbA1c, obesity (BMI>30), family history, high blood pressure, and sedentary lifestyle. Address each with targeted lifestyle changes and medical guidance.",
            default: "Great question! For diabetes management, the most important steps are: monitoring blood glucose daily, eating a balanced low-GI diet, exercising 30 minutes daily, staying hydrated, getting regular checkups, and taking medications as prescribed. Is there a specific area you'd like help with?"
        },
        ta: {
            greeting: "வணக்கம்! நான் டயாடிடெக்ட் AI. நீரிழிவு நோயை உணவு, உடற்பயிற்சி மற்றும் வாழ்க்கை முறை மூலம் கட்டுப்படுத்த உதவுவேன். என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?",
            food: "நீரிழிவு நோயாளிகளுக்கு சிறந்த உணவுகள்: **குறைந்த GI உணவுகள்** - ஓட்ஸ், பார்லி, பயறு வகைகள், கீரைகள், மற்றும் முழு தானியங்கள். வெள்ளை அரிசி, இனிப்பு பானங்கள் மற்றும் பதப்படுத்தப்பட்ட உணவுகளை தவிர்க்கவும். 3-4 மணி நேரத்திற்கு ஒருமுறை சிறு உணவு சாப்பிடவும்.",
            sugar: "இரத்த சர்க்கரையை குறைக்க: 1) உணவிற்குப் பிறகு 30 நிமிடம் நடக்கவும், 2) நார்ச்சத்து மற்றும் புரதம் அதிகம் சாப்பிடவும், 3) நிறைய தண்ணீர் குடிக்கவும், 4) சுத்திகரிக்கப்பட்ட கார்போஹைட்ரேட்களை குறைக்கவும், 5) 7-8 மணி நேரம் தூங்கவும்.",
            diet: "சிறந்த நீரிழிவு உணவு திட்டம்: **காலை** - ஓட்ஸ் அல்லது முட்டையுடன் காய்கறிகள். **மதிய** - கைக்குத்தல் அரிசி, பருப்பு மற்றும் சாலட். **இரவு** - வேகவைத்த மீன் அல்லது சிக்கனுடன் காய்கறிகள். தினமும் 8 கிளாஸ் தண்ணீர் குடிக்கவும்.",
            exercise: "நீரிழிவு நோயாளிகளுக்கு சிறந்த உடற்பயிற்சி: 1) தினமும் 30 நிமிடம் நடைப்பயிற்சி, 2) நீச்சல், 3) சைக்கிளிங், 4) யோகா மற்றும் நீட்டல். உடற்பயிற்சி இரத்த சர்க்கரையை 20-30 mg/dL வரை குறைக்கலாம்!",
            hba1c: "HbA1c உங்கள் 3 மாத சராசரி இரத்த சர்க்கரையை அளவிடுகிறது. நீரிழிவு நோயாளிகளுக்கு இலக்கு: 7% கீழ். மேம்படுத்த: குறைந்த கார்போஹைட்ரேட் உணவு, தினமும் உடற்பயிற்சி, மருந்து சரியாக உட்கொள்ளுதல்.",
            risk: "நீரிழிவு அபாய காரணிகள்: அதிக குளுக்கோஸ், அதிக HbA1c, உடல் பருமன், குடும்ப வரலாறு, அதிக இரத்த அழுத்தம். வாழ்க்கை முறை மாற்றங்கள் மூலம் இவற்றை கட்டுப்படுத்தலாம்.",
            default: "நல்ல கேள்வி! நீரிழிவு கட்டுப்பாட்டிற்கு முக்கியமான படிகள்: தினமும் இரத்த சர்க்கரை பரிசோதனை, சீரான குறைந்த GI உணவு, தினமும் 30 நிமிடம் உடற்பயிற்சி, நிறைய தண்ணீர் குடிக்கவும், மருந்துகளை சரியாக உட்கொள்ளுதல். வேறு ஏதாவது கேட்க விரும்புகிறீர்களா?"
        },
        hi: {
            greeting: "नमस्ते! मैं DiaDetect AI हूँ। मैं आपको मधुमेह प्रबंधन में - आहार, व्यायाम और जीवनशैली के माध्यम से मदद करूँगा। आप क्या जानना चाहते हैं?",
            food: "मधुमेह रोगियों के लिए सर्वोत्तम खाद्य पदार्थ: **कम GI खाद्य पदार्थ** - जई, जौ, दालें, हरी सब्जियाँ और साबुत अनाज। सफेद चावल, मीठे पेय और प्रसंस्कृत खाद्य पदार्थों से बचें। हर 3-4 घंटे में छोटा भोजन लें।",
            sugar: "रक्त शर्करा कम करने के तरीके: 1) भोजन के बाद 30 मिनट टहलें, 2) अधिक फाइबर और प्रोटीन खाएं, 3) खूब पानी पिएं, 4) परिष्कृत कार्बोहाइड्रेट कम करें, 5) 7-8 घंटे सोएं। व्यायाम से रक्त शर्करा 20-30 mg/dL कम हो सकती है!",
            diet: "सर्वोत्तम मधुमेह आहार: **नाश्ता** - जई या अंडे के साथ सब्जियाँ। **दोपहर** - ब्राउन राइस, दाल और सलाद। **रात** - ग्रिल्ड मछली या चिकन सब्जियों के साथ। रोज 8 गिलास पानी पिएं।",
            exercise: "मधुमेह रोगियों के लिए उत्तम व्यायाम: 1) रोज 30 मिनट तेज चलना, 2) तैराकी, 3) साइकिलिंग, 4) योग। धीरे-धीरे शुरू करें और रक्त शर्करा मॉनिटर करें।",
            hba1c: "HbA1c 3 महीने की औसत रक्त शर्करा मापता है। मधुमेह रोगियों का लक्ष्य: 7% से कम। सुधार के लिए: कम कार्ब आहार, नियमित व्यायाम, निर्धारित दवाएं लें।",
            risk: "मधुमेह के मुख्य जोखिम कारक: उच्च ग्लूकोज, उच्च HbA1c, मोटापा, पारिवारिक इतिहास, उच्च रक्तचाप। जीवनशैली में बदलाव से इन्हें नियंत्रित किया जा सकता है।",
            default: "बहुत अच्छा सवाल! मधुमेह प्रबंधन के लिए: रोज रक्त शर्करा जांचें, संतुलित कम GI आहार लें, 30 मिनट व्यायाम करें, खूब पानी पिएं और दवाएं समय पर लें। क्या आप किसी विशिष्ट विषय पर जानकारी चाहते हैं?"
        },
        te: {
            greeting: "నమస్కారం! నేను DiaDetect AI. మీకు మధుమేహ నిర్వహణలో - ఆహారం, వ్యాయామం మరియు జీవనశైలి ద్వారా సహాయం చేస్తాను. మీరు ఏం తెలుసుకోవాలనుకుంటున్నారు?",
            food: "మధుమేహ రోగులకు ఉత్తమ ఆహారాలు: **తక్కువ GI ఆహారాలు** - వోట్స్, బార్లీ, పప్పు, ఆకుకూరలు మరియు తృణధాన్యాలు. తెల్ల బియ్యం, చక్కెర పానీయాలు మానుకోండి. 3-4 గంటలకు ఒకసారి చిన్న భోజనం తినండి.",
            sugar: "రక్తంలో చక్కెర తగ్గించడానికి: 1) భోజనం తర్వాత 30 నిమిషాలు నడవండి, 2) ఫైబర్ మరియు ప్రోటీన్ అధికంగా తినండి, 3) నీళ్ళు చాలా తాగండి, 4) 7-8 గంటలు నిద్ర పోండి.",
            default: "మంచి ప్రశ్న! మధుమేహ నిర్వహణకు ముఖ్యమైన అంశాలు: రోజూ రక్తంలో చక్కెర పరీక్ష, సరైన తక్కువ GI ఆహారం, 30 నిమిడాల వ్యాయామం, నీళ్ళు తాగడం మరియు మందులు సరిగ్గా వాడటం."
        }
    },
    food: {
        en: {
            "rice": { name: "White Rice", sugarImpact: "High", portion: "1/3 cup (cooked)", safety: "Caution", details: "White rice has a high glycemic index (GI: 72). Prefer brown rice or cauliflower rice. If eating, limit to 1/3 cup per meal and pair with protein and fiber to slow glucose absorption.", status: "caution" },
            "banana": { name: "Banana", sugarImpact: "Medium-High", portion: "1 small (80g)", safety: "Caution", details: "Bananas contain 14g of sugar. Choose unripe (green) bananas which have lower GI. Limit to half a banana and pair with nuts to reduce blood sugar spike.", status: "caution" },
            "oats": { name: "Oats", sugarImpact: "Low", portion: "1/2 cup (dry)", safety: "Safe", details: "Oats are excellent for diabetics! High in beta-glucan fiber which slows glucose absorption. Steel-cut or rolled oats are best. They help reduce HbA1c over time.", status: "safe" },
            "mango": { name: "Mango", sugarImpact: "High", portion: "1/2 cup (82g)", safety: "Caution", details: "Mangoes are high in natural sugar (45g per cup). Limit to 1/2 cup occasionally. Eat with protein like yogurt to slow sugar absorption. Avoid mango juice entirely.", status: "caution" },
            "chicken": { name: "Chicken (Grilled)", sugarImpact: "None", portion: "100-150g per meal", safety: "Safe", details: "Grilled chicken is excellent for diabetics — zero carbohydrates and high protein. Protein doesn't spike blood sugar and helps you feel full longer. Choose grilled over fried.", status: "safe" },
            "apple": { name: "Apple", sugarImpact: "Low-Medium", portion: "1 small apple", safety: "Safe", details: "Apples have a moderate GI (38) and are rich in fiber (quercetin). The fiber slows sugar absorption significantly. Eat with the skin for maximum benefit. A great diabetes-friendly snack.", status: "safe" },
            "bread": { name: "White Bread", sugarImpact: "High", portion: "1 thin slice", safety: "Avoid", details: "White bread has a very high GI (75). It causes rapid blood sugar spikes. Switch to whole grain or sourdough bread which has lower GI. Limit to 1 slice if necessary.", status: "danger" }
        },
        ta: {
            "அரிசி": { name: "வெள்ளை அரிசி", sugarImpact: "அதிகம்", portion: "1/3 கப் (சமைத்தது)", safety: "கவனம்", details: "வெள்ளை அரிசிக்கு அதிக கிளைசெமிக் இண்டெக்ஸ் (GI: 72) உள்ளது. கைக்குத்தல் அரிசி அல்லது காலிஃபிளவர் அரிசி விரும்பலாம். புரதம் மற்றும் நார்ச்சத்துடன் சேர்த்து சாப்பிடவும்.", status: "caution" },
            "ஓட்ஸ்": { name: "ஓட்ஸ்", sugarImpact: "குறைவு", portion: "1/2 கப்", safety: "பாதுகாப்பானது", details: "ஓட்ஸ் நீரிழிவு நோயாளிகளுக்கு சிறந்தது! பீட்டா-க்ளூக்கன் நார்ச்சத்து குளுக்கோஸ் உறிஞ்சுதலை மெதுவாக்குகிறது. HbA1c அளவை குறைக்க உதவுகிறது.", status: "safe" }
        }
    },
    diet: {
        en: {
            type: "Personalized Low-GI Diabetic Control Plan",
            meals: [
                { time: "Breakfast", menu: "1/2 cup rolled oats with berries + 2 boiled eggs + green tea (no sugar)", calories: "320 kcal" },
                { time: "Lunch", menu: "Brown rice (1/2 cup) + dal (lentil curry) + 2 cups mixed vegetable salad + buttermilk", calories: "420 kcal" },
                { time: "Snack", menu: "1 small apple + handful of almonds (10-12) + cucumber sticks", calories: "180 kcal" },
                { time: "Dinner", menu: "Grilled fish/chicken (150g) + steamed vegetables + 1 roti (whole wheat) + bowl of vegetable soup", calories: "380 kcal" }
            ],
            tips: [
                "Eat at regular intervals (every 3-4 hours) to maintain stable blood sugar levels",
                "Drink at least 8-10 glasses of water throughout the day to help kidneys flush excess glucose",
                "Walk for 20-30 minutes after each major meal to reduce post-meal blood sugar spikes by up to 40%"
            ]
        },
        ta: {
            type: "தனிப்பயனாக்கப்பட்ட குறைந்த GI நீரிழிவு கட்டுப்பாட்டு திட்டம்",
            meals: [
                { time: "காலை உணவு", menu: "1/2 கப் ஓட்ஸ் + பழங்கள் + 2 வேகவைத்த முட்டை + சர்க்கரை இல்லாத பச்சை தேயிலை", calories: "320 kcal" },
                { time: "மதிய உணவு", menu: "கைக்குத்தல் அரிசி (1/2 கப்) + பருப்பு கறி + 2 கப் கலந்த காய்கறி சாலட் + மோர்", calories: "420 kcal" },
                { time: "மதியம் சிற்றுண்டி", menu: "1 சிறிய ஆப்பிள் + பாதாம் (10-12) + வெள்ளரிக்காய் துண்டுகள்", calories: "180 kcal" },
                { time: "இரவு உணவு", menu: "வேகவைத்த மீன்/சிக்கன் (150g) + வேகவைத்த காய்கறிகள் + 1 சப்பாத்தி + காய்கறி சூப்", calories: "380 kcal" }
            ],
            tips: [
                "ஒவ்வொரு 3-4 மணி நேரத்திற்கும் சாப்பிடவும் - இது இரத்த சர்க்கரை நிலையானதாக வைக்க உதவும்",
                "தினமும் 8-10 கிளாஸ் தண்ணீர் குடிக்கவும் - இது சிறுநீரகங்கள் அதிகப்படியான குளுக்கோஸை வெளியேற்ற உதவும்",
                "ஒவ்வொரு உணவிற்கும் பிறகு 20-30 நிமிடம் நடக்கவும் - உணவிற்கு பிறகான சர்க்கரையை 40% வரை குறைக்கலாம்"
            ]
        },
        hi: {
            type: "व्यक्तिगत कम GI मधुमेह नियंत्रण योजना",
            meals: [
                { time: "नाश्ता", menu: "1/2 कप ओट्स + फल + 2 उबले अंडे + बिना शक्कर की ग्रीन टी", calories: "320 kcal" },
                { time: "दोपहर का भोजन", menu: "ब्राउन राइस (1/2 कप) + दाल + 2 कप मिश्रित सब्जी सलाद + छाछ", calories: "420 kcal" },
                { time: "शाम का नाश्ता", menu: "1 छोटा सेब + बादाम (10-12) + खीरे के टुकड़े", calories: "180 kcal" },
                { time: "रात का खाना", menu: "ग्रिल्ड मछली/चिकन (150g) + उबली सब्जियाँ + 1 रोटी + सब्जी सूप", calories: "380 kcal" }
            ],
            tips: [
                "हर 3-4 घंटे में खाएं - यह रक्त शर्करा स्थिर रखता है",
                "दिन में 8-10 गिलास पानी पिएं - यह गुर्दोंको अतिरिक्त ग्लूकोज निकालने में मदद करता है",
                "हर मुख्य भोजन के बाद 20-30 मिनट चलें - भोजन के बाद रक्त शर्करा 40% तक कम हो सकती है"
            ]
        },
        te: {
            type: "వ్యక్తిగత తక్కువ GI మధుమేహ నియంత్రణ ప్రణాళిక",
            meals: [
                { time: "అల్పాహారం", menu: "1/2 కప్ వోట్స్ + పండ్లు + 2 ఉడికిన గుడ్లు + చక్కెర లేని గ్రీన్ టీ", calories: "320 kcal" },
                { time: "మధ్యాహ్న భోజనం", menu: "బ్రౌన్ రైస్ (1/2 కప్) + పప్పు కూర + 2 కప్ కూరగాయల సలాడ్ + మజ్జిగ", calories: "420 kcal" },
                { time: "సాయంత్రం అల్పాహారం", menu: "1 చిన్న ఆపిల్ + బాదంపప్పు (10-12) + దోసకాయ ముక్కలు", calories: "180 kcal" },
                { time: "రాత్రి భోజనం", menu: "గ్రిల్డ్ చేప/చికెన్ (150g) + ఆవిరి కూరగాయలు + 1 రొట్టె + కూరగాయల సూప్", calories: "380 kcal" }
            ],
            tips: [
                "ప్రతి 3-4 గంటలకు తినండి - రక్తంలో చక్కెర స్థిరంగా ఉంటుంది",
                "రోజూ 8-10 గ్లాసుల నీళ్ళు తాగండి - మూత్రపిండాలు అదనపు గ్లూకోజ్ తొలగించడానికి సహాయపడుతుంది",
                "ప్రతి భోజనం తర్వాత 20-30 నిమిషాలు నడవండి - భోజనం తర్వాత రక్తంలో చక్కెర 40% వరకు తగ్గుతుంది"
            ]
        }
    }
};

function getKeywords(msg) {
    const lower = msg.toLowerCase();
    if (/rice|அரிசி|चावल|బియ్యం/.test(lower)) return 'rice';
    if (/banana|வாழை|केला|అరటి/.test(lower)) return 'banana';
    if (/oat|ஓட்ஸ்|ओट्स|వోట్స్/.test(lower)) return 'oats';
    if (/mango|மாம்|आम|మామిడి/.test(lower)) return 'mango';
    if (/chicken|சிக்கன்|मुर्गी|చికెన్/.test(lower)) return 'chicken';
    if (/apple|ஆப்பிள்|सेब|ఆపిల్/.test(lower)) return 'apple';
    if (/bread|ரொட்டி|रोटी|రొట్టె/.test(lower)) return 'bread';
    if (/food|eat|உணவு|खाना|ఆహారం|avoid|தவிர்/.test(lower)) return 'food';
    if (/sugar|glucose|சர்க்கரை|சர்க்கரை|рк்கரை|चीनी|चक्कर|చక్కెర/.test(lower)) return 'sugar';
    if (/diet|plan|திட்டம்|आहार|ఆహార/.test(lower)) return 'diet';
    if (/exercise|walk|workout|உடற்பயிற்சி|व्यायाम|వ్యాయామం/.test(lower)) return 'exercise';
    if (/hba1c|a1c|hemoglobin/.test(lower)) return 'hba1c';
    if (/risk|danger|ஆபத்து|خطر|ప్రమాదం/.test(lower)) return 'risk';
    return 'default';
}

export function getLocalChatResponse(message, language) {
    const lang = responses.chatbot[language] || responses.chatbot.en;
    const key = getKeywords(message);
    
    const foodKey = key;
    if (responses.food[language]?.[message.toLowerCase()]) {
        const f = responses.food[language][message.toLowerCase()];
        return `**${f.name}** — ${f.safety}\n\n${f.details}\n\n📊 Sugar Impact: ${f.sugarImpact} | Portion: ${f.portion}`;
    }
    return lang[key] || lang.default;
}

export function getLocalFoodData(query, language) {
    const lang = language === 'en' ? 'en' : language;
    const queryLower = query.toLowerCase();
    
    const foodDb = responses.food[lang] || responses.food.en;
    if (foodDb[queryLower]) return foodDb[queryLower];
    
    if (responses.food.en[queryLower]) {
        const f = responses.food.en[queryLower];
        return { ...f };
    }
    
    const isHighRisk = /sugar|sweets|cake|candy|juice|soda|cookie/.test(queryLower);
    const isSafe = /vegetables|greens|salad|nuts|eggs|fish|chicken|oats|lentil/.test(queryLower);
    if (isHighRisk) return { name: query, sugarImpact: "High", portion: "Avoid or very small amount", safety: "Avoid", details: `${query} has high sugar content and can cause blood sugar spikes in diabetics. Avoid or consume in very small amounts only occasionally.`, status: "danger" };
    if (isSafe) return { name: query, sugarImpact: "Low", portion: "As recommended", safety: "Safe", details: `${query} is generally safe for diabetics and has minimal impact on blood sugar levels. Rich in nutrients that support blood sugar management.`, status: "safe" };
    return {
        name: query,
        sugarImpact: language === 'ta' ? "நடுத்தரம்" : language === 'hi' ? "मध्यम" : language === 'te' ? "మధ్యస్థం" : "Moderate",
        portion: language === 'ta' ? "1 சிறிய பகுதி" : language === 'hi' ? "1 छोटी मात्रा" : language === 'te' ? "1 చిన్న భాగం" : "1 small portion",
        safety: language === 'ta' ? "கவனம்" : language === 'hi' ? "सावधानी" : language === 'te' ? "జాగ్రత్త" : "Caution",
        details: language === 'ta' ? `${query} நீரிழிவு நோயாளிகளுக்கு மிதமான தாக்கத்தை ஏற்படுத்தலாம். சிறிய அளவில் சாப்பிட்டு, உங்கள் இரத்த சர்க்கரையை கண்காணிக்கவும்.` : language === 'hi' ? `${query} मधुमेह रोगियों पर मध्यम प्रभाव डाल सकता है। छोटी मात्रा में खाएं और रक्त शर्करा मॉनिटर करें।` : `${query} may have moderate impact on blood sugar. Consume in small portions and monitor your glucose levels carefully.`,
        status: "caution"
    };
}

export function getLocalDietPlan(language) {
    const plan = responses.diet[language] || responses.diet.en;
    return plan;
}
