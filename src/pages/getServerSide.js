export async function getServerSideProps() {
  const API_URL = "http://localhost:1337/api/data-sepeda-motors";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      props: {
        motors: data.data || [], // Menggunakan data motor dari response API
      },
    };
  } catch (error) {
    return {
      props: {
        motors: [],
        error: error.message, // Kirim pesan error ke props
      },
    };
  }
}

export default function MotorPage({ motors, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "black", color: "white" }}>
      <h1>Daftar Sepeda Motor</h1>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th style={{ width: "70%" }}>Jenis Motor</th>
            <th style={{ width: "30%" }}>Harga Motor</th>
          </tr>
        </thead>
        <tbody>
          {motors.map((motor) => (
            <tr key={motor.id}>
              <td>{motor.Jenis_motor || "Jenis motor tidak tersedia"}</td>
              <td>{motor.Harga_motor || "Harga tidak tersedia"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
