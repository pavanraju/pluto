if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Locations.find().count()<1){
    		Locations.insert({name : "Bangalore"});
    		Locations.insert({name : "Mumbai"});
    		Locations.insert({name : "Chennai"});
    	}
    	if(Skill.find().count()<1){
    		Skill.insert({name : "Meteor"});
    		Skill.insert({name : "Node.js"});
    		Skill.insert({name : "Java"});
    		Skill.insert({name : "Project Manager"});
    		Skill.insert({name : "Business Developer"});
    		Skill.insert({name : "Html"});
    		Skill.insert({name : "Spring"});
    		Skill.insert({name : "Idea.js", status : 1});
    	}
  });
}
