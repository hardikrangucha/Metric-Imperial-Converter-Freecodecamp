'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  
  let convertHandler = new ConvertHandler();

  // Define the route to handle the GET request for conversion
  app.get('/api/convert', (req, res) => {
    let input = req.query.input;
    
    // Get the numerical value and the unit from the input
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    
    // Handle invalid number or unit scenarios
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.json({ error: 'invalid number and unit' });
    } else if (initNum === 'invalid number') {
      return res.json({ error: 'invalid number' });
    } else if (initUnit === 'invalid unit') {
      return res.json({ error: 'invalid unit' });
    }
    
    // Get the converted number and return unit
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    
    // Build the conversion string
    let resultString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    // Send the response as a JSON object
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: resultString
    });
  });

};
