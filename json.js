const endpoint = "https://kea-alt-del.dk/t7/api/categories";
const container = document.querySelector("#container");

function getdata() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showdata);
}

function showdata(data) {
  data.forEach((kategori) => {
    container.innerHTML += `<a href="productlist.html?kat=${kategori.category}" class="card">${kategori.category}</a>`;
  });
}

getdata();
