var validate = function(input) {
    const REG_EXP = /^[1-9]\d$/
    var flag = REG_EXP.test(input)
    if (!flag) {
        alert('输入不合法！')
        $('input')[0].select()
        throw Error('输入不合法')
    }
}

var data = []
const QUEUE_CAPTICITY = 60

var checkQueueFull = function() {
    if (QUEUE_CAPTICITY === data.length) {
        alert('队列满了！')
        throw Error('满了，亲请删除！')
    }
}

var leftIn = function() {
    checkQueueFull()
    var val = getInput()
    validate(val)
    data.unshift(parseInt(val))
    render()
}
var rightIn = function() {
    checkQueueFull()
    var val = getInput()
    validate(val)
    data.push(parseInt(val))
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
var genRandomNumber = function() {
    data.length = 0
    const SIZE_OF_TEST_DATA = 20
    for (var i = 0; i < SIZE_OF_TEST_DATA; i++)
        data.push(random(10, 100))
    render()
}

var selectionSort = function() {
    var i = 0,
        j = 1,
        len = data.length,
        minIndex,
        timer = null,
        startTime

    const ANIMATION_DURING = 25

    startTime = Date.now()
    timer = setInterval(function() {
        _sortWithAnimation()
    }, ANIMATION_DURING)
    var _sortWithAnimation = function() {

        attr($('#sortBtn'), {
            disabled: 'disabled'
        })
        
        if (i < len - 1) {
            minIndex = i
            if (j < len) {
                if (data[minIndex] > data[j]) {
                    swap(data, minIndex, j)
                    render()
                    css($('.div')[j],{
                        background:'blue'
                    })
                    css($('.div')[minIndex],{
                        background:'green'
                    })
                }
                j++
            } else {
                i++
                j = i + 1
            }
        } else {
            render()
            clearInterval(timer)
            $('#sortBtn').removeAttribute('disabled')
            return alert('排序完成，花费' + (Date.now() - startTime) + 'ms')
        }
    }
}

var sort = function() {
    selectionSort()
    render()
}

var render = function() {

    var htmlStr = ''
    for (var k in data)
        htmlStr += ['<div data-index="', k, '" class="div" style="height:', data[k], 'px">', data[k], '</div>'].join('')
    html($('#container'), htmlStr)
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
        case 'genRandomNumberBtn':
            genRandomNumber()
            break
        case 'sortBtn':
            sort()
            break
        default:
            break
    }
})
$('#container').addEventListener('click', function(ev) {
    if (ev.target.tagName.toLowerCase() === 'div') {
        var index = ev.target.getAttribute('data-index')
        data.splice(index, 1)
        render()
    }
})
