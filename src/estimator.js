
// impact: infectionsByRequestedTime
const infectionsByRequestedTimeImpact = (data) => {
  const factor = Math.floor(data.timeToElapse / 3);
  return data.impact.currentlyInfected * 2 ^ factor;
};


// impact: severeCasesByRequestedTime
const severeCasesByRequestedTimeImpact = () => {};

// impact: hospitalBedsByRequestedTime
const hospitalBedsByRequestedTimeImpact = () => {};

// impact: casesForICUByRequestedTime
const casesForICUByRequestedTimeImpact = () => {};

// impact: casesForVentilatorsByRequestedTime
const casesForVentilatorsByRequestedTimeImpact = () => {};

// impact: dollarsInFlight
const dollarsInFlightImpact = () => {};


const covid19ImpactEstimator = (data) => {
  const response = {
    data,
    estimate: {
      impact: {
        currentlyInfected: data.reportedCases * 10,
        infectionsByRequestedTime: infectionsByRequestedTimeImpact(data),
        severeCasesByRequestedTime: severeCasesByRequestedTimeImpact(data),
        hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact(data),
        casesForICUByRequestedTime: casesForICUByRequestedTimeImpact(data),
        casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeImpact(data),
        dollarsInFlight: dollarsInFlightImpact(data)

      },
      severeImpact: {
        currentlyInfected: data.reportedCases * 50,
        infectionsByRequestedTime: '',
        severeCasesByRequestedTime: '',
        hospitalBedsByRequestedTime: '',
        casesForICUByRequestedTime: '',
        casesForVentilatorsByRequestedTime: '',
        dollarsInFlight: ''

      }
    }

  };
  return response;
};

export default covid19ImpactEstimator;
