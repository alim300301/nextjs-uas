import { useEffect } from "react";

export default function FetchDataMotor() {
  useEffect(() => {
    const fetchMotors = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/data-sepeda-motors");
        const result = await res.json();

        // Debugging: tampilkan seluruh data API di console
        console.log("Data Sepeda Motors (original):", result);

        // Validasi apakah data memiliki format yang benar
        if (result && result.data && Array.isArray(result.data)) {
          // Menghapus lapisan 'attributes'
          const cleanedData = result.data.map((motor) => ({
            id: motor.id,
            ...motor.attributes, // Salin semua properti dari 'attributes' ke tingkat atas
          }));

          // Tampilkan data yang sudah diproses
          console.log("Data Sepeda Motors (cleaned):", cleanedData);

          cleanedData.forEach((motor) => {
            console.log(`ID: ${motor.id}`);
            console.log(`Jenis Motor: ${motor.Jenis_motor}`);
            console.log(`Harga Motor: ${motor.Harga_motor}`);
            console.log("---------------------------");
          });
        } else {
          console.error("Format data dari API tidak valid.");
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };

    fetchMotors();
  }, []);

  return (
    <div>
      <h1>Fetching Data Sepeda Motors</h1>
      <p>Silakan cek console browser untuk melihat data sepeda motors.</p>
    </div>
  );
}
