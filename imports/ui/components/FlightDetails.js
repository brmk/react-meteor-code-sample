import React, { Component } from 'react';
import moment from 'moment';
import { _ } from 'meteor/underscore';

export default class FlightDetails extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      selectedFlight: null
    };
  };

  getTime(str) {
    let moment = require('moment');
    return moment(str).format('HH:mm');
  };

  getDate(str) {
    let moment = require('moment');
    return moment(str).format("DDMMMYYYY");
  };

  getAirportName(str) {
    let airports = this.props.airports || [];
    let res = _.findWhere(airports, {
      fs: str
    })
    return res.name;
  };

  selectFlight(flight){
    this.setState({selectedFlight:flight});
  };

  renderFlightInfo({flight}) {
    return (
      <div>
        <h4>  
          Flight number: {flight.carrierFsCode + flight.flightNumber}
          {flight.operator ? ` operated as ${flight.operator.carrierFsCode}${flight.operator.flightNumber}` : null }
        </h4>
        <h5>Departure</h5>
        <p>Date: { this.getDate(flight.departureTime) }</p>
        <p>Airport code: {flight.departureAirportFsCode}</p>
        <p>Airport name: { this.getAirportName(flight.departureAirportFsCode)}</p>
        <p>Time: { this.getTime(flight.departureTime) }</p>

        <h5>Arrival</h5>
        <p>Date: { this.getDate(flight.arrivalTime) }</p>
        <p>Airport code: {flight.arrivalAirportFsCode}</p>
        <p>Airport name: { this.getAirportName(flight.arrivalAirportFsCode)}</p>
        <p>Time: { this.getTime(flight.arrivalTime) }</p>
      </div>
    )
  };

  render() {
    const {scheduledFlights} = this.props;
    const {selectedFlight} = this.state;

    const FlightInfo = this.renderFlightInfo.bind(this);
    return(
        <div>
          {!scheduledFlights.length ? 
            <div className="well">
              <b>There is no data to display. Please change the flight number or data and try again</b>
            </div>
          :
            <div>
              {
                selectedFlight ? 
                  <div className="panel panel-success">
                    <div className="panel-heading">
                      <h3 className="panel-title">Selected Flight</h3>
                    </div>
                    <div className="panel-body">
                      <FlightInfo flight={selectedFlight}/>

                    </div>
                  </div>
                :null
              }

              {
                scheduledFlights.map( (flight, i)=>{
                  return (
                    <div className="well" key={i} onClick={()=>{this.selectFlight(flight)}}  style={{cursor:'pointer'}}>
                      <FlightInfo flight={flight}/>
                    </div>
                  )
                })
              }

            </div>
          }



        </div>
    )
  }
}