import React, { useEffect, useState } from 'react';
import { getPokemonList, getPokemonData } from '../services/load_details';

const Detalles: React.FC = () => {
  const [lista, setLista] = useState<any[]>([]);
  const [pokemon, setPokemon] = useState<any>(null);
  const [verModal, setVerModal] = useState(false);

  useEffect(() => {
    getPokemonList(30).then(setLista);
  }, []);

  const abrirDetalles = async (nombre: string) => {
    const data = await getPokemonData(nombre);
    setPokemon(data);
    setVerModal(true);
  };

  return (
    <div style={{padding: '20px' }}>
      <h1>Boceto: Lista de Pokémones</h1>
      
      <ul>
        {lista.map((p) => (
          <li key={p.name} style={{ marginBottom: '10px' }}>
            {p.name.toUpperCase()} - 
            <button onClick={() => abrirDetalles(p.name)}>Ver detalles</button>
          </li>
        ))}
      </ul>

      {verModal && pokemon && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflowY: 'scroll', padding: '20px'
        }}>
          <div style={{ background: 'grey', border: '2px solid grey', padding: '20px' }}>
            <button onClick={() => setVerModal(false)}>CERRAR</button>
            
            <h2>DETALLES DE: {pokemon.name.toUpperCase()}</h2>
            <img src={pokemon.sprites.front_default}/>

            <hr />
            <div>
              <p>ID: {pokemon.id}</p>
              <p>Nombre: {pokemon.name}</p>
              <p>Experiencia base: {pokemon.base_experience}</p>
              <p>Altura: {pokemon.height}</p>
              <p>Peso: {pokemon.weight}</p>
              <p>Orden: {pokemon.order}</p>
              <p>Especie: {pokemon.species.name}</p>
              <p>Es default: {pokemon.is_default ? "Si" : "No"}</p>
              {pokemon.stats.map((s: any) => (
                <p key={s.stat.name}>{s.stat.name}: {s.base_stat}</p>
              ))}

              <p>Tipos: {pokemon.types.map((t: any) => t.type.name).join(', ')}</p>
              <p>Habilidades: {pokemon.abilities.map((a: any) => a.ability.name).join(', ')}</p>

              <ul>
                {pokemon.game_indices.slice(0, 10).map((g: any) => (
                  <li key={g.version.name}>Aparece en: {g.version.name} (Índice: {g.game_index})</li>
                ))}
              </ul>

              <p>Movimientos:</p>
              <ul>
                {pokemon.moves.slice(0, 15).map((m: any) => (
                  <li key={m.move.name}>{m.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detalles;