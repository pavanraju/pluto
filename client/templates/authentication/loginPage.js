Template.loginPage.events({
    'submit form' : function(event, template){
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
          if(Meteor.user()){
            //Bert.alert("You have logged in successfully","info","growl-bottom-right");
            Bert.alert({
              type: 'info',
              style: 'growl-bottom-right',
              message: 'You have logged in successfully',
              hideDelay: 15000
            });
            Router.go('/');
          }else{
            event.target.password.value = "";
            Bert.alert(error.reason,"danger");
          }
        });
    }
  });