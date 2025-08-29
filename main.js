/* [SOUND FEATURE] */
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

[/* COUNTER FEATURE */]
document.querySelectorAll('.button-with-counter').forEach(group => {
    const button = group.querySelector('button');
    const counter = group.querySelector('.counter');

    button.addEventListener('click', () => {
        let count = parseInt(counter.textContent, 10);
        counter.textContent = count + 1;

        counter.style.backgroundColor = mapCountToMultiColor(count, colorStops);
    });


});

/* [COLOR INTERPOLATION FEATURE] */
const colorStops = [
  { value: 0,   color: "E5E4E2" }, // light silver
  { value: 25,   color: "50C878" }, // emerald green
  { value: 50,  color: "C3F34B" }, // bright lime green
  { value: 75, color: "C9A036" },  // satin sheen gold
  { value: 100, color: "FFD700 " }  // bright gold
];

function interpolateColor(color1, color2, factor) {
  const c1 = color1.match(/\w\w/g).map(x => parseInt(x, 16));
  const c2 = color2.match(/\w\w/g).map(x => parseInt(x, 16));

  const result = c1.map((c, i) => Math.round(c + (c2[i] - c) * factor));
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}

function mapCountToMultiColor(count, stops) {
  // `stops` is an array of { value, color }
  // Example: [{ value: 0, color: "cccccc" }, { value: 50, color: "00FF00" }, { value: 100, color: "FFD700" }]

  // clamp count into the min–max range (0 to 1)
  if (count <= stops[0].value) return `#${stops[0].color}`;
  if (count >= stops[stops.length - 1].value) return `#${stops[stops.length - 1].color}`;

  // find which two stops this count falls between
  for (let i = 0; i < stops.length - 1; i++) {
    const current = stops[i];
    const next = stops[i + 1];

    if (count >= current.value && count <= next.value) {
      const factor = (count - current.value) / (next.value - current.value);
      return interpolateColor(current.color, next.color, factor);
    }
  }
}