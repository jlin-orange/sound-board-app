// Audio factory function
function createAndPlayAudio(filePath) {
    const audio = new Audio(filePath);
    audio.play();
}

// Map button IDs to sound file paths
const soundMap = {
    'btn-oh': 'sounds/oh.wav',
    'btn-huh': 'sounds/huh.wav',
    'btn-villager': 'sounds/villager.wav',
    'btn-jabwhawha': 'sounds/jabwhawha.wav',
    'btn-cubs': 'sounds/cubs.wav',
    'btn-woof': 'sounds/woof.wav'
};

// Add event listeners for each button
Object.keys(soundMap).forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', () => {
            createAndPlayAudio(soundMap[id]);
        });
    }
});