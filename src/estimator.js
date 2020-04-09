const covid19ImpactEstimator = (data) => {
  const response = {
    data,
    estimate: {
      impact: {
        currentlyInfected: '',
        infectionsByRequestedTime: '',
        severeCasesByRequestedTime: '',
        hospitalBedsByRequestedTime: '',
        casesForICUByRequestedTime: '',
        casesForVentilatorsByRequestedTime: '',
        dollarsInFlight: ''

      },
      severeImpact: {
        currentlyInfected: '',
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
