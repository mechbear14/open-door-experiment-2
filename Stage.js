let currentLine = 0;
let currentStage = 0;

let points = [];
let currentLocation = 0;
let currentOptions = [];

let preTest = [];
let progress = [];
let postTest = [];

const WINTERM = 139;

// Script
const messages = [
  `My name's Cleeve`,
  `I'm a bear, and I sing.`,
  `I sing with rabbits, as well as lions`,
  `And so I thought everyone likes music, and I started to write songs`,
  `Until one day, when I asked a polar bear if he liked my song`,
  `He slammed me. `, // slap
  `And said: `,
  `"What's the point of songwriting?`,
  `"Artifitial intelligence can write songs much better than yours!"`,
  `Though not frightened, I was confused.`,
  `I searched online, but all I saw was arguments.`,
  `And each result was like a labeled door. I knew what's inside, but not what's behind it`,
  `How I miss the days when people discuss and analyse ideas, rather than shouting.`,
  `These with numbers are doors.`,
  `You can hover over them to see what's inside.`,
  `Now, think about this.`,
  `Of these six doors, which can lead to a "good" article?`,
  `And by "good", I mean it looks like I can trust it.`,
  `Now if you rank the doors by the degree I can trust`,
  `OK. Now I open the door you think is most trustworthy, which is Door`,
  `It leads to another six doors`,
  `Remember, everything we did just now will have to happen in your mind.`,
  `From this point on, only click the most trustworthy door.`,
  `And I will open it and go anywhere it leads me.`,
  `I've got 10 minutes, and I trust your guidance.`,
  `And I think that's it.`,
  `I think I can start reading something about this now.`,
  `Although when I look back on this journey, the first six doors I saw`,
  `I wonder if I would give a different answer from that time.`,
  `Hmmm... Let's start from here.`,
  `Roar, I'm tired.`,
  `Why is it so hard to find that particular one?`,
  `Am I doing something wrong already?`,
  `If I could go back to the first six doors I saw`,
  `Hmmm...`
];

let operations = [
  () => {
    sessionStorage.setItem("open_door_start_time", Date.now());
    messageBoxObj.hide();
    sortBoxObj.hide();
    balloonObj.hide();
    messageBoxObj.setAction(nextStage);
    messageBoxObj.setMessage(messages[currentLine]);
    messageBoxObj.show();
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    messageBoxObj.hide();
    setupData();
    setupRoutes();
    currentLocation = 0;
    currentOptions = points[0].options.slice();
    sortBoxObj.init();
    frontFaceObj.setContents(currentOptions);
    coverObj.fadeOut(() => {
      currentLine++;
      messageBoxObj.setMessage(messages[currentLine]);
      messageBoxObj.show();
    });
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
    frontFaceObj.enableHover(hoverDoor, leaveDoor);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    sortBoxObj.setOptions(currentOptions);
    sortBoxObj.setAction(() => {
      let result = getSortBoxResult();
      currentLocation = result[0];
      preTest = result.slice();
      // sendData(
      //   sessionStorage.getItem("open_door_start_time"),
      //   "pre-test",
      //   result,
      //   docRef => {
      //     console.log("Document written with ID: ", docRef.id);
      //     nextLine();
      //   }
      // );
      nextStage();
    });
    messageBoxObj.hide();
    sortBoxObj.show();
  },
  () => {
    frontFaceObj.disableHover();
    frontFaceObj.disableClick();
    currentLine++;
    messageBoxObj.setMessage(`${messages[currentLine]} ${currentLocation}`);
    messageBoxObj.show();
    sortBoxObj.hide();
  },
  () => {
    messageBoxObj.hide();
    let toOpen = frontFaceObj.contents.find(
      door => door.dataId === currentLocation
    );
    toOpen.open(
      () => {
        updateState(toOpen.dataId, new Array());
        frontFaceObj.disableClick();
        frontFaceObj.disableHover();
      },
      () => {
        frontFaceObj.moveOut();
        backFaceObj.moveForward(() => {
          makeNewFaces();
          currentLine++;
          messageBoxObj.setMessage(messages[currentLine]);
          messageBoxObj.show();
        });
      }
    );
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    frontFaceObj.enableHover(hoverDoor, leaveDoor);
    frontFaceObj.enableClick(openDoor);
    messageBoxObj.hide();
  },
  () => {
    messageBoxObj.setAction();
    // sendData(
    //   sessionStorage.getItem("open_door_start_time"),
    //   "progress",
    //   progress,
    //   () => {
    console.log(progress);
    currentLine = 26;
    messageBoxObj.setMessage(messages[currentLine]);
    messageBoxObj.setAction(nextStage);
    messageBoxObj.show();
    //   }
    // );
  },
  () => {
    coverObj.fadeIn();
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    currentLine++;
    messageBoxObj.setMessage(messages[currentLine]);
  },
  () => {
    messageBoxObj.hide();
    frontFaceObj.enableHover(hoverDoor, leaveDoor);
    sortBoxObj.setOptions(currentOptions);
    sortBoxObj.setAction(() => {
      let result = getSortBoxResult();
      postTest = result.slice();
      // sendData(
      //   sessionStorage.getItem("open_door_start_time"),
      //   "post-test",
      //   result,
      //   docRef => {
      //     console.log("Document written with ID: ", docRef.id);
      //     nextLine();
      //   }
      // );
      nextStage();
    });
    sortBoxObj.show();
  },
  () => {}
];

operations[0]();
