Meteor.methods({
  jobCreateMethod : function(job){
      job._id = Job.insert(job);
    return job;
  },
  jobUpdateMethod : function(job, job_id){
    Job.update(job_id, job);
  	return job;
  },
  userCreateMethod : function(userForm){
    check(userForm, Schema.createUserFormSchema);
    var user = {
      email : userForm.email,
      password : Random.id(7),
      profile : {
        fullName : userForm.fullName,
        mobile : userForm.mobile,
        passwordChangeRequired : true
      }
    };
    Accounts.createUser(user);
  },
  userRegisterMethod : function(registerForm){
    check(registerForm, Schema.registerUserFormSchema);
    var userId = Accounts.createUser({
                  email: registerForm.email,
                  password: registerForm.password
                });
    console.log(userId);
    var userUpdate = {
      fullName : registerForm.fullName,
      mobile : registerForm.mobile,
      isOrgAdmin : true,
      orgId : Meteor.userId()
    };
    //Meteor.users.update(userId, {$set: userUpdate});
  },
  userLoginMethod : function(loginForm){

  }
});