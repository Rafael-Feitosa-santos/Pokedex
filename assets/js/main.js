const search = document.getElementById("search");
const pokedex = document.getElementById("pokedex");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentId = 1;

// Executa enquanto o usuário digita
search.addEventListener("input", () => {
    const term = search.value.toLowerCase().trim();
    if (term) {
        fetchPokemon(term);
    } else {
        pokedex.innerHTML = ""; // limpa o conteúdo quando o input estiver vazio
    }
});

prevBtn.addEventListener("click", () => {
    if (currentId > 1) {
        currentId--;
        fetchPokemon(currentId);
    }
});

nextBtn.addEventListener("click", () => {
    currentId++;
    fetchPokemon(currentId);
});

async function fetchPokemon(identifier) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
        if (!res.ok) throw new Error("Pokémon não encontrado");
        const data = await res.json();
        currentId = data.id;
        renderCard(data);
    } catch {
        pokedex.innerHTML = `<p>Pokémon não encontrado 😢</p>`;
    }
}

function renderCard(pokemon) {
    const types = pokemon.types.map(t => t.type.name).join(", ");
    const stats = pokemon.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join("");
    const moves = pokemon.moves.slice(0, 5).map(m => `<li>${m.move.name}</li>`).join("");

    pokedex.innerHTML = `
    <div class="card">
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p>Tipo(s): ${types}</p>
      <p>Altura: ${pokemon.height / 10} m</p>
      <p>Peso: ${pokemon.weight / 10} kg</p>
      <h4>Força base:</h4>
      <ul>${stats}</ul>
      <h4>Ataques:</h4>
      <ul>${moves}</ul>
    </div>
  `;
}