'use strict'

findMeACampsite();

// uses the provided JSON data to process a search for campsite reservations that conform to set "gap rules".
function findMeACampsite() {
  const { readData } = require('./js/readData.js');
  const { sitesOpen } = require('./js/sitesOpen.js');

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
