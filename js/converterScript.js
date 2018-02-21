

function convertInput() {

    //saving the input value to a variable val
    var val = document.getElementById("input-amount").value;

    //test
    console.log("this much: " + val);

    //making a xmlhttp request
    var getjson = new XMLHttpRequest();

    //get country codes based on country selected for both input and output
    var inputCurrency = document.getElementById("input-country").value;
    var outputCurrency = document.getElementById("output-country").value;

    //test
    console.log(inputCurrency + " to " + outputCurrency);

    //declaring url as variable so we can easily manipulate it
    var url = "https://api.fixer.io/latest?symbols=" + inputCurrency + "," + outputCurrency;

    //making a GET request, keeping it syncronous
    getjson.open("GET", url, false)
    getjson.send();

    //readyState 4 is response code for ready, status 200 is response code for ready
    var result, country1, country2;
    if (getjson.readyState == 4 && getjson.status == 200) {

        //parse the json file so we can extract our data
        result = JSON.parse(getjson.responseText);
        console.log(result.rates);
    }

    //because of the standard rate is euro, conversions to and from euro don't return a value 
    //we need to set the missing currency to 1 in that case

    var returnedInputCurrency;
    var returnedOutputCurrency;
    var objectLength = JSON.stringify(result.rates).length;
    console.log(objectLength);

    if (objectLength === 2) {
        returnedInputCurrency = 1;
        returnedOutputCurrency = 1;
        console.log(returnedOutputCurrency, returnedInputCurrency);
    } else if (result.rates[inputCurrency] === undefined) {
        returnedInputCurrency = 1;
        returnedOutputCurrency = result.rates[outputCurrency];
    } else if(result.rates[outputCurrency] === undefined) {
        returnedOutputCurrency = 1;
        returnedInputCurrency = result.rates[inputCurrency];
    } else {
        returnedOutputCurrency = result.rates[outputCurrency];
        returnedInputCurrency = result.rates[inputCurrency];
    }

    //math because standard currency is euro, so we need to find ratio between the two countries we're converting to and from
    var converterRatio = returnedOutputCurrency / returnedInputCurrency;
    var convertedVal = converterRatio * val;

    //assign the second input box the converted value
    document.getElementById("output-amount").value = convertedVal.toFixed(2);

    //test
    console.log("is this much: " + convertedVal);

    //if user enters anything that's not a number, alert them
    if (isNaN(convertedVal)) {
        alert("Please enter a number.");
    }
}