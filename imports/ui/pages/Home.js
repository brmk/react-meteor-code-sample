import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import $ from 'jquery';
import datepicker from 'jquery-datepicker';
import moment from 'moment';

import Logger from '/imports/modules/logger';
import FlightDetails from '/imports/ui/components/FlightDetails.js';

export default class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
        apiResponse: null
    };
  }

  componentDidMount() {
    $(this.refs.form.date).datepicker({
      dateFormat: 'ddMyy',
      minDate: 0,
      maxDate: '+12m',
      autoclose: true,
      numberOfMonths: 2
    });
  };

  handleForm(event) {
    event.preventDefault();
    const {form} = this.refs;

    const date = new moment($(this.refs.form.date).datepicker('getDate'));
    const month=date.month() + 1, //moment returns months [0,11]
          day=date.date(),  
          year=date.year();

    const flightNumber = form.flightNumber.value;

    let data = {
      flightNumber,
      day,
      month,
      year
    }

    Meteor.call('flightstats.getFlightInfo', data, (error, result) => {
      if (error){
        console.log(error);
        Logger.error(error.reason);
        return;
      } 
      if(result){
        this.setState({
          apiResponse: result
        });
      }
    });
  };
      
  render() {
    const {apiResponse} = this.state;

    console.log(apiResponse);
    
    return(
      <div className="form-default">
        <h3>Test assignment</h3>
        <form id="form" ref="form" onSubmit={this.handleForm.bind(this)}>
          <div className="form-group">
            <input className="form-control" type="text" name="date" placeholder="Date"/>
          </div>
          <div className="form-group">
            <input className="form-control" type="text" name="flightNumber" placeholder="Flight number"/>
          </div>
          <button className="btn-block btn-primary" style={{marginBottom:'20px'}} type="submit">Get info</button>
        </form>
        {apiResponse ? 
          <FlightDetails 
            scheduledFlights={apiResponse.scheduledFlights} 
            airports={apiResponse.appendix.airports}
          /> 
        : null }
      </div>
    )
  }
}
