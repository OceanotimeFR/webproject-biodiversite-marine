var json_file = '/json/innovations.json';
var innovationsData = [];
var extensions = ['.png', '.svg'] ;

function fetchJSON() {
    return fetch(json_file)
        .then(response => {
            if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
            return response.json();
        })
        .then(innovations => {
            innovationsData = innovations;
            const divHolder = document.getElementsByClassName("innovations-rectangles")[0];
            if (!divHolder) {
                console.warn("Div innovations-rectangles introuvable");
                return;
            }
            innovations.forEach(innovation => {
                const nvBlock = document.createElement("div");
                nvBlock.className = "innovations-rectangle";

                const blockTitle = document.createElement("h3");
                blockTitle.textContent = innovation.Nom;

                const blockParagraph = document.createElement("p");
                blockParagraph.textContent = innovation.Détail;

                const blockImg = document.createElement("img");
                blockImg.src = innovation.Img;

                const blockLink = document.createElement("a");
                blockLink.href = `./innovations/${innovation.Nom}.html`;
                blockLink.style.textDecoration = "none";
                blockLink.style.color = "var(--main-txt-color)";

                nvBlock.appendChild(blockImg);
                nvBlock.appendChild(blockTitle);
                nvBlock.appendChild(blockParagraph);

                blockLink.appendChild(nvBlock);
                divHolder.appendChild(blockLink);
            });
        });
}

function checkPage() {
    const page = window.location.pathname;
    return page;
}

function explainInnovations(page) {
    const nomPage = page.split("/").pop();
    const nomPage_treated = nomPage.replace(".html", "").replace(/%20/g, " ");
    const basePath = `/data/img/innovations/${nomPage_treated}-logo`;
    console.log(nomPage_treated, basePath);

    const innovation = innovationsData.find(innovation => innovation.Nom === nomPage_treated);
    if (!innovation) {
        console.warn("Innovation non trouvée pour la page :", nomPage_treated);
        return;
    }

    const divHolder = document.getElementById("explication-innovation");
    if (!divHolder) {
        console.warn("Div explication-innovation introuvable");
        return;
    }

    const divPage = document.createElement("div");
    divPage.className = "explication-innovation-divClass";
    divPage.style.textAlign = "center";
    divPage.style.display = "flex"; 
    divPage.style.flexDirection = "column"; 
    divPage.style.alignItems = "center";

    const divHeader = document.createElement("h3");
    divHeader.textContent = innovation.Nom;

    const divP1 = document.createElement("p");
    divP1.textContent = innovation.para;
    divP1.style.padding = "1rem 0";
    divP1.style.width = "80%";
    divP1.style.marginLeft = "auto";
    divP1.style.marginRight = "auto";

    const divP2 = document.createElement("p");
    divP2.textContent = innovation.Auteur;
    divP2.style.padding = "1rem 0";
    divP2.style.width = "80%";
    divP2.style.marginLeft = "auto";
    divP2.style.marginRight = "auto";

    const divP3 = document.createElement("p");
    divP3.textContent = innovation.Objectif;
    divP3.style.padding = "1rem 0";
    divP3.style.width = "80%";
    divP3.style.marginLeft = "auto";
    divP3.style.marginRight = "auto";

    const divP4 = document.createElement("p");
    divP4.textContent = innovation.Organisation;
    divP4.style.padding = "1rem 0";
    divP4.style.width = "80%";
    divP4.style.marginLeft = "auto";
    divP4.style.marginRight = "auto";

    const divP5 = document.createElement("p");
    divP5.textContent = innovation.Date;
    divP5.style.padding = "1rem 0";
    divP5.style.width = "80%";
    divP5.style.marginLeft = "auto";
    divP5.style.marginRight = "auto";


    const divLogo = document.createElement("img");
    divLogo.src = `${basePath}.png`
    if(nomPage_treated == "Plastic2Oil"){
        divLogo.style.backgroundColor = "rgb(21, 100, 57)";
    }
    divLogo.style.transform = "translateY(10px)";
    divLogo.style.width = "500px";
    divLogo.style.marginTop="0";
    divLogo.style.marginBottom="0";
    divLogo.style.zIndex = "100";


    divPage.appendChild(divLogo);
    divPage.appendChild(divP1);
    divPage.appendChild(divP3);
    divPage.appendChild(divP5);
    divPage.appendChild(divP4);
    divPage.appendChild(divP2);

    divHolder.appendChild(divPage);
}

fetchJSON().then(() => {
    explainInnovations(checkPage());
}).catch(error => {
    console.error("Erreur lors du chargement du JSON :", error);
});
