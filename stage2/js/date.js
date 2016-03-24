function isLeapYear(year){
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0
}

/**
 * 给定日期字符串（yyyy-mm-dd）返回该月的天数
 */
function getDaysOfCurrentMonth(dateStr){
  var d = new Date(dateStr)
  var month = d.getMonth() + 1
  switch(month){
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31
    case 4:  
    case 6:  
    case 9:  
    case 11:
      return 30
    case 2:{
      year = d.getFullYear()
      return isLeapYear(year) ? 29 : 28
    }
    default:
      break
  }
}
