Template.registerPage.events({
  /*
    'submit form' : function(event, template){
        var fullnameVar = event.target.fullName.value;
        var emailVar = event.target.email.value;
        var mobileVar = event.target.mobileNumber.value;
        var passwordVar = event.target.password.value;

        var user = {
          email : emailVar,
          password : passwordVar,
		      profile : {
            fullName : fullnameVar,
            mobile : mobileVar,
            isOrgAdmin : true
          }
        };
        Accounts.createUser(user, function(error){
          if(error){
            if(error.error===403){
              Bert.alert("Email already exists. Please choose another","danger");
            }else{
              Bert.alert(error.reason,"danger");
            }
          }else{
            Meteor.users.update(Meteor.userId(), {$set: {orgId: Meteor.userId()}});
            Bert.alert("Welcome to Pluto.","info");
            Router.go('home');
          }
        });
    }
    */
  });