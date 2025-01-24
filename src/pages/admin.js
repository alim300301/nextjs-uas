import { useState, useEffect } from "react";
import Link from "next/link";

export default function Admin() {
    const [motors, setMotors] = useState([]);
    const [newMotor, setNewMotor] = useState({
        Jenis_motor: "",
        Harga_motor: "",
    });
    const [editMotor, setEditMotor] = useState(null);

    // Fetch data sepeda motor
    useEffect(() => {
        const fetchMotors = async () => {
            const res = await fetch("http://localhost:1337/api/data-sepeda-motors");
            const data = await res.json();
            setMotors(data.data);
        };

        fetchMotors();
    }, []);

    // Handle form inputs for new motor
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMotor({ ...newMotor, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditMotor({ ...editMotor, [name]: value });
    };

    // Create new motor
    const handleCreateMotor = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:1337/api/data-sepeda-motors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: newMotor }),
        });

        if (res.ok) {
            const motorData = await res.json();
            setMotors([...motors, motorData.data]);
            setNewMotor({ Jenis_motor: "", Harga_motor: "" });
        }
    };

    // Edit motor
    const handleEditMotor = async (motorId) => {
        const motor = motors.find((motor) => motor.id === motorId);
        setEditMotor(motor);
    };

    // Update motor
    const handleUpdateMotor = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:1337/api/data-sepeda-motors/${editMotor.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: editMotor }),
        });

        if (res.ok) {
            const motorData = await res.json();
            setMotors(motors.map((motor) => (motor.id === motorData.data.id ? motorData.data : motor)));
            setEditMotor(null);
        }
    };

    // Delete motor
    const handleDeleteMotor = async (motorId) => {
        const res = await fetch(`http://localhost:1337/api/data-sepeda-motors/${motorId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setMotors(motors.filter((motor) => motor.id !== motorId));
        }
    };

    return (
        <div className="admin-container">
            <h1>Panel Admin - CRUD Sepeda Motor</h1>

            <h2>Tambah Sepeda Motor</h2>
            <form onSubmit={handleCreateMotor}>
                <div>
                    <label>Jenis Motor:</label>
                    <input
                        type="text"
                        name="Jenis_motor"
                        value={newMotor.Jenis_motor}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Harga Motor:</label>
                    <input
                        type="number"
                        name="Harga_motor"
                        value={newMotor.Harga_motor}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-create">Tambah Motor</button>
            </form>

            <h2>Daftar Sepeda Motor</h2>
            <table className="motor-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Jenis Motor</th>
                        <th>Harga Motor</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {motors.map((motor) => (
                        <tr key={motor.id}>
                            <td>{motor.id}</td>
                            <td>{motor.Jenis_motor}</td>
                            <td>{motor.Harga_motor}</td>
                            <td>
                                <button onClick={() => handleEditMotor(motor.id)} className="btn-edit">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteMotor(motor.id)} className="btn-delete">
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editMotor && (
                <div>
                    <h2>Edit Sepeda Motor</h2>
                    <form onSubmit={handleUpdateMotor}>
                        <div>
                            <label>Jenis Motor:</label>
                            <input
                                type="text"
                                name="Jenis_motor"
                                value={editMotor.Jenis_motor}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Harga Motor:</label>
                            <input
                                type="number"
                                name="Harga_motor"
                                value={editMotor.Harga_motor}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-update">Update Motor</button>
                    </form>
                </div>
            )}

            <Link href="/">
                <button className="btn-back">Kembali ke Home</button>
            </Link>
        </div>
    );
}
