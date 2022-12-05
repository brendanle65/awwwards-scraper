export const aggCountryField = (sites, profiles) => {
  sites.forEach(site => {
    const creators = site.creators;
    creators.forEach(({ url }) => {
      const match = profiles.find(profile => profile.url.includes(url)); //slightly different path, check if partial match
      if (match) {
        if (site.countries) {
          if (site.countries.find(loc => loc !== match.location)) site.countries.push(match.location);
        } else {
          site.countries = [match.location];
        }
      }
    });
  });
};
