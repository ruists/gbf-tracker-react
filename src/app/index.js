import React from "react";
import { render } from "react-dom";
import { Header } from "./components/Header";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Header />
        </div>
      </div>
    );
  }
}

render(<App />, window.document.getElementById("app"));
