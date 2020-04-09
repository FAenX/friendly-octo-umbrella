const covid19ImpactEstimator = (data) => {
    return {
        data, 
        impact: {
            currentlyInfected:data.reportedCases * 10,
    }, 
    severeImpact:{
        currentlyInfected: data.reportedCases*50,
    }}
};

export default covid19ImpactEstimator;
