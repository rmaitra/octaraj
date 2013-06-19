<?php
//write command to in.txt on server
$in = fopen("in.txt","w") or die('fopen failed');
$cmd = $_GET['var1'];


//if a plot command
if(strstr($cmd,'plot') || strstr($cmd,'hist')){
	exec('rm *.jpg');
	fwrite($in,"h=figure(1,'visible','off');");
	fwrite($in,$cmd . ";");
	fwrite($in,"print(h,'-djpg','" . $cmd . ".jpg');");
	fclose($in);
	
	//execute command
	exec('octave -q in.txt > out.txt');
	
	//print to screen
	echo '</br><img src="' . $cmd . '.jpg" height="400" width="400">';
}
else{
	fwrite($in,$cmd);
	fclose($in);
	
	//execute command
	exec('octave -q in.txt > out.txt');
	
	//read output
	$out = fopen("out.txt","r") or die('fopen failed');
	echo "</br>";
	while (!feof($out)){
		$line = fgets($out);
		echo $line . "</br>";
	}
	fclose($out);
}




?>
