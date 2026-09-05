/**
 * MEMORA - Multilingual Localization Dictionary
 * Initially supporting: English, Hindi, and North-Eastern Regional (Assamese)
 * Clean modular separation between UI text, game instructions, and spoken voice prompts.
 */

const I18N_DATA = {
  en: {
    greeting: "Good Morning, Mrs. Sharma 👋",
    greeting_sub: "Here is your plan for today:",
    session_status: "Cognitive Session",
    session_not_done: "Not completed",
    session_done: "Completed ✓",
    med_status: "Medicine",
    med_next: "Next: 2:00 PM",
    hydro_status: "Hydration",
    hydro_next: "Next: 3:00 PM",
    
    // Main Buttons
    btn_games: "PLAY COGNITIVE GAME",
    btn_games_sub: "Fun memory activities to keep your mind sharp",
    btn_memories: "MY MEMORIES",
    btn_memories_sub: "Photos and stories of your loved ones",
    btn_reminders: "MY REMINDERS",
    btn_reminders_sub: "Medicines, water, and daily routine",
    btn_home: "FIND MY HOME",
    btn_home_sub: "Simple guide to help you reach home safely",
    btn_voice: "VOICE ASSISTANT",
    btn_voice_sub: "Speak or listen at any time",
    
    // Game Titles & Descriptions
    game1_title: "Memory Match",
    game1_desc: "Remember objects and find them again",
    game2_title: "Sequence Recall",
    game2_desc: "Remember the correct order",
    game3_title: "Object Recognition",
    game3_desc: "Identify familiar everyday objects",
    choose_activity: "Choose an Activity",
    
    // Game Instructions
    look_carefully: "Look carefully at these objects!",
    look_carefully_sub: "Remember these objects. They will hide in 5 seconds!",
    which_did_you_see: "Which objects did you see? Tap them below.",
    which_did_you_see_sub: "Tap the objects you remember.",
    check_my_answers: "CHECK MY ANSWERS",
    watch_sequence: "Watch the items in order...",
    watch_sequence_sub: "Remember the order from left to right.",
    ready_to_repeat: "I'M READY TO REPEAT!",
    ready_to_repeat_sub: "Tap here to test your sequence memory",
    repeat_sequence: "Now tap the items in the same order!",
    tapped_sequence_hint: "Your tapped sequence will appear here",
    clear_btn: "CLEAR",
    done_btn: "DONE",
    what_is_this: "What is this object?",
    what_is_this_sub: "Look at the familiar object below and choose its name.",
    
    // Feedback & Results
    well_done: "Well done!",
    good_try: "Good try! Let's try again.",
    score_label: "Accuracy",
    next_level_prefix: "Next Session Difficulty",
    play_again: "PLAY AGAIN",
    back_to_home: "BACK TO HOME",
    next_object: "NEXT OBJECT",
    
    // Voice Spoken Prompts
    speak_greeting: "Good Morning, Mrs. Sharma. Here is your plan for today. You can hover over any option to hear what it does.",
    speak_choose_game: "Choose a game: Memory Match, Sequence Recall, or Object Recognition.",
    speak_look_carefully: "Look carefully at these objects and remember them.",
    speak_which_objects: "Which objects did you see? Tap them on the screen or speak their names.",
    speak_well_done: "Well done! That was excellent recall.",
    speak_good_try: "Good try! Keep going, you are doing wonderful.",
    speak_watch_sequence: "Watch the items in order. When you are ready, tap I'm ready to repeat.",
    speak_repeat_sequence: "Tap the items in the same order.",
    speak_sequence_success: "Wonderful sequence recall! Well done.",
    speak_sequence_try: "Good effort! Keep practicing at your own pace.",
    speak_what_object: "What is this object? Tap the button or speak your answer.",
    speak_correct_object: "Correct! Well done!",
    speak_try_object: "That was a good try.",
    speak_reminders: "Here are your daily medicine and water reminders.",
    speak_reminder_done: "Wonderful! I have marked your reminder as completed.",
    speak_memories: "Here are your family memories and photos of your loved ones.",
    speak_home_nav: "Walk North toward your home, or tap the button to call your son Rahul.",
    speak_lang_switched: "Voice output and display updated to English.",
    voice_guide_on: "Voice guide is now turned ON. Hover over any option to hear it spoken.",
    voice_guide_off: "Voice guide is now turned OFF.",
    
    // Voice Assistant Screen
    voice_listening: "Listening... Speak your answer now",
    voice_start_msg: "Welcome Mrs. Sharma. What would you like to do today? You can say: Games, Memories, Reminders, or Take Me Home.",
    
    // Home Finder
    home_heading: "Take Me Home",
    home_distance_prefix: "Distance to Home:",
    call_caregiver: "Call Rahul (Caregiver)",
    call_caregiver_sub: "Tap to phone son Rahul directly",
    open_map_directions: "OPEN MAP DIRECTIONS",
    open_map_sub: "View step-by-step route to your door",
    home_address_label: "Your Home Address:",
    safe_return: "Safe Return",
    located_msg: "MEMORA has located your position.",
    walk_north_hint: "Walk North along Main Road toward Bharalumukh",
    
    // Reminders Screen
    reminders_heading: "Today's Schedule & Medicines",
    took_it_btn: "I TOOK IT!",
    done_btn_label: "✓ DONE",
    
    // Memories Screen
    memories_heading: "Your Loved Ones & Special Memories"
  },

  hi: {
    greeting: "शुभ प्रभात, श्रीमती शर्मा 👋",
    greeting_sub: "आज की आपकी दिनचर्या:",
    session_status: "दैनिक अभ्यास",
    session_not_done: "बाकी है",
    session_done: "पूर्ण हुआ ✓",
    med_status: "दवाइयाँ",
    med_next: "अगली: दोपहर 2:00 बजे",
    hydro_status: "पानी पीना",
    hydro_next: "अगली: दोपहर 3:00 बजे",
    
    // Main Buttons
    btn_games: "दिमागी खेल खेलें",
    btn_games_sub: "मनोरंजक खेल जो याददाश्त को तरोताज़ा रखें",
    btn_memories: "मेरी प्यारी यादें",
    btn_memories_sub: "परिवार और प्रियजनों की तस्वीरें",
    btn_reminders: "मेरी याद दिलाने वाली सूची",
    btn_reminders_sub: "दवाइयाँ, पानी और दैनिक काम",
    btn_home: "मेरा घर ढूँढें",
    btn_home_sub: "घर सुरक्षित पहुँचने का आसान रास्ता",
    btn_voice: "आवाज़ से मदद लें",
    btn_voice_sub: "कभी भी बोलकर निर्देश दें",
    
    // Game Titles & Descriptions
    game1_title: "वस्तु मिलान खेल",
    game1_desc: "वस्तुओं को याद रखें और पहचानें",
    game2_title: "क्रम याद रखें",
    game2_desc: "सही क्रम में चीज़ों को चुनें",
    game3_title: "वस्तु पहचानें",
    game3_desc: "जानी-पहचानी चीज़ों का नाम बताएं",
    choose_activity: "एक खेल चुनें",
    
    // Game Instructions
    look_carefully: "इन चीज़ों को ध्यान से देखिए!",
    look_carefully_sub: "इन वस्तुओं को याद रखें। यह 5 सेकंड में छिप जाएंगी!",
    which_did_you_see: "आपने कौन सी चीज़ें देखीं? नीचे छूकर चुनें।",
    which_did_you_see_sub: "याद की गई वस्तुओं को छुएं।",
    check_my_answers: "उत्तर जांचें",
    watch_sequence: "क्रम को ध्यान से देखें...",
    watch_sequence_sub: "बाएं से दाएं क्रम को याद रखें।",
    ready_to_repeat: "मैं दोहराने के लिए तैयार हूँ!",
    ready_to_repeat_sub: "अपनी क्रम याददाश्त आजमाने के लिए यहाँ छुएं",
    repeat_sequence: "अब उसी क्रम में वस्तुओं को छुएं!",
    tapped_sequence_hint: "आपका चुना हुआ क्रम यहाँ दिखाई देगा",
    clear_btn: "मिटाएं",
    done_btn: "हो गया",
    what_is_this: "यह क्या चीज़ है?",
    what_is_this_sub: "नीचे दी गई जानी-पहचानी वस्तु को देखें और उसका नाम चुनें।",
    
    // Feedback & Results
    well_done: "बहुत बढ़िया! शाबाश!",
    good_try: "अच्छा प्रयास! फिर से कोशिश करते हैं।",
    score_label: "सटीकता",
    next_level_prefix: "अगले सत्र का स्तर",
    play_again: "दोबारा खेलें",
    back_to_home: "घर वापस जाएं",
    next_object: "अगली वस्तु",
    
    // Voice Spoken Prompts
    speak_greeting: "शुभ प्रभात, श्रीमती शर्मा जी। आज की आपकी दिनचर्या तैयार है। किसी भी विकल्प के बारे में सुनने के लिए उस पर माउस ले जाएं।",
    speak_choose_game: "एक खेल चुनें: वस्तु मिलान खेल, क्रम याद रखें, या वस्तु पहचानें।",
    speak_look_carefully: "इन वस्तुओं को ध्यान से देखिए और याद रखिए।",
    speak_which_objects: "आपने कौन सी वस्तुएं देखीं? स्क्रीन पर छूकर बताएं या बोलकर उत्तर दें।",
    speak_well_done: "बहुत बढ़िया! आपने बहुत अच्छा याद रखा।",
    speak_good_try: "अच्छा प्रयास! ऐसे ही अभ्यास करते रहें, आप बहुत अच्छा कर रही हैं।",
    speak_watch_sequence: "क्रम को ध्यान से देखें। जब आप तैयार हों, तब 'मैं तैयार हूँ' पर दबाएं।",
    speak_repeat_sequence: "वस्तुओं को उसी क्रम में छुएं।",
    speak_sequence_success: "शानदार क्रम स्मृति! बहुत खूब।",
    speak_sequence_try: "सराहनीय प्रयास! अपनी गति से अभ्यास करते रहें।",
    speak_what_object: "यह क्या चीज़ है? बटन दबाएं या अपना उत्तर बोलें।",
    speak_correct_object: "बिल्कुल सही! बहुत बढ़िया!",
    speak_try_object: "अच्छा प्रयास था!",
    speak_reminders: "यहाँ आपकी दैनिक दवाइयाँ और पानी पीने की सूची है।",
    speak_reminder_done: "बहुत बढ़िया! आपकी दवाई का समय पूरा दर्ज कर लिया गया है।",
    speak_memories: "यहाँ आपके परिवार और प्रियजनों की प्यारी यादें हैं।",
    speak_home_nav: "अपने घर की दिशा में उत्तर की ओर चलें, या बेटे राहुल को कॉल करने के लिए बटन दबाएं।",
    speak_lang_switched: "भाषा और आवाज़ हिन्दी में बदल दी गई है।",
    voice_guide_on: "आवाज़ मार्गदर्शन चालू कर दिया गया है। किसी भी विकल्प पर माउस ले जाकर उसकी जानकारी सुनें।",
    voice_guide_off: "आवाज़ मार्गदर्शन बंद कर दिया गया है।",
    
    // Voice Assistant Screen
    voice_listening: "सुन रहे हैं... कृपया अपना उत्तर बोलें",
    voice_start_msg: "नमस्ते शर्मा जी। आप क्या करना चाहती हैं? आप कह सकती हैं: खेल, यादें, दवाइयाँ, या घर चलो।",
    
    // Home Finder
    home_heading: "मुझे घर ले चलें",
    home_distance_prefix: "घर की दूरी:",
    call_caregiver: "राहुल (बेटा) को कॉल करें",
    call_caregiver_sub: "सीधे बेटे राहुल से फोन पर बात करें",
    open_map_directions: "नक्शा और रास्ता देखें",
    open_map_sub: "अपने घर तक का रास्ता देखें",
    home_address_label: "आपका घर का पता:",
    safe_return: "सुरक्षित वापसी",
    located_msg: "मेमोरा ने आपकी स्थिति का पता लगा लिया है।",
    walk_north_hint: "भरलमुख की ओर मुख्य सड़क पर उत्तर दिशा में चलें",
    
    // Reminders Screen
    reminders_heading: "आज की दवाइयाँ और दिनचर्या",
    took_it_btn: "मैंने ले ली!",
    done_btn_label: "✓ पूर्ण हुआ",
    
    // Memories Screen
    memories_heading: "आपके अपने और प्यारी यादें"
  },

  as: {
    // North-Eastern Region India - Assamese Language Pack
    greeting: "শুভ প্ৰভাত, শৰ্মা বাইদেউ 👋",
    greeting_sub: "আজিৰ আপোনাৰ কাৰ্যসূচী:",
    session_status: "মস্তিষ্কৰ খেল",
    session_not_done: "বাকী আছে",
    session_done: "সম্পূৰ্ণ হ'ল ✓",
    med_status: "ঔষধ",
    med_next: "পৰৱৰ্তী: ২:০০ বজাত",
    hydro_status: "পানী খোৱা",
    hydro_next: "পৰৱৰ্তী: ৩:০০ বজাত",
    
    // Main Buttons
    btn_games: "মস্তিষ্কৰ খেল খেলক",
    btn_games_sub: "স্মৃতিশক্তি সতেজ ৰখাৰ সহজ খেল",
    btn_memories: "মোৰ স্মৃতিসমূহ",
    btn_memories_sub: "পৰিয়ালৰ আপোন মানুহবোৰৰ ছবি",
    btn_reminders: "মোৰ স্মাৰক তালিকা",
    btn_reminders_sub: "ঔষধ, পানী আৰু দৈনিক কাৰ্যসূচী",
    btn_home: "মোৰ ঘৰ বিচাৰক",
    btn_home_sub: "ঘৰলৈ সহজে উভতি যোৱাৰ উপায়",
    btn_voice: "কণ্ঠ সহায়িকা",
    btn_voice_sub: "কথাৰে নিৰ্দেশ দিয়ক",
    
    // Game Titles & Descriptions
    game1_title: "বস্তু মনত ৰখা খেল",
    game1_desc: "বস্তুবোৰ চাই মনত ৰাখক আৰু বাছক",
    game2_title: "ক্ৰমিক পুনৰাবৃত্তি",
    game2_desc: "শৃংখলাবদ্ধভাৱে বাছক",
    game3_title: "বস্তু চিনাক্তকৰণ",
    game3_desc: "চিনাকি দৈনন্দিন সামগ্ৰী চিনক",
    choose_activity: "এটা খেল বাছক",
    
    // Game Instructions
    look_carefully: "এই বস্তুবোৰ মনোযোগেৰে চাওক!",
    look_carefully_sub: "বস্তুবোৰ মনত ৰাখক। ৫ চেকেণ্ডত লুকুৱাই দিয়া হ'ব!",
    which_did_you_see: "আপুনি কি কি বস্তু দেখিলে? তলত স্পৰ্শ কৰক।",
    which_did_you_see_sub: "মনত থকা বস্তুবোৰ বাছক।",
    check_my_answers: "উত্তৰ পৰীক্ষা কৰক",
    watch_sequence: "ক্ৰমটো মন কৰক...",
    watch_sequence_sub: "বাওঁফালৰ পৰা সোঁফাললৈ ক্ৰমটো মনত ৰাখক।",
    ready_to_repeat: "মই পুনৰাবৃত্তি কৰিবলৈ সাজু!",
    ready_to_repeat_sub: "ক্ৰম মনত ৰখাৰ পৰীক্ষা কৰিবলৈ স্পৰ্শ কৰক",
    repeat_sequence: "এতিয়া একে ক্ৰমত স্পৰ্শ কৰক!",
    tapped_sequence_hint: "আপুনি বাছি লোৱা ক্ৰম ইয়াত দেখা যাব",
    clear_btn: "মচি পেলাওক",
    done_btn: "হ'ল",
    what_is_this: "এইটো কি বস্তু?",
    what_is_this_sub: "তলৰ চিনাকি বস্তুটো চাওক আৰু তাৰ নাম বাছক।",
    
    // Feedback & Results
    well_done: "বৰ সুন্দৰ! অতি উত্তম!",
    good_try: "ভাল চেষ্টা! আকৌ এবাৰ চেষ্টা কৰোঁ আহক।",
    score_label: "সঠিকতা",
    next_level_prefix: "পৰৱৰ্তী খণ্ডৰ স্তৰ",
    play_again: "আকৌ খেলক",
    back_to_home: "ঘৰলৈ উভতি যাওক",
    next_object: "পৰৱৰ্তী বস্তু",
    
    // Voice Spoken Prompts
    speak_greeting: "শুভ প্ৰভাত শৰ্মা বাইদেউ। আজিৰ আপোনাৰ কাৰ্যসূচী সাজু হৈছে। কোনো বিকল্পৰ বিষয়ে শুনিবলৈ তাত কাৰ্চাৰ নিয়ক।",
    speak_choose_game: "এটা খেল বাছক: বস্তু মনত ৰখা খেল, ক্ৰমিক পুনৰাবৃত্তি, বা বস্তু চিনাক্তকৰণ।",
    speak_look_carefully: "এই বস্তুবোৰ মনোযোগেৰে চাওক আৰু মনত ৰাখক।",
    speak_which_objects: "আপুনি কি কি বস্তু দেখিলে? স্ক্ৰীনত বাছক বা মুখেৰে কওক।",
    speak_well_done: "বৰ সুন্দৰ! আপুনি অতি উত্তমভাৱে মনত ৰাখিলে।",
    speak_good_try: "ভাল চেষ্টা! এনেদৰেই চেষ্টা চলাই যাওক।",
    speak_watch_sequence: "ক্ৰমটো মন কৰক। যেতিয়া প্ৰস্তুত হ'ব, 'মই সাজু'ত স্পৰ্শ কৰক।",
    speak_repeat_sequence: "বস্তুবোৰ একে ক্ৰমত স্পৰ্শ কৰক।",
    speak_sequence_success: "বৰ সুন্দৰ ক্ৰমিক স্মৃতি! অতি উত্তম।",
    speak_sequence_try: "ভাল প্ৰয়াস! আপোনাৰ সুবিধা মতে অভ্যাস কৰক।",
    speak_what_object: "এইটো কি বস্তু? বুটাম স্পৰ্শ কৰক বা মুখেৰে কওক।",
    speak_correct_object: "একেবাৰে সঠিক! অতি উত্তম!",
    speak_try_object: "ভাল চেষ্টা আছিল!",
    speak_reminders: "ইয়াত আপোনাৰ দৈনিক ঔষধ আৰু পানী খোৱাৰ তালিকা আছে।",
    speak_reminder_done: "বৰ ভাল! আপোনাৰ কাৰ্যসূচী সম্পূৰ্ণ বুলি চিহ্নিত কৰা হ'ল।",
    speak_memories: "ইয়াত আপোনাৰ পৰিয়াল আৰু আপোন মানুহবোৰৰ স্মৃতি আছে।",
    speak_home_nav: "আপোনাৰ ঘৰৰ দিশে খোজ কাঢ়ক বা পুত্র ৰাহুলক ফোন কৰিবলৈ বুটাম স্পৰ্শ কৰক।",
    speak_lang_switched: "কণ্ঠ আৰু প্ৰদৰ্শন অসমীয়ালৈ সলনি কৰা হৈছে।",
    voice_guide_on: "কণ্ঠ নিৰ্দেশনা আৰম্ভ কৰা হৈছে। যিকোনো বিকল্পত মাউচ নি কথা শুনক।",
    voice_guide_off: "কণ্ঠ নিৰ্দেশনা বন্ধ কৰা হৈছে।",
    
    // Voice Assistant Screen
    voice_listening: "শুনি আছোঁ... আপোনাৰ উত্তৰ কওক",
    voice_start_msg: "নমস্কাৰ শৰ্মা বাইদেউ। আজি আপুনি কি কৰিব খোজে? কওক: খেল, স্মৃতি, বা ঘৰলৈ যাওঁ।",
    
    // Home Finder
    home_heading: "মোক ঘৰলৈ লৈ যাওক",
    home_distance_prefix: "ঘৰৰ দূৰত্ব:",
    call_caregiver: "ৰাহুলক (পুত্র) ফোন কৰক",
    call_caregiver_sub: "পোনপটীয়াকৈ পুত্ৰ ৰাহুললৈ ফোন কৰক",
    open_map_directions: "মানচিত্ৰ আৰু পথ চাওক",
    open_map_sub: "আপোনাৰ ঘৰলৈ যোৱাৰ পথ চাওক",
    home_address_label: "আপোনাৰ ঘৰৰ ঠিকনা:",
    safe_return: "নিৰাপদ প্ৰত্যাৱৰ্তন",
    located_msg: "মেমোৰাই আপোনাৰ অৱস্থান নিৰ্ণয় কৰিছে।",
    walk_north_hint: "ভৰলুমুখৰ মূল ৰাস্তাৰে উত্তৰ দিশলৈ খোজ কাঢ়ক",
    
    // Reminders Screen
    reminders_heading: "আজিৰ কাৰ্যসূচী আৰু ঔষধ",
    took_it_btn: "মই খালোঁ!",
    done_btn_label: "✓ হ'ল",
    
    // Memories Screen
    memories_heading: "আপোনাৰ আপোন মানুহ আৰু স্মৃতিসমূহ"
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  if (I18N_DATA[lang]) {
    currentLang = lang;
    updateUILocalizations();

    // Centralized synchronization with Voice Service
    if (window.VoiceService) {
      VoiceService.setLanguage(lang);
      // Speak confirmation in newly selected language
      VoiceService.speakKey('speak_lang_switched');
    }

    // Refresh current patient view so dynamic content and hover labels re-render in the new language
    if (window.PatientApp && PatientApp.renderCurrentScreen) {
      PatientApp.renderCurrentScreen();
    }
  }
}

function t(key) {
  return (I18N_DATA[currentLang] && I18N_DATA[currentLang][key]) || (I18N_DATA['en'] && I18N_DATA['en'][key]) || key;
}

function updateUILocalizations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Also update select input value if exists
  const select = document.querySelector('.lang-selector');
  if (select && select.value !== currentLang) {
    select.value = currentLang;
  }
}
