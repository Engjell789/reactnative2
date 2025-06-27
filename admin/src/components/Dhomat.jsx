import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Dhomat = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [values, setValues] = useState({
        name: '',
        pershkrimi: '',
        image: ''
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3008/dhomat')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    const handleAdd = () => {
        axios.post('http://localhost:3008/dhomat', values)
            .then(res => {
                setData([...data, res.data]);
                setValues({ name: '', pershkrimi: '', image: '' });
                setShowModal(false);
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        const roomToEdit = data.find(room => room.id === id);
        if (roomToEdit) {
            setValues({
                name: roomToEdit.name,
                pershkrimi: roomToEdit.pershkrimi,
                image: roomToEdit.image
            });
            setEditId(id);
            setShowModal(true);
        }
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:3008/dhomat/${editId}`, values)
            .then(res => {
                const updatedData = data.map(room => {
                    if (room.id === editId) {
                        return res.data;
                    }
                    return room;
                });

                setData(updatedData);
                setEditId(null);
                setValues({ name: '', pershkrimi: '', image: '' });
                setShowModal(false);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3008/dhomat/${id}`)
            .then(() => {
                const updatedData = data.filter(room => room.id !== id);
                setData(updatedData);
            })
            .catch(err => console.log(err));
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [id]: value
        }));
    };

    return (
        <div className="container-fluid">
            {/* Flexbox container for sidebar and content */}
            <div className="row">
                {/* Sidebar Section */}
                <div className="col-md-3">
                    <Sidebar />
                </div>

                {/* Content Section */}
                <div className="col-md-9">
                    <div className="container">
                        <div className="row">
                            {data.map((dhoma, index) => (
                                <div key={index} className="col-12 col-md-6 col-lg-4">
                                    <div className="card">
                                        <h5 className="card-title">{dhoma.name}</h5>
                                        {dhoma.image && <img src={dhoma.image} alt="room" />}
                                        <div className="card-body">
                                            <p>{dhoma.pershkrimi}</p>
                                            <button className="btn btn-secondary mr-2" onClick={() => handleEdit(dhoma.id)}>Edit</button>
                                            <button className="btn btn-danger mr-2" onClick={() => handleDelete(dhoma.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Button */}
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center">
                                <button className="btn btn-success" onClick={() => setShowModal(true)}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Add/Edit Room */}
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editId ? 'Edit Room' : 'Add Room'}</h5>
                                <button type="button" className="close" onClick={() => { setShowModal(false); setEditId(null); setValues({ name: '', pershkrimi: '', image: '' }); }} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" value={values.name} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pershkrimi">Description</label>
                                        <textarea className="form-control" id="pershkrimi" rows="3" value={values.pershkrimi} onChange={handleInputChange}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Image</label>
                                        <input type="text" className="form-control" id="image" value={values.image} onChange={handleInputChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false); setEditId(null); setValues({ name: '', pershkrimi: '', image: '' }); }}>Close</button>
                                {editId !== null ? (
                                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                                ) : (
                                    <button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dhomat;