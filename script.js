const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    // Obter lista de vozes disponíveis
    const voices = window.speechSynthesis.getVoices();

    // Selecionar a voz desejada - neste caso, a voz em português
    const voice = voices.find(voice => voice.lang === 'pt-BR');
    text_speak.voice = voice;

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Bom dia...");
    } else if (hour >= 12 && hour < 17) {
        speak("Boa tarde...");
    } else {
        speak("Boa noite...");
    }
}

// Quando a página é carregada, inicializa o assistente virtual DEV
window.addEventListener('load', () => {
    speak("Inicializando o sistema...");
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
    if (message.includes('dev') || message.includes('hello')) {
        speak("Fala irmão, como posso ajudar?");
    } else if (message.includes("abrir google")) {
        window.open("https://google.com", "_blank");
        speak("Abrindo o Google...");
    } else if (message.includes("abrir instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        speak("Abrindo o instagram");
    } else if (message.includes("meu portal")) {
        window.open("https://aluno.sereduc.com/", "_blank");
        speak("Aqui está o seu portal do aluno");
    }else if (message.includes("tô gastando muito")) {
        window.open("https://aibfinance.com.br", "_blank");
        speak("Abrindo o gerenciador financeiro");
     } else if (message.includes("abrir youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Abrindo Youtube...");
    } else if (message.includes("abrir github")) {
        window.open("https://github.com/", "_blank");
        speak("Abrindo Github...");
    } else if (message.includes("abrir chat")) {
        window.open("https://chat.openai.com/", "_blank");
        speak("Abrindo o ChatGpt...");
    } else if (message.includes("abrir o facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Abrindo o Facebook...");
    } else if (message.includes("meus projetos")) {
        window.open("https://inojoza28.github.io/CG/", "_blank");
        speak("Ok...");
    } else if (message.includes("abrir gmail")) {
        window.open("https://gmail.com", "_blank");
        speak("Ok...");
    } else if (message.includes("bloco de notas")) {
        window.open("https://pt.anotepad.com/", "_blank");
        speak("Abrindo o bloco de notas...");
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
     } else if (message.includes('código') || message.includes('Visual Studio Code')) {
        window.location.href = 'vscode://';
        const finalText = "Abrindo o Visual Studio";
        speak(finalText);
    } else if (message.includes("obrigado por hoje")) {
        speak("Foi um prazer, Até logo!");
        setTimeout(() => {
            window.close(); // Fecha a aba
        }, 4000); // Fecha a aba após 4 segundos
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Pesquisando sobre " + message + " no Google";
        speak(finalText);
    }
}
