'use strict'

findMeACampsite();

function findMeACampsite() {
  const { readData } = require('./js/processInputData.js');
  const { sitesOpen } = require('./js/processResults.js');

  const masterData = readData('test-case.json');
  const openSites = sitesOpen(masterData.search, masterData.gapRules,  masterData.reservations);

  for (let i=0; i<openSites.length; i++) {
    for (let k=0; k<masterData.campsites.length; k++) {
      if (masterData.campsites[k].id === openSites[i]) {
        console.log(masterData.campsites[k].name);
      }
    }
  }
}
