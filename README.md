1) You are to develop a user interface to collect from a keyboard 2 data elements: a flight date and a flight number.
• Flight date
• The date field will display a 2-month calendar format when clicked.
• Selectable dates cannot be earlier than today or later than 12 months in the future.
• The flight date, once selected, must be shown as DDMmmYYYY (19Sep2017)
• Flight number
• Flight number consists of two sets of strings - carrier code + flight id number
o Flight number will be 3-6 characters total length
§ Carrier code, determined by IATA, is a two-alphanumeric character string
§ Flight id number is one to four digits and all numeric
§ Leading zeros for the flight id number should be suppressed (AA001 ==> AA1)
o The alpha portion of the airline code, once verified, should be capitalized (A112, UA1234, AA2160) § A1 = airline code 12 = flight number
§ UA = airline code 1234 - flight number
2) With the collected data, you will make an API call to flightstats to retrieve the city pairs (departure and arrival cities) related to the flight and the date. You will use the following appl id and key for your call. Please limit your API calls to no more than 100 calls.
• Application ID = 26900b7d
• Application key = fe75f6d4c5256582260c3877abeb21ac
• FlightStats Reference = documentation https://developer.flightstats.com/api-docs/scheduledFlights/v1
3) Display the results to show the following fields:
• flight number (e.g. LH419)
• departure
o date ( e.g. 19Sep2017)
o airport code (e.g. IAD)
o airport name (e.g. Dulles International Airport) o time (e.g 1805 or 18:05, using a 24-hour clock)
• arrival
o date (e.g 20Sep2017)
o airport code (e.g FRA)
o airport name (e.g Frankfurt Airport)
o time (e.g 0719 or 07:19, using a 24-hour clock)
In some cases, multiple city pairs can be displayed for the following reasons:
• bi-directional commuter flights (e.g AA2160 which is DCA-BOS and BOS-DCA)
• heading the same way (e.g UA547 which is SAN-DEN and DEN-ORD)
 
* When multiple choices exist, all city pairs will be displayed and the user will select service at the desired city.
A codeshare is when an airline sells seats on a partner operating airline’s flight (e.g. UA8826 which is operated by Lufthansa as LH419)
o When a codeshare exists, the flight number should display both the codeshare and the operating airline (e.g. UA8826 operated as LH419)
4) The user should be able to select any of the airport location as if to request service. The selection style is at your discretion.
5) Display a summary of the user selection
