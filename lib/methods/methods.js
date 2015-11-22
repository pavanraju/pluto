Meteor.methods({
  jobCreateMethod : function(job){
      job._id = Job.insert(job);
    return job;
  },
  jobUpdateMethod : function(job, job_id){
    Job.update(job_id, job);
  	return job;
  },
  userCreateMethod : function(userCreateForm){
    check(userCreateForm, Schema.createUserFormSchema);
    var user = {
      email : userCreateForm.email,
      password : Random.id(7),
      profile : {
        fullName : userCreateForm.fullName,
        mobileNumber : userCreateForm.mobileNumber,
        passwordChangeRequired : true,
        orgId : Meteor.userId()
      }
    };
    user._id = Accounts.createUser(user);
    return user;
  },
  userUpdateMethod : function(userUpdateForm, user_id){
    check(userUpdateForm, Schema.createUserFormSchema);
    console.log(userUpdateForm);
    var user = {
      email : userUpdateForm.email,
      profile : {
        fullName : userUpdateForm.fullName,
        mobileNumber : userUpdateForm.mobileNumber
      }
    };
    //Meteor.users.update({_id: user_id}, {$set: {"profile.fullName": userUpdateForm.fullName}});
    return user;
  },
  userRegisterMethod : function(userRegisterForm){
    check(userRegisterForm, Schema.registerUserFormSchema);
    var userProfile = {
      fullName : userRegisterForm.fullName,
      mobileNumber : userRegisterForm.mobileNumber,
      isOrgAdmin : true
    };
    Accounts.createUser({
      email: userRegisterForm.email,
      password: userRegisterForm.password,
      profile : userProfile
    });

    return { email: userRegisterForm.email, password: userRegisterForm.password };
  }
});