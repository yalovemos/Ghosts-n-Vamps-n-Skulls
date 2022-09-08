
var record=0;
if (localStorage.getItem("GhostsVampsSkulls") !== null)
	{	
	record=parseInt(localStorage.getItem("GhostsVampsSkulls"));
	}
	
canvas       = document.getElementById("mycanvas");
context      = canvas.getContext("2d");

var cWidth = 1000;
var cHeight = 1400; 
canvas.width = cWidth;
canvas.height = cHeight;

var fps = 60, 
elapsed, 
mainCounter = 0;

game_running = false;



var CanvasSize;
function resize()
	{
	context.setTransform(1, 0, 0, 1, 0, 0);
	CanvasSize=document.getElementById("canvasDIV").clientWidth/cWidth;		
	context.scale(CanvasSize,CanvasSize);
	}

document.body.onresize = function(){resize();}


var P = [];
var AA = []; 
var SA = []; 

var Life=100,
metros=0,
Vel=3,
VelTurbo=1,
AAid=1,
SAid=1;



function resetPlayers()
	{
	P=[{tipo:2, x:180, y:amigoY+400, w:amigoW, h:amigoW, LastShoot:0, nextPos:180, damage:0, paso:0},
	   {tipo:1, x:500, y:amigoY+400, w:amigoW, h:amigoW, LastShoot:0, nextPos:500, damage:0, paso:8},
	   {tipo:3, x:820, y:amigoY+400, w:amigoW, h:amigoW, LastShoot:0, nextPos:820, damage:0, paso:15}];	
	}
	



var pasoVol=0.2;


let zzfxX,zzfxR;

//****************************** MUSIC **************************************	
zzfx=(...t)=>zzfxP(zzfxG(...t))
zzfxP=(...t)=>{let e=zzfxX.createBufferSource(),f=zzfxX.createBuffer(t.length,t[0].length,zzfxR);t.map((d,i)=>f.getChannelData(i).set(d)),e.buffer=f,e.connect(zzfxX.destination),e.start();return e}
zzfxG=(q=1,k=.05,c=220,e=0,t=0,u=.1,r=0,F=1,v=0,z=0,w=0,A=0,l=0,B=0,x=0,G=0,d=0,y=1,m=0,C=0)=>{let b=2*Math.PI,H=v*=500*b/zzfxR**2,I=(0<x?1:-1)*b/4,D=c*=(1+2*k*Math.random()-k)*b/zzfxR,Z=[],g=0,E=0,a=0,n=1,J=0,K=0,f=0,p,h;e=99+zzfxR*e;m*=zzfxR;t*=zzfxR;u*=zzfxR;d*=zzfxR;z*=500*b/zzfxR**3;x*=b/zzfxR;w*=b/zzfxR;A*=zzfxR;l=zzfxR*l|0;for(h=e+m+t+u+d|0;a<h;Z[a++]=f)++K%(100*G|0)||(f=r?1<r?2<r?3<r?Math.sin((g%b)**3):Math.max(Math.min(Math.tan(g),1),-1):1-(2*g/b%2+2)%2:1-4*Math.abs(Math.round(g/b)-g/b):Math.sin(g),f=(l?1-C+C*Math.sin(2*Math.PI*a/l):1)*(0<f?1:-1)*Math.abs(f)**F*q*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-y):a<e+m+t?y:a<h-d?(h-a-d)/u*y:0),f=d?f/2+(d>a?0:(a<h-d?1:(h-a)/d)*Z[a-d|0]/2):f),p=(c+=v+=z)*Math.sin(E*x-I),g+=p-p*B*(1-1E9*(Math.sin(a)+1)%2),E+=p-p*B*(1-1E9*(Math.sin(a)**2+1)%2),n&&++n>A&&(c+=w,D+=w,n=0),!l||++J%l||(c=D,v=H,n=n||1);return Z}
zzfxV=.3 // main volume
zzfxR=44100

const song1 = [[[,0,77,,,.7,2,.41,,,,,,,,.06],[,0,43,.01,,.3,2,,,,,,,,,.02,.01],[,0,170,.003,,.008,,.97,-35,53,,,,,,.1],[.8,0,270,,,.12,3,1.65,-2,,,,,4.5,,.02],[,0,86,,,,,.7,,,,.5,,6.7,1,.05],[,0,41,,.05,.4,2,0,,,9,.01,,,,.08,.02],[,0,2200,,,.04,3,2,,,800,.02,,4.8,,.01,.1],[.3,0,16,,,.3,3]],[[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33],[3,1,22,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,24,,,,,,,,,,,,,,,,,,,,,,,,22,,22,,22,,,,],[5,-1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[,1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,]],[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33],[3,1,24,,,,,,,,27,,,,,,,,,,,,,,,,27,,,,24,,,,24,,,,,,,,27,,,,,,,,,,,,,,,,24,,24,,24,,,,],[5,-1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[,1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[6,1,,,34,34,34,,,,,,34,34,,,,,34,,,,34,34,,,,,34,,,,34,,,,34,34,34,,,,,,34,,,,,,34,34,,,34,34,,,,,,,,,34,34],[4,1,,,,,,,24,,,,,,24,,24,,,,24,,,,24,,,,,,,,,,,,,,,,24,,,,,,24,,24,,,,24,,,,24,,,,,,,,,,]],[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,23,23,35,23,23,36,23,23,35,23,23,36,23,23,35,35,23,23,35,23,23,35,23,23,36,23,23,35,23,23,36,36],[5,-1,21,,,19,,,21,,,,,,,,,,21,,,19,,,17,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],[3,1,24,,,24,,,24,,,,,,,,,,24,,,24,,,24,,,,24.75,24.5,24.26,24.01,24.01,24.01,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25],[4,-1,,,,,,,,,,,,,,,,,,,,,,,,,,,24.75,24.5,24.26,24.01,24.01,24.01,24.01,24,,24,24,,24,24,24,24,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24],[7,-1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,23,,21,23,,35,,23,,21,23,,35,,35,,23,,21,23,,35,,21,23,,35,,21,23,,,],[6,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34,36,34,,33,34,34,36,31,36,34,,31,34,32,,33,36,34,,31,34,34,36,33,36,33,,31,,,]],[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,17,17,29,17,17,29,17,17,29,17,17,29,17,17,29,29,17,17,29,17,17,29,17,17,29,17,17,29,17,17,29,29],[4,1,24,24,,24,24,,24,24,24,24,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24],[7,-1,21,,19,21,,33,,21,,19,21,,33,,33,,21,,19,21,,33,,21,,19,21,,33,,33,,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29],[2,1,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,,,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,,,],[6,1,,,36,,,,,,36,,36,,,,,,,,36,,,,,,36,,36,,,,,,,,36,,,,,,,,,,,,,,,,36,,,,,,36,,36,,,,,,],[3,1,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25,,,,,25,,,,,25,,,25,,,,,,,,25,,,,,,,,25,25,25,25]],[[1,-1,14,14,26,14,14,26,14,14,26,14,14,26,14,14,26,26,14,14,26,14,14,26,14,14,26,14,14,26,14,14,26,26,17,17,29,17,17,29,17,17,29,17,17,29,17,17,29,29,19,19,31,19,19,31,19,19,31,19,19,31,19,19,31,31],[4,1,24,24,,24,24,,24,24,24,24,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,24,,24,24,,36,,24,24,,24,24,,24,24,24,24,,24,24,,24,24],[7,-1,14,,14,14,26,14,14,26,14,,14,14,26,14,14,26,14,,14,14,26,14,14,26,14,,14,14,26,14,14,26,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29,19,,19,19,31,19,19,31,19,,19,19,31,19,19,31],[2,1,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,,,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,,,],[3,1,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25],[6,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34,,,,,,34,,34,,,,,,,,34,,,,,,34,,34,,,,,,]]],[0,1,1,2,3,4,4]]
let currentNode = null;
let currentSong = null;
let currentBuffer = null;
	const renderSong = song => new Promise(resolve => requestIdleCallback(()=>resolve(zzfxM(...song))));

const playSong = async song => 
	{
	if (currentNode) 
		{
		currentNode.stop();
		}
	if (!currentBuffer) 
		{
		currentBuffer = await renderSong(song1);
		}
	currentNode = zzfxP(...currentBuffer);
	currentNode.loop = true;
	zzfxX.suspend();
	}

const stopSong = async () => {
  if (currentNode) {
    currentNode.stop();
  }
  await stopSong();
}

//****************************** MUSIC **************************************	  


function play()
	{	
	zzfxX=new(top.AudioContext||webkitAudioContext);
	zzfx(...[2.68,,465,.01,.01,.06,4,2.63,2.6,-2,,,.03,1.2,18,.5,.16,.42,.04,.23]);
	//! ZzFXM (v2.0.3) | (C) Keith Clark | MIT | https://github.com/keithclark/ZzFXM
	zzfxM=(n,f,t,e=125)=>{let l,o,z,r,g,h,x,a,u,c,d,i,m,p,G,M=0,R=[],b=[],j=[],k=0,q=0,s=1,v={},w=zzfxR/e*60>>2;for(;s;k++)R=[s=a=d=m=0],t.map((e,d)=>{for(x=f[e][k]||[0,0,0],s|=!!f[e][k],G=m+(f[e][0].length-2-!a)*w,p=d==t.length-1,o=2,r=m;o<x.length+p;a=++o){for(g=x[o],u=o==x.length+p-1&&p||c!=(x[0]||0)|g|0,z=0;z<w&&a;z++>w-99&&u?i+=(i<1)/99:0)h=(1-i)*R[M++]/2||0,b[r]=(b[r]||0)-h*q+h,j[r]=(j[r++]||0)+h*q+h;g&&(i=g%1,q=x[1]||0,(g|=0)&&(R=v[[c=x[M=0]||0,g]]=v[[c,g]]||(l=[...n[c]],l[2]*=2**((g-12)/12),g>0?zzfxG(...l):[])))}m=G});return[b,j]}

	playSong(song1);
	
	
	setTimeout(function(){ zzfxX.resume();},2000);
	reset();
	
	Vel=3;
	game_running=true;
	Life=100;
	
	
	
	
	setTimeout(function(){ 
				document.getElementById('SwapLine1').style.left="17%";
				document.getElementById('SwapLine2').style.left="52%";},4000);
	

	

	document.getElementById('Gametitle').style.display="none";
	document.getElementById("mainMenu").style.display="block";
	document.getElementById('botonPlay').style.display="none";
	
	
	
	document.getElementById('gameStartMSG').style.opacity="0";
	document.getElementById("gameStartMSG").style.display="block";
	setTimeout(function(){document.getElementById('gameStartMSG').style.opacity="1";},10);
	setTimeout(function(){document.getElementById('gameStartMSG').style.opacity="0";},6000);
	setTimeout(function(){document.getElementById('gameStartMSG').style.display="none";},9000);
	
	document.getElementById('gameMSG').style.display='none';
			
	mainCounter=0;
	
	setTimeout(function(){document.getElementById("mainMenu").style.display="none";},1000);
	}
	

	
function reset()
	{		
	AAtype=2;

	AA=[];
	SA=[];
	
	resetPlayers();
	
	mainCounter=0;
	AAid=1;
	SAid=1;

	game_running=false;
	
	document.getElementById('gameMSG').style.display ="none";
	metros=0;

	document.getElementById('Gametitle').style.display="block";
	document.getElementById('botonPlay').style.display="block";
	document.getElementById("mainMenu").style.display="block";
	document.getElementById("gameStartMSG").style.display="none";

	context.fillStyle="#000000";
	context.fillRect(0, 0, CanvasSize, CanvasSize);	
	}
	
	

	

function swap(a)
	{
	zzfx(...[,,130.8128,.03,.03,.2,1,1.52,9,,,,,,,,,.8]);
	var change=false;
	for (i=0; i < P.length; i++) 
		{
		if(a==1)
			{
			switch(P[i].nextPos)
				{
				case 180: P[i].nextPos=500; break;
				case 500: P[i].nextPos=180; break;
				}
			}
		if(a==2)
			{
			switch(P[i].nextPos)
				{
				case 820: P[i].nextPos=500; break;
				case 500: P[i].nextPos=820; break;
				}
			}
		}


	document.getElementById('SwapLine'+a).style.borderColor='#f5e878';
	document.getElementById('SwapButton'+a).style.borderColor='#f5e878';

	setTimeout(function(){
						 document.getElementById('SwapLine'+a).style.borderColor='#303030';
						 document.getElementById('SwapButton'+a).style.borderColor='#404040';
						 },50);
	}

		
		
		
var amigoW=150;
var amigoY=(cHeight-325);



var viaLibre=[0,0,0];
var RGB=["#ad5555","#5d915c","#507ab5"];
var RGBd=["#612f2f","#385937","#334b6b"];


function newA(tipo,x,y,w,h)
	{    
	var A = {id : AAid, tipo:tipo, x:x, y:y, w:w, h:h, damage:-1, fx1:Math.floor(Math.random()*359)+1,fx2:Math.floor(Math.random()*359)+1};
	AA.push(A); 
	AAid++;
	}
	
function newS(tipo,x,y)
	{    
	var A = {id : SAid, tipo:tipo, x:x, y:y, decay:1};
	SA.push(A);
	SAid++;
	}

	


resetPlayers();

context.imageSmoothingEnabled = false;
  
(function(window, document, undefined)
	{   
	function calcularDistancia(ax,ay,bx,by)
		{
		var a = (ax - bx);
		var b = (ay - by);
		var c = (Math.sqrt( a*a + b*b )); 
		return (c); 
		}





	//----------------------------------- LOOP ------------------------------------------------------------------------

	var requestAnimationFrame;
	(function() {
				  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
											  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				  window.requestAnimationFrame = requestAnimationFrame;
				})();
						
						
	function request() 
		{			
		var fpsInterval, startTime, now, then;			
		function startAnimating(fps) 
			{
			fpsInterval = 1000 / fps;
			then = Date.now();
			startTime = then;
			animate();
			}

		function animate() 
			{
			requestAnimationFrame(animate);
			now = Date.now();
			elapsed = now - then;
			if (elapsed > fpsInterval) 
				{
				then = now - (elapsed % fpsInterval);
				if(game_running)
					render();
				}
			}
		startAnimating(fps);
		}
		
		
		
	request();	

	function render()
		{
		mainCounter++;

		metros+=.019;	

		pasoVol-=.0007;
		if(pasoVol > 0)
			{
			if(mainCounter%20==0)
				zzfx(...[pasoVol,,236,,,.04,4,.6,,,,,,.5,,.2,,.99]); 
			}
				
		//mover amigos
		for (i=0; i < P.length; i++) 
			{
			
			if(P[i].y > amigoY)
				{
				P[i].y-=1.5;
				}
			if(mainCounter>260)
				P[i].LastShoot+=5.3*Vel;
			if(P[i].LastShoot > 1000)
				P[i].LastShoot=1000;
			
			if(P[i].x != P[i].nextPos)
				{
				if(P[i].x > P[i].nextPos)
					{
					P[i].x-=20+Vel;
					if(P[i].x < P[i].nextPos)
						P[i].x=P[i].nextPos;
					}
				else
					{
					P[i].x+=20+Vel;
						if(P[i].x > P[i].nextPos)
						P[i].x=P[i].nextPos;
					}				
				}
			}

		
		
		//mover enemigos
		var tiposLibres=[1,2,3];
		var cerca;
		for (i=0; i < AA.length; i++) 
			{	
			cerca=0;

			//disparar
			if(AA[i].damage==-1 && AA[i].y + 500 > amigoY)
				{
				cerca=2;
				
				var FF=-1;
				for (j=0; j < P.length; j++) 
					{
					if(AA[i].x == P[j].x) // en frente
						FF=j;
					}
					
				if(FF>-1 && P[FF].LastShoot==1000)
					{
					// DISPARA !
					newS(P[FF].tipo,AA[i].x,amigoY);
					switch(P[FF].tipo)
						{
						case 1: zzfx(...[0.3,,220,.04,.07,.08,,1.28,7.2,2.8,,,,1.8,,,,.89,.03]); break;
						case 2: zzfx(...[0.7,,500,.01,.15,.23,1,1.06,-1.3,-0.6,,,,3,,,,.56,.24]); break;
						case 3: zzfx(...[1.1,.01,407,.02,.01,.04,,.7,-6.8,,,,,.8,,.1,,.8,.06,.17]);  break;
						}
					P[FF].LastShoot=0;
					}
				}
				
			//colision	
			if(AA[i].damage==-1 &&  AA[i].y + 90 > amigoY)
				{
				if(AA[i])
					{
					var FF=-1;
					for (j=0; j < P.length; j++) 
						{
						if(AA[i].x == P[j].x) // en frente
							FF=j;
						}	
						
					Life-=10;
					
					if(P[FF])
						P[FF].damage=16;
					
					AA.splice(i, 1);
					  zzfx(...[0.4,,316,.01,.04,.03,3,.93,-7.3,,,,,1.7,,.3,,.8,.07,.41]);
					}
				}
			else
				{
				AA[i].y+=(Vel*VelTurbo)+cerca;				
				}
					
			if(AA[i] && AA[i].damage>-1 && AA[i].damage<0)
				{	
				AA.splice(i, 1);
				zzfx(...[0.3,,662,.1,.2,.8,1,0,,-0.2,,,,1.2,,.26,.01,,.2]);
				}
				
			if(Life<=0)
				{
				if(parseInt(metros)>parseInt(record))
					{
					localStorage.setItem("GhostsVampsSkulls", String(metros));
					record=parseInt(metros);
					}
					
				game_running=false;
				currentNode.stop();
				document.getElementById('gameMSG').style.display="block";
							
				document.getElementById('SwapLine1').style.left="-50%";
				document.getElementById('SwapLine2').style.left="150%";
		
				
					
				document.getElementById('gameMSG').innerHTML="<br><font style='font-size:25px; color:orange;'>Game Over<br>"+
					"<font style='font-size:35px; color:silver;'>"+parseInt(metros)+" mtrs<br></font>"+
					"<font style='font-size:20px; color:#6c8dc4;'>Best "+parseInt(metros)+" mtrs<br><br></font>"+
					"<div class='blink_me' onclick='reset();' style='display:inline-block; text-align:center; padding:6px 20px 6px 20px; font-size:20px; color:#d3fc6f; font-weight:500; box-shadow: 0px 0px 10px 5px #86a145; border-radius:10px; border:3px solid #d3fc6f; background-color:rgba(0,0,0,0.5);'>"+
					"try again</div><br><br>";
				}
			
						
			
			Vel+= parseInt(35/Vel)/110000 ; 
			
			if(AA[i].y<=0) 
				{
				const index = tiposLibres.indexOf(AA[i].tipo); 
				if (index > -1) 
					tiposLibres.splice(index, 1);
				}

			}
			
		
		//mover disparos
		for (i=0; i < SA.length; i++) 
			{	
			// colisiones
			var FF=-1;
			
			if(SA[i].decay>0.5)
				for (j=0; j < AA.length; j++) 
					{
					if(AA[j].damage==-1 && SA[i].x == AA[j].x && SA[i].y-75 < AA[j].y && SA[i].tipo == AA[j].tipo) // en frente
						FF=j;
					}
				
			if(FF>-1)
				{
				AA[FF].damage=16;
				SA.splice(i, 1);
				}
			
			if(SA[i])
				{
				SA[i].y-=7;
				if(SA[i] && SA[i].y < 800)
					{
					SA[i].decay-=0.05;
					if(SA[i].decay<0)
						SA.splice(i, 1);
					}
				}
			}
			
			
		Life+=.02;
		if(Life>100)
			Life=100;

		viaLibre=viaLibre.map(function(val){return val-(Vel*VelTurbo);});

		for(var via=0; via<3; via++)
			if(viaLibre[via]<-800) 
				{
				var xpos=180;
				var H=Math.floor(Math.random()*500);
				var W=300; 
				viaLibre[via]=H;
				switch(via) 
					{
					case 0: xpos=180 ; break; 
					case 1: xpos=500 ; break; 
					case 2: xpos=820 ; break;
					}
				
				var type=tiposLibres[Math.floor(Math.random()*tiposLibres.length)];
				tiposLibres.splice(tiposLibres.indexOf(type), 1);
				
				if(type)
					{
					var num=Math.floor(Math.random()*4)+1;
					for(var i=0; i<num; i++)
					newA(type, xpos, -H-10-(i*220),190, 190); // tipo, x, y, w ,h //x 25 , 350, 675
					}
				}
			
			





				
		//------------- PINTAMOS -------------		
		//----- clearrect Clear screen -----
		
		context.shadowBlur = 0;
		context.fillStyle="#151515";
		context.fillRect(0, 0, cWidth+1, cHeight);
		
	
		
		
		//pintamos suelo
		context.globalAlpha = 0.4;
		var tileW=200;
		var tileH=200;
		var scrollFloor=mainCounter%(200);
		
		if(mainCounter<230)
			scrollFloor=230;
	
		for(var tileY = 0; tileY < (cHeight/tileH)+2; tileY++)
			{
			for(var tileX = 0; tileX < cWidth/tileW; tileX++) 
				{
				context.drawImage(Sprites,0,3*19, 19, 19,(tileX*tileW),((tileY*tileH)+(scrollFloor)*2)-400, tileW , tileH);
				}
			}
			
		
		context.globalAlpha = 1;
	
		
		var grt = context.createLinearGradient(0, cHeight-150, 0, cHeight);
		grt.addColorStop(0, "transparent");
		grt.addColorStop(1, "black");
		context.fillStyle = grt;
		context.fillRect(0, cHeight-150, cWidth+1, cHeight);

		
		context.shadowColor = '#000';
		context.shadowBlur = 20;
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		
		//sombra enemigos
		context.fillStyle = 'rgba(0,0,0,.3)';
		for (var i = 0; i < AA.length; i++) 
			{
			switch(AA[i].tipo)
				{
				case 1: context.beginPath(); AA[i].fx1=Math.cos((mainCounter/2)%360)*9; context.ellipse(AA[i].x,AA[i].y+AA[i].h+15, (AA[i].w/2), (AA[i].h/4)+AA[i].fx1, 0, 0, Math.PI*2); context.fill(); break;
				case 2: context.beginPath(); AA[i].fx1=Math.cos((mainCounter/10)%360)*15; context.ellipse(AA[i].x+AA[i].fx1,AA[i].y+AA[i].h+15, (AA[i].w/2), (AA[i].h/4), 0, 0, Math.PI*2); context.fill(); break;
				case 3: context.beginPath(); AA[i].fx1=Math.cos((mainCounter/6)%360)*15; context.ellipse(AA[i].x-(+AA[i].fx1/2),AA[i].y+AA[i].h+15, (AA[i].w/2)+AA[i].fx1, (AA[i].h/4), 0, 0, Math.PI*2); context.fill(); break;				
				}
			}
		
			
		// pintamos enemigos
		for (var i = 0; i < AA.length; i++) 
			{
			context.shadowColor = '#'+Math.ceil(AA[i].damage).toString(16)+Math.ceil(AA[i].damage).toString(16)+'0';
			if(AA[i].damage>-1) 
				{
				AA[i].w=AA[i].w-(AA[i].damage);
				context.globalAlpha = (100 - ((100/16)*(16-AA[i].damage)))/100;
				}
			switch(AA[i].tipo)
				{
				case 1: AA[i].fx1=Math.cos((mainCounter/2)%360)*9; context.drawImage(Sprites,(AA[i].tipo-1)*19,0, 19, 19,AA[i].x-(AA[i].w/2),AA[i].y, AA[i].w, AA[i].h+AA[i].fx1); break;
				case 2: AA[i].fx1=Math.cos((mainCounter/10)%360)*15; context.drawImage(Sprites,(AA[i].tipo-1)*19,0, 19, 19,AA[i].x-(AA[i].w/2)+AA[i].fx1,AA[i].y, AA[i].w, AA[i].h); break;
				case 3: AA[i].fx1=Math.cos((mainCounter/6)%360)*15; context.drawImage(Sprites,(AA[i].tipo-1)*19,0, 19, 19,AA[i].x-(AA[i].w/2)-(+AA[i].fx1/2),AA[i].y, AA[i].w+AA[i].fx1, AA[i].h); break;
				}
				
			context.globalAlpha = 1;
			context.shadowColor = '#000';
			
			if(AA[i].damage>-1)
				AA[i].damage-=.9;
			}
			
		
		
		//sombra amigos
		context.fillStyle = 'rgba(0,0,0,.3)';
		for (var i = 0; i < P.length; i++) 
			{
			context.beginPath(); 
			context.ellipse(P[i].x,P[i].y+P[i].h+15, (P[i].w/2), (P[i].h/4), 0, 0, Math.PI*2); 
			context.fill();
			}
			
			
		// pintamos disparos
		var Spritpos=0;
		for (var i = 0; i < SA.length; i++) 
			{
			context.globalAlpha = SA[i].decay;
			context.drawImage(Sprites,(SA[i].tipo-1)*19,95, 19, 19,SA[i].x-(60),SA[i].y, 120, 120);		
			context.globalAlpha = 1;
			}
			
			
		// pintamos amigos
		context.beginPath();
		for (var i = 0; i < P.length; i++) 
			{			
			var PasoSprite=19;
			P[i].paso++;
			if(P[i].paso>=20)
				PasoSprite=38;
			if(P[i].paso>=40)
				P[i].paso=0;
				
			
			context.shadowColor = '#'+Math.ceil(P[i].damage).toString(16)+'00';
				
			context.drawImage(Sprites,(P[i].tipo-1)*19,PasoSprite, 19, 19,P[i].x-(P[i].w/2),P[i].y, P[i].w, P[i].h);
			
			// arma
						
			context.globalAlpha = 0.3;
			context.drawImage(Sprites,(P[i].tipo-1)*19,76, 19, 19,P[i].x-60,P[i].y+180, 120, 120);
			context.globalAlpha = 1;
			//context.drawImage(Sprites,(P[i].tipo-1)*19,76, 19, (19/100)*(P[i].LastShoot/10),P[i].x-60,P[i].y+180, 120, (120/100)*(P[i].LastShoot/10));
			context.drawImage(Sprites,(P[i].tipo-1)*19,76+19-((19/100)*(P[i].LastShoot/10)), 19, ((19/100)*(P[i].LastShoot/10)),P[i].x-60,(P[i].y+180)+120-((120/100)*(P[i].LastShoot/10)), 120, (120/100)*(P[i].LastShoot/10));
			
			P[i].damage-=0.1;
			if(P[i].damage<0)
				P[i].damage=0;
			}
		
		context.shadowColor = '#000';
		
		context.globalAlpha = 1;
		
		var grt = context.createLinearGradient(0, 0, 0, 600);
		grt.addColorStop(0, "rgba(0,0,0,0.5)");
		grt.addColorStop(1, "transparent");
		context.fillStyle = grt;
		context.fillRect(0, 0, cWidth+1, 600);
		
		if(game_running)
			{
			// pintamos Life
			context.globalAlpha = 0.25;
			
			context.fillStyle="black";
			context.fillRect(150, 50 , 700 , 50);
			
			context.fillStyle='hsl('+ Life +',100%,50%)';
			context.fillRect(160 , 60 , Math.abs( (680/100)*Life )  , 30);
			
			
			context.globalAlpha = 0.4;
			//metros
			context.fillStyle = "silver";
			context.font      = "normal 60pt Arial";
			context.fillText(parseInt(metros) + " mtrs", 380, 180);
			
			if(parseInt(metros)>parseInt(record))
				{
				context.fillStyle = "yellow";
				}
			else
				{
				context.fillStyle = "#6c8dc4";
				}
			context.font      = "normal 35pt Arial";
			context.fillText("Best "+parseInt(record) + " mtrs", 380, 250);
			
			context.globalAlpha = 0.6;
			}
		
		context.globalAlpha = 1;
		

		}
	
	
	var Sprites = new Image();
	Sprites.src = "img/sprites.png?v="+Date();
	Sprites.onload = function() 
					{
					render();  				
					}  
			
	}(this, this.document))
	
resize();	