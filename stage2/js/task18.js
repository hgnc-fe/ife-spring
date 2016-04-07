var validate = function(input) {
    const REG_EXP = /^[1-9]\d*/
    var flag = REG_EXP.test(input)
    if (!flag){
    	alert('输入不合法！')
    	$('input')[0].select()
        throw Error('输入不合法')
    }
}

var data = []

var leftIn = function() {
    var val = getInput()
    validate(val)
    data.unshift(val)
    render()
}
var rightIn = function() {
    var val = getInput()
    validate(val)
    data.push(val)
    render()
}
var leftOut = function() {
    var d = data.shift()
    render()
}
var rightOut = function() {
    var d = data.pop()
    render()
}
var getInput = function() {
    var numberInput = $('input')[0].value
    return trim(numberInput)
}
var render = function() {

    var htmlStr=''
    for (var k in data)
        htmlStr += ['<div data-index="',k,'" class="div">', data[k], '</div>'].join('')
    html($('#container'),htmlStr)
}
// event dalidate
$('#control').addEventListener('click', function(ev) {
    switch (ev.target.id) {
        case 'leftInBtn':
            leftIn()
            break
        case 'rightInBtn':
            rightIn()
            break
        case 'leftOutBtn':
            leftOut()
            break
        case 'rightOutBtn':
            rightOut()
            break
        default:
            break
    }
})
$('#container').addEventListener('click',function(ev){
	if(ev.target.tagName.toLowerCase() === 'div'){
		var index = ev.target.getAttribute('data-index')
		data.splice(index,1)
		render()
	}
})