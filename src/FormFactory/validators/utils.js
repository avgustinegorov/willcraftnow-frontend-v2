export const getDecimalValue = value => {
  if (value && value.includes(".")) {
    return value.toString().split(".")[1].length
  } else {
    return 0
  }
}

export const isDecimal = value => {
  const decimalPlaces = Math.floor(value) === value ? 0 : getDecimalValue(value)
  return !isNaN(value) && decimalPlaces <= 2
}

export const isNumber = value => {
  return !isNaN(value)
}

export const isInteger = value => {
  return !isNaN(value) && Number.isInteger(Number(value))
}

export const isEmail = value => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(value).toLowerCase())
}

export const isIntegerValidator = value => {
  return !isNaN(value) && Number.isInteger(Number(value))
}

export const isPostalCode = value => {
  return value.length === 6 && isIntegerValidator(value)
}

export const isNRIC = str => {
  if (str.length !== 9) return false

  str = str.toUpperCase()

  var i,
    icArray = []
  for (i = 0; i < 9; i++) {
    icArray[i] = str.charAt(i)
  }

  icArray[1] = parseInt(icArray[1], 10) * 2
  icArray[2] = parseInt(icArray[2], 10) * 7
  icArray[3] = parseInt(icArray[3], 10) * 6
  icArray[4] = parseInt(icArray[4], 10) * 5
  icArray[5] = parseInt(icArray[5], 10) * 4
  icArray[6] = parseInt(icArray[6], 10) * 3
  icArray[7] = parseInt(icArray[7], 10) * 2

  var weight = 0
  for (i = 1; i < 8; i++) {
    weight += icArray[i]
  }

  var offset = icArray[0] === "T" || icArray[0] === "G" ? 4 : 0
  var temp = (offset + weight) % 11

  var st = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"]
  var fg = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"]

  var theAlpha
  if (icArray[0] === "S" || icArray[0] === "T") {
    theAlpha = st[temp]
  } else if (icArray[0] === "F" || icArray[0] === "G") {
    theAlpha = fg[temp]
  }

  return icArray[8] === theAlpha
}
