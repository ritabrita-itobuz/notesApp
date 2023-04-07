document.getElementById("edittask").style.display="none";

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
        `<div style="width: 18rem; height: 7rem; background: #0B65E6;
            background: -webkit-linear-gradient(top left, #0B65E6, #B5D9DD);
            background: -moz-linear-gradient(top left, #0B65E6, #B5D9DD);
            background: linear-gradient(to bottom right, #0B65E6, #B5D9DD);"
            class="card border border-dark" id="selected">
            <p id="taskname">${data[i].taskname}</p><p id="task">${data[i].task}</p>
            <div class="buttons" style = "margin-top: -4rem">
              <button class="btn" onclick="showText('${id}')">Edit</button>
              <button class="btn" style="" onclick="remove('${id}')">Delete</button>
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
    document.getElementById("addedtasks").innerHTML += 
    `<div style="width: 18rem; background: #0B65E6;
        background: -webkit-linear-gradient(top left, #0B65E6, #B5D9DD);
        background: -moz-linear-gradient(top left, #0B65E6, #B5D9DD);
        background: linear-gradient(to bottom right, #0B65E6, #B5D9DD);"
        class="card border border-dark">
        <p id="taskname">${document.getElementById("entertask").value}</p><p id="task">${document.getElementById("describetask").value}</p>
        <div class="buttons" style = "margin-top: -4rem">
          <button class="btn" onclick="showText('${id}')">Edit</button>
          <button class="btn" onclick="remove('${id}')">Delete</button>
        </div>
    </div>`;
    document.getElementById("entertask").textContent = "";
    Swal.fire({
      text: "task added",
      customClass: 'add-task',
      timer: 1500
    });
  });
}

let remove = (i) => {
  fetch(`http://127.0.0.1:5501/delete/${i}`, {
  method: 'delete',
  })
  .then(() => {
    Swal.fire({
      text: "task deleted",
      customClass: 'delete-task',
      timer: 1500
    });
    document.getElementById("addedtasks").innerHTML = "";
    display();
  })
}

let showText = (j) => {
  console.log(j);
  document.getElementById("addedtasks").style.display = "none";
  document.getElementById("edittask").style.display = "";
  document.getElementById("edit").addEventListener('click', () => {
    document.getElementById("addedtasks").style.display = "";
    document.getElementById("edittask").style.display="none";
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
    });
  }  
}




