let score = 0;
let currentLevel = 0;
let choicesMade = [];
let locked = false;

const levels = [
  {
    title: "Level 1: Material",
    description: "Choose what the shirt is made of:",
    options: [
      { text: "Cotton (+2)", effect: 2, desc: "High water use, natural fiber." },
      { text: "Polyester (+1)", effect: 1, desc: "Plastic-based, microplastics." },
      { text: "Recycled (+3)", effect: 3, desc: "Lowest environmental impact." }
    ]
  },
  {
    title: "Level 2: Production",
    description: "How is it made?",
    options: [
      { text: "Fast Fashion (+1)", effect: 1, desc: "Cheap labor, high pollution." },
      { text: "Ethical (+3)", effect: 3, desc: "Fair wages, cleaner production." }
    ]
  },
  {
    title: "Level 3: Transport",
    description: "Shipping method?",
    options: [
      { text: "Airplane (+1)", effect: 1, desc: "Fast but high emissions." },
      { text: "Ship (+3)", effect: 3, desc: "Slower but eco-friendly." }
    ]
  },
  {
    title: "Level 4: Buying",
    description: "Shopping style?",
    options: [
      { text: "Fast Fashion (+1)", effect: 1, desc: "Overconsumption." },
      { text: "Quality (+2)", effect: 2, desc: "Longer lasting clothes." },
      { text: "Thrifted (+3)", effect: 3, desc: "No new production." }
    ]
  },
  {
    title: "Level 5: Use",
    description: "How is it used?",
    options: [
      { text: "Rarely Worn (+1)", effect: 1, desc: "High waste per use." },
      { text: "Regular (+2)", effect: 2, desc: "Better lifespan." },
      { text: "Repaired (+3)", effect: 3, desc: "Extends clothing life." }
    ]
  },
  {
    title: "Level 6: End of Life",
    description: "What happens next?",
    options: [
      { text: "Thrown Away (+1)", effect: 1, desc: "Landfill waste." },
      { text: "Donated (+2)", effect: 2, desc: "Reused by others." },
      { text: "Upcycled (+3)", effect: 3, desc: "Transformed into new items." }
    ]
  }
];

function loadLevel() {
  if (currentLevel >= levels.length) {
    showResults();
    return;
  }

  locked = false;

  const level = levels[currentLevel];

  const title = document.getElementById("title");
  const desc = document.getElementById("description");
  const choices = document.getElementById("choices");

  title.innerText = level.title;
  desc.innerText = level.description;
  choices.innerHTML = "";

  level.options.forEach(option => {
    const btn = document.createElement("button");

    btn.innerText = option.text;

    btn.onclick = () => {
      if (locked) return;
      locked = true;
      handleChoice(option);
    };

    choices.appendChild(btn);
  });
}

function handleChoice(option) {
  score += option.effect;
  choicesMade.push(option);

  updateMeter();

  document.getElementById("choices").innerHTML = `
    <p><strong>You chose:</strong> ${option.text}</p>
    <p>${option.desc}</p>
    <p><strong>Impact:</strong> +${option.effect}</p>
    <button onclick="nextLevel()">Next ➡️</button>
  `;
}

function nextLevel() {
  currentLevel++;

  if (currentLevel >= levels.length) {
    showResults();
    return;
  }

  loadLevel();
}

function updateMeter() {
  const meter = document.getElementById("meterFill");
  if (!meter) return;

  const percent = Math.min((score / 18) * 100, 100);
  meter.style.width = percent + "%";
}

function showResults() {
  const title = document.getElementById("title");
  const desc = document.getElementById("description");
  const choices = document.getElementById("choices");

  let result =
    score <= 8 ? "High Environmental Impact ❌" :
    score <= 13 ? "Medium Impact ⚠️" :
    "Low Environmental Impact 🌱";

  let personality =
    score <= 8 ? "Fast Fashion Consumer ⚡" :
    score <= 13 ? "Balanced Shopper ⚖️" :
    "Sustainable Fashion Hero 🌍";

  let breakdown = choicesMade.map(c =>
    `<p><strong>${c.text}</strong>: ${c.desc}</p>`
  ).join("");

  title.innerText = "Final Results";

  desc.innerHTML = `
    <h2>${result}</h2>
    <h2>${personality}</h2>
    <p><strong>Total Score:</strong> ${score}</p>

    <h3>Your Journey</h3>
    ${breakdown}

    <button onclick="location.reload()">Play Again 🔁</button>
  `;

  choices.innerHTML = "";
}

loadLevel();