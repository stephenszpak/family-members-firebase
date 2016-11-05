"use strict";

var myFam = (function() {
	return {
		firebaseCredentials: function() {
			return new Promise((resolve, reject) => {
				$.ajax({
					method: 'GET',
					url: 'apiKeys.json'
				}).then((response) => {
					resolve(response);
				}, (error) => {
					reject(error);
				});
			});
		}
	};
})();