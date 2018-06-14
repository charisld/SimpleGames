var clock=null;
var speed=4;
var state=0;

 function $(id) {
            return document.getElementById(id);
        }

function init(){
            for(var i=0; i<4; i++){
                createRow();
            }

            // 添加onclick事件
            $('wrap').onclick = function(ev){
                judge(ev);
            }

            // 定时器 每30毫秒调用一次move()
                clock = window.setInterval('remove()', 30);
        }

function createDiv(className){
	var div=document.createElement('div');
    div.className=className;
	return div;
}
function createRow(){
	var con=$('con');
	var row=createDiv('row');
	var arr=createCell();
	con.appendChild(row);
	 for(var i = 0; i < 4; i++){
                row.appendChild(createDiv(arr[i])); //添加row的子节点 cell
            }
	if(con.firstChild==null)
	{
		con.appendChild(row);
	}else
	{
		con.insertBefore(row,con.firstChild);
	}
}
function createCell(){
	var temp=['cell','cell','cell','cell'];
	var i=Math.floor(Math.random()*4);
	temp[i]='cell black';
	return temp;
}
function delrow(){
	var con=$('con');
	if(con.childNodes.length==6)
		{con.removeChild(con.lastChild);}
}

function remove(){
	var con=$('con');
	var top = parseInt(window.getComputedStyle(con, null)['top']);
	     top = 0;
if(speed + top > 0){
                top = 0;
            }else{
                top += speed;
            }            
        con.style.top = top + 'px';

        if(top == 0){
            createRow();
            con.style.top = '-100px';
            delrow();
        }else 
        if(top == (-100 + speed)){
            var rows = con.childNodes;
            if((rows.length == 5) && (rows[rows.length-1].pass !== 1) ){
                fail();
            }
        }
    }
function fail(){
            clearInterval(clock);
            confirm('你的最终得分为 ' + parseInt($('score').innerHTML) );
        }
function judge(ev){
    if (ev.target.className.indexOf('black') != -1) {
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑块已经被点击
        score();
    }
}
 function speedup(){
            speed += 2;
            if(speed == 20){
                alert('你超神了');
            }
        }
 function score(){
            var newscore = parseInt($('score').innerHTML) + 1;
            $('score').innerHTML = newscore;
            if(newscore % 10 == 0){
                speedup();
            }
        }
init();