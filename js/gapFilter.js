'use strict'

// ASSUMPTIONS:
// I assume disallowed gap sizes are consecutive numbers.

// expects that the reservation does not overlap the search dates
exports.gapFilter = (searchDates, gaps, reservation) => {
  const { dateMath } = require('./helpers.js');
  // converts the array of gap objects into a basic array
  let gapArray = [];
  for (let i=0; i<gaps.length; i++) {
    gapArray.push(gaps[i].gapSize);
  }

  const gapMax = Math.max(...gapArray);
  const gapMin = Math.min(...gapArray);

  if (searchDates.startDate > reservation.endDate) {
    // reservation is before search range
    return (reservation.endDate >= dateMath(searchDates.startDate, gapMin, 'sub') ||  reservation.endDate < dateMath(searchDates.startDate, gapMax + 1, 'sub'));
  } else {
    // reservation is after search range
    return (reservation.startDate <= dateMath(searchDates.endDate, gapMin, 'add') || reservation.startDate > dateMath(searchDates.endDate, gapMax + 1, 'add'));
  }
};
