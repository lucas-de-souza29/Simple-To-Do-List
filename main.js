const inputElement = document.querySelector(".new-task-input");
const buttonElement = document.querySelector(".new-task-button");

const listTaskContainer = document.querySelector(".list-tasks-container");

const validateInput = () => inputElement.value.trim().length > 0; 

const handleAddTask = () => {
  const inputIsValid = validateInput();  

  if(!inputIsValid){
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item"); // Add the class task-item

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value; // Get the value from input

  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteTask = document.createElement("i");
  deleteTask.classList.add("fa-regular");
  deleteTask.classList.add("fa-trash-can");
  deleteTask.classList.add("delete-task-button");

  deleteTask.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteTask);

  listTaskContainer.appendChild(taskItemContainer); // Add the content 

  //Cleaning up the field (inputElement)
  inputElement.value = '';

  updateLocalStorage(); 

};

const handleClick = (taskContent) => {
    const tasks = listTaskContainer.childNodes;

    tasks.forEach(task => {
        if(task.firstChild.isSameNode(taskContent)){
           task.firstChild.classList.toggle("finished");
        }
    });

    updateLocalStorage()
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = listTaskContainer.childNodes;
    tasks.forEach(task => {
        if(task.firstChild.isSameNode(taskContent)){
           taskItemContainer.remove();
        }
    });

    updateLocalStorage();
}

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if(inputIsValid){
        return inputElement.classList.remove("error");
    }
};

//Local Storage
const updateLocalStorage = () => {
    const tasks = listTaskContainer.childNodes;

    const localStorageTaks = [...tasks].map(task => {
       const content = task.firstChild;
       const isFinished = content.classList.contains("finished");

       return { description: content.innerText, isFinished };
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTaks));
}

const refreshUsingLocalStorage = () => {
   const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

   if(!tasksFromLocalStorage) return; 

   tasksFromLocalStorage.forEach(task => {
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item"); 
    
        const taskContent = document.createElement("p");
        taskContent.innerText = task.description; 

        if(task.isFinished){
            taskContent.classList.add("finished");
        }
    
        taskContent.addEventListener("click", () => handleClick(taskContent));
    
        const deleteTask = document.createElement("i");
        deleteTask.classList.add("fa-regular");
        deleteTask.classList.add("fa-trash-can");
        deleteTask.classList.add("delete-task-button");
    
        deleteTask.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));
    
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteTask);
    
        listTaskContainer.appendChild(taskItemContainer);  
   });
}

refreshUsingLocalStorage();

buttonElement.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());