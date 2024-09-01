import React, { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        const fetches = data.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        );

        Promise.all(fetches).then((results) => {
          setPokemonList(results);
        });
      });
  }, []);

  return (
    <>
      <div>
        <h1>Lista Pokémon</h1>
        <div className="pokemon-list">
          {pokemonList.map((pokemon, index) => (
            <PokemonCard
              key={index}
              name={pokemon.name}
              imageUrl={pokemon.sprites.front_default}
              type={pokemon.types
                .map((typeInfo) => typeInfo.type.name)
                .join(", ")}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
