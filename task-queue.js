var TaskQueue = function() {

	this._final_callback = null;
	this._queue = [];

	this.next = function() {
		if (this._queue.length == 0) {
			if (this._final_callback)
				this._final_callback.call(this);
		} else {
			var next = this._queue.shift();
			if (next) next.callback.apply(this, next.arguments);
			else this.next();
		};
	};

	this.execute = function(callback) {
		this._final_callback = callback;
		this.next();
	};

	this.add = function() {
		arguments = Array.prototype.slice.call(arguments, 0);
		if (!arguments.length) return;
		var task = new Object;
		task.callback = arguments.pop();
		if (!task.callback) return;
		task.arguments = arguments;
		this._queue.push(task);
	};

	this.add_break = function() {
		this._queue.push(null);
	};

	this.break = function() {
		while (this._queue.length && !this._queue[0])
			this._queue.shift();
		this.next();
	};

};

exports.TaskQueue = TaskQueue;