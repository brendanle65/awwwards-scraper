export const aggAwardsField = (sites, links, award: string) => {
  for (let i = 0; i < links.length; i++) {
    const match = sites.find(site => site.awwwards_url === links[i]);
    if (match) {
      if (match.awards) {
        match.awards.push(award);
      } else {
        match.awards = [award];
      }
    }
  }
};
