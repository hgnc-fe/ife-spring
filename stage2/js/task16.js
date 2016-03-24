/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

const DOM = {
	CITY_INPUT:$('#aqi-city-input'),
	VALUE_INPUT:$('#aqi-value-input'),
	TABLE:$('#aqi-table'),
	ADD_BTN:$('#add-btn')
}
var city,value

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	
	city = trim(DOM.CITY_INPUT.value)
	value = trim(DOM.VALUE_INPUT.value)

	const INPUT_REG = /^[\u4e00-\u9fa5]|[a-zA-z]+$/i
	const NUMBER_REG = /^[1-9]\d*$/

	var validate = function(reg,input){
		return reg.test(input)
	}

	if(!validate(INPUT_REG,city))
		return alert('城市输入错误，只能是中英文字符')
	if(!validate(NUMBER_REG,value))
		return alert('空气指数只能是数字，且不能以0开头！')

	aqiData[city] = value
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

	var html = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>'
	for(var city in aqiData){
		html += ['<tr><td>',city,'</td><td>',aqiData[city],'</td><td><button>删除</button></td></tr>'].join('')
	}
	DOM.TABLE.innerHTML = html
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // 使用firstChild得到的是文本节点
    var city = target.parentNode.parentNode.children[0].innerHTML
    delete aqiData[city]
    renderAqiList(aqiData);
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    DOM.ADD_BTN.addEventListener('click',function(){
    	addBtnHandle()
    })

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    DOM.TABLE.addEventListener('click',function(event){
    	// 将所有事件代理给父级处理（事件冒泡），通过target取得真正触发的元素
    	delBtnHandle(event.target)
    })
}

init();