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
const SCBTImpact = (data) => (15 / 100) * IBRTImpact(data);

// severe impact
const SCBTSevereImpact = (data) => (15 / 100) * IBRTSevereImpact(data);

// impact: hospitalBedsByRequestedTime
const HBBRTImpact = (data) => Math.floor((35 / 100) * data.totalHospitalBeds);

// severe impact
const HBBRTSevereImpact = (data) => Math.floor((35 / 100) * data.totalHospitalBeds);

// impact: casesForICUByRequestedTime
const casesForICUByRequestedTimeImpact = (data) => (5 / 100) * IBRTImpact(data);

// severe impact
const casesForICUByRequestedTimeSevereImpact = (data) => (5 / 100) * IBRTSevereImpact(data);

// impact: casesForVentilatorsByRequestedTime
const casesForVentilatorsByRequestedTimeImpact = (data) => (2 / 100) * IBRTImpact(data);

// severe impact
const casesForVentilatorsByRequestedTimeSevereImpact = (data) => (2 / 100) * IBRTSevereImpact(data);

// impact: dollarsInFlight
const dollarsInFlightImpact = () => {};

// severe impact
const dollarsInFlightSevereImpact = () => {};


const covid19ImpactEstimator = (data) => {
  const response = {
    data,
    estimate: {
      impact: {
        currentlyInfected: currentlyInfectedImpact(data),
        infectionsByRequestedTime: IBRTImpact(data),
        severeCasesByRequestedTime: SCBTImpact(data),
        hospitalBedsByRequestedTime: HBBRTImpact(data),
        casesForICUByRequestedTime: casesForICUByRequestedTimeImpact(data),
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeImpact(data),
        dollarsInFlight: dollarsInFlightImpact(data)

      },
      severeImpact: {
        currentlyInfected: currentlyInfectedSevereImpact(data),
        infectionsByRequestedTime: IBRTSevereImpact(data),
        severeCasesByRequestedTime: SCBTSevereImpact(data),
        hospitalBedsByRequestedTime: HBBRTSevereImpact(data),
        casesForICUByRequestedTime: casesForICUByRequestedTimeSevereImpact(data),
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevereImpact(data),
        dollarsInFlight: dollarsInFlightSevereImpact(data)

      }
    }

  };
  return response;
};

export default covid19ImpactEstimator;
