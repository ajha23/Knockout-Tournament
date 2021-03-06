/*-------List of Supported Team size For Tournament------*/
let knownTeamSize = [2, 4, 8, 16, 32]

/*------Entry point of the Tournament------------ */
function addTeam() {

    var teamSize = parseInt(prompt('Number of teams :', 32));

    if (!isNaN(teamSize) && knownTeamSize.includes(teamSize)) // Checking if team size is number only and ensure its included in supported Team Size.
        findWinner(teamSize);
    else
        alert('The Team size you specified is not currently supported.');
}


/*-------Main function that create round and their winner  ----------*/
function findWinner(teamSize) {
    let eachGroupSize = teamSize / 2,

        groupA = randomGroupGenerator(Data, eachGroupSize), // Randomly picking teams from Team data and generating Group-A
        groupB = randomGroupGenerator(Data, eachGroupSize, groupA);// Randomly picking teams from Team data and generating Group-B, Here groupA list is passed to ensure that the randomly picked team for Group-B is not included in Group-A.

    listRenderer(groupA, "groupA", "Group- A");// Rendering Group-A
    listRenderer(groupB, "groupB", "Group- B"); // Rendering Group-B
    roundrenderer(eachGroupSize, groupA, groupB);// Calling roundrenderer to render each round of both groups.

}

/*------- roundrenderer function used for rendering each round of tournament---------*/
async function roundrenderer(eachGroupSize, groupA, groupB) {
    let round = NumberOfRound(eachGroupSize),
        level = 1;

    while (1 < round) {
        let listA = await playingRoundMatch(groupA), //Generating Winner of each round of Group-A.
            listB = await playingRoundMatch(groupB); //Generating Winner of each round of Group-B.

        listRenderer(listA, "groupA", level); // calling grouprenderer to render list of winner of each round of Group-A.
        listRenderer(listB, "groupB", level); // calling grouprenderer to render list of winner of each round of Group-B.
        groupA = listA; //assinging winner of previous round to input list of next round of Group-A.
        groupB = listB; //assinging winner of previous round to input list of next round of Group-B.
        round--;
        level++;
    }

    let listA = await playingRoundMatch(groupA.concat(groupB));
    listRenderer(listA, "winner", "Final");
    let champion = await playingRoundMatch(listA);
    listRenderer(champion, "winner", "Winner !!!");
}


/*----------Give Winner list after match Time   -----------*/
function playingRoundMatch(playingGroup) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getWinnerTeam(playingGroup));
        }, 1000) // <---Match Time.
    });

}

/*-------This Function Used for rendering list of winner of each round on UI-------*/

function listRenderer(roundlist, divId, ht) {
    let header = document.createElement("H1"), // Creat H1 node to append header of each round
        headerText = isNaN(ht) ? ht : "Round-" + ht,
        tn = document.createTextNode(headerText), // Creat text node for header
        ol = document.createElement("ol"); //Creat ol Node.
    if (divId === "winner") {
        ol.className = "animate-top";
    } else {
        ol.className = divId === "groupA" ? "animate-left" : "animate-right"
    }

    ol.appendChild(header.appendChild(tn));// Appending text node to h1 node and appending that to ol node.
    roundlist.forEach(element => {

        let li = document.createElement("li"); //Creat li node.
        li.innerText = element.teamName // + ", " + element.location;
        ol.appendChild(li); // Append each li to ol node.

    });
   
    document.getElementById(divId).appendChild(ol); // Appending group list as child node to group div(ex-groupA,winner,groupB).
    
}

/*-------Round Generater-------*/

function NumberOfRound(eachGroupSize) {
    let round = 0;

    while (eachGroupSize > 1) {
        eachGroupSize = eachGroupSize / 2;        //Number of round that both group will play
        round++
    }

    return round;

}

/*------getWinnerTeam Function accept Array of Teams for given group and return array of winner Teams--------*/

function getWinnerTeam(group) {
    let NumberofMatch = group.length / 2,
        winnerTeamList = [],
        teamPair = [];

    for (let i = 0; i < NumberofMatch; i++) {

        let team = randomGroupGenerator(group, 2, teamPair);  // creating pair of two random team from group for match
        winnerTeamList = winnerTeamList.concat(randomGroupGenerator(team, 1)); // Generating winner team randomly from given two teams
        teamPair = teamPair.concat(team);

    }

    return winnerTeamList; // Returning list of winners from group who will play in next round
}



/*----randomGroupGenerator Function is expecting Teams data array,
size of group and array of teams data that is previously chosed  randomly from parent list
and return generate list of teams by chosing random team from current given team list------*/
function randomGroupGenerator(currentArr, groupSize, nextArr = []) {
    let group = [], i = 0;

    while (i < groupSize) {
        let randomTeam = currentArr[Math.floor(Math.random() * currentArr.length)], // Randomly Picking team from given team list
            notInnext = !nextArr.map(item => item.teamId).includes(randomTeam.teamId), // if user pass nextArray than checking that randomly picked team is available in nextArray or not to verify that team available in nextArray won't be picked
            notIngroup = !group.map(item => item.teamId).includes(randomTeam.teamId),// Checking if picked team is already in current list or not 
            val = nextArr.length > 0 ? notInnext && notIngroup : notIngroup;

        if (val) {
            group.push(randomTeam);
            i++;

        }

    }
    return group  // Returning list of new randomly picked team from given group.
}


/*-------Teams Data-----*/
let Data = [
    {
        "teamId": 1610612730,
        "abbreviation": "NJD",
        "teamName": "New Jersey Devils",
        "simpleName": "Devils",
        "location": "New Jersey"
    },
    {
        "teamId": 1610612731,
        "abbreviation": "MOW",
        "teamName": "Montreal Wanderers",
        "simpleName": "Wanderers",
        "location": "Montreal"
    },
    {
        "teamId": 1610612737,
        "abbreviation": "ATL",
        "teamName": "Atlanta Hawks",
        "simpleName": "Hawks",
        "location": "Atlanta"
    },
    {
        "teamId": 1610612738,
        "abbreviation": "BOS",
        "teamName": "Boston Celtics",
        "simpleName": "Celtics",
        "location": "Boston"
    },
    {
        "teamId": 1610612751,
        "abbreviation": "BKN",
        "teamName": "Brooklyn Nets",
        "simpleName": "Nets",
        "location": "Brooklyn"
    },
    {
        "teamId": 1610612766,
        "abbreviation": "CHA",
        "teamName": "Charlotte Hornets",
        "simpleName": "Hornets",
        "location": "Charlotte"
    },
    {
        "teamId": 1610612741,
        "abbreviation": "CHI",
        "teamName": "Chicago Bolls",
        "location": "Chicago"
    },
    {
        "teamId": 1610612739,
        "abbreviation": "CLE",
        "teamName": "Cleveland Cavaliers",
        "simpleName": "Cavaliers",
        "location": "Cleveland"
    },
    {
        "teamId": 1610612742,
        "abbreviation": "DAL",
        "teamName": "Dallas Mavericks",
        "simpleName": "Mavericks",
        "location": "Dallas"
    },
    {
        "teamId": 1610612743,
        "abbreviation": "DEN",
        "teamName": "Denver Nuggets",
        "simpleName": "Nuggets",
        "location": "Denver"
    },
    {
        "teamId": 1610612765,
        "abbreviation": "DET",
        "teamName": "Detroit Pistons",
        "simpleName": "Pistons",
        "location": "Detroit"
    },
    {
        "teamId": 1610612744,
        "abbreviation": "GSW",
        "teamName": "Golden State Warriors",
        "simpleName": "Warriors",
        "location": "Golden State"
    },
    {
        "teamId": 1610612745,
        "abbreviation": "HOU",
        "teamName": "Houston Rockets",
        "simpleName": "Rockets",
        "location": "Houston"
    },
    {
        "teamId": 1610612754,
        "abbreviation": "IND",
        "teamName": "Indiana Pacers",
        "simpleName": "Pacers",
        "location": "Indiana"
    },
    {
        "teamId": 1610612746,
        "abbreviation": "LAC",
        "teamName": "Los Angeles Clippers",
        "simpleName": "Clippers",
        "location": "Los Angeles"
    },
    {
        "teamId": 1610612747,
        "abbreviation": "LAL",
        "teamName": "Los Angeles Lakers",
        "simpleName": "Lakers",
        "location": "Los Angeles"
    },
    {
        "teamId": 1610612763,
        "abbreviation": "MEM",
        "teamName": "Memphis Grizzlies",
        "simpleName": "Grizzlies",
        "location": "Memphis"
    },
    {
        "teamId": 1610612748,
        "abbreviation": "MIA",
        "teamName": "Miami Heat",
        "simpleName": "Heat",
        "location": "Miami"
    },
    {
        "teamId": 1610612749,
        "abbreviation": "MIL",
        "teamName": "Milwaukee Bucks",
        "simpleName": "Bucks",
        "location": "Milwaukee"
    },
    {
        "teamId": 1610612750,
        "abbreviation": "MIN",
        "teamName": "Minnesota Timberwolves",
        "simpleName": "Timberwolves",
        "location": "Minnesota"
    },
    {
        "teamId": 1610612740,
        "abbreviation": "NOP",
        "teamName": "New Orleans Pelicans",
        "simpleName": "Pelicans",
        "location": "New Orleans"
    },
    {
        "teamId": 1610612752,
        "abbreviation": "NYK",
        "teamName": "New York Knicks",
        "simpleName": "Knicks",
        "location": "New York"
    },
    {
        "teamId": 1610612760,
        "abbreviation": "OKC",
        "teamName": "Oklahoma City Thunder",
        "simpleName": "Thunder",
        "location": "Oklahoma City"
    },
    {
        "teamId": 1610612753,
        "abbreviation": "ORL",
        "teamName": "Orlando Magic",
        "simpleName": "Magic",
        "location": "Orlando"
    },
    {
        "teamId": 1610612755,
        "abbreviation": "PHI",
        "teamName": "Philadelphia 76ers",
        "simpleName": "76ers",
        "location": "Philadelphia"
    },
    {
        "teamId": 1610612756,
        "abbreviation": "PHX",
        "teamName": "Phoenix Suns",
        "simpleName": "Suns",
        "location": "Phoenix"
    },
    {
        "teamId": 1610612757,
        "abbreviation": "POR",
        "teamName": "Portland Trail Blazers",
        "simpleName": "Trail Blazers",
        "location": "Portland"
    },
    {
        "teamId": 1610612758,
        "abbreviation": "SAC",
        "teamName": "Sacramento Kings",
        "simpleName": "Kings",
        "location": "Sacramento"
    },
    {
        "teamId": 1610612759,
        "abbreviation": "SAS",
        "teamName": "San Antonio Spurs",
        "simpleName": "Spurs",
        "location": "San Antonio"
    },
    {
        "teamId": 1610612761,
        "abbreviation": "TOR",
        "teamName": "Toronto Raptors",
        "simpleName": "Raptors",
        "location": "Toronto"
    },
    {
        "teamId": 1610612762,
        "abbreviation": "UTA",
        "teamName": "Utah Jazz",
        "simpleName": "Jazz",
        "location": "Utah"
    },
    {
        "teamId": 1610612764,
        "abbreviation": "WAS",
        "teamName": "Washington Wizards",
        "simpleName": "Wizards",
        "location": "Washington"
    }
];