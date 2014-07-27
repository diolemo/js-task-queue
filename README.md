js-task-queue
=============

``````javascript
var queue = new TaskQueue();

queue.add(function() {
  do_something_async(function() {
    queue.next();
  });
});

queue.add(do_something_else);

queue.add(function() {
  do_something_async(function() {
    queue.next();
  });
});

queue.execute();
```````
