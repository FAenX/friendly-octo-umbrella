/* eslint-disable linebreak-style */
// impact: currently Infected
const currentlyInfectedImpact = (data) => data.reportedCases * 10;
// severe impact
const currentlyInfectedSevereImpact = (data) => data.reportedCases * 50;

// impact: infectionsByRequestedTime
const IBRTImpact = (data) => {
  let factor;
  if (data.periodType === 'days') {
    factor = Math.floor(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    factor = Math.floor((data.timeToElapse * 7) / 3);
  } else if (data.periodType === 'months') {
    factor = Math.floor((data.timeToElapse * 30) / 3);
  }

  return currentlyInfectedImpact(data) * (2 ** factor);
};

// severe impact
const IBRTSevereImpact = (data) => {
  let factor;
  if (data.periodType === 'days') {
    factor = Math.floor(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    factor = Math.floor((data.timeToElapse * 7) / 3);
  } else if (data.periodType === 'months') {
    factor = Math.floor((data.timeToElapse * 30) / 3);
  }
  return currentlyInfectedSevereImpact(data) * (2 ** factor);
};


// impact: severeCasesByRequestedTime
const SCBTImpact = (data) => Math.floor(0.15 * IBRTImpact(data));

// severe impact
const SCBTSevereImpact = (data) => Math.floor(0.15 * IBRTSevereImpact(data));

// impact: hospitalBedsByRequestedTime
const HBBRTImpact = (data) => Math.floor(0.35 * data.totalHospitalBeds);

// severe impact
const HBBRTSevereImpact = (data) => Math.floor(0.35 * data.totalHospitalBeds);

// impact: casesForICUByRequestedTime
const CFICUBImpact = (data) => Math.floor(0.05 * IBRTImpact(data));

// severe impact
const CFICUBSevereImpact = (data) => Math.floor(0.05 * IBRTSevereImpact(data));

// impact: casesForVentilatorsByRequestedTime
const CFVBRTImpact = (data) => Math.floor(0.02 * IBRTImpact(data));

// severe impact
const CFVBRTSevereImpact = (data) => Math.floor(0.02 * IBRTSevereImpact(data));

// impact: dollarsInFlight
const dollarsInFlightImpact = () => 400;

// severe impact
const dollarsInFlightSevereImpact = () => 400;


const covid19ImpactEstimator = (data) => {
  const response = {
    data,
    estimate: {
      impact: {
        currentlyInfected: currentlyInfectedImpact(data),
        infectionsByRequestedTime: IBRTImpact(data),
        severeCasesByRequestedTime: SCBTImpact(data),
        hospitalBedsByRequestedTime: HBBRTImpact(data),
        casesForICUByRequestedTime: CFICUBImpact(data),
        casesForVentilatorsByRequestedTime: CFVBRTImpact(data),
        dollarsInFlight: dollarsInFlightImpact(data)

      },
      severeImpact: {
        currentlyInfected: currentlyInfectedSevereImpact(data),
        infectionsByRequestedTime: IBRTSevereImpact(data),
        severeCasesByRequestedTime: SCBTSevereImpact(data),
        hospitalBedsByRequestedTime: HBBRTSevereImpact(data),
        casesForICUByRequestedTime: CFICUBSevereImpact(data),
        casesForVentilatorsByRequestedTime: CFVBRTSevereImpact(data),
        dollarsInFlight: dollarsInFlightSevereImpact(data)

      }
    }

  };
  return response;
};

export default covid19ImpactEstimator;
