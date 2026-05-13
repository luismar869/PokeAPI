export const getPokemons = async (limit = 20) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results; 
  } catch (error) {
    console.error("Error al cargar pokemones:", error);
    return [];
  }
};