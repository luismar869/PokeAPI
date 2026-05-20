export const getPokemons = async (limit = 150) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results; 
  } catch (error) {
    console.error("Error al cargar pokemones:", error);
    throw error; 
  }
};

export const getTypes = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error al cargar tipos:", error);
    return [];
  }
};

export const getPokemonsByType = async (typeName: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
    const data = await response.json();
    return data.pokemon.map((p: any) => p.pokemon);
  } catch (error) {
    console.error("Error al cargar por tipo:", error);
    throw error;
  }
};