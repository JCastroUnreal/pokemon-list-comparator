import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Pokemon from "./components/Pokemon";

function App() {
  const [pokemonName, setPokemonName] = useState("pikachu");

  const handleInputChange = (event) => {
    setPokemonName(event.target.value);
  };

  return (
    <div>
      <h1>Buscador de Pokémon</h1>
      <input
        type="text"
        value={pokemonName}
        onChange={handleInputChange}
        placeholder="Introduce el nombre del Pokémon"
      />
      <Pokemon pokemonName={pokemonName} />
    </div>
  );
}

export default App;
