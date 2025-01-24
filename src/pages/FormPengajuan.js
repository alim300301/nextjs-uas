import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function FormPengajuan() {
  const router = useRouter();
  const { id } = router.query;

  const [motors, setMotors] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    alamat: "",
    metodePembayaran: "",
    motorId: id || "",
    uangMuka: "",
    tenor: "",
  });

  const [cicilan, setCicilan] = useState(null);
  const [hargaMotor, setHargaMotor] = useState(null); // Untuk menyimpan harga motor yang dipilih

  useEffect(() => {
    const fetchMotors = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/data-sepeda-motors");
        const data = await res.json();
        setMotors(data.data);
      } catch (err) {
        console.error("Error fetching motors:", err);
      }
    };

    fetchMotors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Menentukan harga motor yang dipilih berdasarkan ID
    if (name === "motorId") {
      const selectedMotor = motors.find((motor) => motor.id === parseInt(value));
      setHargaMotor(selectedMotor ? selectedMotor.Harga_motor : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { uangMuka, tenor, motorId } = formData;
    const selectedMotor = motors.find((motor) => motor.id === parseInt(motorId));
    const hargaMotor = selectedMotor?.Harga_motor;

    if (!hargaMotor || uangMuka < hargaMotor * 0.2) {
      alert("Uang muka harus minimal 20% dari harga motor.");
      return;
    }

    const cicilanPerBulan = (hargaMotor - uangMuka) / tenor;
    setCicilan(cicilanPerBulan);

    try {
      // Simpan data pelanggan
      const pelangganRes = await fetch("http://localhost:1337/api/data-pelanggans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            nama: formData.nama,
            email: formData.email,
            alamat: formData.alamat,
            metode_pembayaran: formData.metodePembayaran,
            data_sepeda_motor: motorId,
          },
        }),
      });
      const pelangganData = await pelangganRes.json();

      // Simpan data kredit
      await fetch("http://localhost:1337/api/kredits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            uang_muka: formData.uangMuka,
            tenor: formData.tenor,
            data_pelanggan: pelangganData.data,
          },
        }),
      });

      alert("Pengajuan berhasil disimpan!");
      router.push("/");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="form-container">
      <h1>Formulir Pengajuan Kredit</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nama:</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Alamat:</label>
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Metode Pembayaran:</label>
          <select
            name="metodePembayaran"
            value={formData.metodePembayaran}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Pilih</option>
            <option value="Transfer">Transfer</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <div className="form-group">
          <label>Motor:</label>
          <select
            name="motorId"
            value={formData.motorId}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Pilih Motor</option>
            {motors.map((motor) => (
              <option key={motor.id} value={motor.id}>
                {motor.Jenis_motor || "Motor Tidak Diketahui"}
              </option>
            ))}
          </select>
        </div><div className="form-group">
          <label>Harga Motor:</label>
          <select
            name="motorId" // Perbaikan nama atribut untuk memilih motor
            value={formData.motorId} // Menggunakan motorId untuk nilai yang dipilih
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Pilih Motor</option>
            {motors.map((motor) => (
              <option key={motor.id} value={motor.id}>
                {motor.Jenis_motor || "Motor Tidak Diketahui"} - Rp{motor.Harga_motor.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Uang Muka:</label>
          <input
            type="number"
            name="uangMuka"
            value={formData.uangMuka}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Tenor (bulan):</label>
          <input
            type="number"
            name="tenor"
            value={formData.tenor}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Ajukan Kredit</button>
      </form>
      {cicilan && (
        <div className="cicilan-info">
          <h3>Cicilan Per Bulan: Rp{cicilan.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}
