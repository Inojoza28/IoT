const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Bom dia, chefe...");
    } else if (hour >= 12 && hour < 17) {
        speak("Boa tarde, mestre...");
    } else {
        speak("Boa noite, senhor...");
    }
}

// Quando a página é carregada, inicializa o assistente virtual JARVIS
window.addEventListener('load', () => {
    speak("Inicializando JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR'; // Define o idioma para português do Brasil

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

// Quando o botão 'talk' é clicado, inicia o reconhecimento de fala
btn.addEventListener('click', () => {
    content.textContent = "Ouvindo...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('oi') || message.includes('hello')) {
        speak("Opa carlos, como posso ajudar?");
    } else if (message.includes("abrir google")) {
        window.open("https://google.com", "_blank");
        speak("Abrindo o Google...");
    } else if (message.includes("mostre o lindo")) {
        window.open("https://www.instagram.com/carlos.gabriiel/", "_blank");
        speak("Abrindo o seu instagram, carlos gabriel");
    } else if (message.includes("abrir youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Abrindo Youtube...");
    } else if (message.includes("abrir o facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Abrindo o Facebook...");
    } else if (message.includes('o que é') || message.includes('quem é') || message.includes('o que são')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Aqui está o que eu encontrei na internet sobre " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://pt.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "Aqui está o que eu encontrei na Wikipedia sobre " + message;
        speak(finalText);
    } else if (message.includes('hora')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "A hora atual é " + time;
        speak(finalText);
    } else if (message.includes('data')) {
        const date = new Date().toLocaleString(undefined, { day: "numeric", month: "long", year: "numeric" });
        const finalText = "A data de hoje é " + date;
        speak(finalText);
    } else if (message.includes('calculadora')) {
        window.open('Calculator:///');
        const finalText = "Abrindo a calculadora";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Pesquisando sobre " + message + " no Google";
        speak(finalText);
    }
}
