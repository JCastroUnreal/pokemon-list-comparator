import React, { useState, useEffect } from "react";
import axios from "axios";

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
