let BASE_URL = `http://localhost:8080/systems`;
let cardDiv = document.querySelector(".row");
let id = new URLSearchParams(window.location.search).get("id");

async function detailData() {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  cardDiv.innerHTML += `
      <span class="col-12 card-div">
              <div class="card">
                <div class="img-div d-flex justify-content-center">
                <img src="${data.photo}" alt="" class="w-25" />
                </div>
                <div class="text">
                <h4><strong>Title:</strong> ${data.title}</h4>
                <p class="pt-1"><strong>Description:</strong> ${data.description}</p>
                <p class="pt-1"><strong>Reiting:</strong> ${data.reiting}</p>
                </div>
                <div class="btns d-flex">
                <a href="add&edit.html?id=${data.id}">Edit</a>
                <a onclick="addFav(${data.id})">Add Basket</a>
                <button onclick="deleteCard(${data.id})">Delete</button>
                </div>
                </div>
                </span>
                `;
}
detailData();

async function deleteCard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}

async function addFav(id) {
  let res = await axios(`${BASE_URL}/${id}`);
  let data = await res.data;
  await axios.post(`http://localhost:8080/favs`, data);
}
