const formatTime = date => {

  const month = date.getMonth() + 1
  const day = date.getDate()

  return [month, day].map(formatNumber).join('月')
}
// function(date){
//   const month = date.getMonth() + 1
//   const day = date.getDate()

//   return [month, day].map(formatNumber).join('月')
// }

const formatNumber = n => {
  n = n.toString()
  return n
}

module.exports = {
  formatTime: formatTime
}
