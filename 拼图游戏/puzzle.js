var time;
var pause=true;//ture表示是暂停
var set_timer;
var d=new Array(10);
var d_direct=new Array(
        [0],[2,4],[1,3,5],[2,6],[1,5,7],[2,4,6,8],
        [3,5,9],[4,8],[5,7,9],[6,8]
    );//各个位置可以移动的位置。
var d_posXY=new Array(
        [0],[0,0],[140,0],[280,0],[0,140],
        [140,140],[280,140],[0,280],[140,280],[280,280]
    );//各个位置的坐标。
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;
//存储九个方块。

function reset(){
    time=0;
    random_d();
    if(pause){start();}
}

function start(){
    if(pause){
        document.getElementById("start").innerHTML="暂停";//把按钮文字设置为暂停
        pause=false;//暂停表示设置为false
        set_timer=setInterval(timer,1000);//启动定时
        //如果当前是暂停，则开始
    }else{
        document.getElementById("start").innerHTML="开始";
        pause=true;
        clearInterval(set_timer);
    }
}

function timer(){
    time+=1;//一秒钟加一，单位是秒
    var min=parseInt(time/60);//把秒转换为分钟，一分钟60秒，取商就是分钟
    var sec=time%60;//取余就是秒
    document.getElementById("timer").innerHTML=min+"分"+sec+"秒";//然后把时间更新显示出来
}

function random_d(){
    for(var i=9; i>1; --i){
        var to=parseInt(Math.random()*(i-1)+1);//产生随机数，范围为1到i，不能超出范围，因为没这个id的DIV
        if(d[i]!=0){
            document.getElementById("box"+d[i]).style.left=d_posXY[to][0]+"px";
            document.getElementById("box"+d[i]).style.top=d_posXY[to][1]+"px";
        }
        // alert(d[i]+"he"+d[to]);

        //把当前的DIV位置设置为随机产生的DIV的位置
        if(d[to]!=0){
            document.getElementById("box"+d[to]).style.left=d_posXY[i][0]+"px";
            document.getElementById("box"+d[to]).style.top=d_posXY[i][1]+"px";
        }
        //把随机产生的DIV的位置设置为当前的DIV的位置
        var tem=d[to];
        d[to]=d[i];
        d[i]=tem;
        //然后把它们两个的DIV保存的编号对调一下
    }
}

function move(id){
    //移动函数，前面我们已将讲了
    var i=1;
    for(i=1; i<10; ++i){
        if( d[i] == id )
            break;
    }
    //这个for循环是找出小DIV在大DIV中的位置
    var target_d=0;
    //保存小DIV可以去的编号，0表示不能移动
    target_d=whereCanTo(i);
    //用来找出小DIV可以去的位置，如果返回0，表示不能移动，如果可以移动，则返回可以去的位置编号
    if( target_d != 0){
        d[i]=0;
        //把当前的大DIV编号设置为0，因为当前小DIV已经移走了，所以当前大DIV就没有装小DIV了
        d[target_d]=id;
        //把目标大DIV设置为被点击的小DIV的编号
        document.getElementById("box"+id).style.left=d_posXY[target_d][0]+"px";
        document.getElementById("box"+id).style.top=d_posXY[target_d][1]+"px";
        //最后设置被点击的小DIV的位置，把它移到目标大DIV的位置
    }
    //如果target_d不为0，则表示可以移动，且target_d就是小DIV要去的大DIV的位置编号
    var finish_flag=true;
    //设置游戏是否完成标志，true表示完成
    for(var k=1; k<9; ++k){
        if( d[k] != k){
            finish_flag=false;
            break;
            //如果大DIV保存的编号和它本身的编号不同，则表示还不是全部按照顺序排的，那么设置为false，跳出循环，后面不用再判断了，因为只要一个不符，就没完成游戏
        }
    }
    //从1开始，把每个大DIV保存的编号遍历一下，判断是否完成
    if(finish_flag==true){
        if(!pause)
            start();
        alert("congratulation");
    }
    //如果为true，则表示游戏完成，如果当前没有暂停，则调用暂停韩式，并且弹出提示框，完成游戏。
    //start()这个函数是开始，暂停一起的函数，如果暂停，调用后会开始，如果开始，则调用后会暂停
}

function whereCanTo(cur_div){
    //判断是否可移动函数，参数是大DIV的编号，不是小DIV的编号，因为小DIV编号跟可以去哪没关系，小DIV是会动的
    var j=0;
    var move_flag=false;
    for(j=0; j<d_direct[cur_div].length; ++j){
        //把所有可能去的位置循环遍历一下
        if( d[ d_direct[cur_div][j] ] == 0 ){
            move_flag=true;
            break;
        }
        //如果目标的值为0，说明目标位置没有装小DIV，则可以移动，跳出循环
    }
    if(move_flag == true){
        return d_direct[cur_div][j];
    }else{
        return 0;
    }
    //可以移动，则返回目标位置的编号，否则返回0，表示不可移动
}


window.onload=function(){
    reset();
}