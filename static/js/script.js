//get csrf token in AJAX
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
activeItem = null;
const csrftoken = getCookie("csrftoken");

function buildList() {
  var wrapper = document.getElementById("list-wrapper");
  var myurl = "http://127.0.0.1:8000/agendatasks/all/";

  wrapper.innerHTML = "";
  fetch(myurl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log("Data", data);
      var context = data;
      for (var i in context) {
        try {
          document.getElementById(`data-row-${i}`).remove();
        } catch (err) {}
        var item = `
						<div id="data-row-${i}" class="task-wrapper flex-wrapper">
							<div class="task-title" style="flex:7">
								${context[i].title}
							</div>
							<div style="flex:1">
								<button class="btn btn-sm btn-outline-warning edit"><i class="fa-solid fa-pen-to-square"></i> </button>
							</div>
							<div style="flex:1">
								<button class="btn btn-sm btn-outline-dark delete"><i class="fa-solid fa-trash-can"></i></button>
							</div>
						</div>
					`;

        wrapper.innerHTML += item;
      }

      for (var i in context) {
        //Edit agenda task
        var edit = document.getElementsByClassName("edit")[i];
        edit.addEventListener(
          "click",
          (function (item) {
            return function () {
              editItem(item);
            };
          })(context[i])
        );

        var destroy = document.getElementsByClassName("delete")[i];
        destroy.addEventListener(
          "click",
          (function (item) {
            return function () {
              destroyItem(item);
            };
          })(context[i])
        );

        var taskTitle = document.getElementsByClassName("task-title")[i];
        if (context[i].completed === true) {
          taskTitle.style.textDecoration = "line-through";
        }
        console.log(taskTitle.classList);

        taskTitle.addEventListener(
          "click",
          (function (item) {
            return function () {
              strike(item);
            };
          })(context[i])
        );
      }
    });
}
buildList();

var form = document.getElementById("form-wrapper");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Form Submitted");

  var title = document.getElementById("title").value;
  var myurl = "http://127.0.0.1:8000/agendatasks/new/";
  if (activeItem != null) {
    myurl = `http://127.0.0.1:8000/agendatasks/${activeItem.id}/update/`;
    console.log(myurl);
    activeItem = null;
  }
  fetch(myurl, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },

    body: JSON.stringify({ title: title }),
  }).then(function (response) {
    buildList();
    document.getElementById("form").reset();
  });
});

function editItem(item) {
  console.log("Item clicked:", item);
  activeItem = item;
  document.getElementById("title").value = activeItem.title;
}

function destroyItem(item) {
  console.log("Item clicked:", item);
  myurl = `http://127.0.0.1:8000/agendatasks/${item.id}/delete/`;

  fetch(myurl, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({ title: title }),
  }).then((response) => buildList());
}

function strike(item) {
  console.log("Strike clicked");
  console.log(item);

  item.completed = !item.completed;
  fetch(`http://127.0.0.1:8000/agendatasks/${item.id}/update/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({ title: item.title, completed: item.completed }),
  }).then((response) => {
    buildList();
  });
}
