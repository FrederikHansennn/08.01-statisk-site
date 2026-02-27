console.log("Det virker");
const container = document.querySelector(".product-grid");
const endpoint = "https://kea-alt-del.dk/t7/api/products";

function getdata() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showdata);
}
function showdata(data) {
  let markup = "";
  console.log(data);
  data.forEach((element) => console.log(element));
  markup += ` <article class="product-card">
          <a href="product.html">
            <div class="image-wrapper">
              <span class="sold-label">Udsolgt</span>
              <img
                src="https://kea-alt-del.dk/t7/images/webp/640/1165.webp"
                alt="Cardigan"
              />
            </div>

            <h2>Sort Cardigan</h2>
            <p class="brand">Adidas</p>

            <div class="discount">
              <p class="price">149 kr</p>
              <span class="offer-label">Tilbud, 100 kr</span>
            </div>
          </a>
        </article>`;

  container.innerHTML = markup;
}

getdata();
