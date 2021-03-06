//The Home Server Website Command-Line
//By Raj Maitra


//Global Variables
//------------------------------------------------------------------//
var code
var character;
var input, element;
var visible = true;
var startdrag = false;
var terminal = document.getElementById("terminal");
var x, y, xpost, ypost
var lastInput = "";
var prompt = ">> ";
var store = '';


//Prompt functionality: blinking cursor, typing, backspace and inputs and printing
//-----------------------------------------------------------------//
setInterval(function(){blink()}, 700 );
function blink(){
	var cursor = document.getElementById("cursor");
	if (visible){
		cursor.style.visibility="hidden";
		visible = false;
	}
	else{
		cursor.style.visibility="visible";
		visible = true;
	}
}

//newline/enter
document.onkeypress = (function(e){
	var e=window.event || e;
		character = String.fromCharCode(e.charCode);
	if(e.keyCode == 13){//newline
		enter()
	}
	else if(e.keyCode == 32){
		input = document.getElementById("input");
		input.innerHTML+='&nbsp';
	}
	else{
		input = document.getElementById("input");
		input.innerHTML+=character;
	}
});

//override backspace
document.onkeydown = (function(e){
	if(e.keyCode == 8 || e.keyCode == 46){
		backspace();
		return false;
	}	
	if(e.keyCode == 38){
		printLastInput();
	}
});

//backspace, delete last character
function backspace(){
	var text = input.innerHTML;
	text = text.replace(/.$|&nbsp;$/, '');
	input.innerHTML = text;
};

//enter the command and print the new prompt
function enter(){
	lastInput = input.innerHTML;
	//if clear
	if(input.innerHTML == "clear"){
		document.getElementById("terminal").innerHTML = "";
		//message
		var span = document.createElement("span")
		span.innerHTML = "Octaraj<br><br>";
		document.getElementById("terminal").appendChild(span);
	}
	//if ls
	else if(input.innerHTML != ""){
		cmd(input.innerHTML);
		changePrevPrompt();
	}
	//if input is nothing good
	else{
		changePrevPrompt();
	}
	printPrompt();
}
function printLastInput(){
	input.innerHTML = lastInput;
}
//prompt functions, print the prompt
function changePrevPrompt(){
	//change last input id
	document.getElementById("input").id = "last_input";
	document.getElementById("output").id = "last_output";
	document.getElementById("terminal").appendChild(document.createElement("br"));
	node = document.getElementById("cursor");
	node.parentNode.removeChild(node);
}
function printPrompt(){
	//prompt
	var span = document.createElement("span")
	span.id = "prompt";
	span.innerHTML = prompt;
	document.getElementById("terminal").appendChild(span);
	
	//input
	span = document.createElement("span")
	span.id = "input";
	document.getElementById("terminal").appendChild(span);
	input = span;
	
	//cursor
	span = document.createElement("span")
	span.id = "cursor";
	span.innerHTML = "|";
	document.getElementById("terminal").appendChild(span);
	
	//output
	span = document.createElement("span")
	span.id = "output";
	document.getElementById("terminal").appendChild(span);
}
//--------------------------------------------------------------------------------



//All Unix Commands
//-------------------------------------------------------------------------------
function cmd(command){
	//parse command and format it properly
	command = command.replace(/\+/, '%2B');
	command = command.replace(/&nbsp;/g, '');
	/*if(command.search(';') == -1){
		command += ';';
	}*/
	//if a store then add to the store variable 
	if(command.search('=') != -1){
		store += command;
		//$('#output').load('octave-control.php?var1='+command);
		//alert('here');
		$('#output').load('octave_system.php?var1='+command);
	}
	//if not a store, then load variables in store, and then commands
	else{
		//$('#output').load('octave-control.php?var1='+store+command);
		//alert('here1');
		$('#output').load('octave_system.php?var1='+store+command);
	}
	
}
//------------------------------------------------------------------------------





//Miscellaneous
//------------------------------------------------------------------------------
/*function mousedown(e){
	x = e.clientX;
	y = e.clientY;
	xpost = e.clientX;
	ypost = e.clientY;
	startdrag = true;
}
function mouseup(e){
	startdrag = false;
}
function mousemove(e){
	xpost = e.clientX;
	ypost = e.clientY;
	if(startdrag){
		var dx = (x-xpost);
		var dy = (y-ypost);
		x = xpost;
		y = ypost;
		var x2 = this.offsetLeft - dx;
		var y2 = this.offsetTop - dy;
		this.style.left = x2 + "px";
		this.style.top = y2 +"px";
	}
}
document.getElementById("terminal").addEventListener('mousedown', mousedown, false );
document.getElementById("terminal").addEventListener('mousemove', mousemove, false );
document.getElementById("terminal").addEventListener('mouseup', mouseup, false );*/
