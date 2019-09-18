class Question {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }
  render(parent) {
    let questionBox = document.createElement("div");
    questionBox.classList.add("question");
    let questionText = document.createElement("span");
    questionText.textContent = this.text;
    let optionBox = document.createElement("div");
    optionBox.classList.add("options");
    for (let i = 0; i < 6; i++) {
      let newOption = document.createElement("input");
      newOption.id = `q${this.id}-${i}`;
      newOption.setAttribute("type", "radio");
      newOption.setAttribute("name", `q${this.id}`);
      newOption.setAttribute("value", `${i}`);
      let button = document.createElement("label");
      button.setAttribute("for", `q${this.id}-${i}`);
      button.textContent = i;
      optionBox.append(newOption);
      optionBox.append(button);
    }
    questionBox.appendChild(questionText);
    questionBox.appendChild(optionBox);
    parent.insertBefore(questionBox, document.getElementById("submit"));
  }
}

const questions = [
  `Cleeve's story about singing with lions and rabbits is childish`,
  `I understand Cleeve's story about hearing angry statements rather than analysing`,
  `Cleeve's reaction to the slam is understandable`,
  `The comparison of "search results" to "doors" with unknown outcome is appropriate`,
  `There are too many irrelavant articles in the game`,
  `In the game, I read most contents of an article before I made a decision`,
  `Balloons were too small for me to read the article`,
  `I think it would be easier if the URL or the source of an article is given`,
  `I feel like I'm making random guesses in the game`,
  `I need more straightforward guidance on how to succeed in this game`,
  `The language used in the game feels awkward`,
  `As I played the game, I could hear the volumes of sounds changing`,
  `I think the music in this game needs improving`,
  `I'd prefer it if the music had words associated with what was happening`,
  `I like the idea conveyed in this game`,
  `I like the dual-tone visual style in this game`,
  `I like the music in this game`,
  `I get a rough feeling of what a trustworthy article would look like`,
  `Overall, I think this game is rather confusing and doesn't teach anything`
];

const questionRefs = [];
for (let i = 0; i < questions.length; i++) {
  questionRefs.push(new Question(questions[i], i));
}

for (let i = 0; i < questionRefs.length; i++) {
  questionRefs[i].render(document.getElementById("form"));
}

let form = document.getElementById("form");
form.onsubmit = function(e) {
  e.preventDefault();
  let data = new FormData(form);
  let result = [];
  for (let entry of data) {
    result.push(entry[1]);
  }
  if (result.length < questions.length) {
    alert("Please answer all the questions");
    return false;
  } else {
    let toSend = {
      timestamp: sessionStorage.getItem("open_door_start_time"),
      stage: "UXTest",
      data: result.slice()
    };
    console.log(toSend);
    location = "./thankyou.html";
  }
};
