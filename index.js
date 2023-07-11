const TB_RECHARGE_IN_SEC = 360
const MAX_TB = 180
var RECHARGE_INTERVAL = 0
var FULL_RECHARGE_INTERVAL = 0

function rechargeCalculation(){
  clearInterval(RECHARGE_INTERVAL)
  let tbInput = document.getElementById("input-tb").value
  if(tbInput > MAX_TB){
    return
  }

  var rechargeInSeconds = tbInput * TB_RECHARGE_IN_SEC
  let browserOffset = new Date().getTimezoneOffset() * 60 * 1000

  updateRechargeDocument(rechargeInSeconds, browserOffset)
  rechargeInSeconds -= 1
  if(rechargeInSeconds <= 0){
    return
  }
  RECHARGE_INTERVAL = setInterval(function(){
    if(rechargeInSeconds <= 0){
      clearInterval(RECHARGE_INTERVAL)
    }
    updateRechargeDocument(rechargeInSeconds, browserOffset)
    rechargeInSeconds -= 1
  }, 1000)
}

function fullRechargeCalculation(){
  clearInterval(FULL_RECHARGE_INTERVAL)
  let tbInput = document.getElementById("input-full-recharge").value
  if(tbInput > MAX_TB){
    return
  }

  var fullRechargeInSeconds = (MAX_TB - tbInput) * TB_RECHARGE_IN_SEC
  let browserOffset = new Date().getTimezoneOffset() * 60 * 1000

  updateFullRechargeDocument(fullRechargeInSeconds, browserOffset)
  fullRechargeInSeconds -= 1
  if(fullRechargeInSeconds <= 0){
    return
  }

  FULL_RECHARGE_INTERVAL = setInterval(function(){
    if(fullRechargeInSeconds < 0){
      clearInterval(FULL_RECHARGE_INTERVAL)
    }
    updateFullRechargeDocument(fullRechargeInSeconds, browserOffset)
    fullRechargeInSeconds -= 1
  }, 1000)
}

function updateRechargeDocument(rechargeInSeconds, browserOffset){
  document.getElementById("recharge-time").innerHTML = new Date(rechargeInSeconds * 1000).toISOString().slice(11, 19);
  document.getElementById("recharge-date").innerHTML = new Date(rechargeInSeconds * 1000 + Date.now() - browserOffset).toISOString().slice(11, 16) + " HS";
}

function updateFullRechargeDocument(rechargeInSeconds, browserOffset){
  document.getElementById("page-title").innerHTML = "Full recharge in: " + new Date(rechargeInSeconds * 1000).toISOString().slice(11, 19);
  document.getElementById("full-recharge-time").innerHTML = new Date(rechargeInSeconds * 1000).toISOString().slice(11, 19);
  document.getElementById("full-recharge-date").innerHTML = new Date(rechargeInSeconds * 1000 + Date.now() - browserOffset).toISOString().slice(11, 16) + " HS";
}