let BASE_URL = `http://localhost:8080/favs`;
let cards = document.querySelector(".fav-cards");

async function favDatas() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  cards.innerHTML = "";
  data.forEach((el) => {
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
              <button onclick="removeFav(${el.id})">Delete</button>
              </div>
              </div>
              </span>
    `;
  });
}
favDatas();

async function removeFav(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("span").remove();
}
