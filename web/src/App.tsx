import React from "react";
import "./App.css";
import Abertura from "./Pages/usuario/Abertura";
import MinhasRotas from "./routes";
import { Provider as ReduxProvider, } from "react-redux";
import { store } from "./store/intex";


function App() {
  return (
    <div className="App h-full w-full">
      <ReduxProvider store={store}>
        <MinhasRotas />
      </ReduxProvider>
    </div>
  );
}

export default App;
