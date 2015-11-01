AutoForm.hooks({
  jobCreateForm : {
    onSuccess: function(operation, job) {
      Bert.alert("Job Successfully Created.","success");
      Router.go('job.update',job);
    }
  },
  jobUpdateForm : {
  	onSuccess : function(operation, job){
      Bert.alert("Job Successfully Updated.","success");
  	}
  },
  userCreateForm : {
    onSuccess: function(operation, user) {
      Bert.alert("User Successfully Created.","success");
      Router.go('user.update',user);
    },
    onError: function(formType, error) {
      if(error.error){
        if(error.error===403){
          Bert.alert("Email already exists in the system. Please choose another","danger");
        }else{
          Bert.alert(error.reason,"danger");
        }
      }
    }
  },
  userRegisterForm : {
    onSuccess: function(operation, user) {
      Bert.alert("Welcome to track, enjoy madi","success");
      Router.go('home');
    },
    onError: function(formType, error) {
      if(error.error){
        if(error.error===403){
          Bert.alert("Email already exists in the system. Please choose another","danger");
        }else{
          Bert.alert(error.reason,"danger");
        }
      }
    }
  },
  userLoginForm : {
    
  }
});