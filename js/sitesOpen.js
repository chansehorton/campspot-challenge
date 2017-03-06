'use strict'

// sitesOpen function passes each reservation through a series of filters to determine if a campsite is available to reserve for a given date range
//VARIABLES:
// searchDates (Object containing a startDate (String) and endDate (String) in the format of "YYYY-MM-DD")
//gaps (Array containing any number of objects, each containing a gapLength (Integer))
// reservations (Array of objects, each containing a campsiteId (Integer), a startDate (String), and endDate(String) in the format of "YYYY-MM-DD")
exports.sitesOpen = (searchDates, gaps, reservations) => {
  const { reservationFilter } = require('./resFilter.js');

  let yesSites = [];
  let noSites = [];

  for (let i=0; i<reservations.length; i++) {
    if (!noSites.includes(reservations[i].campsiteId)) {
      // if campsiteId exists in noSites array, don't even bother running it through the filter
      if (reservationFilter(searchDates, gaps, reservations[i])) {
        // filter passed. if reservation does not exist in yesSites, add it.
        if (!yesSites.includes(reservations[i].campsiteId)) {
          yesSites.push(reservations[i].campsiteId);
        }
        // else: It will do nothing and drop through to return yesSites
      } else if (yesSites.includes(reservations[i].campsiteId)) {
        // filter failed. if reservation exists in yesSites, remove it and add to noSites.
        yesSites.splice(yesSites.indexOf(reservations[i].campsiteId), 1);
        noSites.push(reservations[i].campsiteId);
      } else {
        // filter failed. reservation does not exist in yesSites. Add to noSites
        noSites.push(reservations[i].campsiteId);
      }
    }
  }

  return yesSites;
}
