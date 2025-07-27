 const addBtn = document.getElementById("addBtn");
    const taskInput = document.getElementById("taskInput");
    const datetimeInput = document.getElementById("datetimeInput");
    const priorityInput = document.getElementById("priorityInput");
    const taskList = document.getElementById("taskList");
    const progressBar = document.getElementById("progressBar");

    function updateProgress() {
      const total = taskList.children.length;
      const completed = [...taskList.children].filter(li => li.classList.contains("completed")).length;
      progressBar.style.width = total > 0 ? (completed / total) * 100 + "%" : "0%";
    }

    function createTask(text, datetime, priority) {
      const li = document.createElement("li");

      const priorityTag = document.createElement("span");
      priorityTag.classList.add("priority", priority);
      priorityTag.innerText = priority.toUpperCase();

      const span = document.createElement("span");
      span.innerText = `${text} (${datetime})`;
      span.style.flex = "1";
      span.style.cursor = "pointer";
      span.addEventListener("click", () => {
        li.classList.toggle("completed");
        span.style.textDecoration = li.classList.contains("completed") ? "line-through" : "none";
        updateProgress();
      });

      const editBtn = document.createElement("button");
      editBtn.className = "btn edit-btn";
      editBtn.innerText = "Edit";
      editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task:", text);
        if (newText && newText.trim()) {
          text = newText.trim();
          span.innerText = `${text} (${datetime})`;
        }
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn delete-btn";
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
      li.appendChild(editBtn);
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
