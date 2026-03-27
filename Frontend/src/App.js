import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [roles, setRoles] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [vista, setVista] = useState(""); // controla pantalla

  const obtenerRoles = () => {
    fetch("http://localhost:3000/roles")
      .then(res => res.json())
      .then(data => setRoles(data));
  };

  useEffect(() => {
    if (vista === "listar") {
      obtenerRoles();
    }
  }, [vista]);

  const crearRol = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ descripcion })
    })
      .then(res => res.json())
      .then(() => {
        setDescripcion("");
        alert("Rol creado!");
      });
  };


  const eliminarRol = (id) => {
  if (!window.confirm("¿Seguro que querés eliminar este rol?")) return;

  fetch(`http://localhost:3000/roles/${id}`, {
    method: "DELETE"
  }).then(() => obtenerRoles());
};


  return (
    <div className="container">
      <h1>Gestión de Roles</h1>

      {/* BOTONES */}
      <div className="buttons">
  <button
    className={vista === "listar" ? "btn-active" : "btn"}
    onClick={() => setVista(vista === "listar" ? "" : "listar")}
  >
    Ver Roles
  </button>

  <button
    className={vista === "crear" ? "btn-active" : "btn"}
    onClick={() => setVista(vista === "crear" ? "" : "crear")}
  >
    Nuevo Rol
  </button>
</div>

      {/* LISTA */}
      {vista === "listar" && (
        <ul>
  {roles.map(role => (
    <li key={role.id} className="item">
      <span>{role.descripcion}</span>
      <button
        className="btn-delete"
        onClick={() => eliminarRol(role.id)}
      >
        Eliminar
      </button>
    </li>
  ))}
</ul>
      )}

      {/* FORMULARIO */}
      {vista === "crear" && (
        <form onSubmit={crearRol}>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Nuevo rol"
          />
          <button type="submit">Guardar</button>
        </form>
      )}
    </div>
  );
}

export default App;