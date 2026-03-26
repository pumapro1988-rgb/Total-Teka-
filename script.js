const contenedor = document.getElementById('contenedor-mangas');
let datosMangas = [];

// Cargar el JSON que generó tu bot
fetch('manga_mirror_completo.json')
    .then(res => res.json())
    .then(data => {
        datosMangas = data;
        mostrarMangas(datosMangas);
    });

function mostrarMangas(mangas) {
    contenedor.innerHTML = '';
    mangas.forEach(manga => {
        const card = document.createElement('div');
        card.className = '__item';
        card.innerHTML = `
            <img src="${manga.foto}" alt="${manga.nombre}">
            <h3>${manga.nombre}</h3>
            <a href="${manga.url}" target="_blank">VER MANGA</a>
        `;
        contenedor.appendChild(card);
    });
}

function filtrar() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const filtrados = datosMangas.filter(m => m.nombre.toLowerCase().includes(texto));
    mostrarMangas(filtrados);
}
