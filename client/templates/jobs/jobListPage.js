Template.jobListPage.helpers({
	createdBy : function(){

	},
	jobLocation : function(){
		return Locations.findOne(this.location);
	},
	jobSkills : function(){
		return Skill.find({_id: { $in: this.skills }}, { sort: {name : 1}});
	},
	hasJobSkills : function(){
		return (this.skills != undefined) ? true : false;
	}
});