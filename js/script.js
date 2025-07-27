const addBtn = document.getElementById("addBtn");
    const taskInput = document.getElementById("taskInput");
    const datetimeInput = document.getElementById("datetimeInput");
    const priorityInput = document.getElementById("priorityInput");
    const taskList = document.getElementById("taskList");
    const progressBar = document.getElementById("progressBar");

    function updateProgress() {
      const totalTasks = taskList.children.length;
      const completed = [...taskList.children].filter(li => li.classList.contains("completed")).length;
      const progress = totalTasks > 0 ? (completed / totalTasks) * 100 : 0;
      progressBar.style.width = progress + "%";
    }

    function createTask(text, datetime, priority) {
      const li = document.createElement("li");

      const priorityTag = document.createElement("span");
      priorityTag.classList.add("priority", priority);
      priorityTag.innerText = priority.toUpperCase();

      const span = document.createElement("span");
      span.innerText = `${text} (${datetime})`;

      span.addEventListener("click", () => {
        li.classList.toggle("completed");
        span.style.textDecoration = li.classList.contains("completed") ? "line-through" : "none";
        updateProgress();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerText = "Delete";

      deleteBtn.addEventListener("click", () => {
        li.classList.add("removing");
        setTimeout(() => {
          li.remove();
          updateProgress();
        }, 400);
      });

      li.appendChild(priorityTag);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);

      updateProgress();
    }

    addBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      const datetime = datetimeInput.value;
      const priority = priorityInput.value;

      if (text === "" || datetime === "") return;

      createTask(text, datetime, priority);
      taskInput.value = "";
      datetimeInput.value = "";
    });