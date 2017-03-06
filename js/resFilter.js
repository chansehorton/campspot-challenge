'use strict'

// returns the reservations that meet the given gap rules, handles eliminating overlapping dates
exports.reservationFilter = (searchDates, gaps, reservation) => {
  const { gapFilter } = require('./gapFilter.js');

  if (reservation.endDate >= searchDates.startDate) {
    if (reservation.startDate <= searchDates.endDate) {
      return false;
    } else {
      return gapFilter(searchDates, gaps, reservation);
    }
  } else {
    return gapFilter(searchDates, gaps, reservation);
  }
};
