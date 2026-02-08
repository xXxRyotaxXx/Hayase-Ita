const AnimeToshoITA = {
  search: function(query) {
    const url = 'https://animetosho.org/api.json?q=' + encodeURIComponent(query);
    return fetch(url)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        return data.filter(function(item) {
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
        }).map(function(item) {
          return {
            title: item.title,
            magnet: item.magnet,
            size: item.size,
            seeders: item.seeders ? item.seeders : 0,
            leechers: item.leechers ? item.leechers : 0
          };
        });
      });
  }
};
