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
        `<div style="width: 18rem; background: #0B65E6;
            background: -webkit-linear-gradient(top left, #0B65E6, #B5D9DD);
            background: -moz-linear-gradient(top left, #0B65E6, #B5D9DD);
            background: linear-gradient(to bottom right, #0B65E6, #B5D9DD);"
            class="card border border-dark">
            ${data[i].taskname} -- ${data[i].task}
            <div class="buttons">
              <button class="btn" onclick="modify('${id}')">Edit</button>
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
        ${document.getElementById("entertask").value} -- ${document.getElementById("describetask").value}
        <div class="buttons">
          <button class="btn" onclick="modify('${id}')">Edit</button>
          <button class="btn" onclick="remove('${id}')">Delete</button>
        </div>
    </div>`
    swal("task added");
  });
}

let remove = (i) => {
  fetch(`http://127.0.0.1:5501/delete/${i}`, {
  method: 'delete',
  })
  .then(() => {
    document.getElementById("addedtasks").innerHTML = "";
    display();
  })
}

let modify = (i) => {
  fetch(`http://127.0.0.1:5501/updatetask/${i}`, {
    method: 'put',
    body: JSON.stringify({
      taskname: document.getElementById("entertask").value,
      task: document.getElementById("describetask").value,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
}



