import React, { Component } from 'react';
import moment from 'moment';
import { _ } from 'meteor/underscore';

export default class FlightDetails extends Component {

  getTime(str) {
    let moment = require('moment');
    return moment(str).format('HH:mm');
  };

  getDate(str) {
    let moment = require('moment');
    return moment(str).format("DDMMMYYYY");
  };

  getAirportName(list, str) {
    let res = _.findWhere(list, {
      fs: str
    })
    return res.name;
  };


  render() {
    const {scheduledFlights} = this.props;

    return(
        <div>
          {!scheduledFlights.length ? 
            <div className="well" >
              <b>There is no data corresponding to this query. Please change the flight number or data and try again</b>
            </div>
          :null}
          {
            scheduledFlights.map( (flight, i)=>{
              return (
                <div className="well" key={i}>
                  <h4>  
                    Flight number: {flight.carrierFsCode + flight.flightNumber}
                    {flight.operator ? ` operated as ${flight.operator.carrierFsCode}${flight.operator.flightNumber}` : null }
                  </h4>

                  <h5>Departure</h5>
                  <p>Date: { this.getDate(flight.departureTime) }</p>
                  <p>Airport code: {flight.departureAirportFsCode}</p>
                  <p>Airport name: { this.getAirportName(this.props.airports, flight.departureAirportFsCode)}</p>
                  <p>Time: { this.getTime(flight.departureTime) }</p>

                  <h5>Arrival</h5>
                  <p>Date: { this.getDate(flight.arrivalTime) }</p>
                  <p>Airport code: {flight.arrivalAirportFsCode}</p>
                  <p>Airport name: { this.getAirportName(this.props.airports, flight.arrivalAirportFsCode)}</p>
                  <p>Time: { this.getTime(flight.arrivalTime) }</p>
                </div>
              )
            })
          }
        </div>
    )
  }
}