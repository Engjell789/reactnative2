import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Orari = () => {
  const [puntoretOrari, setPuntoretOrari] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    name: '',
    role: '',
    h: '',
    m: '',
    me: '',
    e: '',
    p: '',
  });

  useEffect(() => {
    const fetchAllPuntoretOrari = async () => {
      try {
        const res = await axios.get('http://localhost:3008/orari');
        setPuntoretOrari(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPuntoretOrari();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/orari/${id}`);
      setPuntoretOrari(puntoretOrari.filter((orari) => orari.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    const orari = puntoretOrari.find((item) => item.id === id);
    setEditingId(id);
    setEditValues(orari);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3008/orari/${editingId}`, editValues);
      setPuntoretOrari((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...item, ...editValues } : item
        )
      );
      setEditingId(null);
      setEditValues({
        name: '',
        role: '',
        h: '',
        m: '',
        me: '',
        e: '',
        p: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({
      name: '',
      role: '',
      h: '',
      m: '',
      me: '',
      e: '',
      p: '',
    });
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
              <h2 className="text-primary font-weight-bold">Orari i punetoreve</h2>
            </div>
            <div className="row">
              {puntoretOrari.map((orari) => (
                <div key={orari.id} className="col-12 col-md-6 col-lg-4 mb-4">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      {editingId === orari.id ? (
                        <>
                          <div className="mb-2">
                            <input
                              type="text"
                              className="form-control"
                              value={editValues.name}
                              onChange={(e) =>
                                setEditValues({ ...editValues, name: e.target.value })
                              }
                              placeholder="Name"
                            />
                          </div>
                          <div className="mb-2">
                            <input
                              type="text"
                              className="form-control"
                              value={editValues.role}
                              onChange={(e) =>
                                setEditValues({ ...editValues, role: e.target.value })
                              }
                              placeholder="Role"
                            />
                          </div>
                          <div className="mb-2">
                            <input
                              type="text"
                              className="form-control"
                              value={editValues.h}
                              onChange={(e) =>
                                setEditValues({ ...editValues, h: e.target.value })
                              }
                              placeholder="Monday"
                            />
                          </div>
                          <div className="mb-2">
                            <input
                              type="text"
                              className="form-control"
                              value={editValues.m}
                              onChange={(e) =>
                                setEditValues({ ...editValues, m: e.target.value })
                              }
                              placeholder="Tuesday"
                            />
                          </div>
                          <div className="mb-2">
                            <input
                              type="text"
                              className="form-control"
                              value={editValues.me}
                              onChange={(e) =>
                                setEditValues({ ...editValues, me: e.target.value })
                              }
                              placeholder="Wednesday"
                            />
                          </div>
                          <div className="mb-2">
                            <input
                              type="text"
                              className="form-control"
                              value={editValues.e}
                              onChange={(e) =>
                                setEditValues({ ...editValues, e: e.target.value })
                              }
                              placeholder="Thursday"
                            />
                          </div>
                          <div className="mb-2">
                            <input
                              type="text"
                              className="form-control"
                              value={editValues.p}
                              onChange={(e) =>
                                setEditValues({ ...editValues, p: e.target.value })
                              }
                              placeholder="Friday"
                            />
                          </div>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-success"
                              onClick={handleSave}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h5 className="card-title">{orari.name}</h5>
                          <p className="card-text">Role: {orari.role}</p>
                          <ul className="list-unstyled">
                            <li><strong>Hene:</strong> {orari.h}</li>
                            <li><strong>Marte:</strong> {orari.m}</li>
                            <li><strong>Merkure:</strong> {orari.me}</li>
                            <li><strong>Enjte:</strong> {orari.e}</li>
                            <li><strong>Premte:</strong> {orari.p}</li>
                          </ul>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleEdit(orari.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(orari.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link to="/addorari" className="btn btn-success shadow">
                <i className="bi bi-plus-circle"></i> Shto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orari;