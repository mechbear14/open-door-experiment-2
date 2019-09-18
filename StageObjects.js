class MessageBox {
  constructor(box, text, btn) {
    this.ref = box;
    this.textRef = text;
    this.btnRef = btn;
  }
  show() {
    this.ref.style.display = "flex";
  }
  hide() {
    this.ref.style.display = "none";
  }
  setMessage(msg) {
    this.textRef.textContent = msg;
  }
  setAction(action) {
    this.btnRef.onclick = action;
  }
}

class SortBox {
  constructor(box, sortArea, options, btn) {
    this.ref = box;
    this.sortAreaRef = sortArea;
    this.options = options.slice();
    this.btnRef = btn;
  }
  show() {
    this.ref.style.display = "flex";
  }
  hide() {
    this.ref.style.display = "none";
  }
  init() {
    $("#sorting").sortable();
  }
  setOptions(options) {
    this.options.forEach((optionBox, index) => {
      optionBox.textContent = options[index];
    });
  }
  setAction(action) {
    this.btnRef.onclick = action;
  }
}

class Cover {
  constructor(ref) {
    this.ref = ref;
    this.display = "block";
  }
  fadeOut(next) {
    this.ref.addEventListener("transitionend", e => {
      this.hide(e);
      next();
    });
    this.ref.style.opacity = 0;
  }
  fadeIn(next) {
    console.log("Roar");
    this.show({ target: this.ref });
    this.ref.addEventListener("transitionend", e => {
      next();
    });
    this.ref.style.opacity = 1;
  }
  show(e) {
    e.target.style.display = "block";
  }
  hide(e) {
    e.target.style.display = "none";
  }
}

class Face {
  constructor(ref, contents) {
    this.ref = ref;
    this.contents = contents.slice();
  }
  setContents(contents) {
    let c = contents.slice();
    for (let i = 0; i < this.contents.length; i++) {
      this.contents[i].bindData(c[i]);
    }
  }
  enableHover(listener, leaveListener) {
    this.contents.forEach(content => {
      if (content.dataId !== undefined) {
        content.enableHover(listener, leaveListener);
      }
    });
  }
  enableClick(listener) {
    this.contents.forEach(content => {
      content.enableClick(listener);
    });
  }
  disableHover() {
    this.contents.forEach(content => {
      content.disableHover();
    });
  }
  disableClick() {
    this.contents.forEach(content => {
      content.disableClick();
    });
  }
  moveForward(action) {
    if (this.ref.classList.contains("back")) {
      this.ref.addEventListener("transitionend", action, { once: true });
      this.ref.classList.add("front");
      this.ref.classList.remove("back");
    }
  }
  moveOut(action) {
    if (this.ref.classList.contains("front")) {
      this.ref.addEventListener("transitionend", action, { once: true });
      this.ref.classList.add("behind");
      this.ref.classList.remove("front");
    }
  }
}

class Door {
  constructor(ref, textRef, dataId) {
    this.ref = ref;
    this.textRef = textRef;
    this.dataId = dataId;
  }
  bindData(id) {
    this.dataId = id;
    this.textRef.textContent = id;
  }
  enableHover(listener, leaveListener = null) {
    this.ref.onmouseover = e => {
      listener(e, this.dataId);
    };
    this.ref.onmouseleave = e => {
      leaveListener(e, this.dataId);
    };
    this.ref.classList.add("hoverable");
  }
  enableClick(listener) {
    this.ref.onclick = e => {
      listener(e, this.dataId);
    };
  }
  disableHover() {
    this.ref.classList.remove("hoverable");
    this.ref.onmouseover = null;
    this.ref.onmouseleave = null;
  }
  disableClick() {
    this.ref.onclick = null;
  }
  open(action, postAction) {
    action();
    this.ref.addEventListener("transitionend", postAction, { once: true });
    this.ref.classList.add("open");
  }
}

class Balloon {
  constructor(ref, titleRef, textRef) {
    this.ref = ref;
    this.titleRef = titleRef;
    this.textRef = textRef;
  }
  setContent(title, text) {
    this.titleRef.textContent = title;
    this.textRef.textContent = text;
  }
  show() {
    this.ref.style.display = "flex";
  }
  hide() {
    this.ref.style.display = "none";
  }
}
