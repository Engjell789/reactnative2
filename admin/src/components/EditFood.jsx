import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EditFood = () => {
  const [input, setInput] = useState({
    name: "",
    price: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const ushqimiId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3008/menu/" + ushqimiId, input);
      navigate("/menu");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-warning text-white text-center">
              <h2>Ndrysho Ushqimin</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Emri i Ushqimit</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Shkruaj emrin e ushqimit"
                    onChange={handleChange}
                    name="name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Çmimi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Shkruaj çmimin e ushqimit"
                    onChange={handleChange}
                    name="price"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-success" onClick={handleClick}>
                    <i className="bi bi-check-circle"></i> Edit
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

export default EditFood;