# PokeAPI

Este proyecto es una Pokedex la cual contiene 150 pokemones listados con su imagen. Cuenta con funcionalidades como:
- Seleccion de favoritos (localStorage)
- Ver detalles
- Comparacion de pokemones
- Filtro de tipos

## Arquitectura / Codigo

Fue realizado con React, Typescript y Vite, se conecta a la API pública de Pokémon (PokeAPI) para listar, ver detalles y comparar estadísticas.

La pagina tiene dos pantallas las cuales desde un NavBar se acceden:
- Home : Listado principal de pokemones con imagen / Listado favoritos / Filtro por tipos / Buscador
- Detalles: Listado de pokemones con modal para ver detalles / Comparador de pokemones

### Archivos
- main.tsx: Inicializa a React, busca el archivo HTML principal y renderizar dentro de el componente raiz (App). Tambien envuelve el proyecto en <BrowserRouter> para que funcionen los enlaces y el cambio de paginas.

- App.tsx: Es el componente raiz. Se decide la estructura general y se configuran las rutas con react-router-dom. Usa lazy loading para que la pagina cargue mas rapido.

- index.css: Se importa Tailwind de manera global para todo el proyecto.

- NavBar.tsx: Es la barra de navegación fija que sale arriba en la pantalla, muestra los botones de "Home" y "Detalles".

- load_pokemon.ts: Contiene funciones fetch para pedir la lista general de pokémones, la lista de tipos y pedir pokémones filtrados por un tipo específico.

- load_details.ts: Contiene funciones fetch para obtener datos de los pokemones (getPokemonData).

- useFavorites.ts: Codigo de la funcionalidad del listado de favoritos guardandolo en localStorage.

- Home.tsx: Es la pantalla de inicio, tiene la funciones de load_pokemon.ts para mostrar la tabla con los pokémones. Ademas de gestionar la busqueda de pokemones, filtro del selector y listado de favoritos.

- Detalles.tsx: Tiene la funcion de listar pokémones y abrir un modal con la información detallada de cada pokemon. Tambien contiene el  comparador entre pokemones mostrando sus estadisticas principales.