// Activity 1 Data
const words = [
    { eng: "Fever", correct: "Fiebre", wrong: ["Dolor", "Calor"] },
    { eng: "Sick", correct: "Enfermo", wrong: ["Cansado", "Débil"] },
    { eng: "To heal", correct: "Sanar", wrong: ["Curar", "Mejorar"] },
    { eng: "Disease", correct: "Enfermedad", wrong: ["Malestar", "Dolor"] },
    { eng: "To pray", correct: "Orar", wrong: ["Pedir", "Rogar"] },
    { eng: "Quiet place", correct: "Lugar tranquilo", wrong: ["Sitio callado", "Zona silenciosa"] }
];

// Activity 2 Data
const sentences = [
    { subject: "He", verb: "stand", rest: "by the door" },
    { subject: "They", verb: "look", rest: "at the sky" },
    { subject: "She", verb: "go", rest: "to school" },
    { subject: "I", verb: "help", rest: "my friend" },
    { subject: "We", verb: "begin", rest: "the class" },
    { subject: "You", verb: "leave", rest: "the house" },
    { subject: "It", verb: "pray", rest: "for rain" },
    { subject: "You", verb: "wait", rest: "for the bus" }
];

let currentWordIndex = 0;
let score = 0;

// Initialize activities
window.onload = function() {
    showWord();
    createSentences();
};

// Activity 1 Functions
function showWord() {
    const word = words[currentWordIndex];
    document.getElementById('current-word').textContent = word.eng;
    
    const options = [...word.wrong, word.correct];
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(option, word.correct);
        container.appendChild(button);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) score++;
    currentWordIndex++;
    
    if (currentWordIndex < words.length) {
        showWord();
    } else {
        document.getElementById('score').textContent = 
            `Final Score: ${score}/${words.length}`;
        currentWordIndex = 0;
        score = 0;
    }
}

// Activity 2 Functions
function createSentences() {
    const container = document.getElementById('sentences-container');
    sentences.forEach((sentence, index) => {
        const div = document.createElement('div');
        div.className = 'sentence-item';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'sentence-input';
        input.placeholder = 'Type was/were + verb+ing';
        
        const text = document.createElement('span');
        text.textContent = `${sentence.subject} _____ ${sentence.rest}`;
        
        const playBtn = document.createElement('button');
        playBtn.className = 'play-btn';
        playBtn.textContent = '🔊';
        playBtn.onclick = () => speak(`${sentence.subject} was ${sentence.verb}ing ${sentence.rest}`);
        
        div.appendChild(text);
        div.appendChild(input);
        div.appendChild(playBtn);
        container.appendChild(div);
    });
}

function checkSentences() {
    let correct = 0;
    const inputs = document.querySelectorAll('.sentence-input');
    
    inputs.forEach((input, index) => {
        const sentence = sentences[index];
        const expectedVerb = `${sentence.subject === 'He' || sentence.subject === 'She' || sentence.subject === 'It' ? 'was' : 'were'} ${sentence.verb}ing`;
        if (input.value.toLowerCase().trim() === expectedVerb.toLowerCase()) {
            correct++;
            input.style.backgroundColor = '#dff0d8';
        } else {
            input.style.backgroundColor = '#f2dede';
        }
    });

    document.getElementById('sentences-score').textContent = 
        `Score: ${correct}/${sentences.length} correct`;
}

document.getElementById('check-sentences').addEventListener('click', checkSentences);

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}
