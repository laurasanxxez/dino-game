import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const groundElems = document.querySelectorAll("[data-ground]")

export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0) //get the first property and set it to zero
  setCustomProperty(groundElems[1], "--left", 300)//the second ground element ; 300: because the width is 300%
}

export function updateGround(delta, speedScale) { //speedscale: value increases
  groundElems.forEach(ground => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1) // an amount based on the scale of delta and the speed

    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600)
    } //if the ground moves off the edge of the screen: loops
  })
}
