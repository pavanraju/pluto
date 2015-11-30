Meteor.publish('allJobsPublish', function(){
	var userInfo = Meteor.users.findOne({_id: this.userId});
	var query = {};
	if(userInfo.profile.isOrgAdmin){
		query = {
			"orgId" : this.userId
		}
	}else{
		query = {
			"createdBy" : this.userId
		}
	}
  return Job.find(query);
});

Meteor.publish('singleJobPublish', function(id){
  return Job.find(id);
});

Meteor.publish('allLocationsPublish', function(){
  return Locations.find();
});

Meteor.publish('allSkillsPublish', function(){
  return Skill.find();
});

Meteor.publish('allUsersPublish', function(){
	var userInfo = Meteor.users.findOne({_id: this.userId});
	var query = {};
	if(this.userId){
		if(userInfo.profile.isOrgAdmin){
			query = {
				"profile.orgId" : this.userId
			}
		}else{
			query = {
				"profile.orgId" : userInfo.profile.orgId
			}
		}
	}
  return Meteor.users.find(query);
});

Meteor.publish('singleUserPublish', function(id){
  return Meteor.users.find(id);
});