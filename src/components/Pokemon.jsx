import React, { useState, useEffect } from "react";
import axios from "axios";

// Función para obtener datos de la API de Pokémon y guardarlos en sessionStorage
function fetchAndStorePokemon(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Datos del Pokémon:", data);

      // Guarda el nombre del Pokémon en sessionStorage
      sessionStorage.setItem("pokemonName", data.name);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Llamada a la función
fetchAndStorePokemon("ditto");

// Recuperar el nombre del Pokémon desde sessionStarage
const storedPokemon = sessionStorage.getItem("pokemonName");
console.log("Nombre del Pokémon almacenado:", storedPokemon);

function Pokemon({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Defino la URL de la API
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    // Hago una peticion a la API
    axios
      .get(url)
      .then((response) => {
        // Guardar los datos del Pokemon en el estado
        setPokemon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del Pokemon", error);
        setLoading(false);
      });
  }, [pokemonName]);

  // Mostrar un mensaje de carga mientras esperamos la respuesta de la API
  if (!pokemon) {
    return <p>Pokemon no encontrado.</p>;
  }

  return (
    <div>
      <h2>{pokemon.name.toUpperCase()}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Peso: {pokemon.weight} hectogramos</p>
      <p>Altura: {pokemon.height} decímetros</p>
      <p>
        Tipo: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")}
      </p>
    </div>
  );
}

export default Pokemon;
