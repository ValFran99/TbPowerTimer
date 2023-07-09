const TB_RECHARGE_IN_SEC = 360
const MAX_TB = 180
var RECHARGE_INTERVAL = 0

function testValue(){
  clearInterval(RECHARGE_INTERVAL)
  let tbInput = document.getElementById("input-tb").value
  if(tbInput > MAX_TB){
    return
  }

  var rechargeInSeconds = tbInput * TB_RECHARGE_IN_SEC
  let browserOffset = new Date().getTimezoneOffset() * 60 * 1000

  updateDocument(rechargeInSeconds, browserOffset)
  rechargeInSeconds -= 1

  RECHARGE_INTERVAL = setInterval(function(){
    if(rechargeInSeconds <= 0){
      clearInterval(RECHARGE_INTERVAL)
    }

    updateDocument(rechargeInSeconds, browserOffset)
    rechargeInSeconds -= 1
  }, 1000)
  return
}

function updateDocument(rechargeInSeconds, browserOffset){
  document.getElementById("page-title").innerHTML = "Trailblaze " + new Date(rechargeInSeconds * 1000).toISOString().slice(11, 19);
    document.getElementById("recharge-time").innerHTML = new Date(rechargeInSeconds * 1000).toISOString().slice(11, 19);
    document.getElementById("recharge-date").innerHTML = new Date(rechargeInSeconds * 1000 + Date.now() - browserOffset).toISOString().slice(11, 16) + " HS";
}

function getDate(){
  var dt = Date()
  document.getElementById("recharge-time").innerHTML = dt
}