import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import Sidebar from './Sidebar';

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all reservations from the backend
  const fetchReservations = () => {
    setLoading(true);
    axios
      .get('http://localhost:3008/admin/reservations')
      .then((res) => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError('Error fetching reservations');
      });
  };

  // Cancel a reservation
  const handleCancel = (roomId) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      axios
        .post('http://localhost:3008/cancel', { roomId })
        .then((res) => {
          alert(res.data.message); // Show success message
          fetchReservations(); // Refresh the reservations list
        })
        .catch((err) => {
          console.error(err);
          alert('Error canceling the reservation.');
        });
    }
  };

  useEffect(() => {
    fetchReservations(); // Load reservations on component mount
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar /> 
        </div>

        
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="text-center mb-4">
              <h1 className="fw-bold text-primary">Menaxhmenti i rezervimeve</h1>
            </div>

            {/* Loading Spinner and Error Alert */}
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}

            
            {reservations.length > 0 ? (
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Emri i dhomes</th>
                    <th>Numri i dhomes</th>
                    <th>Qmimi</th>
                    <th>Status</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Veprimet</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.name}</td>
                      <td>{reservation.nr}</td>
                      <td>{reservation.qmimi}</td>
                      <td>{reservation.reservation_status === '0' ? 'Available' : 'Reserved'}</td>
                      <td>{reservation.from_date || 'N/A'}</td>
                      <td>{reservation.to_date || 'N/A'}</td>
                      <td>
                        {reservation.reservation_status === '1' && (
                          <Button
                            variant="danger"
                            onClick={() => handleCancel(reservation.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="info">No reservations found.</Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReservations;