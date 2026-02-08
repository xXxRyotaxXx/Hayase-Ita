export default {
  async search(query) {
    const url = `https://animetosho.org/api.json?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    return data
      .filter(item => {
        const t = item.title.toLowerCase();

        const isIta =
          t.includes("[ita]") ||
          t.includes(" ita ") ||
          t.includes("ita sub") ||
          t.includes("sub ita") ||
          t.includes("itasub") ||
          t.includes("italian") ||
          t.includes("doppiato") ||
          t.includes("dub ita") ||
          t.includes("ita dub");

        const italianGroups =
          t.includes("darkside") ||
          t.includes("novarip") ||
          t.includes("pir8") ||
          t.includes("animeworld") ||
          t.includes("tntvillage");

        return isIta || italianGroups;
      })
      .map(item => ({
        title: item.title,
        magnet: item.magnet,
        size: item.size,
        seeders: item.seeders ?? 0,
        leechers: item.leechers ?? 0
      }));
  }
};
