import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2 //two animations frames for the dino
const FRAME_TIME = 100 //every frame of the animation should last 100ms


let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
export function setupDino() { //by default
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
  dinoElem.src = "imgs/dino-lose.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `imgs/dino-stationary.png` // set it to the stationary  
    return
  }
//if it is not jumping
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale //incrementing every time
}

function handleJump(delta) {
  if (!isJumping) return //if he is jumping

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false //once it touches the ground it is no longer jumping
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) { //an event listener every time you click on a key
  if (e.code !== "Space" || isJumping) return //if it is already pressed "space" and already jumping

  yVelocity = JUMP_SPEED
  isJumping = true
}
