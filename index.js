const TB_RECHARGE_IN_SEC = 360
const MAX_TB = 180
var RECHARGE_INTERVAL = 0
var FULL_RECHARGE_INTERVAL = 0

function rechargeCalculation(element){

  var inputTypeFlag = element.currentTarget.id == "input-tb"
  clearInterval(inputTypeFlag ? RECHARGE_INTERVAL : FULL_RECHARGE_INTERVAL) 
  let tbInput = element.currentTarget.value
  if(tbInput > MAX_TB){
    return
  }

  var rechargeInSeconds = inputTypeFlag ? tbInput * TB_RECHARGE_IN_SEC : (MAX_TB - tbInput) * TB_RECHARGE_IN_SEC
  let browserOffset = new Date().getTimezoneOffset() * 60 * 1000

  updateRechargeDocument(rechargeInSeconds, browserOffset, inputTypeFlag, element.currentTarget.parentNode)
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
    updateRechargeDocument(rechargeInSeconds, browserOffset, inputTypeFlag, element.currentTarget.parentNode)
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

  document.getElementById(parentElement.children[4].id).innerHTML = prettyCountdownFormat(countdownString);
  document.getElementById(parentElement.children[6].id).innerHTML = new Date(rechargeInSeconds * 1000 + Date.now() - browserOffset).toISOString().slice(11, 16) + " HS";
}

function prettyCountdownFormat(countdownString){
  let countdownHour = countdownString.slice(0, 2) + "h "
  let countdownMinute = countdownString.slice(3, 5) + "m "
  let countdownSecond = countdownString.slice(6, 8) + "s"
  return countdownHour + countdownMinute + countdownSecond
}