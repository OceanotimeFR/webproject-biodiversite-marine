var json_file = '/json/apropos.json';
var aproposData = [];
var reason = ["Utiliser la technologie comme levier pour mobiliser et informer efficacement.","Créer une plateforme accessible à tous, facilitant l’engagement citoyen en faveur des océans.","Contribuer à la sauvegarde des océans, source de vie et d’inspiration."]

function fetchJSON() {
    return fetch(json_file)
        .then(response => {
            if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
            return response.json();
        })
        .then(apropos => {
            aproposData = apropos;
            const divHolder = document.getElementsByClassName("apps-rectangles")[0];
            if (!divHolder) {
                console.warn("Div apps-rectangles introuvable");
                return;
            }
            // Création des blocs
            apropos.forEach(apps => {
                const nvBlock = document.createElement("div");
                nvBlock.className = "apps-rectangle";

                const blockTitle = document.createElement("h3");
                blockTitle.textContent = apps.name;

                const blockParagraph = document.createElement("p");
                blockParagraph.textContent = apps.desc;
                blockParagraph.style.marginLeft = "30px";
                blockParagraph.style.marginRight = "30px";

                nvBlock.appendChild(blockTitle);
                nvBlock.appendChild(blockParagraph);

                nvBlock.style.height = "auto";
                nvBlock.style.width = "50%";

                divHolder.appendChild(nvBlock);
            });
            
            const blockReasons = document.createElement("div");
            const text = document.createElement("h3");
            text.textContent = "Nos volontés pour ce site :";
            blockReasons.appendChild(text);

            reason.forEach(r => {
                const blockReason = document.createElement("p");
                blockReason.textContent = r;
                blockReasons.appendChild(blockReason);
            })

            blockReasons.style.inlineSize = "100%";
            blockReasons.style.textAlign = "center";
            blockReasons.style.fontSize = "20px";

            divHolder.appendChild(blockReasons);
        });
}

fetchJSON();
