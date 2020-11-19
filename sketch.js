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

//UI and DOM elements
let mandalSelect;
let suktaSelect;
let deitySelect;
let sungforName;
let sungbyName;

//visuals & animation
let mandalSpheres = [];
let suktaBoxes = [];
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
    
    pixelDensity(1);
    
    uibox = createDiv();
    uibox.id('uibox');
    uibox.size(800,100);
    
    mandalText = createP('Select Mandal (Book):');
    mandalText.position(50,580);
    mandalSelect = createSelect();
    mandalSelect.position(50,620);
    mandalSelect.size(150,25);
    mandalSelect.option('None');
    //there are 10 mandals in the rig veda
    for (i = 0; i < 10; i++) {
        mandalSelect.option(i+1);
    }
    
    mandalSelect.changed(getMandalData);

    suktaText = createP('Select Sukta (Hymn):');
    suktaText.position(300,580);
    suktaSelect = createSelect();
    suktaSelect.id("sukta");
    suktaSelect.position(300,620);
    suktaSelect.size(150,25);
    suktaSelect.option('None');
    
    suktaSelect.changed(getSuktaData);
    
    deityText = createP('Who is it sung for:');
    deityText.position(550,580);
    deitySelect = createSelect();
    deitySelect.id("deity");
    deitySelect.position(550,620);
    deitySelect.size(150,25);
    deitySelect.option('None');
    
    deitySelect.changed(displayNameData);
    
    sungforName = createP('');
    sungforName.id('for-name');
    sungforName.position(width/2-20, 120);
}

function clearSuktaOptions() {
    mandalSpheres.length = 0;
    
    suktas.length = 0;
    suktaNums.length = 0;    
	document.getElementById("sukta").innerHTML = null;
    suktaSelect.option('None');
    
    clearDeityOptions();
}

function clearDeityOptions() {
    suktaBoxes.length = 0;
    
    document.getElementById("for-name").textContent = '';
    
    deities.length = 0;
    deityNames.length = 0;    
    document.getElementById("deity").innerHTML = null;
    deitySelect.option('None');
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
    
    //generate spheres based on mandal number
    for (i = 0; i < mandalIndex; i++) {
        mandalSpheres.push({
            size: random(25,40),
            rotY: random(0.1, 0.8),
            transX: i * 100,
            transY: 0,
            transZ: 0,
            clr: color(random(80,255), random(80,255), random(80,255))
        });
    }
    //console.log(mandalSpheres);
}

function updateSuktas(mandalData) {
    for (i = 0; i < mandalData.length; i++) {
        suktas.push(mandalData[i].sukta);
    }
    suktaNums = [...new Set(suktas)];
    for (j = 0; j < suktaNums.length; j++) {
        suktaSelect.option(suktaNums[j]);
    }
    console.log('there are ' + suktaNums.length + ' suktas');
}

function getSuktaData() {
    let suktaIndex = suktaSelect.selected();
    sukta_url = '&sukta=' + suktaIndex;
//    console.log(sukta_url);
    
    s_url = init_url + mandal_url + sukta_url;
    console.log(s_url);
    
    clearDeityOptions();
    
    fetch(s_url)
    .then(response => response.json())
    .then(suktaData => loadSukta(suktaData));
    
    //generate boxes based on sukta number
    for (i = 0; i < suktaIndex; i++) {
        suktaBoxes.push({
            w: random(20,70),
            h: random(20,70),
            d: random(20,70),
            rotY: random(1,3),
            transX: random(-400, 400),
            transY: random(200, 500),
            transZ: random(-400, 400),
            clr: color(random(180,255), random(180,255), random(180,255))
        });
    }
    //console.log(suktaBoxes);
}

function loadSukta(suktaData) {
    for (i = 0; i < suktaData.length; i++) {
        deities.push(suktaData[i].sungfor)
    }
    deityNames = [...new Set(deities)];
    for (j = 0; j < deityNames.length; j++) {
        deitySelect.option(deityNames[j]);
    }
    console.log(suktaData);
}

function displayNameData(){
    sungforName = deitySelect.selected();
    document.getElementById("for-name").textContent = sungforName;
    console.log(sungforName);
}

function draw() {
    background(0);
    camera.lookAt(0, 100, 0);
    camera.setPosition(1400, -500, 0);
    
    //orbitControl();
    
    noStroke();
    ambientLight(50);
    
    //sun
    push();
    translate(0,-300,0);
    emissiveMaterial(255,255,255);
    sphere(100);
    pop();
    
    lightFalloff(2.5,0,0);
    pointLight(255, 255, 200, 0, 0, 0);
    
    for (let m of mandalSpheres) {
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
        stroke(250);
        strokeWeight(5);
        ellipse(0, 0, 2*m.transX+200);
        pop();
    }

    for (let s of suktaBoxes) {
        push();
        specularMaterial(s.clr);
        rotateY(frameCount * s.rotY);
        translate(s.transX, s.transY, s.transZ);
        stroke(255);
        box(s.w, s.h, s.d,);
        pop();
        
    }
    
    //earth
    push();
    translate(0,750,0);
    stroke(0);
    emissiveMaterial(150,200,255,30);
    ellipsoid(1200,600,1200,24,24);
    pop();

}