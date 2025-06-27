import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

const Puntoret = () => {
  const [puntoret, setPuntoret] = useState([]);

  useEffect(() => {
    const fetchAllPuntoret = async () => {
      try {
        const res = await axios.get("http://localhost:3008/puntoret");
        setPuntoret(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPuntoret();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/puntoret/${id}`);
      setPuntoret((prev) => prev.filter((puntori) => puntori.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="text-center mb-4">
              <h1 className="fw-bold text-primary">Punetoret e hotelit</h1>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Emri</th>
                    <th>Mbiermi</th>
                    <th>Roli</th>
                    <th>Veprimet</th>
                  </tr>
                </thead>
                <tbody>
                  {puntoret.map((puntori) => (
                    <tr key={puntori.id}>
                      <td>{puntori.name}</td>
                      <td>{puntori.sname}</td>
                      <td>{puntori.role}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(puntori.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                        <Link to={`/update/${puntori.id}`} className="btn btn-warning btn-sm">
                          <i className="bi bi-pencil"></i> Update
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4">
              <Link to="/create" className="btn btn-success px-4 py-2">
                <i className="bi bi-plus-circle"></i> Shto puntorin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Puntoret;