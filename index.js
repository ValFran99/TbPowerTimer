const TB_RECHARGE_IN_SEC = 360
const MAX_TB = 180


function testValue(){
  let tbInput = document.getElementById("input-tb").value
  if(tbInput > MAX_TB){
    return
  }

  let rechargeSeconds = tbInput * TB_RECHARGE_IN_SEC

  document.getElementById("recharge-time").innerHTML = new Date(rechargeSeconds * 1000).toISOString().slice(11, 19);
}

function getDate(){
  var dt = Date()
  document.getElementById("recharge-time").innerHTML = dt
}