console.log("index.js is connected")

// ********** DATA RETURN
// > papaparse CSV to JSON pull
Papa.parse(mbldcGSheetURL, {
    download: true,
    header: true,
    complete: showData,
});

// > MBLDC data return function 
 function showData(result) {


    }