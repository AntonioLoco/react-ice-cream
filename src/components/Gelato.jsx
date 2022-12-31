import React from "react";

const Gelato = ({ categoria, descrizione, img, nome, prezzo }) => {
  return (
    <div className="card">
      <img src={img} className="card-img-top" alt={nome} />
      <div className="card-body">
        <h5 className="card-title">{nome}</h5>
        <p className="card-text">{descrizione}</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{categoria}</li>
          <li className="list-group-item fw-bold text-primary">{prezzo}$</li>
        </ul>
      </div>
    </div>
  );
};

export default Gelato;
