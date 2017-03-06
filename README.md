# campspot-challenge

This app searches through a given JSON file of campground reservation data, and returns campsites with reservation availability, given gap rules of 2 and 3 days. For the uninitiated, gap rules force not only the requested days to be available, but enforces that a reservation cannot leave gaps of a certain number of days on either side.

My attempt at solving this problem first pulls the JSON file into memory, then parses each existing reservation in the following manner:
 - eliminate any reservations that directly overlap the search dates
 - define a max and a min for the gap rules and use these to determine if the reservations will create illegal gaps
 (ASSUMPTION: the gap rules will be consecutive values)
 
Each of these checks return a boolean value to indicate if our searched reservation is gap-compatible.
Upon the return of each boolean, the associated campsiteId is added to either a "failed" or "passing" array.  A site that passes the filters is added to the passing array. It stays there unless a successive reservation for that campsite fails. If any reservation ever fails, the campsite is added to the failed array (and removed from the passing array, if necessary), which is used to avoid further checks on a campsite that has already failed.

Once all reservations have been processed, a for loop pulls the associated campsite names and presents them via console.log.

## To run the program you will need the following:
- install node (if you don't already have it) `brew install node`
- install yarn (if you don't already have it) `brew install yarn`

Then simply:
- clone this repo
- `yarn install`

To run the tests:
- `npm test`
 
To run the program:
- `npm start`
