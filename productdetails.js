console.log("Det virker");

const id = new URLSearchParams(window.location.search).get("id");
const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

const container = document.querySelector(".product-page");

function getdata() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showdata);
}

function showdata(data) {
  console.log(data);

  container.innerHTML = `<section class="product-media">
        <a href="productlist.html" class="tilbage-knap">Tilbage</a>
        <img
          src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp"
          alt="Sports-trøje"
        />
      </section>

      <!-- Midten: Produktinformation -->
      <section class="product-info">
        <h1>Product Information</h1>

        <ul>
          <li>
            <span class="label">${data.productdisplayname}
            
          </li>
          <li>
            <span class="label">${data.basecolour}
          </li>
          <li>
            <span class="label">Product ID: ${data.id}</span>
          </li>
        </ul>

        <h2>${data.brandname}</h2>
        <p>${data.brandbio}</p>
      </section>

      <!-- Højre: Køb-boks -->
      <aside class="product-buy">
        <h2>${data.productdisplayname}</h2>
        <p>${data.brandname}</p>

        <p class="price">
          <span class="old-price">${data.price}kr</span>
          <span class="sold-label">Udsolgt</span>
        </p>
        <p class="stock-status out">Ikke på lager</p>

        <label for="size">Choose a size:</label>
        <select id="size" name="size">
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>

        <button disabled>Add to basket</button>
      </aside>`;
}

// Starter hele processen
getdata();
