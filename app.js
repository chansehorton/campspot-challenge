'use strict'

const { readData, sitesOpen } = require('../functions');

const masterData = readData('test-case.json');

const openSites = datesOpen(masterData.search.startDate, masterData.search.endDate, masterData.reservations);

console.log(openSites);
