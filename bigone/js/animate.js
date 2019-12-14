function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var body=document.body;
var one=document.getElementById("one");
var two=document.getElementById("two");
body.onload=function(){
	setInterval(function(){
		var now=parseInt(getStyle(two,"left"));
		if(now<-276){
			console.log(now);
			now=1215;
		}
		two.style.left=now-3+"px";
	},60)
}
var box=document.getElementById("box");
var slider=document.getElementById("slider");
var left=document.getElementById("left");
var right=document.getElementById("right");
var num=document.getElementById("num").children;
var i=1;
var moving=false;
//下一张
function next(){
	if(moving){
		return;
	}
	moving=true;
	i++;
	red();
	animate(slider,{left:-1200*i},function(){
		if(i==6){
			slider.style.left="-1200px";
			i=1;
		}
		moving=false;
	});
}
//前一张
function head(){
	if(moving){
		return;
	}
	moving=true;
	i=i-1;
	red();
	animate(slider,{left:-1200*i},function(){
		if(i==0){
			slider.style.left="-1200px";
			i=5;
		}
		moving=false;
	});
}
var flag=setInterval(next,3000); 
//鼠标的移上
box.onmouseover=function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(flag);
}
//鼠标的移开	
box.onmouseout=function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	flag=setInterval(next,3000);
}
//左右的按钮点击
right.onclick=next;
left.onclick=head;
//圆圈点击
for(var j=0;j<num.length;j++){
	num[j].sum=j;
	num[j].onclick=function(){
		i=this.sum+1;
		red();
		animate(slider,{left:-1200*i});
	}
}
//颜色变化函数
function red(){
	for(var m=0;m<num.length;m++){
		num[m].className="";
	}
	if(i==6){
		num[0].className="first";
	}
	else if(i==0){
		num[4].className="first";
	}
	else{
		num[i-1].className="first";
	}
}