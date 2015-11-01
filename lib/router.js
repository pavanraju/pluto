
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    progressSpinner : false
});

Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
      Router.go('/login');
    }else{
      this.next();
    }
  },{
    except : ['login','register','home']
});


Router.route('/login', {
  onBeforeAction : function (){
    if (Meteor.userId()) {
      Router.go('/');
    } else {
      this.next();
    }
  },
  name : 'login',
  action : function (){
    this.render('loginPage');
  }
});

Router.route('/register', {
  onBeforeAction : function (){
    if (Meteor.userId()) {
      Router.go('/');
    };
    this.next();
  },
  name : 'register',
  action : function (){
    this.render('registerPage');
  }
});

Router.route('/', {
  name : 'home',
  //layoutTemplate : 'layoutAfterAuth',
  layoutTemplate : function(){
    if (!Meteor.userId()) {
      return 'layout';
    }else{
      return 'layoutAfterAuth';
    }
  },
  action : function (){
    if (!Meteor.userId()) {
      this.render('welcomePage');
    }else{
      this.render('homePage');
    }
  }
});

Router.route('/jobs',{
  name : 'job.list',
  layoutTemplate : 'layoutAfterAuth',
  findOptions: function() {
    return { sort: {createdAt: -1}};
  },
  waitOn: function() {
    return [Meteor.subscribe('allLocationsPublish', { sort: {createdAt: -1}}),
            Meteor.subscribe('allSkillsPublish', { sort: {createdAt: -1}}),
            Meteor.subscribe('allJobsPublish', { sort: {createdAt: -1}})];
  },
  data : function(){
    return {
      jobs : Job.find({} , { sort: {createdAt: -1}})
    };
  },
  action : function (){
    this.render('jobListPage');
  }
});

Router.route('/job/create',{
  name : 'job.create',
  layoutTemplate : 'layoutAfterAuth',
  waitOn: function() {
    return [Meteor.subscribe('allLocationsPublish', { sort: {createdAt: -1}}),
            Meteor.subscribe('allSkillsPublish', { sort: {createdAt: -1}})];
  },
  action : function (){
    this.render('jobCreatePage');
  }
});

Router.route('/job/update/:_id',{
  name : 'job.update',
  layoutTemplate : 'layoutAfterAuth',
  waitOn: function() {
    return [Meteor.subscribe('allLocationsPublish', { sort: {createdAt: -1}}),
            Meteor.subscribe('allSkillsPublish', { sort: {createdAt: -1}}),
            Meteor.subscribe('singleJobPublish', this.params._id)];
  },
  data : function (){
    return {
      currentjob : Job.findOne({_id : this.params._id}) 
    }
  },
  action : function (){
    this.render('jobUpdatePage');
  }
});


Router.route('/user',{
  name : 'user.list',
  layoutTemplate : 'layoutAfterAuth',
  action : function (){
    this.render('userListPage');
  }
});

Router.route('/user/create',{
  name : 'user.create',
  layoutTemplate : 'layoutAfterAuth',
  action : function (){
    this.render('userCreatePage');
  }
});

Router.route('/user/update',{
  name : 'user.update',
  layoutTemplate : 'layoutAfterAuth',
  action : function (){
    this.render('userUpdatePage');
  }
});