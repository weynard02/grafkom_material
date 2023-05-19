import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Jalankan dengan perintah npm run dev

// Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 10000);
camera.position.setZ(70);

//render
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
// renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


// Geometry
const geometry = new THREE.BoxGeometry(10,10,10);
const edges = new THREE.EdgesGeometry(geometry);

// Material
const material = new THREE.LineDashedMaterial( {
	color: 0xffffff,
	linewidth: 1,
	scale: 1,
	dashSize: 3,
	gapSize: 1,
} );


// Mesh
const cube = new THREE.LineSegments(edges, material);
cube.computeLineDistances();
scene.add(cube);


// Light 
// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.x = 10
// pointLight.position.y = 10
// pointLight.position.z = 10

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);

// scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);
// scene.add(gridHelper);

// Control
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  controls.update();
  
  renderer.render(scene, camera);
}

animate();



