let score = 0;
let currentLevel = 0;
let choicesMade = [];

const levels = [
  {
    title: "Level 1: Material",
    description: "Choose what the shirt is made of:",
    options: [
      {
        text: "Cotton (+2)",
        effect: 2,
        desc: "Cotton is natural but uses lots of water and land."
      },
      {
        text: "Polyester (+1)",
        effect: 1,
        desc: "Made from fossil fuels and releases microplastics."
      },
      {
        text: "Recycled Fabric (+3)",
        effect: 3,
        desc: "Reuses materials and reduces waste significantly."
      }
    ]
  },
  {
    title: "Level 2: Production",
    description: "How is the shirt made?",
    options: [
      {
        text: "Fast Fashion (+1)",
        effect: 1,
        desc: "Cheap production, unsafe labor, high pollution."
      },
      {
        text: "Ethical Production (+3)",
        effect: 3,
        desc: "Fair wages and lower environmental impact."
      }
    ]
  },
  {
    title: "Level 3: Transport",
    description: "How is it transported?",
    options: [
      {
        text: "Airplane (+1)",
        effect: 1,
        desc: "Fast but very high carbon emissions."
      },
      {
        text: "Ship (+3)",
        effect: 3,
        desc: "Slower but much lower emissions."
      }
    ]
  },
  {
    title: "Level 4: Buying",
    description: "How do you buy it?",
    options: [
      {
        text: "Fast Fashion (+1)",
        effect: 1,
        desc: "Encourages overbuying and waste."
      },
      {
        text: "Buy Fewer Quality Items (+2)",
        effect: 2,
        desc: "Longer-lasting clothes reduce waste."
      },
      {
        text: "Thrifted (+3)",
        effect: 3,
        desc: "No new production required."
      }
    ]
  },
  {
    title: "Level 5: Use",
    description: "How is it used?",
    options: [
      {
        text: "Rarely Worn (+1)",
        effect: 1,
        desc: "Short lifespan increases waste."
      },
      {
        text: "Regularly Worn (+2)",
        effect: 2,
        desc: "Better cost per wear."
      },
      {
        text: "Repaired/Restyled (+3)",
        effect: 3,
        desc: "Extends life and reduces waste."
      }
    ]
  },
  {
    title: "Level 6: End of Life",
    description: "What happens to it?",
    options: [
      {
        text: "Thrown Away (+1)",
        effect: 1,
        desc: "Ends up in landfill and pollutes."
      },
      {
        text: "Donated (+2)",
        effect: 2,
        desc: "Gives clothing a second life."
      },
      {
        text: "Upcycled (+3)",
        effect: 3,
        desc: "Transforms into something new, minimal waste."
      }
    ]
  }
];

function loadLevel() {
  const level = levels[currentLevel];

  document.getElementById("title").innerText = level.title;
  document.getElementById("description").innerText = level.description;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  level.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option.text;

    btn.onclick = () => handleChoice(option);

    choicesDiv.appendChild(btn);
  });
}

function handleChoice(option) {
  score += option.effect;
  choicesMade.push(option);

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

function showResults() {
  let rating = "";

  if (score <= 8) rating = "High Environmental Impact ❌";
  else if (score <= 13) rating = "Medium Impact ⚠️";
  else rating = "Low Environmental Impact ✅";

  let breakdown = choicesMade.map(c =>
    `<p><strong>${c.text}</strong>: ${c.desc}</p>`
  ).join("");

  document.querySelector(".game-box").innerHTML = `
    <h1>Final Results</h1>
    <h2>${rating}</h2>
    <p><strong>Total Score:</strong> ${score}</p>

    <h3>Your Choices:</h3>
    ${breakdown}

    <p>
      This shows how every stage—from material to disposal—impacts the environment.
    </p>
  `;
}

// start game
loadLevel();