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
const IBRT_SI = (data) => {
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
const SCBT_SI = (data) => Math.floor(0.15 * IBRT_SI(data));

// impact: hospitalBedsByRequestedTime
const HBBRTImpact = (data) => Math.floor(0.35 * data.totalHospitalBeds) - SCBTImpact(data) + 1;

// severe impact
const HBBRT_SI = (data) => Math.floor(0.35 * data.totalHospitalBeds) - SCBT_SI(data) + 1;

// impact: casesForICUByRequestedTime
const CFICUBImpact = (data) => Math.floor(0.05 * IBRTImpact(data));

// severe impact
const CFICUB_SI = (data) => Math.floor(0.05 * IBRT_SI(data));

// impact: casesForVentilatorsByRequestedTime
const CFVBRTImpact = (data) => Math.floor(0.02 * IBRTImpact(data));

// severe impact
const CFVBRT_SI = (data) => Math.floor(0.02 * IBRT_SI(data));

// impact: dollarsInFlight
const dollarsInFlightImpact = () => 400;

// severe impact
const dollarsInFlightSevereImpact = () => 400;


const covid19ImpactEstimator = (data) => ({

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
    infectionsByRequestedTime: IBRT_SI(data),
    severeCasesByRequestedTime: SCBT_SI(data),
    hospitalBedsByRequestedTime: HBBRT_SI(data),
    casesForICUByRequestedTime: CFICUB_SI(data),
    casesForVentilatorsByRequestedTime: CFVBRT_SI(data),
    dollarsInFlight: dollarsInFlightSevereImpact(data)

  }

});

export default covid19ImpactEstimator;
