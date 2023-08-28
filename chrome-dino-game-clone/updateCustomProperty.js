export function getCustomProperty(elem, prop) { //the element you are getting it from and property
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0 // to get css variables and then get the propery value of the prop that is being passed, convert it to a number and if there is no number it is default to 0(will return a string, so the use "parseFloat")
}

export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value)
}

export function incrementCustomProperty(elem, prop, inc) {  //inc = an amount to increment by
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc) //getting current value and adding an amount to it
}
