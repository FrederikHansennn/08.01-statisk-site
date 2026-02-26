// 1. Her gemmer vi webadressen (stien) til vores data i en variabel
const endpoint = "https://kea-alt-del.dk/t7/api/categories";

// 2. Vi finder det sted i vores HTML (beholderen), hvor vi vil vise kategorierne
const container = document.querySelector("#container");

// 3. Funktionen der starter "stafetten" og henter data fra nettet
function getdata() {
  fetch(endpoint) // Gå til adressen og hent "pakken"
    .then((respons) => respons.json()) // Lav pakken om til et format (JSON), som JS kan læse
    .then(showdata); // Når data er klar, send hele listen videre til showdata-funktionen
}

// 4. Funktionen der bygger vores HTML-kort ud fra de data, vi har modtaget
function showdata(data) {
  // 'data' er her vores "modtager-bakke" for hele listen af kategorier

  // .forEach er motoren: Den kører koden herunder én gang for hver ting i listen
  data.forEach((kategori) => {
    // 'kategori' er det MIDLERTIDIGE navn for den enkelte ting, vi har i hånden lige nu

    // Vi bruger += for at lægge et nyt link til beholderen uden at slette de gamle
    // ${kategori.category} kigger INDENI det midlertidige objekt efter den specifikke tekst
    container.innerHTML += `
      <a href="productlist.html?kat=${kategori.category}" class="card">
        ${kategori.category}
      </a>`;
  });
}

// 5. Her trykker vi på "startknappen", så hele processen går i gang
getdata();
