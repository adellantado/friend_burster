<?php

$content_path = "content/";
$img_ext = ".jpg";
$param_name = "download";
$limit = 1800;

deleteFile($content_path); // files older than 3min
if ($_GET[$param_name]) {

	$download_url = $_GET[$param_name];
	$ch = curl_init($download_url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
    $result = curl_exec($ch);
    curl_close ($ch);
	
	$name = substr(str_shuffle(str_repeat('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',5)),0,10);
	$fp = $content_path.$name.$img_ext;
	if ($result) {
		file_put_contents($fp,$result);
		echo $fp;
	}
	
} else {
	echo "where is no download get param";
}

function deleteFile($path) {
    global $limit;
	if ($handle = opendir($path)) {
		while (false !== ($file = readdir($handle))) {
			if (!is_dir($file)) {
				if (filemtime($path.$file) < time() - $limit) {
					unlink($path.$file);
					//break;
				}
			}
		}
		
		closedir($handle);
	}
}
?>