function $(selector){
	// if(/^#\w+/i.test(selector))
	// 	return document.getElementById(selector.substring(1))
	// if(/^\.\w+/i.tset(selector))
	// 	return document.getElementsByClassName(selector.substring(1));
	// return document.getElementsByTagName(selector);
	
	return /^#\w+/i.test(selector) ? document.querySelector(selector) : document.querySelectorAll(selector)
}

function trim(str){
	// attetion to condition test
	var start = 0,end = str.length - 1
	while(start < end && str[start] === ' ')
		start++
	while(start < end && str[end] === ' ')
		end--
	return str.substring(start,end+1)
}

function css(element,json){
	for(var key in json)
		element.style[key] = json[key]
}

function attr(element,json){
	for(var key in json)
		element.setAttribute(key,json[key])
}

function removeClass(element,className){
	element.classList.remove(className)
}

function addClass(element,className){
	element.classList.add(className)
}

function setClass(element,className){
	element.className = className
}
