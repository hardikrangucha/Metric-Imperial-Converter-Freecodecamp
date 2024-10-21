function ConvertHandler() {
  
  // Function to extract and return the number from the input
  this.getNum = function(input) {
    let result;
    
    // Using regex to extract the number (supports fractions and decimals)
    let numRegex = /^[\d/.]+/;
    result = input.match(numRegex);
    
    if (!result) {
      return 1; // Default to 1 if no number is provided
    }
    
    result = result[0];
    
    // Check if it's a valid fraction
    if (result.includes('/')) {
      let nums = result.split('/');
      if (nums.length !== 2) {
        return 'invalid number'; // Handle invalid fractions like '3/2/3'
      }
      result = parseFloat(nums[0]) / parseFloat(nums[1]);
    } else {
      result = parseFloat(result);
    }

    if (isNaN(result)) {
      return 'invalid number';
    }
    
    return result;
  };

  // Function to extract and return the unit from the input
  this.getUnit = function(input) {
    let unitRegex = /[a-zA-Z]+$/;
    let result = input.match(unitRegex);
    
    if (!result) {
      return 'invalid unit';
    }

    result = result[0].toLowerCase();
    
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (validUnits.includes(result)) {
      return result === 'l' ? 'L' : result;
    }
    
    return 'invalid unit';
  };
  
  // Function to get the return unit based on the initial unit
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit];
  };

  // Function to spell out the full name of the unit
  this.spellOutUnit = function(unit) {
    const unitSpelling = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitSpelling[unit];
  };
  
  // Function to convert the number between metric and imperial units
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return 'invalid unit';
    }

    return parseFloat(result.toFixed(5));
  };

  // Function to generate the full conversion string
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
