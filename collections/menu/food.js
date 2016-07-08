DB_Food = new Mongo.Collection('food');

DB_Food.allow({
  insert: function() {
    return (Meteor.userId() === ''); //Admin Id between single quotes
  },
  update: function() {
    return (Meteor.userId() === '');
  },
  remove: function() {
    return (Meteor.userId() === '');
  }
});
