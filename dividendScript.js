function monthDifference(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
}

function retirementDateCalc(desiredAge, birthday) {
    let d = new Date(birthday);
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    return new Date(year + desiredAge, month, day);
}
function format (numberStr){
    return numberStr.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
 };

function main(desiredRetirementAge, birthday, currentShares, currentCostBasis, currentAccountBalance) {
    //calculating date objects to figure out how many months left to retire, how old we currently are in years and in months
    let today = new Date();
    birthday = new Date(birthday)
    let currentAgeInMonths = monthDifference(birthday, today);
    let currentAge = (Math.floor(currentAgeInMonths / 12));
    let retirementDate = retirementDateCalc(desiredRetirementAge, birthday);
    let monthsLeftUntillRetirement = monthDifference(today, retirementDate);
    let yearsLeftToRetire = Math.ceil(monthsLeftUntillRetirement/12)
    let currentDate = new Date(today);
    let monthsInvested = 0

    //end of date calculations

    //stock information
    let sharePrice = 7.66 //average stock price of GUT over the life of the stock
    let dividendPayout = .05;
    let monthlyContribution = 6000 / 12;
    let totalDistribution =0;
    //end of stock information
    let stats = {};

    while (monthsInvested < monthsLeftUntillRetirement) {

        if (currentAge >= 30) {
            dividendPayout = .06
        }

        if (currentAge >= 50) {
            dividendPayout = .07
            monthlyContribution = 7000 / 12;
        }

        //monthly dividend calculation
        let thisMonthsDividend = (currentShares * dividendPayout);
        totalDistribution+=thisMonthsDividend;
        let dripShares = (thisMonthsDividend / sharePrice);

        let monthlyBoughtShares = (monthlyContribution / sharePrice);

        currentShares += monthlyBoughtShares + dripShares;
        //account balance calculation
        currentCostBasis += monthlyContribution
        currentAccountBalance += thisMonthsDividend + monthlyContribution

        //month and age calculation
        currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
        currentAgeInMonths = monthDifference(birthday, currentDate);
        
        if (currentAgeInMonths % 12 === 0){
            currentAge += 1
        } 
        monthsInvested += 1;

        if ((currentAge in stats) === false) {
            stats[currentAge] = {}
        }
        stats[currentAge] = {
            "Current Cost Basis" : currentCostBasis.toFixed(2),
            "Current Account Balance": currentAccountBalance.toFixed(2),
            "Current Shares": currentShares.toFixed(3),
            "Monthly Dividend": (currentShares * dividendPayout).toFixed(2),
            "Lifetime Distributions": format(totalDistribution.toFixed(2)),
            "Current Date": currentDate,
            "Annual Return": ((((currentAccountBalance-currentCostBasis + totalDistribution)/currentCostBasis)*100)).toFixed(2),
        };
    }
    
    stats["Final"] =  {
        "Current Cost Basis" : "$"+format(currentCostBasis.toFixed(2)),
        "Current Account Balance": "$"+format(currentAccountBalance.toFixed(2)),
        "Current Shares": format(currentShares.toFixed(3)),
        "Monthly Dividend": "$"+format((currentShares * dividendPayout).toFixed(2)),
        "Average Annual Return": format(((((currentAccountBalance-currentCostBasis + totalDistribution)/currentCostBasis)*100)/yearsLeftToRetire).toFixed(2)) + " %",
        "Lifetime Return": format(((((currentAccountBalance-currentCostBasis + totalDistribution)/currentCostBasis)*100)).toFixed(2)) + " %",
        "Lifetime Distributions": "$ "+format((totalDistribution).toFixed(2)),
        
    };
    return stats["Final"]
}
console.log(main(60, "07/26/1993", 2882.212, 19674.88, 21357.19))