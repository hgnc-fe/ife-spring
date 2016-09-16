/**
 * @param {[Boolean]} canDelete [是否可以删除数组中的元素，默认为false]
 */
var Queue = function(canDelete){
	this.data = []
	this.canDelete = !!canDelete
}

Queue.prototype.capacity = 10

Queue.prototype._unique = function(value){
	for(var i = 0,len = this.data.length;i < len;i++)
		if(value === this.data[i])
			return false
	return true	
}

Queue.prototype.put = function(value){
	
	if(!this._unique(value))
		return
	if(this.data.length < this.capacity)
		this.data.push(value)
	else{
		this.data.shift()
		this.data.push(value)
	}
}

Queue.prototype.delete = function(index){
	if(this.canDelete)
		this.data.splice(index,1)
}

Queue.prototype.render = function(container){
	var htmlStr = ''
	if(this.canDelete)
		htmlStr = this.data.map(function(d,index){
			return '<div class="canDelete" data-index="' + index + '">' + d + '</div>'
		}).join('')
	else
		htmlStr = this.data.map(function(d,index){
			return '<div data-index="' + index + '">' + d + '</div>'
		}).join('')
	container.innerHTML = htmlStr
}

var q1 = new Queue(true)
var q2 = new Queue()

$('#tagInput').addEventListener('keyup',function(ev){
	// enter --> 13
	var val = this.value
	const SUFFIX_REG = /,|，|\s$/
	if(13 === ev.keyCode || SUFFIX_REG.test(val)){
		val = trim(val.replace(SUFFIX_REG,''))
		if(!!val)
			q1.put(val)
		// console.log(q1.data)
		this.value = ''
		q1.render($('#tag_container'))
	}
})

$('#tag_container').addEventListener('click',function(ev){
	if('div' === ev.target.tagName.toLowerCase()){
		var index = ev.target.getAttribute('data-index')
		q1.delete(index)
		q1.render($('#tag_container'))
	}
})

$('button')[0].addEventListener('click',function(){
	var vals = $('textarea')[0].value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(d){
    	return !!trim(d)
    })
    vals.forEach(function(d){
    	q2.put(d)
    	// console.log(q2.data)
    })
    q2.render($('#intrest_container'))
    $('textarea')[0].value = ''
})
