function saveTask() {
  //get values
  const title = $("#txtTitle").val();
  const desc = $("#txtDescription").val();
  const color = $("#selColor").val();
  const date = $("#selDate").val();
  const status = $("#selStatus").val();
  const budget = $("#numBudget").val();
  console.log(title, desc, color, date, status, budget);
  //build an object
  let taskToSave = new Task(title, desc, color, date, status, budget);
  console.log(taskToSave);

  //save to server (post)
  $.ajax({
    url: "http://fsdiapi.azurewebsites.net/api/tasks/", // the URL to send the request to
    type: "POST", // the type of request (GET, POST, PUT, DELETE, PATCH, ...)
    data: JSON.stringify(taskToSave), //convert Object to JSON
    contentType: "application/json",
    success: function (response) {
      console.log(response);
    },
    error: function (response) {
      console.log(response);
    },
  });

  //display the task (get)
  displayTask(taskToSave);
}

function displayTask(task) {
  let syntax = `
        <div class="task-container" style="border-color:${task.color}">
            <div class="task">
                <div class="info">
                    <h5>${task.title}</h5>
                    <p>${task.description}</p>
                </div>

                <div class="status">${task.status}</div>


                <div class="date-budget">
                    <span>${task.date}</span>
                    <span>${task.budget}</span>
                </div>
            </div>
        </div>
    `;

  $("#list").append(syntax);
}

function loadTask() {
  console.log("Load task function");

  $.ajax({
    url: "http://fsdiapi.azurewebsites.net/api/tasks/",
    type: "GET",
    success: function (response) {
      let data = JSON.parse(response);
      console.log("Data: ", data);

      //travel the array, get some elements from the array
      for (let i = 0; i < data.length; i++) {
        let task = data[i];
        console.log("Task: ", task);

        if (task.name === "Leopoldo") {
          displayTask(task);
        }
      }
    },
  });
}

function init() {
  console.log("init");
  $("#btnSave").click(saveTask);

  loadTask();
}

window.onload = init;
