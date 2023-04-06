
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
        `<ul style="">
            <li>${data[i].taskname} -- ${data[i].task}
            <button style="background-color: orange; border-top-left-radius:20%; 
            border-top-right-radius:20%; border-bottom-left-radius:20%; border-bottom-right-radius:20%;
            margin-left: 1rem" onclick="remove('${id}')">delete</button>
            <button style="background-color: orange; border-top-left-radius:20%; 
            border-top-right-radius:20%; border-bottom-left-radius:20%; border-bottom-right-radius:20%"
            onclick="modify('${id}')">edit</button>
            </li>
        </ul>`;
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
    `<ul>
        <li>${document.getElementById("entertask").value} -- ${document.getElementById("describetask").value}
        <button style="background-color: orange; border-top-left-radius:20%; border-top-right-radius:20%; 
        border-bottom-left-radius:20%; border-bottom-right-radius:20%; margin-left: 1rem" onclick="remove('${id}')">delete</button>
        <button style="background-color: orange; border-top-left-radius:20%; 
        border-top-right-radius:20%; border-bottom-left-radius:20%; border-bottom-right-radius:20%"
        onclick="modify('${id}')">edit</button>
        </li>
    </ul>`;
  });
}

let remove = (i) => {
  fetch(`http://127.0.0.1:5501/delete/${i}`, {
  method: 'delete',
  })
  .then(() => {
    window.location.reload();
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



