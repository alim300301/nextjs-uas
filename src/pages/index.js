import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [motors, setMotors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotors = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/data-sepeda-motors");
        const result = await res.json();

        if (result && result.data) {
          setMotors(result.data);
        } else {
          setError("No data available.");
        }
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      }
    };

    fetchMotors();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1 className="title">Agung Jaya Motor</h1>
      <p className="description">
        Promo Spesial Agung Jaya Motor: Dapatkan Sepeda Motor Impian Anda dengan Penawaran Terbaik!
      </p>

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
                <Link href={`/FormPengajuan?id=${motor.id}`}>
                  <button className="btn-ajukan">Ajukan Kredit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tombol menuju panel admin */}
      <Link href="/admin">
        <button className="btn-admin">Masuk ke Panel Admin</button>
      </Link>
      <Link href="/register">
        <button className="btn-registrasi">Pendaftaran Pelanggan</button>
      </Link>
    </div>
  );
}
