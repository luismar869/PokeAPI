import { useEffect, useState } from 'react'
import { getPokemons, getTypes, getPokemonsByType } from '../services/load_pokemon'

export default function Home() {
  const [pokemons, setPokemons] = useState<any[]>([])
  const [types, setTypes] = useState<any[]>([])
  
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [onlyFavorites, setOnlyFavorites] = useState(false)

  const [favorites, setFavorites] = useState<string[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('favoritos')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
    
    getTypes().then(data => setTypes(data))
  }, [])

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    setLoading(true)
    setError(false)

    if (selectedType === '') {
      getPokemons(36)
        .then(data => {
          setPokemons(data)
          setLoading(false)
        })
        .catch(() => {
          setError(true)
          setLoading(false)
        })
    } else {
      getPokemonsByType(selectedType)
        .then(data => {
          setPokemons(data)
          setLoading(false)
        })
        .catch(() => {
          setError(true)
          setLoading(false)
        })
    }
  }, [selectedType])

  const clickFavorito = (name: string) => {
    if (favorites.includes(name)) {
      const nuevo = favorites.filter(p => p !== name)
      setFavorites(nuevo)
    } else {
      setFavorites([...favorites, name])
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Pokédex</h1>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px'}}>
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <option value="">Todos los tipos</option>
          {types.map(t => (
            <option key={t.name} value={t.name}>{t.name}</option>
          ))}
        </select>

        <button 
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: onlyFavorites ? 'grey' : 'white' }}
        >
          {onlyFavorites ? 'Favoritos' : 'Mostrar Favoritos'}
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Cargando pokemones de la API...</p>}
      
      {error && (
        <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
          Error: No se pudo conectar con la PokeAPI.
        </p>
      )}

      {!loading && !error && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {pokemons
            .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
            .filter(p => onlyFavorites ? favorites.includes(p.name) : true)
            .map((pokemon) => {
              const esFav = favorites.includes(pokemon.name)
              
              // Sacar el ID dividiendo la url por las diagonales, evita saturar API
              const partes = pokemon.url.split('/')
              const id = partes[partes.length - 2]
              const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

              return (
                <div 
                  key={pokemon.name} 
                  style={{ 
                    border: '1px solid black', 
                    padding: '10px', 
                    margin: '10px', 
                    width: '140px', 
                    textAlign: 'center' 
                  }}
                >
                  <img src={imgUrl} alt={pokemon.name} style={{ width: '90px', height: '90px', marginLeft: '12px' }} />
                  <p style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{pokemon.name}</p>
                  
                  <button onClick={() => clickFavorito(pokemon.name)} style={{ width: '100%', cursor: 'pointer' }}>
                    {esFav ? 'Quitar' : 'Favorito'}
                  </button>
                </div>
              )
            })}
        </div>
      )}

      {!loading && !error && pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).filter(p => onlyFavorites ? favorites.includes(p.name) : true).length === 0 && (
        <p style={{ textAlign: 'center', color: 'gray' }}>No se encontraron resultados.</p>
      )}
    </div>
  )
}