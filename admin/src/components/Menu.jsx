import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar'; // Adjust the import path if necessary

const Menu = () => {
    const [ushqimet, setUshqimet] = useState([]);

    useEffect(() => {
        const fetchAllUshqimet = async () => {
            try {
                const res = await axios.get('http://localhost:3008/menu');
                setUshqimet(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllUshqimet();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3008/menu/${id}`);
            window.location.reload();
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
                        <h2 className="text-center mb-4 text-primary">Menuja e Ushqimit</h2>
                        <table className="table table-hover table-striped table-bordered shadow">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>Emri i Ushqimit</th>
                                    <th>Çmimi</th>
                                    <th>Veprimet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ushqimet.map((ushqimi) => (
                                    <tr key={ushqimi.id}>
                                        <td className="align-middle">{ushqimi.name}</td>
                                        <td className="align-middle">{ushqimi.price} €</td>
                                        <td className="align-middle">
                                            <div className="d-flex gap-2 justify-content-center">
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(ushqimi.id)}
                                                >
                                                    <i className="bi bi-trash"></i> Fshij
                                                </button>
                                                <Link to={`/editfood/${ushqimi.id}`} className="btn btn-warning btn-sm text-white">
                                                    <i className="bi bi-pencil-square"></i> Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center mt-4">
                            <Link to="/addfood" className="btn btn-success shadow">
                                <i className="bi bi-plus-lg"></i> Shto Ushqim
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;