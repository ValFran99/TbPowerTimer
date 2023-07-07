const TB_RECHARGE_IN_SEG = 360
const MAX_TB = 180


function testValue(){
  let inputValue = document.getElementById("input-tb").value
  if(inputValue > MAX_TB){
    return
  }
  document.getElementById("datetime").innerHTML = document.getElementById("input-tb").value
}

function getDate(){
  var dt = Date()
  document.getElementById("datetime").innerHTML = dt
}