import { useEffect, useState } from 'react'
import { getPokemonList, getPokemonData } from '../services/load_details'

export default function Detalles() {
  const [lista, setLista] = useState<any[]>([])
  const [pokemon, setPokemon] = useState<any>(null)
  const [verModal, setVerModal] = useState(false)

  useEffect(() => {
    getPokemonList(30).then(data => setLista(data))
  }, [])

  const abrirDetalles = async (nombre: string) => {
    const data = await getPokemonData(nombre)
    setPokemon(data)
    setVerModal(true)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Lista de Pokémones</h1>
      
      <ul style={{ paddingLeft: '20px' }}>
        {lista.map((p) => (
          <li key={p.name} style={{ marginBottom: '10px', textTransform: 'uppercase' }}>
            {p.name} - {' '}
            <button onClick={() => abrirDetalles(p.name)} style={{ cursor: 'pointer' }}>
              Ver detalles
            </button>
          </li>
        ))}
      </ul>

      {verModal && pokemon && (
        <div style={{
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          overflowY: 'scroll', 
          padding: '20px'
        }}>
          <div style={{ backgroundColor: 'lightgray', border: '2px solid black', padding: '20px', maxWidth: '500px', margin: '40px auto' }}>
            <button onClick={() => setVerModal(false)} style={{ fontWeight: 'bold', cursor: 'pointer' }}>
              CERRAR
            </button>
            
            <h2 style={{ textTransform: 'uppercase' }}>DETALLES DE: {pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '120px' }} />

            <hr style={{ border: '1px solid black' }} />
            
            <div>
              <p><b>ID:</b> {pokemon.id}</p>
              <p><b>Nombre:</b> {pokemon.name}</p>
              <p><b>Experiencia base:</b> {pokemon.base_experience}</p>
              <p><b>Altura:</b> {pokemon.height}</p>
              <p><b>Peso:</b> {pokemon.weight}</p>
              <p><b>Orden:</b> {pokemon.order}</p>
              <p><b>Especie:</b> {pokemon.species.name}</p>
              <p><b>Es default:</b> {pokemon.is_default ? "Si" : "No"}</p>
              
              {pokemon.stats.map((s: any) => (
                <p key={s.stat.name}><b>{s.stat.name}:</b> {s.base_stat}</p>
              ))}

              <p><b>Tipos:</b> {pokemon.types.map((t: any) => t.type.name).join(', ')}</p>
              <p><b>Habilidades:</b> {pokemon.abilities.map((a: any) => a.ability.name).join(', ')}</p>

              <p><b>Aparece en juegos (primeros 10):</b></p>
              <ul>
                {pokemon.game_indices.slice(0, 10).map((g: any) => (
                  <li key={g.version.name}>{g.version.name} (Índice: {g.game_index})</li>
                ))}
              </ul>

              <p><b>Movimientos (primeros 15):</b></p>
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
  )
}