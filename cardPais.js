const $cardLista = document.querySelector(".card");
const $btnBack=document.querySelector(".Back");
function ListaPais() {
    let arrayLista = localStorage.getItem("CardPais");

    const xttp = new XMLHttpRequest();
    const url = `https://restcountries.eu/rest/v2/alpha/${arrayLista}`;
    console.log(url);
    xttp.open("GET", url);
    xttp.send();
    xttp.addEventListener("loadend", () => {
        if (xttp.status >= 200 && xttp.status <= 300) {
            let json = JSON.parse(xttp.responseText);
            console.log(json);
            $cardLista.innerHTML = `
            <div class="countrie-city">
                <div class="countrie-img">
                    <img src="${json.flag}" />
                </div>
                <div class="city-title">
                    <h2>${json.name}</h2>
                    <div class="city"> 
                        <div class="city-descripcion">
                            <p><strong>Native Name :</strong> ${json.nativeName}</p>
                            <p><strong>Population :</strong> ${json.population}</p>
                            <p><strong>Region :</strong> ${json.region}</p>
                            <p><strong>SubRegion :</strong> ${json.subregion}</p>
                            <p><strong>Capital :</strong> ${json.capital}</p>
                        </div>
                        <div class="descripcion-countries">
                            <p><strong>TopLevelDomian :</strong> ${json.topLevelDomain}</p>
                            <p><strong>Currencies :</strong> ${json.currencies.map((a) => a.name)}</p>
                            <p><strong>Language :</strong> ${json.languages.map((a) => a.name)}</p>
                        </div>
                    </div>
                    <div class="city-borders-countries">
                        <p><strong>Border Countries :</strong>${json.borders.map((a) =>`<li>${a}</li>`).join('')}</p>
                      
                    </div>
                </div>
                
            </div>
            `;

            
       
        }
    });

}

ListaPais();

$btnBack.addEventListener("click",()=>{

    localStorage.removeItem('CardPais');
})

const $btn_darkMode = document.getElementById("btn-dark");

$btn_darkMode.addEventListener("click", (e) => {
    document.body.classList.toggle("dark");
    $btn_darkMode.classList.toggle("active");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("dark-mode", true);
    } else {
        localStorage.setItem("dark-mode", "false");
    }
});
// Obtenemos el modo actual.
if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
    $btn_darkMode.classList.add("active");
} else {
    document.body.classList.remove("dark");
    $btn_darkMode.classList.remove("active");
}
