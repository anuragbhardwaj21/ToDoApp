const createTaskButton = document.getElementById("createtask");

createTaskButton.addEventListener("click", function () {
  const title = document.getElementById("todo-title").value;
  const description = document.getElementById("todo-desc").value;
  const link = document.getElementById("todo-link").value;
  const priority = document.getElementById("priority-select").value;

  const task = {
    id: generateRandomID(),
    title: title,
    desc: description,
    link: link,
    priority: priority,
  };

  const existingTasks = JSON.parse(localStorage.getItem("pending-to-do")) || [];

  existingTasks.push(task);

  localStorage.setItem("pending-to-do", JSON.stringify(existingTasks));
  document.getElementById("todo-title").value = "";
  document.getElementById("todo-desc").value = "";
  document.getElementById("todo-link").value = "";
  document.getElementById("priority-select").value = "";
});
function generateRandomID() {
  const alphanumericChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    const randomChar = alphanumericChars.charAt(randomIndex);
    id += randomChar;
  }

  return id;
}
