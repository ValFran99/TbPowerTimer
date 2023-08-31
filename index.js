const TB_RECHARGE_IN_SEC = 360
const MAX_TB = 240
var RECHARGE_INTERVAL = 0
var REFILL_INTERVAL = 0

// Main function

function rechargeCalculation(element){
  let tbInput = element.currentTarget.value
  if(tbInput > MAX_TB){
    return
  }

  var inputTypeFlag = element.currentTarget.id == "input-recharge"
  var countdownType = inputTypeFlag ? "recharge" : "refill"
  if(inputTypeFlag){
    document.getElementById("recharge-text").innerHTML = tbInput + " trailblaze power will recharge in: "
  }

  // clears whatever interval had before
  clearInterval(inputTypeFlag ? RECHARGE_INTERVAL : REFILL_INTERVAL) 

  var rechargeInSeconds = inputTypeFlag ? tbInput * TB_RECHARGE_IN_SEC : (MAX_TB - tbInput) * TB_RECHARGE_IN_SEC

  // Shows the time of the refill/recharge
  let browserOffset = new Date().getTimezoneOffset() * 60 * 1000
  document.getElementById(countdownType + "-date").innerHTML = new Date(rechargeInSeconds * 1000 + Date.now() - browserOffset).toISOString().slice(11, 16) + " HS"

  document.getElementById(inputTypeFlag ? "toggle-recharge" : "toggle-refill").style.display = "block"

  // showText(inputTypeFlag ? "toggle-recharge" : "toggle-refill")
  updateRechargeDocument(rechargeInSeconds, inputTypeFlag, countdownType)
  rechargeInSeconds -= 1

  if(rechargeInSeconds <= 0){
    return
  }
  var intervalId = setInterval(function(){
    if(inputTypeFlag){
      clearInterval()
    }
    if(rechargeInSeconds <= 0){
      clearInterval(intervalId)
      let audio = new Audio("alarm_sound.mp3")
      audio.volume = 0.3
      audio.play()
    }
    updateRechargeDocument(rechargeInSeconds, inputTypeFlag, countdownType)
    rechargeInSeconds -= 1
  }, 1000)

  if(inputTypeFlag){
    RECHARGE_INTERVAL = intervalId
  } else{
    REFILL_INTERVAL = intervalId
  }
}

// Updates the countdown timers
function updateRechargeDocument(rechargeInSeconds, inputTypeFlag, countdownType){
  let countdownString = new Date(rechargeInSeconds * 1000).toISOString().slice(11, 19)
  inputTypeFlag ? true : document.getElementById("page-title").innerHTML = "Full recharge in: " + countdownString

  document.getElementById(countdownType + "-time").innerHTML = prettyCountdownFormat(countdownString)
}

function prettyCountdownFormat(countdownString){
  let countdownHour = countdownString.slice(0, 2) + "h "
  let countdownMinute = countdownString.slice(3, 5) + "m "
  let countdownSecond = countdownString.slice(6, 8) + "s"
  return countdownHour + countdownMinute + countdownSecond
}

// for the toggle switch

function toggleSwitch(){
  let circle = document.getElementsByClassName("inner-circle")[0]
  let toggleButton = document.getElementsByClassName("toggle-button")[0]
  let toggleRecharge = document.getElementById("recharge-calc")
  let toggleRefill = document.getElementById("refill-calc")
  let leftPosition = circle.style.left

  if(leftPosition == "51%"){
    circle.style.left = "5%"
    toggleButton.style.backgroundColor = "white"
    toggleRecharge.style.display = "none"
    toggleRefill.style.display = "block"

  } else{
    circle.style.left = "51%"
    toggleButton.style.backgroundColor = "#007bff"
    toggleRecharge.style.display = "block"
    toggleRefill.style.display = "none"
  }
}
