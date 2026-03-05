// 1. IDENTIFIKATION AF PRODUKTET
// Vi kigger i URL'en efter "id" (f.eks. product.html?id=1527)
// Dette ID er "stafetten", som blev sendt fra produktlisten.
const id = new URLSearchParams(window.location.search).get("id");

// 2. API-ENDPOINT TIL ET SPECIFIKT PRODUKT
// Vi bygger linket til API'et, så det kun henter data for det specifikke ID
const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

// 3. FIND CONTAINER
// Vi finder det element i HTML'en, hvor hele produktvisningen skal ligge
const container = document.querySelector(".product-page");

// 4. HENT DATA (FETCH)
function getdata() {
  fetch(endpoint)
    .then((respons) => respons.json()) // Laver det rå svar om til et JS-objekt
    .then(showdata); // Sender det enkelte produkt-objekt videre til showdata-funktionen
}

// 5. VISNING AF PRODUKTET
function showdata(data) {
  // console.log(data); // God til at tjekke i konsollen hvilke data vi har fået

  // Vi genererer HTML'en og indsætter den i vores container
  container.innerHTML = `
      <section class="product-media">
        <a href="productlist.html" class="tilbage-knap">Tilbage</a>
        <img
          src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp"
          alt="${data.productdisplayname}"
        />
      </section>

      <section class="product-info">
        <h1>Product Information</h1>

        <ul>
          <li>
            <span class="label">Name:</span> ${data.productdisplayname}
          </li>
          <li>
            <span class="label">Color:</span> ${data.basecolour}
          </li>
          <li>
            <span class="label">Product ID:</span> ${data.id}
          </li>
        </ul>

        <h2>${data.brandname}</h2>
        <p>${data.brandbio}</p>
      </section>

      <aside class="product-buy">
        <h2>${data.productdisplayname}</h2>
        <p>${data.brandname}</p>

        <p class="price">
          <span>${Math.round(data.price - (data.price * data.discount) / 100)},-</span>
          
          ${data.soldout ? "<span class='sold-label'>Udsolgt</span>" : ""}
        </p>
        
        <label for="size">Choose a size:</label>
        <select id="size" name="size">
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>

        <button disabled>Add to basket</button>
      </aside>`;
}

// 6. START PROCES
// Vi kalder getdata() for at starte hele fetch- og visningsprocessen
getdata();
