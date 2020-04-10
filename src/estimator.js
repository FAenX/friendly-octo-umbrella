/* eslint-disable linebreak-style */
// impact: currently Infected
const currentlyInfectedImpact = (data) => data.reportedCases * 10;
// severe impact
const currentlyInfectedSevereImpact = (data) => data.reportedCases * 50;

// impact: infectionsByRequestedTime
const infectionsByRequestedTimeImpact = (data) => {
  const factor = Math.round(data.timeToElapse / 3);
  return currentlyInfectedImpact(data) * (2 ** factor);
};

// severe impact
const infectionsByRequestedTimeSevereImpact = (data) => {
  const factor = Math.round(data.timeToElapse / 3);
  return currentlyInfectedSevereImpact(data) * (2 ** factor);
};


// impact: severeCasesByRequestedTime
const severeCasesByRequestedTimeImpact = (data) => (15 / 100) * infectionsByRequestedTimeImpact(data);

// severe impact
const severeCasesByRequestedTimeSevereImpact = (data) => (15 / 100) * infectionsByRequestedTimeSevereImpact(data);

// impact: hospitalBedsByRequestedTime
const hospitalBedsByRequestedTimeImpact = (data) => (35 / 100) * data.totalHospitalBeds;

// severe impact
const hospitalBedsByRequestedTimeSevereImpact = () => {};

// impact: casesForICUByRequestedTime
const casesForICUByRequestedTimeImpact = () => {};

// severe impact
const casesForICUByRequestedTimeSevereImpact = () => {};

// impact: casesForVentilatorsByRequestedTime
const casesForVentilatorsByRequestedTimeImpact = () => {};

// severe impact
const casesForVentilatorsByRequestedTimeSevereImpact = () => {};

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
        infectionsByRequestedTime: infectionsByRequestedTimeImpact(data),
        severeCasesByRequestedTime: severeCasesByRequestedTimeImpact(data),
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact(data),
        casesForICUByRequestedTime: casesForICUByRequestedTimeImpact(data),
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeImpact(data),
        dollarsInFlight: dollarsInFlightImpact(data)

      },
      severeImpact: {
        currentlyInfected: currentlyInfectedSevereImpact(data),
        infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact(data),
        severeCasesByRequestedTime: severeCasesByRequestedTimeSevereImpact(data),
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevereImpact(data),
        casesForICUByRequestedTime: casesForICUByRequestedTimeSevereImpact(data),
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevereImpact(data),
        dollarsInFlight: dollarsInFlightSevereImpact(data)

      }
    }

  };
  return response;
};

export default covid19ImpactEstimator;
