console.log("Det virker");

const kategori = new URLSearchParams(window.location.search).get("kat");
console.log(kategori);

const container = document.querySelector(".product-grid");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}`;
document.querySelector("h1").textContent = kategori;

function getdata() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showdata);
}
function showdata(data) {
  let markup = "";
  console.log(data);
  data.forEach((element) => {
    console.log(element);
    markup += ` <article class="product-card">
          <a href="product.html">
            <div class="image-wrapper">
              <span class="sold-label">Udsolgt</span>
              <img
                src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
                alt="Cardigan"
              />
            </div>

            <h2>${element.productdisplayname}</h2>
            <p class="brand">Adidas</p>

            <div class="discount">
              <p class="price">${element.price} Kr.</p>
              <span class="offer-label">${element.discount}</span>
            </div>
          </a>
        </article>`;
  });

  container.innerHTML = markup;
}

getdata();
