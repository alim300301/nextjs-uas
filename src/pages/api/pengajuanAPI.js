export const savePengajuan = async (data) => {
    try {
      const res = await fetch("http://localhost:1337/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        throw new Error("Gagal menyimpan data pengajuan kredit.");
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  