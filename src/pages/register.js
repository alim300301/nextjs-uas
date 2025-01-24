import { useState } from "react";
import Link from "next/link";

export default function PendaftaranPelanggan() {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        alamat: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:1337/api/data-pelanggans", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: formData,
                }),
            });

            if (res.ok) {
                alert("Pendaftaran berhasil!");
                setFormData({ nama: "", email: "", alamat: "" });
            } else {
                alert("Terjadi kesalahan saat pendaftaran.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan saat pendaftaran.");
        }
    };

    return (
        <div className="pendaftaran-container">
            <h1>Pendaftaran Pelanggan</h1>
            <p className="narasi">
                Terima kasih telah memilih untuk bergabung dengan kami! Silakan isi data diri Anda di bawah ini untuk
                melengkapi proses pendaftaran sebagai pelanggan kami. Kami akan segera menghubungi Anda untuk konfirmasi.
            </p>

            <form onSubmit={handleSubmit} className="pendaftaran-form">
                <div>
                    <label>Nama:</label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Alamat:</label>
                    <input
                        type="text"
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit">Daftar</button>
            </form>
            <Link href="/">
                <button className="btn-back">Kembali ke Home</button>
            </Link>
        </div>
    );
}
