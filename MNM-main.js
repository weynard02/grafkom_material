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
renderer.setClearColor(0x000000);

// geometry
const geometry = new THREE.BoxGeometry(20, 20, 20);
// const geometry = new THREE.SphereGeometry( 15, 20, 20 ); 

// material
const material = new THREE.MeshNormalMaterial();

// mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// controls
const controls = new OrbitControls(camera, renderer.domElement);

// Boolean variable to control animation
let isAnimationRunning = true;

// Event listener for the spacebar keydown event
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    isAnimationRunning = !isAnimationRunning; // Toggle the animation state
  }
});

function animate() {
    if(isAnimationRunning) {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    controls.update();
}

animate();