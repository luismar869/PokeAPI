import { useEffect, useState } from 'react'
import { getPokemons } from '../services/load_pokemon'
interface Pokemon {
  name: string;
  url: string;
}

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokemons(30).then(data => setPokemons(data));
  }, []);

  return (
    <div>
      <h1>Pokédex</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', margin: '10px', width: '200px', textAlign: 'center' }}>
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home