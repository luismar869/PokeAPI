import { useEffect, useState } from 'react'
import { getPokemonList, getPokemonData } from '../services/load_details'

export default function Detalles() {
  const [lista, setLista] = useState<any[]>([])
  const [pokemon, setPokemon] = useState<any>(null)
  const [verModal, setVerModal] = useState(false)
  const [pokemonSeleccionado1, setPokemonSeleccionado1] = useState('')
  const [pokemonSeleccionado2, setPokemonSeleccionado2] = useState('')
  const [datosPokemon1, setDatosPokemon1] = useState<any>(null)
  const [datosPokemon2, setDatosPokemon2] = useState<any>(null)
  const [cargandoComparacion, setCargandoComparacion] = useState(false)

  useEffect(() => {
    getPokemonList(150).then(data => setLista(data))
  }, [])

  const abrirDetalles = async (nombre: string) => {
    const data = await getPokemonData(nombre)
    setPokemon(data)
    setVerModal(true)
  }

  const manejarComparacion = async () => {
    if (!pokemonSeleccionado1 || !pokemonSeleccionado2) {
      alert('Selecciona dos pokemon.');
      return;
    }
    
    setCargandoComparacion(true)
    try {
      const data1 = await getPokemonData(pokemonSeleccionado1)
      const data2 = await getPokemonData(pokemonSeleccionado2)
      setDatosPokemon1(data1)
      setDatosPokemon2(data2)
    } catch (error) {
      console.error("Error al comparar", error)
    } finally {
      setCargandoComparacion(false)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        
        <h2 style={{ textAlign: 'center', marginTop: 0 }}>Comparador de pokemon</h2>
        <p style={{ textAlign: 'center', marginBottom: '25px' }}>
          Selecciona dos pokemon para comparar:
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          alignItems: 'center', 
          marginBottom: '20px', 
          flexWrap: 'wrap',
          justifyContent: 'center' 
        }}>
          <select 
            value={pokemonSeleccionado1} 
            onChange={(e) => setPokemonSeleccionado1(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Selecciona un pokemon</option>
            {lista.map(p => (
              <option key={`comp1-${p.name}`} value={p.name}>{p.name}</option>
            ))}
          </select>

          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>VS</span>

          <select 
            value={pokemonSeleccionado2} 
            onChange={(e) => setPokemonSeleccionado2(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Selecciona un pokemon</option>
            {lista.map(p => (
              <option key={`comp2-${p.name}`} value={p.name}>{p.name}</option>
            ))}
          </select>

          <button 
            onClick={manejarComparacion}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer', 
              backgroundColor: '#007BFF', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            {cargandoComparacion ? 'Cargando...' : 'Comparar'}
          </button>
        </div>

        {datosPokemon1 && datosPokemon2 && (
          <div style={{ 
            backgroundColor: '#f9f9f9', 
            border: '2px solid #333', 
            padding: '20px', 
            width: '100%',
            maxWidth: '600px', 
            borderRadius: '8px',
            marginTop: '20px',
            boxSizing: 'border-box' 
          }}>
            <h3 style={{ textAlign: 'center', marginTop: 0 }}>Comparacion</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <img src={datosPokemon1.sprites.front_default} alt={datosPokemon1.name} style={{ width: '90px' }} />
                <p style={{ fontWeight: 'bold', textTransform: 'uppercase', margin: '5px 0' }}>{datosPokemon1.name}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <img src={datosPokemon2.sprites.front_default} alt={datosPokemon2.name} style={{ width: '90px' }} />
                <p style={{ fontWeight: 'bold', textTransform: 'uppercase', margin: '5px 0' }}>{datosPokemon2.name}</p>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #333', backgroundColor: '#eee' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Estadisticas</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>{datosPokemon1.name}</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>{datosPokemon2.name}</th>
                </tr>
              </thead>
              <tbody>
                {datosPokemon1.stats.map((s1: any, index: number) => {
                  const s2 = datosPokemon2.stats[index];

                  return (
                    <tr key={s1.stat.name} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '8px', textTransform: 'capitalize', fontWeight: '500' }}>
                        {s1.stat.name.replace('-', ' ')}
                      </td>
                      <td style={{ 
                        padding: '8px', 
                        textAlign: 'center', 
                        color: 'black', 
                      }}>
                        {s1.base_stat} 
                      </td>
                      <td style={{ 
                        padding: '8px', 
                        textAlign: 'center', 
                        color: 'black', 
                      }}>
                        {s2.base_stat} 
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <hr style={{ border: '1px solid #ccc', margin: '40px 0' }} />

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
          padding: '20px',
          backgroundColor: 'rgba(0,0,0,0.4)'
        }}>
          <div style={{ backgroundColor: 'lightgray', border: '2px solid black', padding: '20px', maxWidth: '500px', margin: '40px auto' }}>
            <button onClick={() => setVerModal(false)} style={{ fontWeight: 'bold', cursor: 'pointer' }}>
              CERRAR
            </button>
            
            <h2 style={{ textTransform: 'uppercase' }}>Detalles de: {pokemon.name}</h2>
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

              <p><b>Aparece en juegos:</b></p>
              <ul>
                {pokemon.game_indices.slice(0, 10).map((g: any) => (
                  <li key={g.version.name}>{g.version.name} (Índice: {g.game_index})</li>
                ))}
              </ul>

              <p><b>Movimientos:</b></p>
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