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
exports.sitesOpen = (searchDates, gaps, reservations) => {
  let openSites = [];

  for (let i=0; i<reservations.length; i++) {
    if (reservationFilter(searchDates, gaps, reservations[i])) {
      // reservation passes filter, check to see if it is already in the array
      if (!openSites.includes(reservations[i].campsiteId)) {
        //if not, add it
        openSites.push(reservations[i].campsiteId);
      }
    } else if (openSites.includes(reservations[i].campsiteId)){
      // reservation fails filter. negates any previous 'passing' reservations, so remove campsite from 'passing' array
      openSites.splice(openSites.indexOf(reservations[i].campsiteId), 1);
    }
  }

  return openSites;
}

// returns the reservations that meet the given gap rules, handles eliminating overlapping dates
function reservationFilter(searchDates, gaps, reservation) {
  if (reservation.endDate >= searchDates.startDate) {
    if (reservation.startDate <= searchDates.endDate) {
      console.log('Bad res, overlap ', reservation);
      return false;
    } else {
      return gapFilter(searchDates, gaps, reservation);
    }
  } else {
    return gapFilter(searchDates, gaps, reservation);
  }
};

// expects that the reservation does not overlap the search dates
function gapFilter(searchDates, gaps, reservation) {
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
      console.log('gapFilter good res before', reservation);
      return true;
    } else {
      console.log('gapFilter bad res before', reservation);
      return false;
    }
  } else {
    //reservation is after search range
    if (reservation.startDate <= dateMath(searchDates.endDate, gapMin, 'add') || reservation.startDate > dateMath(searchDates.endDate, gapMax + 1, 'add')){
      console.log('gapFilter good res before', reservation);
      return true;
    } else {
      console.log('gapFilter bad res after', reservation);
      return false;
    }
  }
};

// helper function to easily add or subtract from date values
function dateMath(date, days, operation) {
  let tempDate = new Date(date);

  if (operation === 'add') {
    tempDate.setDate(tempDate.getUTCDate() + days);
  } else if (operation === 'sub') {
    tempDate.setDate(tempDate.getUTCDate() - days);
  } else {
    return new Error('Invalid operation!');
  }

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
