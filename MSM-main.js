import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 100, 10000);
camera.position.setZ(120);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfae2e3);

// light
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(0, 20, 30);
scene.add(pointLight);

// helper
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

document.addEventListener('keydown', moveLight);

function moveLight(event) {
  const step = 0.5;
  
  switch (event.code) {
    case 'ArrowUp':
      pointLight.position.z -= step;
      lightHelper.update();
      break;
      
    case 'ArrowDown':
      pointLight.position.z += step;
      lightHelper.update();
      break;
      
    case 'ArrowLeft':
      pointLight.position.x -= step;
      lightHelper.update();
      break;
      
    case 'ArrowRight':
      pointLight.position.x += step;
      lightHelper.update();
      break;

    case 'KeyQ':
      pointLight.position.y += step;
      lightHelper.update();
      break;
    
    case 'KeyA':
      pointLight.position.y -= step;
      lightHelper.update();
      break;

    default:
      break;
  }
}

// geometry
const geometry = new THREE.SphereGeometry(15, 32, 16);

// material
const material = new THREE.MeshStandardMaterial({
    emissive: 0x444444,
    emissiveIntensity: 1.0
}); 

// material.roughness = 0.2;
// material.metalness = 0.5;

// mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    controls.update();
}

animate();