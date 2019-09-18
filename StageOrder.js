// Element references to build stage objects
const messageBox = document.querySelector("#msg-box");
const messageText = document.querySelector("#msg-text");
const nextBtn = document.querySelector("#next");
const sortBox = document.querySelector("#sort-box");
const sortArea = document.querySelector("#sorting");
const sortText = Array.from(document.querySelectorAll("#sorting .option"));
const submitBtn = document.querySelector("#submit");
let frontFace = document.querySelector(".face.front");
let backFace = document.querySelector(".face.back");
let frontDoors = Array.from(document.querySelectorAll(".face.front .door"));
let frontDoorTexts = Array.from(
  document.querySelectorAll(".face.front .door span")
);
let backDoors = Array.from(document.querySelectorAll(".face.back .door"));
let backDoorTexts = Array.from(
  document.querySelectorAll(".face.back .door span")
);
const balloon = document.querySelector("#balloon");
const balloonTitle = document.querySelector("#balloon h1");
const balloonText = document.querySelector("#balloon p");
const cover = document.querySelector("#cover");

const stage = document.querySelector("#stage");

// Stage objects
const coverObj = new Cover(cover);
const messageBoxObj = new MessageBox(messageBox, messageText, nextBtn);
const sortBoxObj = new SortBox(sortBox, sorting, sortText, submitBtn);
let frontDoorsObj = frontDoors.map(
  (door, i) => new Door(door, frontDoorTexts[i])
);
let backDoorsObj = backDoors.map((door, i) => new Door(door, backDoorTexts[i]));
let frontFaceObj = new Face(frontFace, frontDoorsObj);
let backFaceObj = new Face(backFace, backDoorsObj);
const balloonObj = new Balloon(balloon, balloonTitle, balloonText);

function setupData() {
  points = dataPoints.map(
    (dataPoint, index) =>
      new Point(index, [
        dataPoint.reliability,
        dataPoint.title_obj,
        dataPoint.text_obj
      ])
  );
}

function setupRoutes() {
  let noOfRoutes = points[0].position.length;
  for (let i = 0; i < noOfRoutes; i++) {
    let sorted = points
      .slice()
      .sort((p1, p2) => p1.position[i] - p2.position[i]);
    for (let j = 0; j < sorted.length - 1; j++) {
      let src = sorted[j].id;
      let des = sorted[j + 1].id;
      points[src].options.push(des);
      points[des].options.push(src);
    }
  }
}

function nextStage() {
  currentStage++;
  operations[currentStage]();
}

function getSortBoxResult() {
  let options = Array.from(document.querySelectorAll("#sorting .option"));
  let result = options.map(box => parseInt(box.textContent));
  return result.slice();
}

function sendData(timestamp, stage, data, next) {
  let toSend = {
    timestamp: timestamp,
    stage: stage,
    data: data.slice()
  };
  db.collection("operations")
    .add(toSend)
    .then(function(docRef) {
      next(docRef);
    })
    .catch(function(error) {
      alert(
        `Error adding document: ${error} Please email haorui2.lyu@live.uwe.ac.uk with error message`
      );
    });
}

function hoverDoor(e, id) {
  let point = dataPoints[id];
  balloonObj.setContent(point.title, point.text);
  balloonObj.show();
}

function leaveDoor(e, id) {
  let mouse = { x: e.clientX, y: e.clientY };
  let rect = balloonObj.ref.getBoundingClientRect();
  if (!inRect(mouse, rect)) {
    balloonObj.hide();
  }
}

function openDoor(e, id) {
  let toOpen = frontDoorsObj.find(door => door.ref === e.target);
  toOpen.open(openAction(id, progress), postOpenAction);
}

function openAction(id, target) {
  return function() {
    updateState(id, target);
    balloonObj.hide();
    frontFaceObj.disableClick();
    frontFaceObj.disableHover();
    if (currentLocation === WINTERM) {
      operations[27]();
    }
  };
}

function postOpenAction() {
  frontFaceObj.moveOut();
  backFaceObj.moveForward(() => {
    makeNewFaces();
    if (currentLocation !== WINTERM) {
      frontFaceObj.enableClick(openDoor);
      frontFaceObj.enableHover(hoverDoor, leaveDoor);
    }
  });
}

function inRect(point, rect) {
  return (
    point.x - rect.x < rect.width &&
    point.x - rect.x > 0 &&
    point.y - rect.y < rect.height &&
    point.y - rect.y > 0
  );
}

function makeNewFaces() {
  stage.removeChild(frontFaceObj.ref);
  frontFaceObj = backFaceObj;
  frontDoors = backDoors.slice();
  frontDoorsObj = backDoorsObj;

  let newFace = document.createElement("div");
  newFace.classList.add("face");
  newFace.classList.add("back");
  newDoors = [];
  newDoorTexts = [];
  for (let i = 0; i < 6; i++) {
    let newDoor = document.createElement("div");
    newDoor.classList.add("door");
    let newDoorText = document.createElement("span");
    newDoor.appendChild(newDoorText);
    newDoors.push(newDoor);
    newDoorTexts.push(newDoorText);
    newFace.appendChild(newDoor);
  }
  stage.appendChild(newFace);

  backFace = newFace;
  backDoors = newDoors.slice();
  backDoorTexts = newDoorTexts.slice();
  backDoorsObj = backDoors.map((door, i) => new Door(door, backDoorTexts[i]));
  backFaceObj = new Face(backFace, backDoorsObj);

  console.log(frontFaceObj);
  console.log(backFaceObj);
}

function updateState(location, target) {
  target.push(location);
  currentLocation = location;
  currentOptions = points[location].options.slice();
  backFaceObj.setContents(currentOptions);
  console.log("Calculate distance from points[location] to each noise point");
  console.log("Update volume of each noise source");
}
