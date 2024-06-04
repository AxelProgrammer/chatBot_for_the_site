
const startVoiceInput = () => {
    const recognition = new webkitSpeechRecognition(); 
    recognition.lang = 'ru-RU';
    recognition.start(); 

    recognition.onresult = async (event) => { 
        const transcript = event.results[0][0].transcript; // Получаем распознанный текст
        const chatInput = document.getElementById('message'); 
        chatInput.value = transcript; 
    };

    recognition.onend = () => {
        recognition.stop(); // Останавливаем распознавание речи после завершения записи
    };
};

const voiceInputBtn = document.getElementById('voiceInputBtn');
voiceInputBtn.addEventListener('click', startVoiceInput);
