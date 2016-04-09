var getInput = function() {
	const SPLIT_REG = /[^0-9a-zA-Z\u4e00-\u9fa5]+/
    return $('textarea')[0].value.split(SPLIT_REG).filter(function(d){
    	return !!trim(d)
    })
}

var render = function(match){
	html($('#container'),data.map(function(d){
		var r = d
		if(match && 0 < match.length)
			r = r.replace(new RegExp(match,'g'),'<span class="selected">' + match + '</span>')
		return '<div>' + r + '</div>'		
	}).join(''))
}
var data = []

/**
 * #leftIn 和 #rightIn函数的抽象
 * @ref [task20](https://github.com/Five-African/task-stage2-final-submission/blob/gh-pages/task20/index.html)
 * @param  {[function]} arrayFn [数组原型上的方法]
 */
var deal = function(arrayFn){
	var vals = getInput()
	Array.prototype[arrayFn].apply(data,vals)
}

var leftIn = function() {
    // var vals = getInput()
    // vals.forEach(function(val){
    // 	data.unshift(val)
    // })
    
    deal('unshift')
    render()
}
var rightIn = function() {
    // var vals = getInput()
    // vals.forEach(function(val){
    // 	data.push(val)
    // })
    
    deal('push')
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
var query = function(){
	render($('input')[0].value)
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
        case 'queryBtn':
        	query()
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