console.log("index.js is connected")

let emaphdWorkCards = document.getElementById("work-cards-container")

let emaphdGSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTq03Pj3fHhrj8GOFsZwkabEJXCZ05RMr44B2ZYQlUAknrKxL-vxQrLI9toXevjUCTww3iJa1O1bWUc/pub?gid=0&single=true&output=csv";

let emaphdDataObj = {
    "project" : {},
    "event" : {}
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
    
    for (let index = 0; index < rawData.length; index++) {
/* 
       function isProject(filteredData) {
            return filteredData[index].projEventSelect === "Project";            
        };
        emaphdDataObj.project = rawData.filter(isProject);
        console.log(emaphdDataObj.project);
        console.log(emaphdDataObj);
 */


        if (rawData[index].projEventSelect === "Project") {

            console.log("in the project space")
            
                 emaphdDataObj.project[index].push({

                    "uid" : rawData[index].uID,
                    "utype" : rawData[index].projEventSelect,
                    "title" : rawData[index].projTitle,
                    "cat" : rawData[index].projCat,
                    "imgID" : rawData[index].projImgID,
                    "time" : rawData[index].projTimeline,
                    "team" : rawData[index].projTeam,
                    "desc" : rawData[index].projDesc,
                    "url" : rawData[index].projExtURL
                    
                });
                
                console.log (emaphdDataObj.project);
             
        } else if (rawData[index].projEventSelect === "Event") {
            console.log("in the event space")

        /*     
            emaphdDataObj.event.push({

                i : {

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
                });
                
                console.log (emaphdDataObj.event[index]);
 */
        }; 

    } // emaphd data return forLoop end

    // return project cards
    for (let index = 0; index < emaphdDataObj.project.length; index++) {
        
        // create card div - column
        let projCardCol = document.createElement("div");
        projCardCol.className = "col-sm-6 col-lg-4 mb-4 card proj-card-col";

        // create card & elements
        // > create card element & set ID
        let projCard = document.createElement("div");
        projCard.setAttribute("id", "card-proj-" + emaphdDataObj.project[index].uID);

        // > create card div - body
        let projCardBody = document.createElement("div");

        // > create card div - title
        let projCardTitle = document.createElement("h5");
        projCardTitle.className = "card-title";
        projCardTitle.innerText = emaphdDataObj.project[index].title;

        // > create card img
        let projCardImg = document.createElement("img");
        projCardImg.className = "card-img-top";
        projCardImg.setAttribute("src","./assets/imgs/" + emaphdDataObj.project[index].imgID + ".png");

        // > card footer
        let projCardFooter = document.createElement("div");
        projCardFooter.className = "card-footer-row"

        // > create modal trigger button
        let projModalBtn = document.createElement("btn");
        projModalBtn.setAttribute("type", "button");
        projModalBtn.className = "btn btn-primary"
        projModalBtn.setAttribute("data-bs-toggle", "modal"); 
        cardModalBtn.setAttribute("data-bs-target", "#modal-proj-" + emaphdDataObj.project[index].uid);
        
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
        projModalImg.setAttribute("src","./assets/imgs/" + emaphdDataObj.project[index].imgID + ".png");

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
        projCardBody.appendChild(projCardBody);
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
        emaphdWorkCards.append(projCardCol);

    } // return work cards end






    } // showData end