var base_url = "http://beedevs.com/friend_burster/";
var download_url = "download.php?download=";
var items;
var xhrs = {};
var photoNum = 0;

onmessage = function (event) {
	if (event.data.friends) {
		items = event.data.friends;
		init();
	}
}

function init() {	
	for (var i = 0; i < items.length; i++) {
		xhrs[items[i].uid] = items[i];
	}
	loadNext(items[0]);
}

function loadNext(friend) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', base_url+download_url+friend.photo, true);
	xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		if(xhr.status == 200) {
			var res = xhr.responseText;
			photoNum++;
           	var friend = xhrs[xhr.id];
				friend.photo = base_url+res;
				postMessage({friend: friend});
				if (photoNum == items.length) {
					destroy();
				} else {
					loadNext(items[photoNum]);
				}
		}
	}};
	xhr.id = friend.uid;
	xhr.send(null);
}

function destroy() {
	self.close();
}