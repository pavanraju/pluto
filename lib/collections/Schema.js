SimpleSchema.messages({
  "maxExpMismatch": "Max Experience should not be less than Min Experience"
});



Locations = new Mongo.Collection("location");
Locations.attachSchema(new SimpleSchema({
	name : {
		type : String,
		label : "Name",
		max : 200
	},
	status : {
		type : Number,
		label : "Status",
		defaultValue : 0,
		allowedValues : [0, 1]
	},
	createdAt : {
		type : Date,
		denyUpdate : true,
		autoValue: function() {
	      if (this.isInsert) {
	        return new Date;
	      }
	    },
		autoform : {
			omit : true
		}
	},
	updatedAt: {
	    type: Date,
	    autoValue: function() {
	      if (this.isUpdate) {
	        return new Date();
	      }
	    },
	    denyInsert: true,
	    optional: true,
		autoform : {
			omit : true
		}
	}
}));

Skill = new Mongo.Collection("skill");
Skill.attachSchema(new SimpleSchema({
	name : {
		type : String,
		label : "Name",
		max : 200
	},
	status : {
		type : Number,
		label : "Status",
		defaultValue : 0,
		allowedValues : [0, 1]
	},
	createdAt : {
		type : Date,
		denyUpdate : true,
		autoValue: function() {
	      if (this.isInsert) {
	        return new Date;
	      }
	    },
		autoform : {
			omit : true
		}
	},
	updatedAt: {
	    type: Date,
	    autoValue: function() {
	      if (this.isUpdate) {
	        return new Date();
	      }
	    },
	    denyInsert: true,
	    optional: true,
		autoform : {
			omit : true
		}
	}
}));


Schema = {};

Schema.UserProfile = new SimpleSchema({
    fullName: {
        type: String,
        optional: true
    },
    mobileNumber: {
        type: String,
        optional: true
    },
    orgShortCode: {
        type: String,
        optional: true
    },
    isOrgAdmin: {
        type: Boolean,
        defaultValue : false,
        label : "Is Admin"
    },
    orgId :{
    	type: SimpleSchema.RegEx.Id,
    	optional: true
    },
    passwordChangeRequired:{
    	type: Boolean,
    	defaultValue: false
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    },

});

Meteor.users.attachSchema(Schema.User);

Meteor.users.allow({
	  insert: function (userId, doc) { return true; },
	  update: function () { return true; },
	  remove: function () { return false; }
});


Schema.createUserFormSchema = new SimpleSchema({
	fullName: {
        type: String
    },
	email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    mobileNumber: {
        type: String,
        optional: true
    },
    isOrgAdmin: {
        type: Boolean,
        defaultValue : false,
        label : "Is Admin"
    },
});

Schema.registerUserFormSchema = new SimpleSchema({
	fullName: {
        type: String,
        label: "Full Name"
    },
	email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email address"
    },
    mobileNumber: {
        type: String,
        optional: true,
        label: "Mobile Number"
    },
    password: {
        type: String,
        min : 7,
        label: "Password"
    },
});


Job = new Mongo.Collection("job");
Job.attachSchema(new SimpleSchema({
	summary : {
		type : String,
		label : "Summary",
		max : 200
	},
	description : {
		type : String,
		label : "Description",
		autoform : {
			afFieldInput : {
				type : "textarea",
				rows : 5
			}
		}
	},
	skills : {
		type : [SimpleSchema.RegEx.Id],
		label : "Skills",
		minCount : 1,
		autoform: {
        	type: "select2",
        	multiple : true,
        	options: function () {
	            return Skill.find({status : 0}, { sort: {name : 1}}).map(function (c) {
	                return {label: c.name, value: c._id};
	            });
        	}
    	}
	},
	location : {
		type : SimpleSchema.RegEx.Id,
		label : "Location",
		autoform: {
        	type: "select2",
        	options: function () {
	            return Locations.find({status : 0}, { sort: {name : 1}}).map(function (c) {
	                return {label: c.name, value: c._id};
	            });
        	}
    	}
	},
	experience : {
		type : Object,
		label : "Experience"
	},
	"experience.min" : {
		type : Number,
		label : "Min Experience",
		min : 0.0
	},
	"experience.max" : {
		type : Number,
		label : "Max Experience",
		min : 0.0,
		custom : function(){
			if(this.value < this.field('experience.min').value){
				return "maxExpMismatch";
			}
		}
	},
	salary : {
		type : Object,
		label : "Salary Range",
		optional : true
	},
	"salary.min" : {
		type : Number,
		label : "Salary Min",
		decimal : true,
		min : 0.00
	},
	"salary.max" : {
		type : Number,
		label : "Salary Max",
		decimal : true,
		min : 0.00
	},
	vacancies : {
		type : Number,
		label : "Vacancies",
		optional : true,
		min : 0
	},
	status : {
		type : Number,
		label : "Status",
		allowedValues: [
	         0,
	         1
	     ],
	     defaultValue : 0,
	     autoform: {
	     	type : "select2",
	         options: [
	            {
	               label: "Open",
	               value: 0
	            },
	            {
	               label: "Close",
	               value: 1
	            }
	         ]
		}
	},
	createdBy : {
		type : String,
		regEx: SimpleSchema.RegEx.Id,
		autoValue : function(){
			if (this.isInsert) {
	        	return Meteor.userId();
	      	}
		},
		autoform : {
			omit : true
		}
	},
	createdAt : {
		type : Date,
		denyUpdate : true,
		autoValue: function() {
	      if (this.isInsert) {
	        return new Date;
	      }
	    },
		autoform : {
			omit : true
		}
	},
	updatedAt: {
	    type: Date,
	    autoValue: function() {
	      if (this.isUpdate) {
	        return new Date();
	      }
	    },
	    denyInsert: true,
	    optional: true,
		autoform : {
			omit : true
		}
	}

}));

Job.allow({
	insert : function(userId, doc){
		return !! userId;
	},
	update : function(userId, doc, fields, modifier){
		return doc.createdBy === userId;
	}
});

/*
Job.initEasySearch(['summary','description'],{
	'limit' : 5,
});
*/

