alert("hello");

var provider = new firebase.auth.GoogleAuthProvider();
var user;
// Get a reference to the database service
var database = firebase.database();

$( document ).ready(function(){
	$("#welcome").hide();
});

function signIn(){
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  console.log(user.displayName);
	  console.log(user);
	  user = result.user;
	  showWelcomeContainer();

	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});

}

function showWelcomeContainer(){
	$("#login").hide();
	$("#welcome").show();
	$("#welcomeText").html("Hello, " + user.displayName);
};


$(".dropdown").on("hide.bs.dropdown", function(event){
    var text = $(event.relatedTarget).text(); // Get the text of the element
  	firebase.database().ref('users/' + user.uid).set({
    	username: user.displayName,
    	email: user.email,
    	movie_type : text
 	});    
   
});


// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: user.displayName,
//     email: user.email,
// //    profile_picture : imageUrl
//   });
// }