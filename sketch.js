var rigveda;
var api_url = 'https://sheetlabs.com/IND/rv?sungfor=Agni';

function setup() {
    createCanvas(640, 480);
    
    var input = createInput('animal');
    var button = createButton('submit');
}

async function gotData() {
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
}

gotData();

function draw() {
    background(220);
//    if (rigveda) {
//        var 
//    }
//    
}