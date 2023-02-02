function bunnyInput() {
    let bunnyInput = $('input[name="bunny"]');
    for (let i = 0, length = bunnyInput.length; i < length; i++) {
        if (bunnyInput[i].checked) {
            return(bunnyInput[i].value);
        }
    }
}

function scalewayInput() {
    let scalewayInput = $('input[name="scaleway"]');
    for (let i = 0, length = scalewayInput.length; i < length; i++) {
        if (scalewayInput[i].checked) {
            return(scalewayInput[i].value);
        }
    }
}

let bunnyTariff = bunnyInput();
let scalewayTariff = scalewayInput();

let storageInput = $('input[name="storage"]').val();
let transferInput = $('input[name="transfer"]').val();

function priceSimple(input, price) {
    let priceSimple = input*price;
    return priceSimple;
}

function priceWithTariffs(price1, price2, input, tariff, tariffName1) {
    let priceWithTariffs;
    if (tariff == tariffName1) {
        priceWithTariffs = input*price1;
        return priceWithTariffs;
    } else {
        priceWithTariffs = input*price2
        return priceWithTariffs;
    }
}

function priceWithDiscount(priceCalculator, discountGB, discountSum, input) {
    let priceWithDiscount;
    if (input <= discountGB ) {
        priceWithDiscount = 0;
        return priceWithDiscount;
    } else {
        priceWithDiscount = priceCalculator-discountSum;
        return priceWithDiscount;
    }
}

let blackblazeStorage = 0.005;
let bunnyStorageHdd = 0.01;
let bunnyStorageSdd = 0.02;
let scalewayStorageMulti = 0.06;
let scalewayStorageSingle = 0.03;
let vultrStorage = 0.01;

let blackblazeTransfer = 0.01;
let bunnyTransfer = 0.01;
let scalewayTransfer = 0.02;
let vultrTransfer = 0.01;

let sumBackblaze = priceSimple(storageInput, blackblazeStorage)+priceSimple(transferInput, blackblazeTransfer);
let sumBunny = priceWithTariffs(bunnyStorageHdd, bunnyStorageSdd, storageInput, bunnyTariff, 'bunnyHdd')+priceSimple(transferInput, bunnyTransfer);
let sumScaleway = priceWithDiscount(priceWithTariffs(scalewayStorageMulti, scalewayStorageSingle, storageInput, scalewayTariff, 'scalewayMulti'), 75, priceWithTariffs(scalewayStorageMulti, scalewayStorageSingle, 75, scalewayTariff, 'scalewayMulti'), storageInput)+
priceWithDiscount(priceSimple(transferInput, scalewayTransfer), 75, priceSimple(75, scalewayTransfer), transferInput);
let sumVultr = priceSimple(storageInput, vultrStorage)+priceSimple(transferInput, vultrTransfer);


function finalPriceBackblaze() {
    let finalPriceBackblaze;
    if (sumBackblaze <= 7) {
        finalPriceBackblaze = 7;
        console.log(7);
        $('#chartBackblazeValue').html(finalPriceBackblaze);
        return finalPriceBackblaze;
    } else {
        finalPriceBackblaze = sumBackblaze;
        console.log(finalPriceBackblaze);
        $('#chartBackblazeValue').html(finalPriceBackblaze);
        return finalPriceBackblaze;
    }
}

function finalPriceBunny() {
    let finalPriceBunny;
    if (sumBunny >= 10) {
        finalPriceBunny = 10;
        console.log(10);
        $('#chartBunnyValue').html(finalPriceBunny);
        return finalPriceBunny;
    } else {
        finalPriceBunny = sumBunny;
        console.log(finalPriceBunny);
        $('#chartBunnyValue').html(finalPriceBunny);
        return finalPriceBunny;
    }
}

function finalPriceScaleway() {
    let finalPriceScaleway;
    finalPriceScaleway = sumScaleway;
    console.log(finalPriceScaleway);
    $('#chartScalewayValue').html(finalPriceScaleway);
    return finalPriceScaleway;
}


function finalPriceVultr() {
    let finalPriceVultr;
    if (sumVultr <= 5) {
        finalPriceVultr = 5;
        console.log(5);
        $('#chartVultrValue').html(finalPriceVultr);
        return finalPriceVultr;
    } else {
        finalPriceVultr = sumVultr;
        console.log(finalPriceVultr);
        $('#chartVultrValue').html(finalPriceVultr);
        return finalPriceVultr;
    }
}

widthBackblaze = finalPriceBackblaze()*90/80+2;
widthBunny = finalPriceBunny()*90/80+2;
widthScaleway = finalPriceScaleway()*90/80+2;
widthVultr = finalPriceVultr()*90/80+2;

$('#chartBackblaze').width(widthBackblaze + '%');
$('#chartBunny').width(widthBunny + '%');
$('#chartScaleway').width(widthScaleway + '%');
$('#chartVultr').width(widthVultr + '%');

let theSmallestChart = Math.min(widthBackblaze, widthBunny, widthScaleway, widthVultr)

if (widthBackblaze == theSmallestChart) {
    $('#chartBackblaze').css({"background":"red"});
    $('#chartBunny').css({"background":"grey"});
    $('#chartScaleway').css({"background":"grey"});
    $('#chartVultr').css({"background":"grey"});
} else if (widthBunny == theSmallestChart) {
    $('#chartBunny').css({"background":"orange"});
    $('#chartBackblaze').css({"background":"grey"});
    $('#chartScaleway').css({"background":"grey"});
    $('#chartVultr').css({"background":"grey"});
} else if (widthScaleway == theSmallestChart) {
    $('#chartScaleway').css({"background":"purple"});
    $('#chartBackblaze').css({"background":"grey"});
    $('#chartBunny').css({"background":"grey"});
    $('#chartVultr').css({"background":"grey"});
} else if (widthVultr == theSmallestChart) {
    $('#chartVultr').css({"background":"blue"})
    $('#chartBackblaze').css({"background":"grey"});
    $('#chartBunny').css({"background":"grey"});
    $('#chartScaleway').css({"background":"grey"});
}




oninput = (event) => {

bunnyTariff = bunnyInput();
scalewayTariff = scalewayInput();

storageInput = $('input[name="storage"]').val();
transferInput = $('input[name="transfer"]').val();

sumBackblaze = priceSimple(storageInput, blackblazeStorage)+priceSimple(transferInput, blackblazeTransfer);
sumBunny = priceWithTariffs(bunnyStorageHdd, bunnyStorageSdd, storageInput, bunnyTariff, 'bunnyHdd')+priceSimple(transferInput, bunnyTransfer);
sumScaleway = priceWithDiscount(priceWithTariffs(scalewayStorageMulti, scalewayStorageSingle, storageInput, scalewayTariff, 'scalewayMulti'), 75, priceWithTariffs(scalewayStorageMulti, scalewayStorageSingle, 75, scalewayTariff, 'scalewayMulti'), storageInput)+
priceWithDiscount(priceSimple(transferInput, scalewayTransfer), 75, priceSimple(75, scalewayTransfer), transferInput);
sumVultr = priceSimple(storageInput, vultrStorage)+priceSimple(transferInput, vultrTransfer);

function rounded(number) {
    return +number.toFixed(2);
}

function finalPriceBackblaze() {
    let finalPriceBackblaze;
    if (sumBackblaze <= 7) {
        finalPriceBackblaze = 7;
        console.log(7);
        $('#chartBackblazeValue').html(rounded(finalPriceBackblaze));
        return finalPriceBackblaze;
    } else {
        finalPriceBackblaze = sumBackblaze;
        console.log(finalPriceBackblaze);
        $('#chartBackblazeValue').html(rounded(finalPriceBackblaze));
        return finalPriceBackblaze;
    }
}

function finalPriceBunny() {
    let finalPriceBunny;
    if (sumBunny >= 10) {
        finalPriceBunny = 10;
        console.log(10);
        $('#chartBunnyValue').html(rounded(finalPriceBunny));
        return finalPriceBunny;
    } else {
        finalPriceBunny = sumBunny;
        console.log(finalPriceBunny);
        $('#chartBunnyValue').html(rounded(finalPriceBunny));
        return finalPriceBunny;
    }
}

function finalPriceScaleway() {
    let finalPriceScaleway;
    finalPriceScaleway = sumScaleway;
    console.log(finalPriceScaleway);
    $('#chartScalewayValue').html(rounded(finalPriceScaleway));
    return finalPriceScaleway;
}


function finalPriceVultr() {
    let finalPriceVultr;
    if (sumVultr <= 5) {
        finalPriceVultr = 5;
        console.log(5);
        $('#chartVultrValue').html(rounded(finalPriceVultr));
        return finalPriceVultr;
    } else {
        finalPriceVultr = sumVultr;
        console.log(finalPriceVultr);
        $('#chartVultrValue').html(rounded(finalPriceVultr));
        return finalPriceVultr;
    }
}

widthBackblaze = finalPriceBackblaze()*90/80+2;
widthBunny = finalPriceBunny()*90/80+2;
widthScaleway = finalPriceScaleway()*90/80+2;
widthVultr = finalPriceVultr()*90/80+2;

$('#chartBackblaze').width(widthBackblaze + '%');
$('#chartBunny').width(widthBunny + '%');
$('#chartScaleway').width(widthScaleway + '%');
$('#chartVultr').width(widthVultr + '%');


theSmallestChart = Math.min(widthBackblaze, widthBunny, widthScaleway, widthVultr)

if (widthBackblaze == theSmallestChart) {
    $('#chartBackblaze').css({"background":"red"});
    $('#chartBunny').css({"background":"grey"});
    $('#chartScaleway').css({"background":"grey"});
    $('#chartVultr').css({"background":"grey"});
} else if (widthBunny == theSmallestChart) {
    $('#chartBunny').css({"background":"orange"});
    $('#chartBackblaze').css({"background":"grey"});
    $('#chartScaleway').css({"background":"grey"});
    $('#chartVultr').css({"background":"grey"});
} else if (widthScaleway == theSmallestChart) {
    $('#chartScaleway').css({"background":"purple"});
    $('#chartBackblaze').css({"background":"grey"});
    $('#chartBunny').css({"background":"grey"});
    $('#chartVultr').css({"background":"grey"});
} else if (widthVultr == theSmallestChart) {
    $('#chartVultr').css({"background":"blue"})
    $('#chartBackblaze').css({"background":"grey"});
    $('#chartBunny').css({"background":"grey"});
    $('#chartScaleway').css({"background":"grey"});
}

};
