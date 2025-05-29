// Fichier JSON
var json_file = '../json/innovations.json';

// Récupération des données du JSON
function fetchJSON(){
    fetch(json_file)
    .then(response => response.json())
        .then(innovations => {
            innovations.forEach(innovations => {
                const divHolder = document.getElementsByClassName("innovations-rectangles")[0];
                const nvBlock = document.createElement("div");
                nvBlock.className = "innovations-rectangle";
                const blockTitle = document.createElement("h3");
                blockTitle.textContent = innovations.Nom;
                const blockParagraph = document.createElement("p");
                blockParagraph.textContent = innovations.Détail;
                const blockImg = document.createElement("img");
                blockImg.src = innovations.Img;

                nvBlock.append(blockImg);
                nvBlock.appendChild(blockTitle);
                nvBlock.appendChild(blockParagraph);

                divHolder.appendChild(nvBlock);
            })
        })
}

fetchJSON(json_file);