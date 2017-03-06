'use strict'

const { readData, sitesOpen } = require('../functions');

const masterData = readData('test-case.json');

const openSites = sitesOpen(masterData.search.startDate, masterData.search.endDate, masterData.reservations);

console.log(openSites);
