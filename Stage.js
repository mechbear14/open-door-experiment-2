let currentLine = 12;
// let currentStage = 0;

let points = [];
let currentLocation = 0;
let currentOptions = [];

let preTest = [];
let progress = [];
let postTest = [];

const WINTERM = 139;
let timeout = 0;

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
    // 0
    sessionStorage.setItem("open_door_start_time", Date.now());
    messageBoxObj.setAction(nextStage);
    messageBoxObj.setMessage(messages[currentLine]);
    messageBoxObj.show();
    currentLine++;
  },
  () => {
    // 1
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 2
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 3
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 4
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 5
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 6
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 7
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 8
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 9
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 10
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 11
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 12
    messageBoxObj.show(); // Debug purpose
    messageBoxObj.setMessage(messages[currentLine]);
    messageBoxObj.setAction(() => {
      messageBoxObj.hide();
      currentLine++;
      nextStage();
    });
  },
  () => {
    // 13
    setupData();
    setupRoutes();
    currentLocation = 0;
    currentOptions = points[0].options.slice();
    sortBoxObj.init();
    frontFaceObj.setContents(currentOptions);
    coverObj.fadeOut(() => {
      messageBoxObj.setMessage(messages[currentLine]);
      messageBoxObj.setAction(nextStage);
      messageBoxObj.show();
      currentLine++;
    });
  },
  () => {
    // 14
    messageBoxObj.setMessage(messages[currentLine]);
    frontFaceObj.enableHover(hoverDoor, leaveDoor);
    currentLine++;
  },
  () => {
    // 15
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 16
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 17
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 18
    messageBoxObj.setMessage(messages[currentLine]);
    messageBoxObj.setAction(() => {
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
        currentLine++;
        nextStage();
      });
      messageBoxObj.hide();
      sortBoxObj.show();
    });
  },
  () => {
    // 19
    frontFaceObj.disableHover();
    frontFaceObj.disableClick();
    messageBoxObj.setMessage(`${messages[currentLine]} ${currentLocation}`);
    messageBoxObj.setAction(nextStage);
    messageBoxObj.show();
    sortBoxObj.hide();
    currentLine++;
  },
  () => {
    // 20
    messageBoxObj.hide();
    let toOpen = frontFaceObj.contents.find(
      door => door.dataId === currentLocation
    );
    toOpen.open(openAction(toOpen.dataId, progress), () => {
      postOpenAction();
      frontFaceObj.disableHover();
      frontFaceObj.disableClick();
      messageBoxObj.setMessage(messages[currentLine]);
      messageBoxObj.show();
      currentLine++;
    });
  },
  () => {
    // 21
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 22
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 23
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 24
    messageBoxObj.setMessage(messages[currentLine]);
    messageBoxObj.setAction(() => {
      frontFaceObj.enableHover(hoverDoor, leaveDoor);
      frontFaceObj.enableClick(openDoor);
      messageBoxObj.hide();
      timeout = window.setTimeout(operations[30], 60000);
      currentLine++;
    });
  },
  () => {
    // 25
    messageBoxObj.setAction();
    // sendData(
    //   sessionStorage.getItem("open_door_start_time"),
    //   "progress",
    //   progress,
    //   () => {
    currentLine = 25;
    console.log(progress);
    window.clearTimeout(timeout);
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
    messageBoxObj.setAction(nextStage);
    messageBoxObj.show();
    //   }
    // );
  },
  () => {
    // 26
    coverObj.fadeIn(() => {
      currentLocation = 0;
      currentOptions = points[0].options.slice();
      frontFaceObj.setContents(currentOptions);
    });
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 27
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 28
    coverObj.fadeOut();
    messageBoxObj.setMessage(messages[currentLine]);
    messageBoxObj.setAction(() => {
      sortBoxObj.setOptions(currentOptions);
      frontFaceObj.enableHover(hoverDoor, leaveDoor);
      sortBoxObj.setAction(() => {
        let result = getSortBoxResult();
        // currentLocation = result[0];
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
        frontFaceObj.disableHover();
        currentLine++;
        nextStage();
      });
      messageBoxObj.hide();
      sortBoxObj.show();
    });
  },
  () => {
    // 29
    sortBoxObj.hide();
    messageBoxObj.setMessage(messages[currentLine]);
    messageBoxObj.setAction(() => {
      messageBoxObj.hide();
      coverObj.fadeIn(() => {
        currentLine++;
        location = "ux.html";
      });
    });
    messageBoxObj.show();
  },
  () => {
    // 30
    currentLine = 30;
    frontFaceObj.disableClick();
    frontFaceObj.disableHover();
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
    messageBoxObj.setAction(nextStage);
    messageBoxObj.show();
  },
  () => {
    // 31
    coverObj.fadeIn(() => {
      currentLocation = 0;
      currentOptions = points[0].options.slice();
      frontFaceObj.setContents(currentOptions);
    });
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 32
    messageBoxObj.setMessage(messages[currentLine]);
    currentLine++;
  },
  () => {
    // 33
    coverObj.fadeOut();
    messageBoxObj.setMessage(messages[currentLine]);
    messageBoxObj.setAction(() => {
      sortBoxObj.setOptions(currentOptions);
      frontFaceObj.enableHover(hoverDoor, leaveDoor);
      sortBoxObj.setAction(() => {
        let result = getSortBoxResult();
        // currentLocation = result[0];
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
        frontFaceObj.disableHover();
        currentLine++;
        nextStage();
      });
      messageBoxObj.hide();
      sortBoxObj.show();
    });
  },
  () => {
    // 34
    sortBoxObj.hide();
    messageBoxObj.setMessage(messages[currentLine]);
    messageBoxObj.setAction(() => {
      coverObj.fadeIn(() => {
        location = "ux.html";
        currentLine++;
      });
    });
    messageBoxObj.show();
  }
];

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", function(e) {
  operations[currentLine]();
  const stage = document.getElementById("stage");
  stage.removeChild(startBtn);
});

messageBoxObj.hide();
sortBoxObj.hide();
balloonObj.hide();
