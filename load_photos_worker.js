
var friends;

onmessage = function (res) {
	if (res.friends) {
		friends = res.friends;
		init();
	} else if (res.friend) {

	}
}

function init() {
	importScripts(); 	
}

