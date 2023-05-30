let BASE_URL = `http://localhost:8080/systems`;
let cards = document.querySelector(".cards");
let search = document.querySelector("input");
let select = document.querySelector("select");
let filtered = [];
let empty = [];

async function getDatas() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  cards.innerHTML = "";
  filtered = filtered.length || search.value ? filtered : data;
  filtered.forEach((el) => {
    cards.innerHTML += `
    <span class="col-12 col-lg-4 card-div">
            <div class="card">
              <div class="img-div">
              <img src="${el.photo}" alt="" class="w-100" />
              </div>
              <div class="text">
              <h4>${el.title}</h4>
              <p class="pt-1">${el.description}</p>
              <p class="pt-1">${el.reiting}</p>
              </div>
              <div class="btns d-flex flex-column">
              <a href="add&edit.html?id=${el.id}">Edit</a>
              <a href="details.html?id=${el.id}">View Details</a>
              <a onclick="addFav(${el.id})">Add Basket</a>
              <button onclick="deleteCard(${el.id})">Delete</button>
              </div>
              </div>
              </span>
              `;
  });
}
getDatas();

async function deleteCard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}

search.addEventListener("input", async function (e) {
  let res = await axios(BASE_URL);
  let data = await res.data;
  filtered = data;
  filtered = filtered.filter((el) => {
    return `${el.title}`
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  getDatas();
});

select.addEventListener("change", async function () {
  if (select.value == "asc") {
    filtered.sort((a, b) => a.reiting - b.reiting);
    getDatas();
  } else if (select.value == "desc") {
    filtered.sort((a, b) => b.reiting - a.reiting);
    getDatas();
  } else {
    let res = await axios(BASE_URL);
    let data = await res.data;
    filtered = data;
    getDatas();
  }
});

async function addFav(id) {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  await axios.post(`http://localhost:8080/favs`, data);
}
