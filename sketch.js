rigVeda = [];
suktas = [];

let init_url = 'https://sheetlabs.com/IND/rv?';
let mandal_url = '';
let sukta_url = '';
let sungfor_url = '';

let mandal;
let sukta;
let diety;
let button;

let api_url = init_url + mandal_url + sukta_url + sungfor_url;
console.log(api_url)

function setup() {
    createCanvas(640, 480, WEBGL);
     
    mandal = createSelect();
    mandal.position(50,500);
    mandal.size(100,25);
    for (i = 0; i < 10; i++) {
        mandal.option(i+1);
    }
    
    mandal.changed(getMandalData);

    sukta = createSelect();
    sukta.position(200,500);
    sukta.size(100,25);
    
    diety = createSelect();
    diety.position(350,500);
    diety.size(100,25);
    
    button = createButton('generate');
    button.position(525,500);
    button.size(75,45);
    
    //button.mousePressed(getVeda);
}

function getMandalData() {
    //set mandal_num
    let m_num = mandal.value();
    mandal_url = 'mandal=' + m_num;
    //console.log(mandal_url);
    
    api_url = init_url + mandal_url + sukta_url + sungfor_url;
    console.log(api_url);
    
    fetch(api_url)
    .then(response => response.json())
    .then(mandalData => loadMandal(mandalData));
}

function loadMandal(mandalData) {
    rigVeda = mandalData;
    console.log(rigVeda);
    
    //clear suktas array
    if (suktas.length != 0) {
        suktas.length = 0
    }
    console.log(suktas.length);
    
    //update suktas
    for (i = 0; i < rigVeda.length; i++) {
        suktas.push(rigVeda[i].sukta);
    }
    let suktaNums = [...new Set(suktas)];
    console.log(suktas.length);
    //console.log(suktaNums);
    
    for (j = 0; j < suktaNums.length; j++) {
        sukta.option(suktaNums[j]);
    }
    console.log(sukta.option.length);

}

//gotData();
//setInterval(gotData, 2000);

function draw() {
    background(220);
    //console.log(rigVeda.length);
   
}