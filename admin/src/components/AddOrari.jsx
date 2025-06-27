import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddOrari = () => {
  const [input, setInput] = useState({
    name: "",
    role: "",
    h: "",
    m: "",
    me: "",
    e: "",
    p: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3008/orari", input);
      navigate("/orari");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header text-white bg-gradient-primary py-4 text-center">          
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Emri</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Shto emrin e puntorit"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="role" className="form-label">Roli</label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      name="role"
                      placeholder="Shto rolin e puntorit"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <h5 className="mb-3 mt-4">Orari javor</h5>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="h" className="form-label">Hene</label>
                    <input
                      type="text"
                      className="form-control"
                      id="h"
                      name="h"
                      placeholder="Shkruaj ndrrimin e puntorit"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="m" className="form-label">Marte</label>
                    <input
                      type="text"
                      className="form-control"
                      id="m"
                      name="m"
                      placeholder="Shkruaj ndrrimin e puntorit"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="me" className="form-label">Merkure</label>
                    <input
                      type="text"
                      className="form-control"
                      id="me"
                      name="me"
                      placeholder="Shkruaj ndrrimin e puntorit"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="e" className="form-label">Enjte</label>
                    <input
                      type="text"
                      className="form-control"
                      id="e"
                      name="e"
                      placeholder="Shkruaj ndrrimin e puntorit"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="p" className="form-label">Premte</label>
                    <input
                      type="text"
                      className="form-control"
                      id="p"
                      name="p"
                      placeholder="Shkruaj ndrrimin e puntorit"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-success px-5 py-2 fw-bold"
                    onClick={handleClick}
                  >
                    Shto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrari;