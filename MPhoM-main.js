// Gerakin cahayanya
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 100, 10000);
camera.position.setY(120);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfae2e3);

// light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 20, 0);
scene.add(pointLight);

// helper
const lightHelperMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const lightHelper = new THREE.PointLightHelper(pointLight, 1, lightHelperMaterial);
lightHelper.material.color.set(0x00ff00);
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
const geometry = new THREE.BoxGeometry(40, 1, 40);

// material
const material = new THREE.MeshPhongMaterial({color: 0x222222});
material.shininess = 200;

// mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    controls.update();
}

animate();