let allText;
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                
                
                
            }
        }
    }
    rawFile.send(null);
}

readTextFile('stats.txt')




let atlanticCases = parseFloat( allText.substring(10,18));
let bergenCases = parseFloat( allText.substring(25,31))
let burlingtonCases = parseFloat( allText.substring(44, 50))
let camdenCases = parseFloat( allText.substring(59, 65))
let capemayCases = parseFloat( allText.substring(75, 81))
let cumberlandCases = parseFloat(allText.substring(94,100))
let essexCases = parseFloat( allText.substring(108, 115))
let gloucesterCases = parseFloat( allText.substring(126,132))
let hudsonCases = parseFloat( allText.substring(141, 147))
let hunterdonCases = parseFloat( allText.substring(158, 164))
let mercerCases =  parseFloat( allText.substring(173,179))
let middlesexCases = parseFloat( allText.substring(191, 197))
let monmouthCases = parseFloat( allText.substring(208, 214))
let morrisCases = parseFloat( allText.substring(223, 229))
let oceanCases = parseFloat( allText.substring(237, 243))
let passaicCases = parseFloat( allText.substring(253, 259))
let salemCases = parseFloat( allText.substring(267, 273))
let somersetCases = parseFloat( allText.substring(283, 290))
let sussexCases = parseFloat( allText.substring(298, 304))
let unionCases = parseFloat( allText.substring(312, 318))
let warrenCases = parseFloat( allText.substring(327, 333))

console.log(warrenCases)


//calculates answer
function calcAnswer(){

    //init variables
    let countySelect = document.getElementById('county')
    let ageSelect = document.getElementById('age')
    let smokeSelect = document.getElementById('smoke')
    let asthmaSelect = document.getElementById('asthma')
    let covidSelect = document.getElementById('covid')
    let distancingSelect = document.getElementById('social-distancing')
    let masksSelect = document.getElementById('masks')
    let familySelect = document.getElementById('family')
    let washSelect = document.getElementById('hands')
    let humanInteractionSelect = document.getElementById('human-interaction')
    let patientSelect = document.getElementById('patients')
    let communitySelect = document.getElementById('community')
    let all_answered = true;
    
    let selects = [countySelect, ageSelect, smokeSelect, asthmaSelect, covidSelect, distancingSelect, masksSelect, familySelect, washSelect, humanInteractionSelect, patientSelect, communitySelect]
    
    //checks if all questions are answered
    for(let i=0; i<selects.length; i++){
        if (selects[i].value == 'select' || selects[i].value == ''){
            all_answered = false
        }
    }

    //start the selecting process
    //displays text if something not anwered
    if(!all_answered){
        document.querySelector('.all-answered h1').style.display = 'initial'
    }
    else{
        document.querySelector('.all-answered h1').style.display = 'none'
        let riskCount = 0;
        let deathCount = 0

        //age death risk
        if(ageSelect.value <=2){
            deathCount += 5
        }
        else if(ageSelect.value>2 &&ageSelect.value<=30 ){
            deathCount += 2
        }
        else if(ageSelect.value>30 && ageSelect.value <=50){
            deathCount += 3
        }
        else if(ageSelect.value>50 && ageSelect.value <=70){
            deathCount += 4
        }
        else if(ageSelect.value>70 && ageSelect.value <=90){
            deathCount += 5
        }
        else if(ageSelect.value>90){
            deathCount += 7
        }
        
        //smoke/vape death risk
        switch(smokeSelect.value){
            case 'yes':
                deathCount += 5.5
                break;
            case 'no':
                deathCount += 2
                break;
        }

        //asthma death risk
        switch(asthmaSelect.value){
            case 'yes':
                deathCount += 5
                break;
            case 'no':
                deathCount += 2
                break;
        }



        //pre-contraction risk
        switch(covidSelect.value){
            case 'yes':
                riskCount += 4
                break;
            case 'no':
                riskCount += 5
                break;
        }
        
        //checks how well they were social distancing
        switch(distancingSelect.value){
            case 'very-well':
                riskCount += 2
                break
            case 'well':
                riskCount += 3.5
                break
            case 'not-well':
                riskCount += 6
                break
            case 'very-badly':
                riskCount += 7
                break
        }

        //wearing masks
        switch(masksSelect.value){
            case 'never':
                riskCount += 9
                break
            case 'rarely':
                riskCount += 7
                break
            case 'half':
                riskCount += 5.5
                break
            case 'almost-every':
                riskCount += 4
                break
            case 'every':
                riskCount += 2.5
                break
        }

        //someone in family has covid
        switch(familySelect.value){
            case 'yes':
                riskCount += 9
                break
            case 'no':
                riskCount += 4;
                break
        }

        //how often you wash ur hands
        switch(washSelect.value){
            case 'never':
                riskCount += 8;
                break
            case 'rarely':
                riskCount +=6;
                break

            case 'frequently':
                riskCount +=4;
                break
   
        }

        //job interaaction
        switch(humanInteractionSelect.value){
            case 'yes':
                riskCount += 7
                break
            case 'no':
                riskCount += 3
                break
        }

        //doctor interaction
        switch(patientSelect.value){
            case 'yes':
                riskCount += 10
                break
            case 'no':
                riskCount += 3
                break
        }

        //community trend
        switch(communitySelect.value){
            case 'increasing':
                riskCount += 8
                break
            case 'decreasing':
                riskCount += 3
                break
            case 'stabilizing':
                riskCount += 5
                break
        }
        switch(countySelect.value){
            case 'atlantic':
                if(atlanticCases<=500){
                    riskCount += 3
                }
                else if(atlanticCases > 500 && atlanticCases <= 1000){
                    riskCount += 4
                }
                else if( atlanticCases > 1000 && atlanticCases <= 1500){
                    riskCount += 5
                }
                else if(atlanticCases > 1500 && atlanticCases <= 2000){
                    riskCount += 6
                }
                else if(atlanticCases > 2000 && atlanticCases <= 3000){
                    riskCount += 7
                }
                else if(atlanticCases > 3000){
                    riskCount += 8
                }
                break
            case 'bergen':
                if(bergenCases<=500){
                    riskCount += 3
                }
                else if(bergenCases > 500 && bergenCases <= 1000){
                    riskCount += 4
                }
                else if( bergenCases > 1000 && bergenCases <= 1500){
                    riskCount += 5
                }
                else if(bergenCases > 1500 && bergenCases <= 2000){
                    riskCount += 6
                }
                else if(bergenCases > 2000 && bergenCases <= 3000){
                    riskCount += 7
                }
                else if(bergenCases > 3000){
                    riskCount += 8
                }
                break
            case 'burlington':
                if(burlingtonCases<=500){
                    riskCount += 3
                }
                else if(burlingtonCases > 500 && burlingtonCases <= 1000){
                    riskCount += 4
                }
                else if( burlingtonCases > 1000 && burlingtonCases <= 1500){
                    riskCount += 5
                }
                else if(burlingtonCases > 1500 && burlingtonCases <= 2000){
                    riskCount += 6
                }
                else if(burlingtonCases > 2000 && burlingtonCases <= 3000){
                    riskCount += 7
                }
                else if(burlingtonCases > 3000){
                    riskCount += 8
                }
                break
            case 'camden':
                if(camdenCases<=500){
                    riskCount += 3
                }
                else if(camdenCases > 500 && camdenCases <= 1000){
                    riskCount += 4
                }
                else if( camdenCases > 1000 && camdenCases <= 1500){
                    riskCount += 5
                }
                else if(camdenCases > 1500 && camdenCases <= 2000){
                    riskCount += 6
                }
                else if(camdenCases > 2000 && camdenCases <= 3000){
                    riskCount += 7
                }
                else if(camdenCases > 3000){
                    riskCount += 8
                }
                break
            case 'capemay':
                if(capemayCases<=500){
                    riskCount += 3
                }
                else if(capemayCases > 500 && capemayCases <= 1000){
                    riskCount += 4
                }
                else if( capemayCases > 1000 && capemayCases <= 1500){
                    riskCount += 5
                }
                else if(capemayCases > 1500 && capemayCases <= 2000){
                    riskCount += 6
                }
                else if(capemayCases > 2000 && capemayCases <= 3000){
                    riskCount += 7
                }
                else if(capemayCases > 3000){
                    riskCount += 8
                }
                break
            case 'cumberland':
                if(cumberlandCases<=500){
                    riskCount += 3
                }
                else if(cumberlandCases > 500 && cumberlandCases <= 1000){
                    riskCount += 4
                }
                else if( cumberlandCases > 1000 && cumberlandCases <= 1500){
                    riskCount += 5
                }
                else if(cumberlandCases > 1500 && cumberlandCases <= 2000){
                    riskCount += 6
                    
                }
                else if(cumberlandCases > 2000 && cumberlandCases <= 3000){
                    riskCount += 7
                }
                else if(cumberlandCases > 3000){
                    riskCount += 8
                }
                break
            case 'essex':
                if(essexCases<=500){
                    riskCount += 3
                }
                else if(essexCases > 500 && essexCases <= 1000){
                    riskCount += 4
                }
                else if( essexCases > 1000 && essexCases <= 1500){
                    riskCount += 5
                }
                else if(essexCases > 1500 && essexCases <= 2000){
                    riskCount += 6
                    
                }
                else if(essexCases > 2000 && essexCases <= 3000){
                    riskCount += 7
                }
                else if(essexCases > 3000){
                    riskCount += 8
                }
                break
            case 'gloucester':
                if(gloucesterCases<=500){
                    riskCount += 3
                }
                else if(gloucesterCases > 500 && gloucesterCases <= 1000){
                    riskCount += 4
                }
                else if( gloucesterCases > 1000 && gloucesterCases <= 1500){
                    riskCount += 5
                }
                else if(gloucesterCases > 1500 && gloucesterCases <= 2000){
                    riskCount += 6
                    
                }
                else if(gloucesterCases > 2000 && gloucesterCases<= 3000){
                    riskCount += 7
                }
                else if(gloucesterCases > 3000){
                    riskCount += 8
                }
                break
            case 'hudson':
                if(hudsonCases<=500){
                    riskCount += 3
                }
                else if(hudsonCases > 500 && hudsonCases <= 1000){
                    riskCount += 4
                }
                else if( hudsonCases > 1000 && hudsonCases <= 1500){
                    riskCount += 5
                }
                else if(hudsonCases > 1500 && hudsonCases <= 2000){
                    riskCount += 6
                    
                }
                else if(hudsonCases > 2000 && hudsonCases<= 3000){
                    riskCount += 7
                }
                else if(hudsonCases > 3000){
                    riskCount += 8
                }
                break
            case 'hunterdon':
                if(hunterdonCases<=500){
                    riskCount += 3
                }
                else if(hunterdonCases > 500 && hunterdonCases <= 1000){
                    riskCount += 4
                }
                else if( hunterdonCases > 1000 && hunterdonCases <= 1500){
                    riskCount += 5
                }
                else if(hunterdonCases > 1500 && hunterdonCases <= 2000){
                    riskCount += 6
                    
                }
                else if(hunterdonCases > 2000 && hunterdonCases<= 3000){
                    riskCount += 7
                }
                else if(hunterdonCases > 3000){
                    riskCount += 8
                }
                break
            case 'mercer':
                if(mercerCases<=500){
                    riskCount += 3
                }
                else if(mercerCases > 500 && mercerCases <= 1000){
                    riskCount += 4
                }
                else if( mercerCases > 1000 && mercerCases <= 1500){
                    riskCount += 5
                }
                else if(mercerCases > 1500 && mercerCases <= 2000){
                    riskCount += 6
                    
                }
                else if(mercerCases > 2000 && mercerCases<= 3000){
                    riskCount += 7
                }
                else if(mercerCases > 3000){
                    riskCount += 8
                }
                break
            case 'middlesex':
                if(middlesexCases<=500){
                    riskCount += 3
                }
                else if(middlesexCases > 500 && middlesexCases <= 1000){
                    riskCount += 4
                }
                else if( middlesexCases > 1000 && middlesexCases <= 1500){
                    riskCount += 5
                }
                else if(middlesexCases > 1500 && middlesexCases <= 2000){
                    riskCount += 6
                    
                }
                else if(middlesexCases> 2000 && middlesexCases<= 3000){
                    riskCount += 7
                }
                else if(middlesexCases > 3000){
                    riskCount += 8
                }
                break
            case 'monmouth':
                if(monmouthCases<=500){
                    riskCount += 3
                }
                else if(monmouthCases > 500 && monmouthCases <= 1000){
                    riskCount += 4
                }
                else if( monmouthCases > 1000 && monmouthCases <= 1500){
                    riskCount += 5
                }
                else if(monmouthCases > 1500 && monmouthCases <= 2000){
                    riskCount += 6
                    
                }
                else if(monmouthCases> 2000 && monmouthCases<= 3000){
                    riskCount += 7
                }
                else if(monmouthCases > 3000){
                    riskCount += 8
                }
                break
            case 'morris':
                if(morrisCases<=500){
                    riskCount += 3
                }
                else if(morrisCases > 500 && morrisCases <= 1000){
                    riskCount += 4
                }
                else if( morrisCases > 1000 && morrisCases <= 1500){
                    riskCount += 5
                }
                else if(morrisCases > 1500 && morrisCases <= 2000){
                    riskCount += 6
                    
                }
                else if(morrisCases> 2000 && morrisCases<= 3000){
                    riskCount += 7
                }
                else if(morrisCases > 3000){
                    riskCount += 8
                }
                break
            case 'ocean':
                if(oceanCases<=500){
                    riskCount += 3
                }
                else if(oceanCases > 500 && oceanCases <= 1000){
                    riskCount += 4
                }
                else if( oceanCases > 1000 && oceanCases <= 1500){
                    riskCount += 5
                }
                else if(oceanCases > 1500 && oceanCases <= 2000){
                    riskCount += 6
                    
                }
                else if(oceanCases> 2000 && oceanCases<= 3000){
                    riskCount += 7
                }
                else if(oceanCases > 3000){
                    riskCount += 8
                }
                break
            case 'passaic':
                if(passaicCases<=500){
                    riskCount += 3
                }
                else if(passaicCases > 500 && passaicCases <= 1000){
                    riskCount += 4
                }
                else if( passaicCases > 1000 && passaicCases <= 1500){
                    riskCount += 5
                }
                else if(passaicCases > 1500 && passaicCases <= 2000){
                    riskCount += 6
                    
                }
                else if(passaicCases> 2000 && passaicCases<= 3000){
                    riskCount += 7
                }
                else if(passaicCases > 3000){
                    riskCount += 8
                }
                break
            case 'salem':
                if(salemCases<=500){
                    riskCount += 3
                }
                else if(salemCases > 500 && salemCases <= 1000){
                    riskCount += 4
                }
                else if( salemCases > 1000 && salemCases <= 1500){
                    riskCount += 5
                }
                else if(salemCases > 1500 && salemCases <= 2000){
                    riskCount += 6
                    
                }
                else if(salemCases> 2000 && salemCases<= 3000){
                    riskCount += 7
                }
                else if(salemCases > 3000){
                    riskCount += 8
                }
                break
            case 'somerset':
                if(somersetCases<=500){
                    riskCount += 3
                }
                else if(somersetCases > 500 && somersetCases <= 1000){
                    riskCount += 4
                }
                else if( somersetCases > 1000 && somersetCases <= 1500){
                    riskCount += 5
                }
                else if(somersetCases > 1500 && somersetCases<= 2000){
                    riskCount += 6
                    
                }
                else if(somersetCases> 2000 && somersetCases<= 3000){
                    riskCount += 7
                }
                else if(somersetCases > 3000){
                    riskCount += 8
                }
                break
            case 'sussex':
                if(sussexCases<=500){
                    riskCount += 3
                }
                else if(sussexCases > 500 && sussexCases <= 1000){
                    riskCount += 4
                }
                else if( sussexCases > 1000 && sussexCases <= 1500){
                    riskCount += 5
                }
                else if(sussexCases > 1500 && sussexCases<= 2000){
                    riskCount += 6
                    
                }
                else if(sussexCases> 2000 && sussexCases<= 3000){
                    riskCount += 7
                }
                else if(sussexCases > 3000){
                    riskCount += 8
                }
                break
            case 'union':
                if(unionCases<=500){
                    riskCount += 3
                }
                else if(unionCases > 500 && unionCases <= 1000){
                    riskCount += 4
                }
                else if( unionCases > 1000 && unionCases <= 1500){
                    riskCount += 5
                }
                else if(unionCases > 1500 && unionCases<= 2000){
                    riskCount += 6
                    
                }
                else if(unionCases> 2000 && unionCases<= 3000){
                    riskCount += 7
                }
                else if(unionCases > 3000){
                    riskCount += 8
                }
                break
            case 'warren':
                if(warrenCases<=500){
                    riskCount += 3
                }
                else if(warrenCases > 500 && warrenCases <= 1000){
                    riskCount += 4
                }
                else if( warrenCases > 1000 && warrenCases <= 1500){
                    riskCount += 5
                }
                else if(warrenCases > 1500 && warrenCases<= 2000){
                    riskCount += 6
                    
                }
                else if(warrenCases> 2000 && warrenCases<= 3000){
                    riskCount += 7
                }
                else if(warrenCases > 3000){
                    riskCount += 8
                }
                break
        }

        
        let riskScore = riskCount/8.
        
        let deathScore = (deathCount/3+riskCount/8)/2
        
        

        let riskDocument = document.querySelector('.risk-score')
        let deathDocument = document.querySelector('.death-score')
        let answerDocument = document.querySelector('.answer')

        let riskDiv = document.querySelector('risk-catch')
        let deathDiv = document.querySelector('risk-death')

        

        console.log(riskDocument.textContent)
        riskDocument.textContent = riskScore.toFixed(2) +" / 10"
        deathDocument.textContent = deathScore.toFixed(2) +" / 10"
        console.log(riskDocument.textContent)
        


        
        
        

        

        



    }


    
}
