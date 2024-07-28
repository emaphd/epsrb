console.log("index.js is connected")

let emaphdProjectCards = document.getElementById("project-cards-row");
let emaphdEventCards = document.getElementById("event-cards-row")

let emaphdGSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTq03Pj3fHhrj8GOFsZwkabEJXCZ05RMr44B2ZYQlUAknrKxL-vxQrLI9toXevjUCTww3iJa1O1bWUc/pub?gid=0&single=true&output=csv";

let emaphdDataObj = {
    "project" : [],
    "event" : []
};

// ********** DATA RETURN
// > papaparse CSV to JSON pull
Papa.parse(emaphdGSheetURL, {
    download: true,
    header: true,
    complete: showEmaphdData,
});

// > MBLDC data return function 
 function showEmaphdData(result) {

    let rawData = result.data;
    console.log(rawData);
    
// ~*~*~*~ PARSE DATA - emaphdDataObj ~*~*~*~
    for (let index = 0; index < rawData.length; index++) {
        
        if (rawData[index].projEventSelect === "Project") {

            console.log("in the project space")

            let newProjectEntry = {
                "uid" : rawData[index].uID,
                "utype" : rawData[index].projEventSelect,
                "title" : rawData[index].projTitle,
                "cat" : rawData[index].projCat,
                "imgID" : rawData[index].projImgID,
                "time" : rawData[index].projTimeline,
                "team" : rawData[index].projTeam,
                "desc" : rawData[index].projDesc,
                "url" : rawData[index].projExtURL
            }
            
            emaphdDataObj.project.push(newProjectEntry); 
            
            console.log(emaphdDataObj);
             
        } else if (rawData[index].projEventSelect === "Event") {
            
            console.log("in the event space")

            let newEventEntry = {
                "uid" : rawData[index].uID,
                "utype" : rawData[index].projEventSelect,
                "title" : rawData[index].eventTitle,
                "cat" : rawData[index].eventCat,
                "type" : rawData[index].eventType,
                "imgID" : rawData[index].eventImgID,
                "date" : rawData[index].eventDate,
                "org" : rawData[index].eventOrg,
                "inst" : rawData[index].eventInst,
                "loc" : rawData[index].eventLoc,
                "desc" : rawData[index].eventDesc,
                "url" : rawData[index].eventExtURL
            }
            
            emaphdDataObj.event.push(newEventEntry); 
            
            console.log(emaphdDataObj);
        }; 

    } // emaphd data parse end

// ~*~*~*~ PROJECT CARDS RETURN ~*~*~*~
    for (let index = 0; index < emaphdDataObj.project.length; index++) {
        
        // create card div - column
        let projCardCol = document.createElement("div");
        projCardCol.className = "col-sm-6 col-lg-4 mb-4 card proj-card-col";

        // create card & elements
        // > create card element & set ID
        let projCard = document.createElement("div");
        projCard.setAttribute("id", "card-proj-" + emaphdDataObj.project[index].uID);
        projCard.className = "proj-card"

        // > create card div - body
        let projCardBody = document.createElement("div");

        // > create card div - title
        let projCardTitle = document.createElement("h5");
        projCardTitle.className = "card-title";
        projCardTitle.innerText = emaphdDataObj.project[index].title;

        // > create card img
        let projCardImg = document.createElement("img");
        projCardImg.className = "card-img-top";
        projCardImg.setAttribute("src","./assets/imgs/emaphd-logo-color.png");

        // > card footer
        let projCardFooter = document.createElement("div");
        projCardFooter.className = "card-footer-row"

        // > create modal trigger button
        let projModalBtn = document.createElement("btn");
        projModalBtn.setAttribute("type", "button");
        projModalBtn.className = "btn btn-primary"
        projModalBtn.setAttribute("data-bs-toggle", "modal"); 
        projModalBtn.setAttribute("data-bs-target", "#modal-proj-" + emaphdDataObj.project[index].uid);
        projModalBtn.innerText = "view"
        
        // create modal & elements
        // > modal
        let projModal = document.createElement("div");
        projModal.className = "modal fade";
        projModal.setAttribute("id", "modal-proj-" + emaphdDataObj.project[index].uid);
        projModal.setAttribute("tabindex", "-1");
        projModal.setAttribute("aria-labelledby", "modalLabel" + emaphdDataObj.project[index].uid);
        projModal.setAttribute("aria-hidden", "true");         

        // > modal-dialog
        let projModalDialog = document.createElement("div");
        projModalDialog.className = "modal-dialog";        

        // > modal-content
        let projModalContent = document.createElement("div");
        projModalContent.className = "modal-content";

        // > modal-header
        let projModalHeader = document.createElement("div");
        projModalHeader.className = "modal-header";

        // > modal-header-h1
        let projModalHeaderTxt = document.createElement("h1");
        projModalHeaderTxt.className = "modal-title fs-5";
        projModalHeaderTxt.setAttribute("id", "modalLabel" + emaphdDataObj.project[index].uid);
        projModalHeaderTxt.innerText = emaphdDataObj.project[index].title;

        // > modal-body
        let projModalBody = document.createElement("div");
        projModalBody.className = "modal-body";
        
        // create modal div - category
        let projModalCat = document.createElement("h6");
        projModalCat.className = "modal-subtitle";
        projModalCat.innerHTML = emaphdDataObj.project[index].cat;

        // create modal div - img & store source
        let projModalImg = document.createElement("img");
        projModalImg.className = "img-fluid";
        projModalImg.setAttribute("src","./assets/imgs/emaphd-logo-color.png");

        // create modal div - timeline
        let projModalTimeline = document.createElement("h6");
        projModalTimeline.className = "card-subtitle";
        projModalTimeline.innerText = emaphdDataObj.project[index].time;

        // create modal div - team
        let projModalTeam = document.createElement("h5");
        projModalTeam.className = "card-subtitle";
        projModalTeam.innerText = emaphdDataObj.project[index].team;         

        // create modal div - description 
        let projModalDesc = document.createElement("p");
        projModalDesc.className = "card-text";
        projModalDesc.innerText = emaphdDataObj.project[index].desc;

        // create modal div - ext url
        let projModalExtURL = document.createElement("a");
        projModalExtURL.setAttribute("href", emaphdDataObj.project[index].url);
        projModalExtURL.setAttribute("target", "blank")
        projModalExtURL.innerText = "Visit"

        // > modal-footer
        let projModalFooter = document.createElement("div");
        projModalFooter.className = "modal-footer";        

        // > modal close btn (in footer)
        let projModalCloseBtn = document.createElement("button");
        projModalCloseBtn.setAttribute("type", "button");
        projModalCloseBtn.className = "btn-close";
        projModalCloseBtn.setAttribute("data-bs-dismiss", "modal");
        projModalCloseBtn.setAttribute("aria-label", "close")    

        // append card elements to card
        projCardBody.appendChild(projCardTitle);
        projCardFooter.appendChild(projModalBtn);
        projCardBody.appendChild(projCardFooter);
        projCard.appendChild(projCardImg);
        projCard.appendChild(projCardBody);
        

        // append modal elements to modal
        projModalHeader.appendChild(projModalHeaderTxt);
        projModalBody.appendChild(projModalCat);
        projModalBody.appendChild(projModalImg);
        projModalBody.appendChild(projModalTimeline);
        projModalBody.appendChild(projModalTeam);
        projModalBody.appendChild(projModalDesc);
        projModalBody.appendChild(projModalExtURL);
        projModalFooter.appendChild(projModalCloseBtn);
        
        projModalContent.appendChild(projModalHeader);
        projModalContent.appendChild(projModalBody);
        projModalContent.appendChild(projModalFooter);
        projModalDialog.appendChild(projModalContent);
        projModalDialog.appendChild(projModalContent);
        projModal.appendChild(projModalDialog);



        // append card to col
        projCardCol.appendChild(projCard);

        // append modal to col
        projCardCol.appendChild(projModal);

        // append col to DOM card row
        emaphdProjectCards.append(projCardCol);

    } // return project cards end


// ~*~*~*~ EVENT CARDS RETURN ~*~*~*~
    for (let index = 0; index < emaphdDataObj.event.length; index++) {

    // create card div - column
    let eventCardCol = document.createElement("div");
    eventCardCol.className = "col-sm-6 col-lg-4 mb-4 card event-card-col";

    // ----- create card & elements
    // > create card element & set ID
    let eventCard = document.createElement("div");
    eventCard.setAttribute("id", "card-event-" + emaphdDataObj.event[index].uID);
    eventCard.className = "event-card"

    // > create card div - body
    let eventCardBody = document.createElement("div");

    // > create card div - title
    let eventCardTitle = document.createElement("h5");
    eventCardTitle.className = "card-title";
    eventCardTitle.innerText = emaphdDataObj.event[index].title;

    // > create card img
    let eventCardImg = document.createElement("img");
    eventCardImg.className = "card-img-top";
    eventCardImg.setAttribute("src","./assets/imgs/emaphd-logo-color.png");

    // > card footer
    let eventCardFooter = document.createElement("div");
    eventCardFooter.className = "card-footer-row"

    // > create modal trigger button
    let eventModalBtn = document.createElement("btn");
    eventModalBtn.setAttribute("type", "button");
    eventModalBtn.className = "btn btn-primary"
    eventModalBtn.setAttribute("data-bs-toggle", "modal"); 
    eventModalBtn.setAttribute("data-bs-target", "#modal-event-" + emaphdDataObj.event[index].uid);
    eventModalBtn.innerText = "view"

    // ----- create modal & elements
    // > modal
    let eventModal = document.createElement("div");
    eventModal.className = "modal fade";
    eventModal.setAttribute("id", "modal-proj-" + emaphdDataObj.event[index].uid);
    eventModal.setAttribute("tabindex", "-1");
    eventModal.setAttribute("aria-labelledby", "modalLabel" + emaphdDataObj.event[index].uid);
    eventModal.setAttribute("aria-hidden", "true");         

    // > modal-dialog
    let eventModalDialog = document.createElement("div");
    eventModalDialog.className = "modal-dialog";        

    // > modal-content
    let eventModalContent = document.createElement("div");
    eventModalContent.className = "modal-content";

    // > modal-header
    let eventModalHeader = document.createElement("div");
    eventModalHeader.className = "modal-header";

    // > modal-header-h1
    let eventModalHeaderTxt = document.createElement("h1");
    eventModalHeaderTxt.className = "modal-title fs-5";
    eventModalHeaderTxt.setAttribute("id", "modalLabel" + emaphdDataObj.event[index].uid);
    eventModalHeaderTxt.innerText = emaphdDataObj.event[index].title;

    // > modal-body
    let eventModalBody = document.createElement("div");
    eventModalBody.className = "modal-body";

    // create modal h6 subtitle - event category
    let eventModalCat = document.createElement("h6");
    eventModalCat.className = "modal-subtitle";
    eventModalCat.innerHTML = emaphdDataObj.event[index].cat;

    // create modal h6 subtitle - event type
    let eventModalType = document.createElement("h6");
    eventModalType.className = "modal-subtitle";
    eventModalType.innerHTML = emaphdDataObj.event[index].type;

    // create modal div - img & store source
    let eventModalImg = document.createElement("img");
    eventModalImg.className = "img-fluid";
    eventModalImg.setAttribute("src","./assets/imgs/emaphd-logo-color.png");

    // create modal div - date
    let eventModalDate = document.createElement("h6");
    eventModalDate.className = "card-subtitle";
    eventModalDate.innerText = emaphdDataObj.project[index].date;

    // create modal div - organization
    let eventModalOrg = document.createElement("h5");
    eventModalOrg.className = "card-subtitle";
    eventModalOrg.innerText = emaphdDataObj.event[index].org;
    
    // create modal div - institution
    let eventModalInst = document.createElement("h5");
    eventModalInst.className = "card-subtitle";
    eventModalInst.innerText = emaphdDataObj.event[index].inst;

    // create modal div - location
    let eventModalLoc = document.createElement("h5");
    eventModalLoc.className = "card-subtitle";
    eventModalLoc.innerText = emaphdDataObj.event[index].loc;

    // create modal div - description 
    let eventModalDesc = document.createElement("p");
    eventModalDesc.className = "card-text";
    eventModalDesc.innerText = emaphdDataObj.event[index].desc;

    // create modal div - ext url
    let eventModalExtURL = document.createElement("a");
    eventModalExtURL.setAttribute("href", emaphdDataObj.event[index].url);
    eventModalExtURL.setAttribute("target", "blank")
    eventModalExtURL.innerText = "Visit"

    // > modal-footer
    let eventModalFooter = document.createElement("div");
    eventModalFooter.className = "modal-footer";        

    // > modal close btn (in footer)
    let eventModalCloseBtn = document.createElement("button");
    eventModalCloseBtn.setAttribute("type", "button");
    eventModalCloseBtn.className = "btn-close";
    eventModalCloseBtn.setAttribute("data-bs-dismiss", "modal");
    eventModalCloseBtn.setAttribute("aria-label", "close")
    
    // ----- assemble card & modal:

    // append card elements to card
    eventCardBody.appendChild(eventCardTitle);
    eventCardFooter.appendChild(eventModalBtn);
    eventCardBody.appendChild(eventCardFooter);
    eventCard.appendChild(eventCardImg);
    eventCard.appendChild(eventCardBody);

    // append modal elements to modal
    eventModalHeader.appendChild(eventModalHeaderTxt);
    eventModalBody.appendChild(eventModalCat);
    eventModalBody.appendChild(eventModalType);
    eventModalBody.appendChild(eventModalImg);
    eventModalBody.appendChild(eventModalDate);
    eventModalBody.appendChild(eventModalOrg);
    eventModalBody.appendChild(eventModalInst);
    eventModalBody.appendChild(eventModalLoc);
    eventModalBody.appendChild(eventModalDesc);
    eventModalBody.appendChild(eventModalExtURL);
    eventModalFooter.appendChild(eventModalCloseBtn);

    eventModalContent.appendChild(eventModalHeader);
    eventModalContent.appendChild(eventModalBody);
    eventModalContent.appendChild(eventModalFooter);
    eventModalDialog.appendChild(eventModalContent);
    eventModalDialog.appendChild(eventModalContent);
    eventModal.appendChild(eventModalDialog);

    // append card to col
    eventCardCol.appendChild(eventCard);

    // append modal to col
    eventCardCol.appendChild(eventModal);

    // append col to DOM card row
    emaphdEventCards.append(eventCardCol);

    } // return work cards end








    } // showData end