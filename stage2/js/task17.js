/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

const DOM = {
	CITY_SELECT:$('#city-select'),
  GRA_TIME:$('#form-gra-time'),
  AQI_CHART_WRAP:$('.aqi-chart-wrap')[0]
}

// config to be extended here
const config = {
  size:{
    day : 60,
    week : 13,
    month : 3
  }
}

const CHART_BLOCK_CLASS = 'chart-block'

const CANVAS_WIDTH = getComputedStyle(DOM.AQI_CHART_WRAP,null).getPropertyValue('width').replace('px','')

var colors = []
const COUNT_OF_COLOR = 5

// 宽度（px）
const SCALE = {
  'day':10,
  'week':30,
  'month':100
}

function initColor(){
  for(var i = 0;i < COUNT_OF_COLOR;i++){
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)
    var a = 0.8 + Math.random() * 0.2
    var color = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
    colors.push(color)
  }
}

var magic = 0
function getBgColor(){
  return colors[magic++%COUNT_OF_COLOR]
}

// 以下两个函数用于随机模拟生成测试数据
// 格式为yyyy-mm-dd
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
console.log(aqiSourceData)

// 用于渲染图表的数据
/**
 * {
 *   "width":50,
 *   "metaData":[
 *     {"bgColor":'red',left:100,"height":100,"title":"2016年第1周:100"},
 *     {"bgColor":'green',left:200,"height":200,"title":"2016年第2周:200"},
 *     {"bgColor":'blue',left:300,"height":300,"title":"2016年第3周:300"},
 *     {"bgColor":'grey',left:400,"height":400,"title":"2016年第4周:400"}
 *   ]
 * }
 */
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

function renderChartHead(){
  var index = pageState.nowSelectCity
  var html = $('option')[index].innerHTML
  $('.aqi-chat-title')[0].innerHTML = '<h1>' + html + '</h1>'
}

/**
 * 处理柱状图的对齐问题
 * 思考：在一块画布上均匀放置定宽的方块
 */
function getOffset(count,widthPerBlock){
  var offset = (CANVAS_WIDTH - count * widthPerBlock) / count / 2
  return offset
}

/**
 * 渲染图表
 */
function renderChart() {
  console.info('render chart')
  // reset innerHTML
  DOM.AQI_CHART_WRAP.innerHTML = '<div class="aqi-chat-title"></div>'
  renderChartHead()
  var widthPerBlock = chartData.width
  var documentFragment = document.createDocumentFragment()
  for(var i = 0,len = chartData.metaData.length;i < len;i++){
    var oChartBlock = document.createElement('div')
    var data = chartData.metaData[i]
    // 封装element.css(element,json)方法简化操作
    // TODO 链式操作
    css(oChartBlock,{
      width:widthPerBlock,
      height:data.height,
      left:data.left + 'px',
      background:data.bgColor
    });
    attr(oChartBlock,{title:data.title})
    setClass(oChartBlock,CHART_BLOCK_CLASS)
    documentFragment.appendChild(oChartBlock)
  }
  DOM.AQI_CHART_WRAP.appendChild(documentFragment)
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
var oldRadio
function graTimeChange(currentRadio) {
  // 确定是否选项发生了变化 
  if(oldRadio === currentRadio)
    return console.warn('radio 未变')
  // 设置对应数据
  pageState.nowGraTime = currentRadio.value
  initAqiChartData()
  // 调用图表渲染函数
  renderChart()
  oldRadio = currentRadio
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(currentOption) {
  // 确定是否选项发生了变化 （能触发此事件一定是选项发生了变化，不需要检测）
  // 设置对应数据
  pageState.nowSelectCity = DOM.CITY_SELECT.selectedIndex
  initAqiChartData()
  // 调用图表渲染函数
  renderChart()
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  DOM.GRA_TIME.addEventListener('click',function(event){
    if('input' === event.target.tagName.toLowerCase()){
      graTimeChange(event.target)
    }
  })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var html = '<option>请选择</option>'
  for(var city in aqiSourceData){
  	html += '<option>' + city + '</option>'
  }
  DOM.CITY_SELECT.innerHTML = html

  // 给select设置事件(change event)，当选项发生变化时调用函数citySelectChange
  DOM.CITY_SELECT.addEventListener('change',function(event){
  	var selectedIndex = event.target.selectedIndex
  	var currentOption = $('option')[selectedIndex]
  	citySelectChange(currentOption)
  })
}

/**
 * 此函数生成chartData的title字段，即元数据
 * 以week为例
 * [
 *   {"time":"第1周","value":214.34},
 *   {"time":"第2周","value":224.34},
 *   {"time":"第3周","value":234.34},
 *   {"time":"第4周","value":244.34}
 * ]
 */
function getAvg(aqiSourceData,scale,city){
  var data = []
  var obj
  var aqiData = aqiSourceData[city]
  if(scale === 'day'){
    for(var k in aqiData){
      obj = {}
      obj.time = k
      obj.value = aqiData[k]
      data.push(obj)
    }
  }else if(scale === 'week'){
    // use es6 string template is should be simple
    var time = '第$周'
    var count = 0
    var sum = 0
    var week = 0
    for(var k in aqiData){
      sum += aqiData[k]
      if(++count % 7 === 0){
        obj = {}
        obj.time = time.replace('$',++week)
        obj.value = parseFloat((sum / 7).toFixed(2))
        data.push(obj)
        sum = 0
      }
    }
  } else if(scale === 'month'){
    var time = '第$月'
    var count = 0
    var sum = 0
    var month = 0
    for(var k in aqiData){
      sum += aqiData[k]
      // TODO 这部分代码与上面的冗余，需考虑重构
      if(++count % getDaysOfCurrentMonth(k) === 0){
        obj = {}
        obj.time = time.replace('$',++month)
        obj.value = parseFloat((sum / getDaysOfCurrentMonth(k)).toFixed(2))
        data.push(obj)
        sum = 0
      }
    }
  }
  return data  
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var scale = pageState.nowGraTime
  var city = $('option')[pageState.nowSelectCity].innerHTML
  var data = getAvg(aqiSourceData,scale,city)
  
  // 处理好的数据存到 chartData 中
  chartData.width = SCALE[scale]
  chartData.metaData = []

  var countOfItem = config.size[scale] // load count from config
  var size = 0
  for(var k in data){
    // 如果满足条件，后面的数据就不必进入图表了
    if(size === countOfItem)
      break
    var meta = {}
    var d = data[k]
    meta.bgColor = getBgColor()
    var offset = getOffset(countOfItem,chartData.width)
    meta.left = offset + size * chartData.width + size * 2 * offset
    meta.height = d.value
    meta.title = d.time + ':' + d.value
    chartData.metaData.push(meta)
    size++
  }
  
}

/**
 * 初始化函数
 */
function init() {
  initColor()
  initGraTimeForm()
  initCitySelector()
  initAqiChartData()
}

init();
