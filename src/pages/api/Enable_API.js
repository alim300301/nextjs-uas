export default async function handler(req, res) {
    try {
        // Ambil data dari API eksternal
        const response = await fetch("http://localhost:1337/api/data-sepeda-motors");

        // Jika respons dari API tidak OK
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        // Parsing data JSON dari API eksternal
        const data = await response.json();

        // Kirimkan data yang diambil sebagai respons
        res.status(200).json(data);
    } catch (error) {
        // Tangani error
        res.status(500).json({ error: error.message });
    }
}
