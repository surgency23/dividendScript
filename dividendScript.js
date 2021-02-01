function retireMentCalculator(desiredRetirementAge, birthday) {
    const moment = require('moment');
    let standardDividend = .05;
    let monthlyReturn = 0.00;
    let monthlyContribution = 500.00;
    let principal = 0;
    let stockPrice = 7.66// this is the average price of GUT since its inception every quarter. 
    let shares = 0;
    let monthsInvested = 0;
    birthday = moment(birthday);
    let today = moment();
    let currentAgeInMonths = (today.diff(birthday, "months"));
    let currentAge = (today.diff(birthday, "months") / 12).toString().replace(/\.\d+/, "");
    let monthsToRetire = (desiredRetirementAge - currentAgeInMonths / 12) * 12;
    let stats = [];
    let totalInvested = 0;

    while (monthsInvested <= monthsToRetire) {
        let newObj = {};
        switch (currentAge >= 50) {
            case true:
                monthlyContribution = 7000 / 12
            default:
                totalInvested+=monthlyContribution
                principal += monthlyContribution + monthlyReturn;
                shares = principal / stockPrice;
                monthlyReturn = standardDividend * shares;
                monthsInvested++;
                newObj.age = currentAge
                newObj.currentPrincipal = principal.toFixed(2);
                stats.push(newObj);
                today = today.add(1, "months")
                currentAge = (today.diff(birthday, "months") / 12).toString().replace(/\.\d+/, "");
                break;
        }
    }
    return {"Total Shares":shares.toFixed(2),"Monthly Dividend":  monthlyReturn.toFixed(2), "Total Principal": principal.toFixed(2),"Total Invested":totalInvested.toFixed(2),"Stats":stats}
}
console.log(retireMentCalculator(60,"07/26/1993"));