DB_DrinkHappy = new Mongo.Collection('drinkHappy');

DB_DrinkRegular = new Mongo.Collection('drinkRegular');

DB_DrinkHappy.allow({
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

DB_DrinkRegular.allow({
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
