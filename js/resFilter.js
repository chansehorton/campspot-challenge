'use strict'

// reservationFilter returns false for reservations which directly overlap the search dates, otherwise passes the reservation data on to gapFilter for further processing.
//VARIABLES:
// searchDates (Object containing a startDate (String) and endDate (String) in the format of "YYYY-MM-DD")
//gaps (Array containing any number of objects, each containing a gapLength (Integer))
// reservation (Object containing a campsiteId (Integer), a startDate (String), and endDate(String) in the format of "YYYY-MM-DD")
exports.reservationFilter = (searchDates, gaps, reservation) => {
  const { gapFilter } = require('./gapFilter.js');

  if (reservation.endDate >= searchDates.startDate && reservation.startDate <= searchDates.endDate) {
    return false;
  } else {
    return gapFilter(searchDates, gaps, reservation);
  }
};
