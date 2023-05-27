const pendingTaskArea = document.getElementById("pending");
const pendingHeading = document.createElement("p");
pendingHeading.setAttribute("id", "pendingHeading");
pendingHeading.innerText = "Pending";
pendingTaskArea.append(pendingHeading);

const completedTaskArea = document.getElementById("completed");
const completedHeading = document.createElement("p");
completedHeading.setAttribute("id", "completedHeading");
completedHeading.innerText = "Completed";
completedTaskArea.append(completedHeading);

const taskData = localStorage.getItem("pending-to-do");
var tasks = JSON.parse(taskData);
if (taskData) {
  console.log(tasks);
  renderTasks(tasks);
} else {
  console.log("No tasks found in localStorage.");
}

function renderTasks(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    var taskCard = document.createElement("div");
    taskCard.setAttribute("class", "taskCard");
    taskCard.innerHTML = `
    <a class="${tasks[i].priority}" id="${tasks[i].id}"><ion-icon name="remove-outline"></ion-icon></a>
    <p>${tasks[i].title}</p>
    <p>${tasks[i].desc}</p>
    <a href="${tasks[i].link}"><ion-icon name="link-outline"></ion-icon></a>
    
    `;
    pendingTaskArea.append(taskCard);
    const removeIcon = document.getElementById(tasks[i].id);

    removeIcon.addEventListener("click", () => {
      removeTaskFromPending(tasks[i].id);
      pushTaskToComplete(tasks[i]);
      window.location.href = "index.html";
    });
  }
}

function removeTaskFromPending(taskId) {
  const pendingTasks = JSON.parse(localStorage.getItem("pending-to-do")) || [];

  const index = pendingTasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    pendingTasks.splice(index, 1);

    localStorage.setItem("pending-to-do", JSON.stringify(pendingTasks));
  }
}

function pushTaskToComplete(task) {
  const existingCompletedTasks =
    JSON.parse(localStorage.getItem("complete-to-do")) || [];

  existingCompletedTasks.push(task);

  localStorage.setItem(
    "complete-to-do",
    JSON.stringify(existingCompletedTasks)
  );
}

const completedData = localStorage.getItem("complete-to-do");
var ctasks = JSON.parse(completedData);
if (completedData) {
  console.log(ctasks);
  renderCompletedTasks(ctasks);
} else {
  console.log("No tasks found in localStorage.");
}
function renderCompletedTasks(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    var taskCard = document.createElement("div");
    taskCard.setAttribute("class", "taskCard");
    taskCard.innerHTML = `
      <a class="${tasks[i].priority}"><ion-icon name="remove-outline"></ion-icon></a>
      <p>${tasks[i].title}</p>
      <p>${tasks[i].desc}</p>
      <a href="${tasks[i].link}" target="_blank"><ion-icon name="link-outline"></ion-icon></a>
      <a class="restore" id="${tasks[i].id}"><ion-icon name="refresh-outline"></ion-icon></ion-icon></a>
      
      `;
    completedTaskArea.append(taskCard);
    const restoreIcon = document.getElementById(tasks[i].id);
    console.log(restoreIcon);

    restoreIcon.addEventListener("click", () => {
      removeTaskFromComplete(tasks[i].id);
      pushTaskToPending(tasks[i]);
      window.location.href = "index.html";
    });
  }
}

function removeTaskFromComplete(taskId) {
    const completeTasks = JSON.parse(localStorage.getItem("complete-to-do")) || [];
  
    const index = completeTasks.findIndex((task) => task.id === taskId);
  
    if (index !== -1) {
        completeTasks.splice(index, 1);
  
      localStorage.setItem("complete-to-do", JSON.stringify(completeTasks));
    }
  }

  function pushTaskToPending(task) {
    const existingPendingTasks = JSON.parse(localStorage.getItem("pending-to-do")) || [];
  
    existingPendingTasks.push(task);
  
    localStorage.setItem(
      "pending-to-do",
      JSON.stringify(existingPendingTasks)
    );
  }