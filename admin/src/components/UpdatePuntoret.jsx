import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const UpdatePuntoret = () => {
  const [input, setInput] = useState({
    name: "",
    sname: "",
    role: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const puntoriId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3008/puntoret/${puntoriId}`, input);
      navigate("/puntoret");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-light rounded-3 shadow-lg p-4">
            <h3 className="text-center text-dark mb-4">Update Informacionet e Puntorit</h3>
            <form>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">Emri</label>
                <input
                  type="text"
                  className="form-control form-control-lg border-0 shadow-sm"
                  placeholder="Shkruaj emrin"
                  name="name"
                  onChange={handleChange}
                  value={input.name}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="sname">Mbiemri</label>
                <input
                  type="text"
                  className="form-control form-control-lg border-0 shadow-sm"
                  placeholder="Shkruaj mbiemrin"
                  name="sname"
                  onChange={handleChange}
                  value={input.sname}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="role">Roli</label>
                <input
                  type="text"
                  className="form-control form-control-lg border-0 shadow-sm"
                  placeholder="Shkruaj rolin"
                  name="role"
                  onChange={handleChange}
                  value={input.role}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-outline-primary px-4 py-2 shadow-sm"
                  onClick={handleClick}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePuntoret;