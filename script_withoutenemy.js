var can=document.querySelector('canvas');
can.width=window.innerWidth;
can.height=window.innerHeight;
var c=can.getContext('2d');

const XSTARTINGOFGAME=100;
const YSTARTINGOFGAME=100;

const NOOFROWS=4;
const NOOFCOLUMNS=4;
const WIDTHOFEACHBLOCK=50;
const HEIGTHOFEACHBLOCK=50;

function drawRows(){
    for(let i=0;i<NOOFROWS+1;i++){
        c.beginPath();
        c.moveTo(XSTARTINGOFGAME,YSTARTINGOFGAME+i*HEIGTHOFEACHBLOCK);
        c.lineTo(XSTARTINGOFGAME+WIDTHOFEACHBLOCK*NOOFCOLUMNS,YSTARTINGOFGAME+i*HEIGTHOFEACHBLOCK);
        c.strokeStyle='black';
        c.stroke();}
}

function drawColumns(){
    for(let i=0;i<NOOFCOLUMNS+1;i++){
        c.beginPath();
        c.moveTo(XSTARTINGOFGAME+i*WIDTHOFEACHBLOCK,YSTARTINGOFGAME);
        c.lineTo(XSTARTINGOFGAME+i*WIDTHOFEACHBLOCK,YSTARTINGOFGAME+HEIGTHOFEACHBLOCK*NOOFROWS);
        c.strokeStyle='black';
        c.stroke();}
}

function drawBackGround(){
    drawRows();
    drawColumns();
}

var playerLocation=[100,100];

const RADIUSOFPLAYER=20;
function drawPlayer(){
    c.beginPath();
    c.arc(playerLocation[0],playerLocation[1],RADIUSOFPLAYER,0,Math.PI*2,false);
    c.strokeStyle='blue';
    c.stroke();
}

const RADIUSOFSMALLCIRCLE=20;
const RADIUSOFVISIBLESMALLCIRCLE=10;

function drawSmallCircle(x,y){
    c.beginPath();
    c.arc(x,y,RADIUSOFVISIBLESMALLCIRCLE,0,Math.PI*2,false);
    c.strokeStyle='red';
    c.stroke();
}

function drawSmallCircles(){
    for(var i=0;i<NOOFROWS+1;i++){
        for(var j=0;j<NOOFCOLUMNS+1;j++){
            drawSmallCircle(XSTARTINGOFGAME+i*WIDTHOFEACHBLOCK,YSTARTINGOFGAME+j*HEIGTHOFEACHBLOCK);
        }
    }
}

function insideCircle(x1,y1,x2,y2){
    var dis=Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
    if(dis<=RADIUSOFSMALLCIRCLE){
        return true;
    }
    else if(dis>RADIUSOFSMALLCIRCLE){
        return false;
    }
}

function insideAnyCircle(x,y){  
    var got=false;
    var movement=[undefined,undefined];
  
    for(var i=0;i<NOOFROWS+1;i++){
        for(var j=0;j<NOOFCOLUMNS+1;j++){
             if((XSTARTINGOFGAME+i*WIDTHOFEACHBLOCK==playerLocation[0])^((YSTARTINGOFGAME+j*HEIGTHOFEACHBLOCK)==playerLocation[1])){
                if(insideCircle(XSTARTINGOFGAME+i*WIDTHOFEACHBLOCK,YSTARTINGOFGAME+j*HEIGTHOFEACHBLOCK,x,y)==true){
                    movement[0]=i;
                    movement[1]=j;
                    got=true;
                    break;
                }
            }
        }
        if(got==true){
            break;
        }
    }
    return movement;
}

var clicked=false;
var mousePosition=[undefined,undefined];
function onMouseClick(event){
    //if(clicked==false){
        mousePosition[0]= event.clientX;
        mousePosition[1]=event.clientY;
        clicked=true;
   // }
}

const VELOCITYOFPLAYER=10;

function movePlayerTo(x,y){
    if(playerLocation[0]==x){
        if(playerLocation[1]>y){
            playerLocation[1]=playerLocation[1]-VELOCITYOFPLAYER;     
        }
        else if(playerLocation[1]<y){
            playerLocation[1]=playerLocation[1]+VELOCITYOFPLAYER;     
        }
    }
    else if(playerLocation[1]==y){
        if(playerLocation[0]>x){
            playerLocation[0]=playerLocation[0]-VELOCITYOFPLAYER;     
        }
        else if(playerLocation[0]<x){
            playerLocation[0]=playerLocation[0]+VELOCITYOFPLAYER;     
        }
    }
}

function updatePlayer(){
    var destination=[undefined,undefined];
    [destination[0],destination[1]]=insideAnyCircle(mousePosition[0],mousePosition[1]); 
    
    if(destination[0]!=undefined && destination[1]!=undefined){
        movePlayerTo(XSTARTINGOFGAME+ WIDTHOFEACHBLOCK*destination[0],YSTARTINGOFGAME+ HEIGTHOFEACHBLOCK *destination[1]);
    }
    if((XSTARTINGOFGAME+ WIDTHOFEACHBLOCK*destination[0])==playerLocation[0] && ((YSTARTINGOFGAME+ HEIGTHOFEACHBLOCK *destination[1])==playerLocation[1])){
        clicked=false;
    }
}

function update(){
    c.clearRect(0,0,can.width,can.height);
    updatePlayer();
}

function draw(){
    drawBackGround();
    drawPlayer();
    drawSmallCircles();
}

function main(){
    requestAnimationFrame(main);
    update();
    draw();
}
main();
