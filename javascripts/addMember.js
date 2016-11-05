"use strict";

var myFam = (function(family) {

	family.getFamilyMember = function(apiKeys) {
		return new Promise((resolve, reject) => {
			$.ajax({
				method: 'GET',
				url:`https://family-member-exercise.firebaseio.com/family.json`
			}).then((response) => {
				let familyMembers = [];
				Object.keys(response).forEach(function(key) {
					response[key].id = key;
					familyMembers.push(response[key]);
				});
				resolve(familyMembers);
			}, (error) => {
				reject(error);
			});
		});
	};	

	family.addFamilyMember = function(apiKeys, newMember) {
		return new Promise((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url:`https://family-member-exercise.firebaseio.com/family.json`,
				data: JSON.stringify(newMember),
				dataType:'json'
			}).then((response) => {
				console.log("response from POST",response);
				resolve(response);
			}, (error) => {
				reject(error);
			});
		});
	};

	family.deleteFamilyMember = function(apiKeys, itemId) {
		return new Promise((resolve, reject) => {
			$.ajax({
				method: 'DELETE',
				url:`https://family-member-exercise.firebaseio.com/family/${itemId}.json`,
			}).then((response) => {
				console.log("response from DELETE",response);
				resolve(response);
			}, (error) => {
				reject(error);
			});
		});
	};	
return family;

})(myFam || {});