'use strict'

// pull a JSON file into an object variable
exports.readData = (filename) => {
  const fs = require('fs');
  const path = require('path');
  const dataPath = path.join(__dirname, `/data/${filename}`);

  if (!filename) {
    return new Error('No filename provided!');
  }

  if(!fs.existsSync(dataPath)) {
    return new Error('File not found!')
  }

  const campData = fs.readFileSync(dataPath, 'utf8');
  const jsonCampData = JSON.parse(campData);

  return jsonCampData;
}

// filters out campsites that are occupied on one or more of the requested dates
exports.sitesOpen = (startDate, endDate, reservations) => {
  let openReservations = [];

  // for (let i=0; i<reservations.length; i++) {
  //   if (startDate )
  // }

  return openSites;
}

// returns the reservations that meet the given gap rules, handles eliminating overlapping dates
exports.reservationFilter = (searchDates, gaps, reservation) => {
  if (reservation.endDate >= searchDates.startDate) {
    if (reservation.startDate <= searchDates.endDate) {
      return false;
    } else {
      console.log('after search end date', reservation);
      for (let i=0; i<gaps.length; i++) {
        return gapFilter(searchDates, gaps[i], reservation);
      }
    }
  } else {
    console.log('before search start date', reservation);
    for (let i=0; i<gaps.length; i++) {
      return gapFilter(searchDates, gaps[i], reservation);
    }
  }
};

// expects that the reservation does not overlap the search dates
exports.gapFilter = (searchDates, gap, reservation) => {
  if (searchDates.startDate > reservation.endDate) {
    //reservation is before search range
    
  } else {
    //reservation is after search range
  }
};

// helper function to allow easily adding days to a date
exports.addDays = (date, days) => {
  let tempDate = new Date(date);
  tempDate.setDate(tempDate.getUTCDate() + days);
  const result = tempDate.toDateString();

  return result;
}

// overriding toDateString to output in the same format as given data
Date.prototype.toDateString = function myDateToString() {
  if (isNaN(this)) {
    return 'NaN';
  }
  // adds a leading 0 to single digit days and months, also adds one to the month, since 0 = Jan
  const outStr = [this.getFullYear(), this.getMonth() > 8 ? this.getMonth() + 1 : '0' + (this.getMonth() + 1), this.getDate() > 9 ? this.getDate() : '0' + this.getDate()].join('-');

  return outStr;
}
