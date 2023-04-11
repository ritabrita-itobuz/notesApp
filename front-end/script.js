document.getElementById("edittask").style.display="none";

let fetchedTitle = "";

let display = () => {

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
        document.getElementById("addedtasks").innerHTML += 
        `<div style="width: 18rem; height: 7rem; background-color: #dd4489b1"
            class="card border border-dark note" id="selected">
            <p id="taskname">${data[i].taskname}</p><p id="task">${data[i].task}</p>
            <div class="buttons" style = "margin-top: -4rem">
              <button class="btn edit-button" onclick="showText('${id}')">
                <img src="./images/edit.png" style="width: 1rem; height: 1rem">
              </button>
              <button class="btn delete-button" style="background-color: #7209b5" onclick="remove('${id}')">
                <img src="./images/delete.png" style="width: 1rem; height: 1.4rem">
              </button>
            </div>
        </div>`;
      }
    });
}
display();

let add = () => {
  fetch("http://127.0.0.1:5501/create", {
    method: "post",
    body: JSON.stringify({
      taskname: document.getElementById("entertask").value,
      task: document.getElementById("describetask").value,
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

    document.getElementById("displayNote").innerHTML = 
    `<section class="card showNote showAddNote" id = "show">
      <h4>Added Successfully!</h4>
    </section>`;

    document.getElementById("addedtasks").innerHTML += 
    `<div style="width: 18rem; margin-top: 1rem; background-color: #dd4489b1"
        class="card border border-dark" id="selected">
        <p id="taskname">${document.getElementById("entertask").value}</p><p id="task">${document.getElementById("describetask").value}</p>
        <div class="buttons" style = "margin-top: -4rem; margin-bottom: 1.6rem">
          <button class="btn edit-button" onclick="showText('${id}')">
            <img src="./images/edit.png" style="width: 1rem; height: 1rem">
          </button>
          <button class="btn delete-button" style="background-color: #7209b5" onclick="remove('${id}')">
                <img src="./images/delete.png" style="width: 1rem; height: 1.4rem">
          </button>
        </div>
      </div>`;
    document.getElementById("entertask").value = "";
    document.getElementById("describetask").value = "";
    window.addEventListener('click', () => {
      document.getElementById("show").style.display = "none";
    })
  })
}

let remove = (i) => {
  document.getElementById("displayNote").innerHTML = 
  `     <section class="card confirm-box" id="confirm">
          <h4>Are you sure to delete it? </h4>
          <img src="./images/sad.png" style="">
          <div class="confirm-buttons">
              <button class="confirm-button cancel" id="confirmCancel">CANCEL</button>
              <button class="confirm-button delete" id="confirmDelete">DELETE</button>
          </div>
        </section>`;

  document.getElementById('confirmDelete').addEventListener('click', () => {
    fetch(`http://127.0.0.1:5501/delete/${i}`, {
      method: 'delete',
      })
      .then(() => {
        document.getElementById("addedtasks").innerHTML = "";
        display();
      })
      .then(() => {
        document.getElementById("displayNote").innerHTML = 
        `<section class="card showNote" id = "show">
          <h4>Deleted Successfully!</h4>
        </section>`;
        window.addEventListener('click', () => {
          document.getElementById("show").style.display = "none";
        })
      })
    })

  document.getElementById('confirmCancel').addEventListener('click', () => {
    document.getElementById('displayNote').innerHTML = "";
    })
}

let showText = (j) => {
  console.log(j);
  document.getElementById("addedtasks").style.display = "none";
  document.getElementById("edittask").style.display = "";
  document.getElementById("breaklabel").style.display="none";
  document.getElementById("addnote").style.display="none";
  document.getElementById("edit").addEventListener('click', () => {
    document.getElementById("addedtasks").style.display = "";
    document.getElementById("edittask").style.display="none";
    document.getElementById("breaklabel").style.display="";
    document.getElementById("addnote").style.display="";
    update();
  })
  let update = () => {
    fetch(`http://127.0.0.1:5501/updatetask/${j}`, {
      method: 'put',
      body: JSON.stringify({
        taskname: document.getElementById("edittitle").value,
        task: document.getElementById("edittext").value,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("addedtasks").innerHTML = "";
      display();
    })
    .then(() => {
      document.getElementById("displayNote").innerHTML = 
      `<section class="card showNote" id = "show">
        <h4>Updated Successfully!</h4>
       </section>`;
      window.addEventListener('click', () => {
        document.getElementById("show").style.display = "none";
      })
    })    
  }  
}




