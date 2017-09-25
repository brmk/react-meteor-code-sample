import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Logger } from '/imports/modules/logger.js';

export default class App extends React.Component {

  render() {
	  return (
	  	<div className="App">
	    	<main className="container">
		      { this.props.main }
	      </main>
		  </div>
		);
	}
}

App.propTypes = {
  main: PropTypes.node,
};

