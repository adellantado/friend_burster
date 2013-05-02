<?php

deleteFile('content/'); // files older than 3min	
if ($_GET["download"]) {

	$download_url = $_GET["download"];
	$ch = curl_init($download_url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
    $result = curl_exec($ch);
    curl_close ($ch);
	
	$name = substr(str_shuffle(str_repeat('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',5)),0,10);
	$fp = "content/".$name.".jpg";
	if ($result) {
		file_put_contents($fp,$result);
		echo "http://lamour.in.ua/html5/".$fp;
	}
	
} else {
	echo "where is no download get param";
}

function deleteFile($path) {
	if ($handle = opendir($path)) {
		while (false !== ($file = readdir($handle))) {
			if (!is_dir($file)) {
				if (filemtime($path.$file) < time() - 180) {
					unlink($path.$file);
					//break;
				}
			}
		}
		
		closedir($handle);
	}
}
?>