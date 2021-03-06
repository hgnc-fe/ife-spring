# baidu IFE 2016年春任务代码

## git pages静态页面演示平台的使用

项目Settings选项下Launch automatic page generator按钮，一路默认，会在远端新建`gh-pages`分支
本地 git fetch --all 取回所有分支branch更新

```bash
$ git fetch --all # 取回所有branch更新
$ git branch # 查看本地所有分支
$ git branch gh-pages origin/gh-pages # 在本地创建和远端对应的分支
$ git checkout gh-pages # 从master切换到gh-pages分支
$ git reset --hard gh-pages # 直接merge会冲突，返回上一次提交版本
$ git rm index.html # 删除本地冲突文件

# 同步本地和远端的代码
$ git add .
$ git commit -m "syn"
$ git pull origin gh-pages
$ git push origin gh-pages

# 和master主分支合并
$ git merge master 

# 访问
http: //<username>.github.io/<projectname/xxx.html>
http://<organizationname>.github.io/<projectname/xxx.hello.html>
```

如果以后每次切换到master提交则需要切换到pages分支并merge主分支，push后远程即可更新。

## 水平和垂直居中问题

块元素的最简单的居中方案就是指定一个宽度，并将其左右的`margin`值设置为`auto`
inline-block的元素设置`text-align:center`，例如：img,input等

- [不同情况下的居中方案](https://css-tricks.com/centering-css-complete-guide/)
- [居中代码生成器](http://howtocenterincss.com/)

## 子元素设置浮动后，父元素的高度为0的解决方案

给父元素加入`overflow:hidden`即可。

任务七的section2中有4个并列显示的inline-block元素，需要这4个元素均分宽度，所以每个元素的宽度设置为25%，但是问题出现了最后一个元素跑到下面去了，最后给父元素设置了`font-size:0`属性后完美解决。

## 如何控制背景图片的大小

设置`background-size`属性即可，该属性有两个参数，分别表示宽高。

## 更加语义化的html5

我们常用普通文本框input做搜索框，但是html5也提供了类型为`search`的input。

html5的`progress`标签设置css有兼容性问题，参见[张鑫旭的博客](http://www.zhangxinxu.com/wordpress/2013/02/html5-progress-element-style-control/)

## 左边侧栏定宽，右侧内容自适应

```html
article
	aside
	section
```

```css
article{
	margin-left:250px;
}	
aside{
	width:260px;
	margin-left:-260px;
	float:left
}
section{
	width:100%;
}
```

## 弹性盒模型

在Flex容器中，当margin设置为“auto”时，设置自动的垂直边距将使该项目完全集中两个轴。(水平垂直居中)，详情参见:[sf.gg](https://segmentfault.com/a/1190000002910324)使用弹性盒模型我们在制作导航菜单的时候我们不需要设置子元素li浮动或者display:inline-block,只需要声明ul为弹性容器即可。

## 任务列表

### 阶段一

- [任务一](http://hgnc-fe.github.io/ife-spring/stage1/task_1_1.html)
- [任务二](http://hgnc-fe.github.io/ife-spring/stage1/task_1_2.html)
- [任务三](http://hgnc-fe.github.io/ife-spring/stage1/task_1_3.html)
- [任务四](http://hgnc-fe.github.io/ife-spring/stage1/task_1_4.html)
- [任务五](http://hgnc-fe.github.io/ife-spring/stage1/task_1_5.html)
- [任务六](http://hgnc-fe.github.io/ife-spring/stage1/task_1_6.html)
- [任务七](http://hgnc-fe.github.io/ife-spring/stage1/task_1_7.html)
- [任务八](http://hgnc-fe.github.io/ife-spring/stage1/task_1_8.html)
- [任务九](http://hgnc-fe.github.io/ife-spring/stage1/task_1_9.html)
- [任务十](http://hgnc-fe.github.io/ife-spring/stage1/task_1_10.html)
- [任务十一](http://hgnc-fe.github.io/ife-spring/stage1/task_1_11.html)
- [任务十二](http://hgnc-fe.github.io/ife-spring/stage1/task_1_12.html)

### 阶段二

- [任务十六](http://hgnc-fe.github.io/ife-spring/stage2/task16.html)
- [任务十七](http://hgnc-fe.github.io/ife-spring/stage2/task17.html)
- [任务十八](http://hgnc-fe.github.io/ife-spring/stage2/task18.html)
- [任务十九](http://hgnc-fe.github.io/ife-spring/stage2/task19.html)
- [任务二十](http://hgnc-fe.github.io/ife-spring/stage2/task20.html)
- [任务二十一](http://hgnc-fe.github.io/ife-spring/stage2/task21.html)
- [任务二十二](http://hgnc-fe.github.io/ife-spring/stage2/task22.html)
- [任务二十三](http://hgnc-fe.github.io/ife-spring/stage2/task23.html)

