document.getElementById("editNote").style.display = "none";

const displayNote = document.getElementById("displayNote");
const addedTasks = document.getElementById("addedTasks");
const enterNote = document.getElementById("enterNote");
const describeTask = document.getElementById("describeTask");
const show = document.getElementById("show");
const editNote = document.getElementById("editNote");
const breakLabel = document.getElementById("breakLabel");
const addNote = document.getElementById("addNote");
const edit = document.getElementById("edit");

const display = () => {
  const url = "http://127.0.0.1:5501/read";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.length);
      for (let i = 0; i < data.length; i++) {
        let id = data[i]._id;
        addedTasks.innerHTML += `<div style = "width: 18rem; height: 7rem; background-color: #dd4489b1"
            class = "card border border-dark note" id = "selected">
            <p id = "taskname">${data[i].taskname}</p><p id = "task">${data[i].task}</p>
            <div class = "buttons" style = "margin-top: -4rem">
              <button class = "btn edit-button" onclick = "showText('${id}')">
                <img src = "./images/edit.png" alt = "edit icon" style = "width: 1rem; height: 1rem">
              </button>
              <button class = "btn delete-button" style = "background-color: #7209b5" onclick = "remove('${id}')">
                <img src = "./images/delete.png" alt = "delete icon" style = "width: 1rem; height: 1.4rem">
              </button>
            </div>
        </div>`;
      }
    });
};
display();

const add = () => {
  fetch("http://127.0.0.1:5501/create", {
    method: "post",
    body: JSON.stringify({
      taskname: document.getElementById("enterNote").value,
      task: document.getElementById("describeTask").value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data._id);
      id = data._id;

      displayNote.innerHTML = `<section class = "card showNote showaddNote" id = "show">
      <h4>Added Successfully!</h4>
    </section>`;
      addedTasks.innerHTML += `<div style = "width: 18rem; margin-top: 1rem; background-color: #dd4489b1"
        class = "card border border-dark" id = "selected">
        <p id = "taskname">${enterNote.value}</p><p id = "task">${describeTask.value}</p>
        <div class = "buttons" style = "margin-top: -4rem; margin-bottom: 1.6rem">
          <button class = "btn edit-button" onclick = "showText('${id}')">
            <img src = "./images/edit.png" alt = "edit icon" style = "width: 1rem; height: 1rem">
          </button>
          <button class = "btn delete-button" style = "background-color: #7209b5" onclick = "remove('${id}')">
                <img src = "./images/delete.png" alt = "delete icon" style = "width: 1rem; height: 1.4rem">
          </button>
        </div>
      </div>`;
      enterNote.value = "";
      describeTask.value = "";
      window.addEventListener("click", () => {
        document.getElementById("show").style.display = "none";
      });
    });
};

const remove = (i) => {
  displayNote.innerHTML = `     <section class = "card confirm-box" id="confirm">
          <h4>Are you sure to delete it? </h4>
          <img src = "./images/sad.png" alt = "sad face" style = "">
          <div class = "confirm-buttons">
              <button class = "confirm-button cancel" id = "confirmCancel">CANCEL</button>
              <button class = "confirm-button delete" id = "confirmDelete">DELETE</button>
          </div>
        </section>`;

  document.getElementById("confirmDelete").addEventListener("click", () => {
    fetch(`http://127.0.0.1:5501/delete/${i}`, {
      method: "delete",
    })
      .then(() => {
        addedTasks.innerHTML = "";
        display();
      })
      .then(() => {
        document.getElementById(
          "displayNote"
        ).innerHTML = `<section class="card showNote" id = "show">
          <h4>Deleted Successfully!</h4>
        </section>`;
        window.addEventListener("click", () => {
          document.getElementById("show").style.display = "none";
        });
      });
  });

  document.getElementById("confirmCancel").addEventListener("click", () => {
    displayNote.innerHTML = "";
  });
};

const showText = (j) => {
  console.log(j);
  addedTasks.style.display = "none";
  editNote.style.display = "";
  breakLabel.style.display = "none";
  addNote.style.display = "none";
  // document.getElementById("editTitle").value = document.querySelector("#enterNote").value;
  edit.addEventListener("click", () => {
    addedTasks.style.display = "";
    editNote.style.display = "none";
    breakLabel.style.display = "";
    addNote.style.display = "";
    const update = () => {
      fetch(`http://127.0.0.1:5501/updatetask/${j}`, {
        method: "put",
        body: JSON.stringify({
          taskname: document.getElementById("editTitle").value,
          task: document.getElementById("editText").value,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          addedTasks.innerHTML = "";
          display();
        })
        .then(() => {
          displayNote.innerHTML = `<section class = "card showNote" id = "show">
          <h4>Updated Successfully!</h4>
         </section>`;
          window.addEventListener("click", () => {
            document.getElementById("show").style.display = "none";
          });
        });
    };
    update();
  });
};