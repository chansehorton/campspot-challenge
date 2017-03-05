'use strict'
// const readData = require('../helpers').readData;
// const addDays = require('../helpers').addDays;
const { readData, addDays, sitesOpen, gapFilter } = require('../functions');

describe('readData', () => {
  it('should return an error if filename does not exist', () => {
    expect(readData('garbage.json')).toEqual(new Error('File not found!'));
  });

  it('should return an error if not given a filename', () => {
    expect(readData()).toEqual(new Error('No filename provided!'));
    expect(readData('')).toEqual(new Error('No filename provided!'));
  })

  it('should pull and return reservation data from a JSON file when given a valid filename', () => {
    expect(readData('test-case.json')).toEqual({
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
          "name": "Teddy Rosevelt Tent Site"
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
    });
  });
});

// describe('sitesOpen', () => {
//   const resArray = [
//     {"campsiteId": 7, "startDate": "2016-06-07", "endDate": "2016-06-09"},
//     {"campsiteId": 8, "startDate": "2016-06-01", "endDate": "2016-06-02"},
//     {"campsiteId": 8, "startDate": "2016-06-05", "endDate": "2016-06-06"},
//     {"campsiteId": 9, "startDate": "2016-06-03", "endDate": "2016-06-05"},
//     {"campsiteId": 9, "startDate": "2016-06-12", "endDate": "2016-06-16"}
//   ];
//
//   it('should return an array of campsites that match the open date range', () => {
//     expect(datesAvailable("2016-06-07", "2016-06-10", resArray)).toEqual([8, 9]);
//   });
//
//   it('should return an empty array if no campsites match the open range', () => {
//     expect(datesAvailable("2016-06-01", "2016-06-10", resArray)).toEqual([]);
//   });
// });

describe('gapFilter', () => {
  let start = "2016-06-07";
  let end = "2016-06-10";
  let gaps = [
    {
      gapSize: 2
    },
    {
      gapSize: 3
    }
  ];
  let goodRes1 = {
    "campsiteId": 1,
    "startDate": "2016-06-01",
    "endDate": "2016-06-02"
  };
  let goodRes2 = {
    "campsiteId": 1,
    "startDate": "2016-06-16",
    "endDate": "2016-06-18"
  };
  let goodRes3 = {
    "campsiteId": 1,
    "startDate": "2016-06-01",
    "endDate": "2016-06-05"
  }
  let goodRes4 = {
    "campsiteId": 1,
    "startDate": "2016-06-01",
    "endDate": "2016-06-06"
  };
  let goodRes5 = {
    "campsiteId": 1,
    "startDate": "2016-06-11",
    "endDate": "2016-06-13"
  };
  let goodRes6 = {
    "campsiteId": 1,
    "startDate": "2016-06-12",
    "endDate": "2016-06-14"
  };
  let badRes1 = {
    "campsiteId": 4,
    "startDate": "2016-06-13",
    "endDate": "2016-06-15"
  };
  let badRes2 = {
    "campsiteId": 4,
    "startDate": "2016-06-14",
    "endDate": "2016-06-16"
  };
  let badRes3 = {
    "campsiteId": 4,
    "startDate": "2016-06-02",
    "endDate": "2016-06-04"
  };
  let badRes4 = {
    "campsiteId": 4,
    "startDate": "2016-06-01",
    "endDate": "2016-06-03"
  };
  let badRes5 = {
    "campsiteId": 4,
    "startDate": "2016-06-01",
    "endDate": "2016-06-07"
  };
  let badRes6 = {
    "campsiteId": 4,
    "startDate": "2016-06-09",
    "endDate": "2016-06-12"
  };

  it('should return true if a given reservation passes the filter', () => {
    expect(gapFilter(start, end, gaps, goodRes1)).toBe(true);
    expect(gapFilter(start, end, gaps, goodRes2)).toBe(true);
    expect(gapFilter(start, end, gaps, goodRes3)).toBe(true);
    expect(gapFilter(start, end, gaps, goodRes4)).toBe(true);
    expect(gapFilter(start, end, gaps, goodRes5)).toBe(true);
    expect(gapFilter(start, end, gaps, goodRes6)).toBe(true);
  });

  it('should return false if a given reservation fails the filter', () => {
    expect(gapFilter(start, end, gaps, badRes1)).toBe(false);
    expect(gapFilter(start, end, gaps, badRes2)).toBe(false);
    expect(gapFilter(start, end, gaps, badRes3)).toBe(false);
    expect(gapFilter(start, end, gaps, badRes4)).toBe(false);
    expect(gapFilter(start, end, gaps, badRes5)).toBe(false);
    expect(gapFilter(start, end, gaps, badRes6)).toBe(false);
  });
})

describe('addDays', () => {
  it('should return a date incremented by a number of days', () => {
    expect(addDays("2016-06-07", 2)).toBe("2016-06-09");
  })
})
