'use strict'

const { readData } = require('../js/processInputData.js');
const { sitesOpen } = require('../js/processResults.js');
const { reservationFilter } = require('../js/resFilter.js');
const { dateMath } = require('../js/helpers.js');
const { gapFilter } = require('../js/gapFilter.js');

describe('readData', () => {
  it('should return an error if filename does not exist', () => {
    expect(readData('garbage.json')).toEqual(new Error('File not found!'));
  });

  it('should return an error if not given a filename', () => {
    expect(readData()).toEqual(new Error('No filename provided!'));
    expect(readData('')).toEqual(new Error('No filename provided!'));
  })

  it('should pull and return reservation data from a JSON file when given a valid filename', () => {
    expect(readData('test-case.json')).toEqual(testCaseData);
  });
});

describe('sitesOpen', () => {
  const resArray = [
    {"campsiteId": 7, "startDate": "2016-06-07", "endDate": "2016-06-09"},
    {"campsiteId": 8, "startDate": "2016-06-01", "endDate": "2016-06-02"},
    {"campsiteId": 8, "startDate": "2016-06-05", "endDate": "2016-06-06"},
    {"campsiteId": 9, "startDate": "2016-06-03", "endDate": "2016-06-05"},
    {"campsiteId": 9, "startDate": "2016-06-12", "endDate": "2016-06-16"}
  ];

  const badSearch = {
    startDate: "2016-06-01",
    endDate: "2016-06-15"
  };

  it('should return an array of campsites that match the open date range', () => {
    expect(sitesOpen(search, gaps, resArray)).toEqual([8, 9]);
  });

  it('should return an empty array if no campsites match the open range', () => {
    expect(sitesOpen(badSearch, gaps, resArray)).toEqual([]);
  });
});

describe('reservationFilter with search dates of 2016-06-07 - 10 and gaps of 2 and 3', () => {
    it('should return true with a reservation of 01-02', () => {
      expect(reservationFilter(search, gaps, goodRes1)).toBe(true);
    });
    it('should return true with a reservation of 16-18', () => {
      expect(reservationFilter(search, gaps, goodRes2)).toBe(true);
    });
    it('should return true with a reservation of 01-05', () => {
      expect(reservationFilter(search, gaps, goodRes3)).toBe(true);
    });
    it('should return true with a reservation of 01-06', () => {
      expect(reservationFilter(search, gaps, goodRes4)).toBe(true);
    });
    it('should return true with a reservation of 11-12', () => {
      expect(reservationFilter(search, gaps, goodRes5)).toBe(true);
    });
    it('should return true with a reservation of 12-14', () => {
      expect(reservationFilter(search, gaps, goodRes6)).toBe(true);
    });
    it('should return false with a reservation of 13-15', () => {
      expect(reservationFilter(search, gaps, badRes1)).toBe(false);
    });
    it('should return false with a reservation of 14-16', () => {
      expect(reservationFilter(search, gaps, badRes2)).toBe(false);
    });
    it('should return false with a reservation of 02-04', () => {
      expect(reservationFilter(search, gaps, badRes3)).toBe(false);
    });
    it('should return false with a reservation of 01-03', () => {
      expect(reservationFilter(search, gaps, badRes4)).toBe(false);
    });
    it('should return false with a reservation of 01-07', () => {
      expect(reservationFilter(search, gaps, badRes5)).toBe(false);
    });
    it('should return false with a reservation of 09-12', () => {
      expect(reservationFilter(search, gaps, badRes6)).toBe(false);
    });
});

describe ('gapFilter search for 2016-06-07 - 2016-06-10 and gaps of 2 and 3', () => {
  it('should return true with a reservation of 01-02', () => {
    expect(gapFilter(search, gaps, goodRes1)).toBe(true);
  });
  it('should return true with a reservation of 16-18', () => {
    expect(gapFilter(search, gaps, goodRes2)).toBe(true);
  });
  it('should return true with a reservation of 01-05', () => {
    expect(gapFilter(search, gaps, goodRes3)).toBe(true);
  });
  it('should return true with a reservation of 01-06', () => {
    expect(gapFilter(search, gaps, goodRes4)).toBe(true);
  });
  it('should return true with a reservation of 11-12', () => {
    expect(gapFilter(search, gaps, goodRes5)).toBe(true);
  });
  it('should return true with a reservation of 12-14', () => {
    expect(gapFilter(search, gaps, goodRes6)).toBe(true);
  });
  it('should return false with a reservation of 13-15', () => {
    expect(gapFilter(search, gaps, badRes1)).toBe(false);
  });
  it('should return false with a reservation of 14-16', () => {
    expect(gapFilter(search, gaps, badRes2)).toBe(false);
  });
  it('should return false with a reservation of 02-04', () => {
    expect(gapFilter(search, gaps, badRes3)).toBe(false);
  });
  it('should return false with a reservation of 01-03', () => {
    expect(gapFilter(search, gaps, badRes4)).toBe(false);
  });
});

describe('dateMath', () => {
  it('should return a date incremented by a number of days', () => {
    expect(dateMath("2016-06-07", 2, 'add')).toBe("2016-06-09");
  });
  it('should return a date decremented by a number of days', () => {
    expect(dateMath("2016-06-07", 2, 'sub')).toBe("2016-06-05");
  });
  it('should return an Error if any other value is substituted for sub or add', () => {
    expect(dateMath("2016-06-07", 2, 'blah')).toEqual(new Error('Invalid operation!'));
  });
});

const search = {
  startDate: "2016-06-07",
  endDate: "2016-06-10"
};
const gaps = [
  {
    gapSize: 2
  },
  {
    gapSize: 3
  }
];
const goodRes1 = {
  "campsiteId": 1,
  "startDate": "2016-06-01",
  "endDate": "2016-06-02"
};
const goodRes2 = {
  "campsiteId": 1,
  "startDate": "2016-06-16",
  "endDate": "2016-06-18"
};
const goodRes3 = {
  "campsiteId": 1,
  "startDate": "2016-06-01",
  "endDate": "2016-06-05"
}
const goodRes4 = {
  "campsiteId": 1,
  "startDate": "2016-06-01",
  "endDate": "2016-06-06"
};
const goodRes5 = {
  "campsiteId": 1,
  "startDate": "2016-06-11",
  "endDate": "2016-06-13"
};
const goodRes6 = {
  "campsiteId": 1,
  "startDate": "2016-06-12",
  "endDate": "2016-06-14"
};
const badRes1 = {
  "campsiteId": 4,
  "startDate": "2016-06-13",
  "endDate": "2016-06-15"
};
const badRes2 = {
  "campsiteId": 4,
  "startDate": "2016-06-14",
  "endDate": "2016-06-16"
};
const badRes3 = {
  "campsiteId": 4,
  "startDate": "2016-06-02",
  "endDate": "2016-06-04"
};
const badRes4 = {
  "campsiteId": 4,
  "startDate": "2016-06-01",
  "endDate": "2016-06-03"
};
const badRes5 = {
  "campsiteId": 4,
  "startDate": "2016-06-01",
  "endDate": "2016-06-07"
};
const badRes6 = {
  "campsiteId": 4,
  "startDate": "2016-06-09",
  "endDate": "2016-06-12"
};

const testCaseData = {
  "search": {
    "startDate": "2016-06-07",
    "endDate": "2016-06-10"
  },
  "campsites": [
    {
      "id": 1,
      "name": "Grizzly Adams Adventure Cabin"
    },
    {
      "id": 2,
      "name": "Lewis and Clark Camp Spot"
    },
    {
      "id": 3,
      "name": "Jonny Appleseed Log Cabin"
    },
    {
      "id": 4,
      "name": "Davey Crockett Camphouse"
    },
    {
      "id": 5,
      "name": "Daniel Boone Bungalow"
    },
    {
      "id": 6,
      "name": "Teddy Roosevelt Tent Site"
    },
    {
      "id": 7,
      "name": "Edmund Hillary Igloo"
    },
    {
      "id": 8,
      "name": "Bear Grylls Cozy Cave"
    },
    {
      "id": 9,
      "name": "Wyatt Earp Corral"
    }
  ],
   "gapRules": [
     {
       "gapSize": 2
     },
     {
       "gapSize": 3
     }
  ],
  "reservations": [
    {"campsiteId": 1, "startDate": "2016-06-01", "endDate": "2016-06-04"},
    {"campsiteId": 1, "startDate": "2016-06-11", "endDate": "2016-06-13"},
    {"campsiteId": 2, "startDate": "2016-06-08", "endDate": "2016-06-09"},
    {"campsiteId": 3, "startDate": "2016-06-04", "endDate": "2016-06-06"},
    {"campsiteId": 3, "startDate": "2016-06-14", "endDate": "2016-06-16"},
    {"campsiteId": 4, "startDate": "2016-06-03", "endDate": "2016-06-05"},
    {"campsiteId": 4, "startDate": "2016-06-13", "endDate": "2016-06-14"},
    {"campsiteId": 5, "startDate": "2016-06-03", "endDate": "2016-06-06"},
    {"campsiteId": 5, "startDate": "2016-06-12", "endDate": "2016-06-14"},
    {"campsiteId": 6, "startDate": "2016-06-04", "endDate": "2016-06-06"},
    {"campsiteId": 6, "startDate": "2016-06-11", "endDate": "2016-06-12"},
    {"campsiteId": 6, "startDate": "2016-06-16", "endDate": "2016-06-16"},
    {"campsiteId": 7, "startDate": "2016-06-03", "endDate": "2016-06-04"},
    {"campsiteId": 7, "startDate": "2016-06-07", "endDate": "2016-06-09"},
    {"campsiteId": 7, "startDate": "2016-06-13", "endDate": "2016-06-16"},
    {"campsiteId": 8, "startDate": "2016-06-01", "endDate": "2016-06-02"},
    {"campsiteId": 8, "startDate": "2016-06-05", "endDate": "2016-06-06"},
    {"campsiteId": 9, "startDate": "2016-06-03", "endDate": "2016-06-05"},
    {"campsiteId": 9, "startDate": "2016-06-12", "endDate": "2016-06-16"}
  ]
};
