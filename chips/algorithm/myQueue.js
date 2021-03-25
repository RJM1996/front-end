/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  this.stack1 = []
  this.stack2 = []
}

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.stack1.push(x)
}

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  if (!this.stack1.length && !this.stack2.length) return
  if (this.stack2.length) {
    this.stack2.pop()
  } else {
    for (let i = this.stack1.length; i > 0; i--) {
      this.stack2.push(this.stack1.pop())
    }
    this.stack2.pop()
  }
}

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  if (!this.stack1.length && !this.stack2.length) return
  if (this.stack2.length) {
    return this.stack2[this.stack2.length - 1]
  } else {
    for (let i = this.stack1.length; i > 0; i--) {
      this.stack2.push(this.stack1.pop())
    }
    return this.stack2[this.stack2.length - 1]
  }
}

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return !this.stack1.length && !this.stack2.length
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

const queue = new MyQueue();
queue.push(1)
queue.push(2)
queue.push(3)
console.log(queue)
const a =  queue.peek()
console.log(a)
queue.pop()
queue.pop()
queue.pop()
console.log(queue)