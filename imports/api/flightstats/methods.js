import { Meteor } from "meteor/meteor";
import rateLimit from '/imports/modules/rate-limit.js';
import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { HTTP } from 'meteor/http';
import Logger from '/imports/modules/logger';

export const getFlightInfo = new ValidatedMethod({ 
   name: 'flightstats.getFlightInfo',
   validate: new SimpleSchema({
      'flightNumber': { type: String, optional: false},
      'year':  { type: Number, optional: false},
      'month':  { type: Number, optional: false},
      'day': { type: Number, optional: false }
    }).validator(),
  run(data){
    const { flightNumber, year, month, day } = data;

    /*
      Flight number consists of two sets of strings - carrier code + flight id number
        o Flight number will be 3-6 characters total length
          § Carrier code, determined by IATA, is a two-alphanumeric character string
          § Flight id number is one to four digits and all numeric
          § Leading zeros for the flight id number should be suppressed (AA001 ==> AA1)
        o The alpha portion of the airline code, once verified, should be capitalized 
          (A112, UA1234, AA2160) § A1 = airline code 12 = flight number
          § UA = airline code 1234 - flight number
    */
   
    const carrierCodeRegex = /^[a-zA-Z0-9]{2}$/,
          flightIdRegex = /^([0-9]){1,4}$/;

    let carrierCode = flightNumber.slice(0, 2),
          flightId = flightNumber.slice(2);

    // Leading zeros for the flight id number should be suppressed (AA001 ==> AA1)
    let trimmedFlightId = flightId.replace(/^0+/, '');

    if(!carrierCodeRegex.test(carrierCode)){
      throw new Meteor.Error('carrier-code-invalid', `Invalid flight number. Carrier code (${carrierCode}) is a two-alphanumeric character string`);
    }
    if(!flightIdRegex.test(flightId)){
      throw new Meteor.Error('flight-id-invalid', `Invalid flight number. Flight id number (${flightId}) is a one to four numeric characters string`);
    }

    flightId = trimmedFlightId;


    const appId = Meteor.settings.flightstats.appId,
          appKey = Meteor.settings.flightstats.appKey;

    Logger.log(`[flightstats.getFlightInfo] Calling flightstats API with params: {day: ${day}, month: ${month}, year: ${year}, flightId: ${flightId}, carrierCode: ${carrierCode} }. Initial arguments: ${JSON.stringify(arguments)}`);

    let query = `https://api.flightstats.com/flex/schedules/rest/v1/json/flight/${carrierCode}/${flightId}/departing/${year}/${month}/${day}`;
    let response = HTTP.get(query, {
      params: {
        appId,
        appKey
      }
    });

    return response.data;
  },
});

rateLimit({
  methods: [
    getFlightInfo
  ],
  limit: 5,
  timeRange: 1000,
});



