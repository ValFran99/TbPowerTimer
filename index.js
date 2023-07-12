const TB_RECHARGE_IN_SEC = 360
const MAX_TB = 180
var RECHARGE_INTERVAL = 0
var FULL_RECHARGE_INTERVAL = 0
var FIRST_COUNTDOWN_INDEX = 3
var SECOND_COUNTDOWN_INDEX = 5

function rechargeCalculation(element){
  let tbInput = element.currentTarget.value
  if(tbInput > MAX_TB){
    return
  }

  var inputTypeFlag = element.currentTarget.id == "input-recharge"
  if(inputTypeFlag){
    document.getElementById("recharge-text").innerHTML = tbInput + " trailblaze power will recharge in: "
  }
  clearInterval(inputTypeFlag ? RECHARGE_INTERVAL : FULL_RECHARGE_INTERVAL) 

  var rechargeInSeconds = inputTypeFlag ? tbInput * TB_RECHARGE_IN_SEC : (MAX_TB - tbInput) * TB_RECHARGE_IN_SEC
  let browserOffset = new Date().getTimezoneOffset() * 60 * 1000

  // console.log(element.currentTarget.parentNode.parentNode)

  updateRechargeDocument(rechargeInSeconds, browserOffset, inputTypeFlag, element.currentTarget.parentNode.parentNode)
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
    }
    updateRechargeDocument(rechargeInSeconds, browserOffset, inputTypeFlag, element.currentTarget.parentNode.parentNode)
    rechargeInSeconds -= 1
  }, 1000)

  if(inputTypeFlag){
    RECHARGE_INTERVAL = intervalId
  } else{
    FULL_RECHARGE_INTERVAL = intervalId
  }
}

function updateRechargeDocument(rechargeInSeconds, browserOffset, inputTypeFlag, parentElement){
  let countdownString = new Date(rechargeInSeconds * 1000).toISOString().slice(11, 19)
  inputTypeFlag ? true : document.getElementById("page-title").innerHTML = "Full recharge in: " + countdownString;

  document.getElementById(parentElement.children[FIRST_COUNTDOWN_INDEX].id).innerHTML = prettyCountdownFormat(countdownString);
  document.getElementById(parentElement.children[SECOND_COUNTDOWN_INDEX].id).innerHTML = new Date(rechargeInSeconds * 1000 + Date.now() - browserOffset).toISOString().slice(11, 16) + " HS";
}

function prettyCountdownFormat(countdownString){
  let countdownHour = countdownString.slice(0, 2) + "h "
  let countdownMinute = countdownString.slice(3, 5) + "m "
  let countdownSecond = countdownString.slice(6, 8) + "s"
  return countdownHour + countdownMinute + countdownSecond
}

// for the toggle switch

function toggleSwitch(){
  var circle = document.getElementsByClassName("inner-circle")[0]
  var toggleButton = document.getElementsByClassName("toggle-button")[0]
  var toggleRecharge = document.getElementById("recharge-calc")
  var toggleRefill = document.getElementById("refill-calc")
  var leftPosition = circle.style.left

  if(leftPosition == "29px"){
    circle.style.left = "0px"
    toggleButton.style.backgroundColor = "gray"
    toggleRecharge.style.display = "none"
    toggleRefill.style.display = "block"

  } else{
    circle.style.left = "29px"
    toggleButton.style.backgroundColor = "blueviolet"
    toggleRecharge.style.display = "block"
    toggleRefill.style.display = "none"

  }
}