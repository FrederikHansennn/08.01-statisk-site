console.log("Det virker");

// Henter kategori fra URL'en (f.eks. ?kat=skjorter)
const kategori = new URLSearchParams(window.location.search).get("kat");
console.log(kategori);

// Finder containeren i HTML'en
const container = document.querySelector(".product-grid");
// Bygger linket til API'et med den valgte kategori
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}`;
// Sætter overskriften på siden til at være kategoriens navn
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
    // Her bygges HTML'en uden at tjekke for discount eller udsolgt
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

  // Indsætter al HTML i containeren på én gang
  container.innerHTML = markup;
}

// Starter hele processen
getdata();
