'use strict'

// dateMath function allows for easy addition or subtraction from date values
// VARIABLES:
// date (String) in any acceptable date format (see Date docs)
// days (Integer) number of days to add or subtract
// operation (String) accepts only "add" for addition, and "sub" for subtraction
exports.dateMath = (date, days, operation) => {
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

// overriding toDateString to output in the same format as given data, to allow for simple comparison
Date.prototype.toDateString = function myDateToString() {
  if (isNaN(this)) {
    return 'NaN';
  }
  // adds a leading 0 to single digit days and months, also adds one to the month, since 0 = Jan
  const outStr = [this.getFullYear(), this.getMonth() > 8 ? this.getMonth() + 1 : '0' + (this.getMonth() + 1), this.getDate() > 9 ? this.getDate() : '0' + this.getDate()].join('-');

  return outStr;
}
