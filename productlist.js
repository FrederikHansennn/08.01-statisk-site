// 1. HENTNING AF PARAMETRE FRA URL
// Vi kigger i adresselinjen efter "?kat=..." og gemmer værdien (f.eks. "skjorter")
const kategori = new URLSearchParams(window.location.search).get("kat");

// 2. DOM-ELEMENTER OG API-OPSÆTNING
// Vi finder det element i HTML'en (product-grid), hvor alle produkterne skal indsættes
const container = document.querySelector(".product-grid");

// Vi bygger URL'en til API'et. Vi indsætter den valgte kategori dynamisk med ${kategori}
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}&limit=40`;

// Vi opdaterer sidens hovedoverskrift (h1) til at vise navnet på kategorien
document.querySelector("h1").textContent = kategori;

// 3. EVENT LISTENERS (INTERAKTIVITET)
// Finder alle knapper i filter-sektionen og giver dem en "lytter" der kalder filter-funktionen
document
  .querySelectorAll("#filter button")
  .forEach((knap) => knap.addEventListener("click", filter));

// Finder alle knapper i sorterings-sektionen og giver dem en "lytter" der kalder sorter-funktionen
document
  .querySelectorAll("#sorter button")
  .forEach((knap) => knap.addEventListener("click", sorter));

// En global variabel (en tom beholder) til at gemme vores data, så vi kan sortere/filtrere lokalt
let alldata;

// 4. DATA-HENTNING (FETCH)
function getdata() {
  fetch(endpoint)
    .then((respons) => respons.json()) // Modtager rå data og laver det om til et JS-objekt
    .then((data) => {
      alldata = data; // Gemmer en kopi af alle produkterne i vores globale variabel
      showdata(data); // Kalder showdata for at tegne produkterne på skærmen første gang
    });
}

// 5. SORTERING
function sorter(event) {
  // Tjekker om knappen har en 'data-price' egenskab (pris-sortering)
  if (event.target.dataset.price) {
    const dir = event.target.dataset.price;
    if (dir == "up") {
      alldata.sort((a, b) => a.price - b.price); // Sorterer fra lav til høj
    } else {
      alldata.sort((a, b) => b.price - a.price); // Sorterer fra høj til lav
    }
  }
  // Hvis ikke det er pris, tjekker den 'data-text' (navne-sortering)
  else {
    const dir = event.target.dataset.text;
    if (dir == "az") {
      // localeCompare sørger for at danske bogstaver (æ, ø, å) sorteres rigtigt
      alldata.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      alldata.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }
  showdata(alldata); // Opdaterer siden med den nye rækkefølge
}

// 6. FILTRERING
function filter(e) {
  const valgt = e.target.textContent; // Finder teksten på knappen (f.eks. "Men")
  if (valgt == "All") {
    showdata(alldata); // Vis alle hvis der trykkes på "All"
  } else {
    // Laver en ny liste (udsnit) der kun indeholder produkter med det valgte køn
    const udsnit = alldata.filter((element) => element.gender == valgt);
    showdata(udsnit); // Vis kun det filtrerede udsnit
  }
}

// 7. VISNING AF DATA (HTML-BYGGER)
function showdata(data) {
  let markup = ""; // En tom "pose" til vores HTML-strenge

  data.forEach((element) => {
    // Her bygger vi HTML'en for hvert produkt.
    // Læg mærke til linket: product.html?id=${element.id} - det sender ID'et videre til næste side!
    markup += ` <article class="product-card">
      <a href="product.html?id=${element.id}">
        <div class="image-wrapper">
          ${element.soldout ? "<span class='sold-label'>Udsolgt</span>" : ""}
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="${element.productdisplayname}" />
        </div>
        <h2>${element.productdisplayname}</h2>
        <p class="brand">${element.brandname}</p>
        <div class="discount">
          <p class="price">${element.price} Kr.</p>
          ${element.discount ? "<span class='offer-label'>" + element.discount + "% rabat</span>" : ""}
        </div>
      </a>
    </article>`;
  });

  // Til sidst "indsætter" vi hele den store tekst-streng i vores container på én gang
  container.innerHTML = markup;
}

// 8. START SKUDDET
getdata(); // Sætter gang i hele processen
