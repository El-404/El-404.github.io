//import all the files needed to run threeJS and some extras
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass  } from 'three/addons/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

//for all the elements that hold a 3d model
document.querySelectorAll(`.container3D`).forEach((elem) => {
  //define all the constants
  const WIDTH = elem.dataset.scale != null ? elem.dataset.scale : .5;
  const HEIGHT = elem.dataset.scale != null ? elem.dataset.scale : .5; //width/height ratios
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth * WIDTH/ window.innerHeight * HEIGHT, 0.1, 25);
  const renderer = new THREE.WebGLRenderer({ 
    canvas: elem,
    alpha: true,
    antialias: true,
    precision: "highp"
  });
  const loader = new GLTFLoader();
  const composer = new EffectComposer( renderer ); //post processing
  const renderPass = new RenderPass( scene, camera );
  let objectsToOutline = [];
  const outlinePass = new OutlinePass(window.innerWidth * WIDTH/ window.innerHeight * HEIGHT, scene, camera, objectsToOutline);
  const outputPass = new OutputPass();

  //add the postprocessing effects
  composer.addPass( renderPass );
  composer.addPass( outlinePass );
  composer.addPass( outputPass );

  //get ready to render the model
  let object;
  let toRender = elem.dataset.model;

  //create the lights
  const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
  topLight.position.set(100, 100, 100) //top-left-ish
  topLight.castShadow = true;
  const ambientLight = new THREE.AmbientLight(0x333333, 1);
  ambientLight.castShadow = true;
  scene.add(ambientLight);
  scene.add(topLight);
  if(toRender == "Jackie") {
    const candleLight = new THREE.PointLight(0xFFDD00, 1);
    candleLight.position.set(0, -.5, 0)
    candleLight.castShadow = true;
    scene.add(candleLight);
  }


  outlinePass.renderToScreen = true;
  outlinePass.edgeStrength = 10;
  outlinePass.edgeGlow = 1;
  outlinePass.visibleEdgeColor.set(0x000000);
  outlinePass.hiddenEdgeColor.set(0x000000);
  camera.position.z = (elem.dataset.zoom != null ? elem.dataset.zoom : 2) * (WIDTH/HEIGHT*1.4);
  camera.updateProjectionMatrix();
  composer.setSize(window.innerWidth * WIDTH, window.innerHeight * HEIGHT);
  renderer.setSize(window.innerWidth * WIDTH, window.innerHeight * HEIGHT);


  //load the model (not written by me)
  loader.load(
    `/models/${toRender}.gltf`,
    function (gltf) {
      //If the file is loaded, add it to the scene
      object = gltf.scene;
      object.rotation.x = elem.dataset.rotation != null ? elem.dataset.rotation : .5;
      scene.add(object);
      outlinePass.selectedObjects = (elem.dataset.outline == 0 ? [] : [object]);
    },
    function (xhr) {
      //While it is loading, log the progress
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      //If there is an error, log it
      console.error(error);
    }
  );

  //Render the scene
  function animate() {
    requestAnimationFrame(animate);
    object.rotation.y += 0.005;
    composer.render();
  }

  //Add a listener to the window, so we can resize the window and the camera
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth * WIDTH/ window.innerHeight * HEIGHT;
    camera.updateProjectionMatrix();
    composer.setSize(window.innerWidth * WIDTH, window.innerHeight * HEIGHT);
  });

  //Start the 3D rendering
  animate();
});