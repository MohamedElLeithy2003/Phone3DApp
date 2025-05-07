const viewer = document.getElementById('samsungModel');
let spotlightOn = false;

viewer.addEventListener('load', () => {
  console.log('Model loaded');
  console.log('Available Animations:', viewer.availableAnimations);
});

document.getElementById('phoneMove').onclick = () => {
  const animations = viewer.availableAnimations;
  if (animations.includes('PhoneMovement')) {
    console.log('Playing PhoneMovement animation...');
    viewer.play({ animationName: 'PhoneMovement' });
  } else {
    console.log('PhoneMovement animation not found.');
  }
};

document.getElementById('stopAnimation').onclick = () => {
  viewer.pause();
  viewer.currentTime = 0;
  console.log('Animation paused.');
}

function toggleWireframe() {
  if (viewer) {
    const sceneSym = Object.getOwnPropertySymbols(viewer).find(s => s.description === 'scene');
    const scene = viewer[sceneSym];
    if (scene) {
      scene.traverse(node => {
        if (node.material) {
          node.material.wireframe = !node.material.wireframe;
          if (node.material.map) {
            node.material.map = null;
          }
        }
      });
      scene.queueRender();
      console.log('Wireframe mode toggled');
    }
  } else {
    console.log('Viewer element not found!');
  }
}

function toggleSpotlight() {
  spotlightOn = !spotlightOn;
  if (spotlightOn) {
    viewer.exposure = 1.5;
    viewer.shadowIntensity = 1;
    console.log('Spotlight is ON');
  } else {
    viewer.exposure = 0.9;
    viewer.shadowIntensity = 1;
    console.log('Spotlight is OFF');
  }
}

const views = [
  { orbit: "0deg 75deg 2.5m", title: "Front View" },
  { orbit: "90deg 75deg 2.5m", title: "Right Side View" },
  { orbit: "180deg 75deg 2.5m", title: "Back View" },
  { orbit: "0deg 0deg 2.5m", title: "Left Side View" }
];

let currentViewIndex = 0;

function updateCamera(){
  viewer.cameraOrbit = views[currentViewIndex].orbit;
  viewer.fieldOfView = "45deg";
  console.log(`Switched to ${views[currentViewIndex].title}`);
}

window.prevView = function() {
  currentViewIndex = (currentViewIndex - 1 + views.length) % views.length;
  updateCamera();
}

window.nextView = function() {
  currentViewIndex = (currentViewIndex + 1) % views.length;
  updateCamera();
}

document.getElementById('toggleWireframe').onclick = toggleWireframe;
document.getElementById('toggleSpotlight').onclick = toggleSpotlight;

let modelData = [];

function loadModelDescription(){
  fetch('models.json')
    .then(response => response.json())
    .then(data => {
      modelData = data.models; 
      console.log('Loaded Models:', modelData);
    })
    .catch(error => console.error('Error loading JSON:', error));
}

function showDescription() {
  const modelName = "Samsung Galaxy S25 Ultra";
  console.log('Looking for model name:', modelName);
  console.log('Available models:', modelData.map(m => m.name));

  const modelInfo = modelData.find(m => m.name.toLowerCase() === modelName.toLowerCase());
  const descbox = document.getElementById('descriptionBox');

  if (modelInfo){
    descbox.innerText = modelInfo.description;
  } else {
    descbox.innerText = 'Description not found.';
  }
}

window.showDescription = showDescription;

function resetCamera() {
  viewer.cameraOrbit = "0deg 75deg 2.5m";
  viewer.fieldOfView = "45deg";
  console.log('Camera reset to default position');
}

window.resetCamera = resetCamera;

window.onload = loadModelDescription;