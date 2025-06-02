document.getElementById("globalSearch").addEventListener("input", async (e) => {
    const query = e.target.value.toLowerCase();
    const resultContainer = document.getElementById("globalSearchResults");
    resultContainer.innerHTML = ""; // Reset

    if (query.length < 2) return;

    const allSources = [
        fetch('/json/network.json').then(res => res.json()),
        fetch('/json/innovations.json').then(res => res.json()),
        fetch('/json/map.json').then(res => res.json())
    ];

    const [network, innovations, carte] = await Promise.all(allSources);

    const matches = [];

    const checkAndPush = (obj, page, defaultUrl = "#") => {
        const values = Object.values(obj).join(" ").toLowerCase();
        if (values.includes(query)) {
            const name = obj.name || obj.title || obj.Nom || obj.nom;
            if (!name) return;

            let url;
            if (page === "Innovations") {
                // Génère le lien vers un fichier .html du dossier innovations
                url = `/html/innovations/${encodeURIComponent(name)}.html`;
            } else if (page === "Carte") {
                url = `carte.html#${encodeURIComponent(name)}`;
            } else if (page === "Réseau") {
                url = `reseau.html#${encodeURIComponent(name)}`;
            } else {
                url = defaultUrl;
            }

            matches.push({ name, page, url });
        }
    };

    network.forEach(n => checkAndPush(n, "Réseau"));
    innovations.forEach(i => checkAndPush(i, "Innovations"));
    carte.forEach(c => checkAndPush(c, "Carte"));

    if (matches.length === 0) {
        resultContainer.innerHTML = "<p>Aucun résultat</p>";
        return;
    }

    matches.forEach(result => {
        const item = document.createElement("div");
        item.innerHTML = `<a href="${result.url}" target="_blank" rel="noopener noreferrer">
            <strong>${result.name}</strong> — ${result.page}
        </a>`;
        resultContainer.appendChild(item);
    });
});
