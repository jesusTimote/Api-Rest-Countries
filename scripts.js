const $Busca = document.getElementById("search");
const $select = document.getElementById("select");
const $ContentPais = document.getElementById("card-pais");
const $btn_dark = document.getElementById("btn-dark");
/*------ ----- Metodo para Obtener pais ----- ------*/
const $ObtenerPais = (url) => {
    const xttp = new XMLHttpRequest();
    xttp.open("GET", url);
    xttp.send();
    xttp.addEventListener("loadend", () => {
        if (xttp.status >= 200 && xttp.status <= 300) {
            let json = JSON.parse(xttp.responseText);
            $ContentPais.innerHTML = "";
            json.forEach((ele) => {
                $ContentPais.innerHTML += `
                    <div class="pais" id="pais"">
                            <div class="imagen" data-id="${ele.alpha3Code}">
                                <img src="${ele.flag}" />
                            </div>
                        <div class="title-card">
                            <h2>${ele.name}</h2>
                            <p><strong>Population :</strong> ${ele.population}</p>
                            <p><strong>Region :</strong> ${ele.region}</p>
                            <p><strong>Capital :</strong> ${ele.capital}</p>
                        </div>
                    </div>

                 `;
            });
        } else {
            let message = xttp.statusText || "Ocurrio un error - Pais no encontrado";

            $ContentPais.innerHTML = `Error ${xttp.status} : ${message}`;
        }
    });
};
/*------ ----- Metodo para obtener pais al presionar una tecla ----- ------*/
$Busca.addEventListener("keydown", (e) => {
    let buscaPais = $Busca.value.toLocaleUpperCase();

    if (e.key === "Enter") {
        const url = `https://restcountries.com/rest/v3/name/${buscaPais}?fullText=true`;
        $ObtenerPais(url);
        if (buscaPais == "") {
            window.location.reload();

        }
    }
    if (e.key === "Backspace") {
        if (buscaPais.length === 1) {
            window.location.reload();

        }

    }

});
/*------ ----- Metodo para obtener pais ----- ------*/
function Pais() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("select")) {
            let buscaPais = $select.value;
            console.log(buscaPais);
            const url = `https://restcountries.com/rest/v3/regionalbloc/${buscaPais}`;
            $ObtenerPais(url);
        }
    });
    let buscaPais = $select.value;
    const url = `https://restcountries.com/rest/v3/regionalbloc/${buscaPais}`;
    $ObtenerPais(url);
}
Pais();

/*------ ----- Metodo para el dark mode ----- ------*/
$btn_dark.addEventListener("click", (e) => {
    document.body.classList.toggle("dark");
    $btn_dark.classList.toggle("active");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("dark-mode", true);
    } else {
        localStorage.setItem("dark-mode", false);
    }
});
// Obtenemos el modo actual.
if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
    $btn_dark.classList.add("active");
} else {
    document.body.classList.remove("dark");
    $btn_dark.classList.remove("active");
}

/* ----------------------------- */
/* *************  ************  */
/* ----------------------------- */

const $CardPais = document.querySelectorAll(".card-pais")
//const $ContentPais = document.getElementById("card-pais");

$CardPais.forEach(card => {
    let id;
    card.addEventListener("click", (e) => {
        if (card.classList.contains("card-pais")) {
            let selectPais = e.target.parentElement.parentElement
            id = selectPais.querySelector(".imagen").getAttribute("data-id");
            localStorage.setItem("CardPais", id)
            window.location.href = "cardPais.html"


        }
    });

});
