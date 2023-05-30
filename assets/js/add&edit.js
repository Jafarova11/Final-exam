let BASE_URL = `http://localhost:8080/systems`;
let titleInput = document.querySelector("#titleinput");
let description = document.querySelector("#desinput");
let photo = document.querySelector("#photoinput");
let reiting = document.querySelector("#reitinginput");
let form = document.querySelector("form");
let title = document.querySelector("title");
let topTitle = document.querySelector(".toptitle");
let btn = document.querySelector(".submit");
let id = new URLSearchParams(window.location.search).get("id");

async function alldatas() {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  titleInput.value = data.title;
  description.value = data.description;
  reiting.value = data.reiting;
}
if (id) {
  alldatas();
  (title.innerHTML = "Edit page"),
    (topTitle.innerHTML = "Edit"),
    (btn.innerHTML = "Edit");
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    title: titleInput.value,
    description: description.value,
    reiting: reiting.value,
    photo: `../imgs/${photo.value.split("\\")[2]}`,
  };
  if (titleInput.value != "" && description.value != "" && photo.value != "") {
    if (!id) {
      await axios.post(BASE_URL, obj);
      window.location = "index.html";
    } else {
      await axios.patch(`${BASE_URL}/${id}`, obj);
      window.location = "index.html";
    }
  } else {
    alert("Empty values!");
  }
});
