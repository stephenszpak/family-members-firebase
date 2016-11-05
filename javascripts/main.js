"use strict";
let apiKeys = {};

function showFamilyDom() {
	myFam.getFamilyMember(apiKeys).then(function(ppl) {
		console.log("ppl", ppl);
		$("#famOutput").html("");
		ppl.forEach(function(member) {
			$("#famOutput").append(`
				<li>
					<div>Name : ${member.name}</div>
					<div>Age : ${member.age}</div>
					<div>Gender : ${member.gender}</div>
					<div>Skills : ${member.skills}</div>
					<button class="btn btn-danger col-xs-6 delete" data-fbid="${member.id}">Delete</button> 
				</li>
				`);
		});
	});
}

$(document).ready(function(){
	myFam.firebaseCredentials().then(function(keys){
	    apiKeys = keys;
	    firebase.initializeApp(apiKeys);
	});
	showFamilyDom();

	$("#submitMember").on("click", function() {
		let skillArr = [];
		let skills = $("#addSkills").val();
		skillArr.push(skills);
		console.log(skills);
		
		let newMember = {
			"name": $("#addName").val(),
			"age": $("#addAge").val(),
			"gender": $("#addGender").val(),
			"skills": skills
		};
		myFam.addFamilyMember(apiKeys, newMember).then(function() {
			showFamilyDom();
		});
	});

	$("ul").on('click', ".delete", function() {
		let memberId = $(this).data("fbid");
		myFam.deleteFamilyMember(apiKeys, memberId).then(function() {
			showFamilyDom();
		});
	});

	// showFamilyDom();



});