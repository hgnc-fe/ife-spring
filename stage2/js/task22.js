var Tree = function(){
	this.animationList = []
	this.timer = null
}

Tree.prototype.preOrder = function(node){
	if(node){
		this.animationList.push(node)
		if(node.firstElementChild)
			this.preOrder(node.firstElementChild)
		if(node.lastElementChild)
			this.preOrder(node.lastElementChild)
	}
}

Tree.prototype.inOrder = function(node){
	if(node){
		if(node.firstElementChild)
			this.inOrder(node.firstElementChild)
		this.animationList.push(node)
		if(node.lastElementChild)
			this.inOrder(node.lastElementChild)
	}
}

Tree.prototype.postOrder = function(node){
	if(node){
		if(node.firstElementChild)
			this.postOrder(node.firstElementChild)
		if(node.lastElementChild)
			this.postOrder(node.lastElementChild)
		this.animationList.push(node)
	}
}

Tree.prototype.animate = function(callback){
	var i = 0
	var self = this
	this.animationList[i].classList.add('active') // this -> tree
	clearInterval(this.timer)
	this.timer = setInterval(function(){
		i++
		if(i < self.animationList.length){ // this -> window
			self.animationList[i - 1].classList.toggle('active',false)
			self.animationList[i].classList.toggle('active',true)
		} else {
			clearInterval(self.timer)
			self.animationList[i-1].classList.remove('active')
			callback && callback()
		}
	}, 500)
}

Tree.prototype.reset = function(){
	[].forEach.call(this.animationList,function(e){
		e.classList.remove('active')
	})
	this.animationList = []
	clearInterval(this.timer)
}

var tree = new Tree()
var root = $('.root')[0]
$('.controls')[0].addEventListener('click',function(e){
	switch(e.target.id){
		case 'preOrderBtn':
			tree.reset()
			tree.preOrder(root)
			tree.animate(function(){
				console.log('complete preOrder')
			})
			break
		case 'inOrderBtn':
			tree.reset()
			tree.inOrder(root)
			tree.animate(function(){
				console.log('complete inOrder')
			})
			break
		case 'postOrderBtn':
			tree.reset()
			tree.postOrder(root)
			tree.animate(function(){
				console.log('complete postOrder')
			})
			break
		default:
			break		
	}
})
