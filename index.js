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

  RECHARGE_INTERVAL = setInterval(function(){
    if(rechargeInSeconds <= 0){
      clearInterval(RECHARGE_INTERVAL)
    }
    document.getElementById("recharge-time").innerHTML = new Date(rechargeInSeconds * 1000).toISOString().slice(11, 19);
    rechargeInSeconds -= 1
  }, 1000)
  return
}

function getDate(){
  var dt = Date()
  document.getElementById("recharge-time").innerHTML = dt
}