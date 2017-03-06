'use strict'

// expects that the reservation does not overlap the search dates
exports.gapFilter = (searchDates, gaps, reservation) => {
  const { dateMath } = require('./helpers.js');
  //converts the array of gap objects into a basic array
  let gapArray = [];
  for (let i=0; i<gaps.length; i++) {
    gapArray.push(gaps[i].gapSize);
  }

  //assumes the gap sizes are consecutive numbers, gets the min and max of the array to allow for easier filtering
  const gapMax = Math.max(...gapArray);
  const gapMin = Math.min(...gapArray);

  if (searchDates.startDate > reservation.endDate) {
    //reservation is before search range
    if (reservation.endDate >= dateMath(searchDates.startDate, gapMin, 'sub') ||  reservation.endDate < dateMath(searchDates.startDate, gapMax + 1, 'sub')) {
      return true;
    } else {
      return false;
    }
  } else {
    //reservation is after search range
    if (reservation.startDate <= dateMath(searchDates.endDate, gapMin, 'add') || reservation.startDate > dateMath(searchDates.endDate, gapMax + 1, 'add')){
      return true;
    } else {
      return false;
    }
  }
};
