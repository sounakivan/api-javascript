//let rigVeda = [];
let suktas = [];
let suktaNums = [];
let deities = [];
let deityNames = [];

let init_url = 'https://sheetlabs.com/IND/rv?';
let mandal_url = '';
let sukta_url = '';
let sungfor_url = '';

let mandal;
let sukta;
let deity;
let button;

let api_url = init_url + mandal_url + sukta_url + sungfor_url;
console.log(api_url)

function setup() {
    createCanvas(640, 480, WEBGL);
     
    mandal = createSelect();
    mandal.position(50,500);
    mandal.size(100,25);
    //there are 10 mandals in the rig veda
    for (i = 0; i < 10; i++) {
        mandal.option(i+1);
    }
    
    mandal.changed(getMandalData);

    sukta = createSelect();
    sukta.id("sukta");
    sukta.position(200,500);
    sukta.size(100,25);
    
    sukta.changed(getSuktaData);
    
    deity = createSelect();
    deity.id("deity");
    deity.position(350,500);
    deity.size(100,25);
    
    button = createButton('generate');
    button.position(525,500);
    button.size(75,45);
    
}

function clearSuktaOptions() {
    suktas.length = 0;
    suktaNums.length = 0;    
	document.getElementById("sukta").innerHTML = null;
    
    clearDeityOptions();
}

function clearDeityOptions() {
    deities.length = 0;
    deityNames.length = 0;    
    document.getElementById("deity").innerHTML = null;
}

function getMandalData() {
    //set mandal_num
    let mandalIndex = mandal.value();
    mandal_url = 'mandal=' + mandalIndex;
    //console.log(mandal_url);
    
    m_url = init_url + mandal_url;
    console.log(m_url);
    
    clearSuktaOptions();
    
    fetch(m_url)
    .then(response => response.json())
    .then(mandalData => updateSuktas(mandalData));
}

function updateSuktas(mandalData) {
    for (i = 0; i < mandalData.length; i++) {
        suktas.push(mandalData[i].sukta);
    }
    suktaNums = [...new Set(suktas)];
    for (j = 0; j < suktaNums.length; j++) {
        sukta.option(suktaNums[j]);
    }
    console.log('there are ' + suktaNums.length + ' suktas');
}

function getSuktaData() {
    let suktaIndex = sukta.value();
    sukta_url = '&sukta=' + suktaIndex;
//    console.log(sukta_url);
    
    s_url = init_url + mandal_url + sukta_url;
    console.log(s_url);
    
    clearDeityOptions();
    
    fetch(s_url)
    .then(response => response.json())
    .then(suktaData => loadSukta(suktaData));
}

function loadSukta(suktaData) {
    for (i = 0; i < suktaData.length; i++) {
        deities.push(suktaData[i].sungfor)
    }
    deityNames = [...new Set(deities)];
    for (j = 0; j < deityNames.length; j++) {
        deity.option(deityNames[j]);
    }
    console.log(suktaData);
}

function draw() {
    background(220);
   
}