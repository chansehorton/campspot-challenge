'use strict'

// processes the results of the filters
exports.sitesOpen = (searchDates, gaps, reservations) => {
  const { reservationFilter } = require('./resFilter.js');

  let yesSites = [];
  let noSites = [];

  // for (let i=0; i<reservations.length; i++) {
  //   if (reservationFilter(searchDates, gaps, reservations[i])) {
  //     if (!noSites.includes(reservations[i].campsiteId) && !yesSites.includes(reservations[i].campsiteId)) {
  //       // filter passed. if reservation does not exist in either array, add it to the keepers. If it existed in the failed array, it has already failed, so don't add it.
  //       yesSites.push(reservations[i].campsiteId);
  //     }
  //   } else {
  //     if (yesSites.includes(reservations[i].campsiteId)){
  //       // filter failed. if array existed in keeper array, remove it, and add it to the failed array
  //       yesSites.splice(yesSites.indexOf(reservations[i].campsiteId), 1);
  //       noSites.push(reservations[i].campsiteId);
  //     } else if (!noSites.includes(reservations[i].campsiteId)){
  //       // if not alread in the failed array, add it.
  //       noSites.push(reservations[i].campsiteId);
  //     }
  //   }
  // }
  for (let i=0; i<reservations.length; i++) {
    if (!noSites.includes(reservations[i].campsiteId)) {
      // if campsiteId exists in noSites array, don't even bother running it through the filter
      if (reservationFilter(searchDates, gaps, reservations[i])) {
        // filter passed. if reservation does not exist in yesSites, add it.
        if (!yesSites.includes(reservations[i].campsiteId)) {
          yesSites.push(reservations[i].campsiteId);
        }
      } else {
        if (yesSites.includes(reservations[i].campsiteId)) {
          // filter failed. if reservation exists in yesSites, remove it and add to noSites.
          yesSites.splice(yesSites.indexOf(reservations[i].campsiteId), 1);
          noSites.push(reservations[i].campsiteId);
        } else {
          // filter failed. reservation does not exist in yesSites. Add to noSites
          noSites.push(reservations[i].campsiteId);
        }
      }
    }
  }

  return yesSites;
}
