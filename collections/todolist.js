DB_Todolist = new Mongo.Collection('todos');

DB_Todolist.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});
