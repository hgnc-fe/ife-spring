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

[任务一](http://hgnc-fe.github.io/ife-spring/stage1/task_1_1.html)