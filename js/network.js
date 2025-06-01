var json_file = '/json/network.json';
var networkData = [];

function fetchJSON() {
    return fetch(json_file)
        .then(response => {
            if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
            return response.json();
        })
        .then(network => {
            networkData = network;
            const divHolder = document.getElementsByClassName("network-rectangles")[0];
            if (!divHolder) {
                console.warn("Div network-rectangles introuvable");
                return;
            }
            // Création des blocs
            network.forEach(netwk => {
                const path = `../data/img/network/`;

                const nvBlock = document.createElement("div");
                nvBlock.className = "network-rectangle";
                nvBlock.style.zIndex="100";

                const blockTitle = document.createElement("h3");
                blockTitle.textContent = netwk.name;
                blockTitle.style.zIndex="inherit";

                const blockParagraph = document.createElement("p");
                blockParagraph.textContent = netwk.mission;

                const blockImg = document.createElement("img");
                blockImg.src = `${path+netwk.name}-logo.png`;

                const blockLink = document.createElement("a");
                blockLink.href = netwk.website;
                blockLink.onclick = () => website_link_alert();
                blockLink.style.textDecoration = "none";
                blockLink.style.color="var(--main-txt-color)";

                const blockTip = document.createElement("div");
                blockTip.className = "tooltip";
                blockTip.textContent = `Lieu : ${netwk.location || "inconnu"}\nFondateur : ${netwk.founder || netwk.founders?.[0] || "inconnu"}\nFondé en : ${netwk.founded || "inconnu"}\nSite : ${netwk.website || "Non communiqué"}`;

                nvBlock.appendChild(blockImg);
                nvBlock.appendChild(blockTitle);
                nvBlock.appendChild(blockParagraph);
                nvBlock.appendChild(blockTip);

                blockLink.appendChild(nvBlock);

                divHolder.appendChild(blockLink);
            });

            document.querySelectorAll('.network-rectangle').forEach(rectangle => {
                const tooltip = rectangle.querySelector('.tooltip');

                rectangle.addEventListener('mousemove', (e) => {
                    const rect = rectangle.getBoundingClientRect();
                    let x = e.clientX - rect.left + 10;
                    let y = e.clientY - rect.top + 10;

                    const maxBodyX = window.innerWidth - tooltip.offsetWidth;
                    const maxBodyY = window.innerHeight - tooltip.offsetHeight;

                    if (x > maxBodyX) x = maxBodyX;
                    if (y > maxBodyY) y = maxBodyY;

                    tooltip.style.left = x + 'px';
                    tooltip.style.top = y + 'px';
                });

                rectangle.addEventListener('mouseenter', () => {
                    tooltip.style.opacity = '1';
                    tooltip.style.pointerEvents = 'auto';
                });

                rectangle.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                    tooltip.style.pointerEvents = 'none';
                });
            });
        });
}

fetchJSON();
