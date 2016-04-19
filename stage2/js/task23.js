var Tree = function(root,matchedStop){
	this.stack = []
	this.root = root
	this.isAnimation = false
	this.matchedStop = matchedStop || false // 匹配到第一个就停止查找？默认找到所有
	this.matchedCount = 0
}

Tree.prototype.animationDuring = 300

/**
 * 深度优先遍历
 * 顺序是：
 * ①根节点
 * ②第一个孩子节点如果存在则遍历第一个孩子节点，不存在则遍历第二个孩子几点
 * ③将此节点作根节点，重复上述步骤直到跟几点为空
 */
Tree.prototype.traverseDF = function(callback){
	this.reset()
	var _this = this
	var _recurse = function(currentNode){
		if(currentNode)
			_this.stack.push(currentNode)
		for(var i = 0;i < currentNode.children.length;i++){
			_recurse(currentNode.children[i])
		}
		callback && callback(currentNode)
	}
	_recurse(this.root)
	// console.log('节点个数：',this.stack.length,'<==>',document.querySelectorAll('.node').length)
}

Tree.prototype.reset = function(callback){
	this.stack = []
	this.isAnimation = false
	this.matchedCount = 0
}

/**
 * 广度优先遍历
 * 先根节点，然后根节点的孩子节点，相当于一层一层遍历
 * https://zh.wikipedia.org/wiki/广度优先搜索
 */
Tree.prototype.traverseBF = function(callback){
	// 临时队列保存每个根节点的孩子节点,参见56行的打印
	var _queue = [],
		currentNode = this.root

	this.reset()

	this.stack.push(currentNode)
	while(currentNode){
		for(var i = 0;i < currentNode.children.length;i++){
			_queue.push(currentNode.children[i])
		}
		// console.log(_queue,_queue.length);
		callback && callback(currentNode)
		currentNode = _queue.shift()
		if(currentNode)
			this.stack.push(currentNode)
	}
	// console.log('节点个数：',this.stack.length,'<==>',document.querySelectorAll('.node').length)
}
Tree.prototype.animate = function(keyword,matchedCallback,allFindCallback){
	this.isAnimation = true
	var _this = this
	var keyword = keyword || null
	var _show = function(){
		var currentNode = _this.stack.shift()
		if(currentNode){
			currentNode.classList.remove('matched')
			currentNode.classList.add('working')
			if(new RegExp(keyword).test(currentNode.firstChild.nodeValue)){
				++_this.matchedCount
				currentNode.classList.add('matched')
				matchedCallback && matchedCallback()
				if(_this.matchedStop){
					return
				}
			}
			setTimeout(function(){
				currentNode.classList.remove('working')
				_show()
			}, _this.animationDuring)
		} else {
			allFindCallback && allFindCallback()
			_this.isAnimation = false
		}
	}
	_show()
}

Tree.prototype.toggleBackground = function(){
	$('.root')[0].addEventListener('click',function(ev){
		var target = ev.target
		if(target.classList.contains('node'))
			target.classList.toggle('selected')
	})
}

// 根据根节点构造一棵树
var tree = new Tree($('.root')[0])

// 点击切换背景颜色

// 按钮事件委托
$('.controls')[0].addEventListener('click',function(ev){
	switch(ev.target.id){
		case 'traverseDFBtn':
		case 'traverseBFBtn':
			tree[ev.target.id.replace('Btn','')]() // 相当于tree.traverseDFBtn()
			tree.animate()
			break
		case 'DFSearchBtn':
		case 'BFSearchBtn':
			tree['traverse'+ev.target.id.substring(0,2)]()
			tree.animate(trim($('input')[0].value),function(){
				alert('find it')
			},function(){
				// console.log(this) --> window
				alert('全部查找完成！共找到' + tree.matchedCount + '个匹配项')
			})
			break
		default:
			break	
	}
})
