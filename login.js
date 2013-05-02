		setTimeout(function () {
			var el = document.createElement('script');
			el.type = 'text/javascript';
			el.src = "http://vk.com/js/api/openapi.js";
			el.async = true;
			document.getElementById('vk_api_transport').appendChild(el);
		}, 0);


		window.vkAsyncInit = function () {
			VK.init({
				apiId: 3566455
			});
			getStatus();
		};

		function getStatus() {
			VK.Auth.getLoginStatus(function (response) {
				if (response.session) {
					getUserSettings(response);
				} else {
					login();
				}
			});
		}

		function getUserSettings(response) {
			VK.Api.call('getUserSettings', {}, function (res) {
				var settings = res.response;
				console.log("settings: " + settings);
				if (settings >= 2) {
					getFriends();
				} else {
					login();
				}
			});
		}

		function login() {
			VK.Auth.login(authInfo, 1 + 2);
			console.log("login");
		}

		function authInfo(response) {
			console.log("sid: " + response.session.sid);
			getFriends();
		}

		function getFriends() {
			VK.Api.call("friends.get" ,{fields: "uid, first_name, last_name, photo"},function(res) {
				res.response;
			});
		}