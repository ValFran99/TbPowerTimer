const TB_RECHARGE_IN_SEC = 360
const MAX_TB = 180


function testValue(){
  let tbInput = document.getElementById("input-tb").value
  if(tbInput > MAX_TB){
    return
  }

  // let initialSegundos = 2000
  // let horas = Math.floor(initialSegundos / 3600)
  // let segundos = initialSegundos % 3600
  // let minutes = Math.floor(segundos / 60)
  // segundos %= 60

  let initialSeconds = tbInput * TB_RECHARGE_IN_SEC
  let rechargeHour = Math.floor(initialSeconds / 3600)
  let rechargeSeconds = initialSeconds % 3600
  let rechargeMinutes = rechargeSeconds / 60
  rechargeSeconds %= 60
  document.getElementById("recharge-time").innerHTML = rechargeHour + ":" + rechargeMinutes + ":" + rechargeSeconds
}

function getDate(){
  var dt = Date()
  document.getElementById("recharge-time").innerHTML = dt
}