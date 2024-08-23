import React from 'react';
import { useEffect, useRef, useState } from "react"
import logo from './logo.svg';
import './App.css';
import { MercadoPagoCoreInstance } from "./components";

function App() {
  const mountRef = useRef(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [mercadoPagoComponent, setMercadoPagoComponent] =
    useState<MercadoPagoCoreInstance | null>(null);

  useEffect(() => {
    if (!mountRef.current) {
      const component = new MercadoPagoCoreInstance(
        "TEST-42de8aeb-62e5-4299-a23c-a4047f607286",
        500,
        (isValid) => setFormIsValid(isValid),
        (data) => console.log(data)
      );
      setMercadoPagoComponent(component);
      mountRef.current = true;
    }
    mercadoPagoComponent?.mount("#card-component");
  }, [mercadoPagoComponent]);

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-header-container" id="card-component"></div>
                 <button
                    className={`App-button ${!formIsValid ? "App-button-disabled" : "App-button-enabled"}`}
                    onClick={() => mercadoPagoComponent?.createToken()}
                    disabled={!formIsValid}
                >
                  Submit Form
                </button>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
