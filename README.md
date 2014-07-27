# task-queue.js

#### Reference

```js
// Add a callback function to the queue
// with 0 or more arguments for the function.
queue.add([arg1], [arg2], ... callback);

// Call this method when you want to proceed to
// the next task. It's expected that this will be 
// after your async code has run, but you can call
// it whenever you are ready to execute the next task.
queue.next();

// Adds a break point in the queue that
// you can skip to by calling queue.break.
queue.add_break();

// Skips over tasks in the queue until the
// next break point added with queue.add_break.
queue.break();

// Start executing the queue and 
// execute the callback when done.
queue.execute([callback]);
```

#### Basic Example

```js
var queue = new TaskQueue();

queue.add(function() {
  do_something_async(function() {
    queue.next();
  });
});

queue.add(function() {
  do_something_else
  queue.next();
});

queue.add(function() {
  do_something_async(function() {
    queue.next();
  });
});

queue.execute();
```

#### Advanced Example

```js
// Create a new task queue.
var queue = new TaskQueue();

for (index in collection) {
  // Add a task for each item in the collection
  // and pass the item into the task as an argument.
  queue.add(collection[index], function(item) {
    // This is an asynchronous task 
    // such as AJAX request
    fetch_item(item, function(result) {
      if (result.something === something_else) {
        found_something = true;
        // We have what we needed so 
        // no need to continue looking.
        // This will step over the tasks
        // to the breakpoint added below.
        queue.break();
      } else {
        // check the next item
        queue.next();
      }
    });
  });
}

// We add a break point here
// so that we can "break"
// out of the loop
queue.add_break();

queue.add(function() {
  // Another async task such as 
  // saving to a database.
  save_result(found_something, function() {
    // Saving is finished so we can continue.
    queue.next();
  });
});

// Execute the queue
queue.execute(function() {
  // We reached the end of the queue
  alert("something is finished");
});
```
