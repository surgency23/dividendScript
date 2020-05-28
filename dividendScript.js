let standardDividend = .05;
let monthlyReturn = 0.00;
let monthlyContribution = 500.00;
let principal = 0.00;
let stockPrice = 8;
let shares = 0;
let monthsInvested = 0;

while(monthsInvested <= 416){
    if(monthsInvested >= 360){
        principal += (monthlyContribution+1500)+monthlyReturn;
        shares = principal/stockPrice;
        monthlyReturn = standardDividend*shares;
        monthsInvested++;
    }
    else if(monthsInvested >= 300){
        principal += (monthlyContribution+1250)+monthlyReturn;
        shares = principal/stockPrice;
        monthlyReturn = standardDividend*shares;
        monthsInvested++;
    }
    else if(monthsInvested >= 240){
        principal += (monthlyContribution+1000)+monthlyReturn;
        shares = principal/stockPrice;
        monthlyReturn = standardDividend*shares;
        monthsInvested++;
    }
    else if(monthsInvested >= 180){
        principal += (monthlyContribution+750)+monthlyReturn;
        shares = principal/stockPrice;
        monthlyReturn = standardDividend*shares;
        monthsInvested++;
    }
    else if(monthsInvested >= 120){
        principal += (monthlyContribution+500)+monthlyReturn;
        shares = principal/stockPrice;
        monthlyReturn = standardDividend*shares;
        monthsInvested++;
    }
    else if(monthsInvested >= 60){
        principal += (monthlyContribution+250)+monthlyReturn;
        shares = principal/stockPrice;
        monthlyReturn = standardDividend*shares;
        monthsInvested++;
    }
    else{
        principal += monthlyContribution + monthlyReturn;
        shares = principal/stockPrice;
        monthlyReturn = standardDividend*shares;
        monthsInvested++;
    }
    
}
Number.prototype.format = function(){
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
 };
 console.log(shares.format())
console.log(`this is month ${monthsInvested}`);
console.log(`${shares.toFixed(3)} total shares`);
console.log(`$${monthlyReturn.toFixed(2)} monthly dividend return`);
console.log(`$${principal.toFixed(2)} total principal`);

