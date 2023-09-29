// Demo to show LIFO nature of Call Stack and FIFO nature of Task Queue in JavaScript

// Function to simulate a delay using a busy-wait
function busyWait(ms) {
  const start = Date.now()
  while (Date.now() - start < ms) {}
}

// Functions to demonstrate LIFO nature of Call Stack
function func4() {
  console.log("Call Stack: Function 4")
}

function func3() {
  console.log("Call Stack: Function 3")
  busyWait(300)
  func4()
}

function func2() {
  console.log("Call Stack: Function 2")
  busyWait(300)
  func3()
}

function func1() {
  console.log("Call Stack: Function 1")
  busyWait(300)
  func2()
}

// Functions to demonstrate FIFO nature of Task Queue
function task1() {
  console.log("Task Queue: Task 1")
}

function task2() {
  console.log("Task Queue: Task 2")
}

function task3() {
  console.log("Task Queue: Task 3")
}

function task4() {
  console.log("Task Queue: Task 4")
}

console.log("Start Loop")

// Demonstrate LIFO nature of Call Stack
func1()

// Demonstrate FIFO nature of Task Queue
setTimeout(task4, 0)
setTimeout(task3, 0)
setTimeout(task2, 0)
setTimeout(task1, 0)

console.log("End of First Loop")
