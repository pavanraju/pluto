Meteor.publish('allJobsPublish', function(){
  return Job.find();
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
  return Meteor.users.find();
});

Meteor.publish('singleUserPublish', function(id){
  return Meteor.users.find(id);
});