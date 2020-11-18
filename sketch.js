//dropdown option arrays
let suktas = [];
let suktaNums = [];
let deities = [];
let deityNames = [];

//for api calls
let init_url = 'https://sheetlabs.com/IND/rv?';
let mandal_url = '';
let sukta_url = '';
let sungfor_url = '';

//UI
let mandalSelect;
let suktaSelect;
let deitySelect;

//visuals & animation
let mandals = [];
let camera;

let api_url = init_url + mandal_url + sukta_url + sungfor_url;
console.log(api_url)

function preload() {
    myFont = loadFont('AllessaPersonalUse-4pRl.ttf')
}

function setup() {
    createCanvas(800, 500, WEBGL);
    camera = createCamera();
    setCamera(camera);
    
    for (i = 0; i < 10; i++) {
        mandals.push({
            size: random(25,40),
            rotY: random(0.1, 0.8),
            transX: i * 100,
            transY: 0,
            transZ: 0,
            clr: color(random(80,255), random(80,255), random(80,255))
        });
    }
    
    mandalText = createP('Select Mandal (Book):');
    mandalText.position(50,510);
    mandalSelect = createSelect();
    mandalSelect.position(50,550);
    mandalSelect.size(150,25);
    //there are 10 mandals in the rig veda
    for (i = 0; i < 10; i++) {
        mandalSelect.option(i+1);
    }
    
    mandalSelect.changed(getMandalData);

    suktaText = createP('Select Sukta (Hymn):');
    suktaText.position(300,510);
    suktaSelect = createSelect();
    suktaSelect.id("sukta");
    suktaSelect.position(300,550);
    suktaSelect.size(150,25);
    
    suktaSelect.changed(getSuktaData);
    
    deityText = createP('Who is it sung for:');
    deityText.position(550,510);
    deitySelect = createSelect();
    deitySelect.id("deity");
    deitySelect.position(550,550);
    deitySelect.size(150,25);
    
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
    let mandalIndex = mandalSelect.value();
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
    let suktaIndex = suktaSelect.value();
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
    background(0);
    camera.lookAt(0, 0, 0);
    camera.setPosition(1600, -800, 0);
    
    noStroke();
    //orbitControl();
    ambientLight(50);
    
    //sun
    emissiveMaterial(255,255,250);
    sphere(50);
    lightFalloff(3,0,0);
    pointLight(255, 255, 200, 0, 0, 0);
    
    for (let m of mandals) {
        push();
        specularMaterial(m.clr);
        rotateY(frameCount * m.rotY)
        translate(100 + m.transX, m.transY, 0)
        sphere(m.size);
        pop();
        
        push();
        angleMode(DEGREES);
        rotateX(90);
        noFill();
        stroke(100);
        ellipse(0, 0, 2*m.transX+200);
        pop();
    }
    

}