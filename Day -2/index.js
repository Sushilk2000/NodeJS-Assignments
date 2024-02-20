var fs = require("fs");
var readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
var Object = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
function newTask() {
  rl.question("Name of the task:", (answer) => {
    const obj = {
      id: Object.idTracker + 1,
      task: answer,
      status: "incomplete",
    };
    Object.data.push(obj);
    Object.idTracker = Object.idTracker + 1;
    writeData(Object);
    console.log("Task added Successfully");
  });
}
function writeData(Object) {
  fs.writeFileSync("tasks.json", JSON.stringify(Object), (err) => {
    console.log(err);
  });
  rl.close();
}
function viewTasks() {
  if (Object.data.length == 0) {
    console.log("Tasklist is empty");
  } else {
    Object.data.map((task) => console.log(task.id, task.task));
  }
  rl.close();
}
function toggleChange() {
  Object.data?.map((task, index) => console.log(index + 1, task.task));
  rl.question("choose a task to change status:\n", (answer) => {
    Object.data[answer - 1].status = "Completed";
    console.log("Status changed");
    writeData(Object);
  });
}
function removeTask() {
  Object.data?.map((task, index) => console.log(index + 1, task.task));
  rl.question("choose a task index:", (answer) => {
    if (answer <= Object.data.length) {
      Object.data.splice(answer - 1, 1);
      writeData(Object);
      console.log("Task removed successfully");
    } else {
      console.log("Wrong id");
    }
    rl.close();
  });
}
function menu() {
  const menu = [
    "1.Add a new Task",
    "2.View List of tasks",
    "3.mark a task as complete",
    "4.remove a task",
  ];
  menu.map((item) => {
    console.log(item);
  });
  rl.question("choose an option\n", (answer) => {
    switch (answer) {
      case "1":
        newTask();
        break;
      case "2":
        viewTasks();
        break;
      case "3":
        toggleChange();
        break;
      case "4":
        removeTask();
        break;
      default:
        console.log("error");
        rl.close();
        break;
    }
  });
}
menu();
