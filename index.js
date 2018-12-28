'use strict'


const apiKey = "gQtN4Mn6XhuTuxsORBRVuk8YPlf1E7c3YD6NVqyx";

function display(response){
    if(response.total === 0){
        displayNoResults(); 
    }
    console.log(response); 
    response.data.forEach(key => {
        let result = (
            `<h2><a href=${key.url}>${key.fullName}</a></h2>
            <p>${key.description}</p>`
        );
        $(".results-list").append(result);
    })  
}

function displayNoResults(){
    $(".response").text("Sorry, no results for that search.")
}

function formatQuery(stateCodes, limit){
    let stateStrings = stateCodes.map(code => `stateCode=${code}&`);
    let url = `https://api.nps.gov/api/v1/parks?parkCode=&parkCode=&${stateStrings.join()}limit=${limit}&api_key=${apiKey}` 
    getURL(url)
}

function getURL(url){
    $(".response").removeClass("hidden"); 
    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json(); 
        } 
            throw new Error(response.statusText)
    })
    .then(responseJson => display(responseJson))
    .catch(err => {
        console.log(err)
        $(".response").text(`Something went wrong: ${err}`) 
    })
}

function launchApp(){
    $("form").submit( event => {
        event.preventDefault(); 
        $(".results-list").empty(); 
        let stateCodes = $("#input-state").val().split(/,\s*/); 
        let limit = $("#input-entries").val()-1;
        if(limit === -1){
            limit = 10; 
        } 
        return formatQuery(stateCodes, limit) 
    })  
}


$(launchApp)