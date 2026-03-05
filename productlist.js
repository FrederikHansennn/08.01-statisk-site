// console.log("Det virker");

// Henter kategori fra URL'en (f.eks. ?kat=skjorter)
const kategori = new URLSearchParams(window.location.search).get("kat");
// console.log(kategori);

// Finder containeren i HTML'en
const container = document.querySelector(".product-grid");
// Bygger linket til API'et med den valgte kategori
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}&limit=40`;
// Sætter overskriften på siden til at være kategoriens navn
document.querySelector("h1").textContent = kategori;
document
  .querySelectorAll("#filter button")
  .forEach((knap) => knap.addEventListener("click", filter));

document
  .querySelectorAll("#sorter button")
  .forEach((knap) => knap.addEventListener("click", sorter));
let alldata;

function getdata() {
  fetch(endpoint)
    .then((respons) => respons.json()) // Lav rå data om til et JS-objekt
    .then((data) => {
      alldata = data; // HER sker det vigtige! Vi gemmer data i vores globale beholder
      showdata(data); // Vi sender data videre til showdata for at vise dem alle første gang
    });
}

function sorter(event) {
  if (event.target.dataset.price) {
    console.log("sorter kærer");
    const dir = event.target.dataset.price;
    if (dir == "up") {
      alldata.sort((a, b) => a.price - b.price);
    } else {
      alldata.sort((a, b) => b.price - a.price);
    }
  } else {
    const dir = event.target.dataset.text;
    if (dir == "az") {
      alldata.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      alldata.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }

  showdata(alldata);
}

function filter(e) {
  const valgt = e.target.textContent;
  if (valgt == "All") {
    showdata(alldata);
  } else {
    const udsnit = alldata.filter((element) => element.gender == valgt);
    showdata(udsnit);
  }
}

function showdata(data) {
  let markup = "";
  // console.log(data);

  data.forEach((element) => {
    // console.log(element);
    // Her bygges HTML'en uden at tjekke for discount eller udsolgt
    markup += ` <article class="product-card">
          <a href="product.html?id=${element.id}">
            <div class="image-wrapper">
              ${element.soldout ? "<span class='sold-label'>Udsolgt</span>" : ""}
              <img
                src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
                alt="Cardigan"
              />
            </div>

            <h2>${element.productdisplayname}</h2>
            <p class="brand">Adidas</p>

            <div class="discount">
              <p class="price">${element.price} Kr.</p>
              ${element.discount ? "<span class='offer-label'>" + element.discount + "% rabat</span>" : ""}
            </div>
          </a>
        </article>`;
  });

  // Indsætter al HTML i containeren på én gang
  container.innerHTML = markup;
}

// Starter hele processen
getdata();
