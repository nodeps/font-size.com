// 引入插件
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	open = require('gulp-open'),
	os = require('os'),
	port = 8080,//服务器端口
	path = './',//web文件目录
	IPv4 = '127.0.0.1'//本机Ip
 
//获取本机Ip
var getLocalIP = function(){
  for(var i=0;i<os.networkInterfaces().en0.length;i++){  
	  if(os.networkInterfaces().en0[i].family=='IPv4'){  
		  IPv4=os.networkInterfaces().en0[i].address;  
	  }  
  }
}
getLocalIP();

//创建watch任务去检测html文件，当html改动之后，调用一个gulp的task
gulp.task('watch',function(){
	gulp.watch([path+'/**/*'], ['html']);
});

//使用connect启动一个web服务器
gulp.task('connect',function(){
	connect.server({
		root:path,
		port:port,
		livereload:true
	});
});

//在浏览器中打开页面
gulp.task('open', function() {
    var options = {
        url: 'http://'+IPv4+':' + port,
		app: 'google chrome'//指定浏览器，可以改成Safari
    };
    gulp.src(path+'/index.html')
        .pipe(open('', options));
});

//服务器刷新
gulp.task('html',function(){
	gulp.src(path+'/**/*')
	.pipe(connect.reload());
	
});

//运行gulp时，默认的task
gulp.task('serve',['connect','open']);
gulp.task('default',['serve','watch']);
