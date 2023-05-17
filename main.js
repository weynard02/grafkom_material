import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Jalankan dengan perintah npm run dev
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 10000);
camera.position.setZ(120);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
// renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);


renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry(10,10,10);
// const edges = new THREE.EdgesGeometry(geometry);

const material = new THREE.MeshBasicMaterial({color: 0xffffff});
//const material = new THREE.MeshNormalMaterial({color:0xffffff});
//const material = new THREE.MeshStandardMaterial({color:0xffffff});
//const material = new THREE.MeshLambertMaterial({color:0xffffff});
//const material = new THREE.MeshDistanceMaterial();

// const material = new THREE.LineBasicMaterial( {
// 	color: 0xffffff,
// 	linewidth: 1,
// 	linecap: 'round', //ignored by WebGLRenderer
// 	linejoin:  'round' //ignored by WebGLRenderer
// } );

// const material = new THREE.LineDashedMaterial( {
// 	color: 0xffffff,
// 	linewidth: 1,
// 	scale: 1,
// 	dashSize: 3,
// 	gapSize: 1,
// } );

const cube = new THREE.Mesh(geometry, material);
// const cube = new THREE.LineSegments(edges, material);
// const cube = new THREE.LineSegments(edges, material);
// cube.computeLineDistances();
scene.add(cube);



//light (jika dibutuhkan)
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 10
pointLight.position.y = 10
pointLight.position.z = 10

const ambientLight = new THREE.AmbientLight(0xffffff, 1);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);
// scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  controls.update();
  
  renderer.render(scene, camera);
}

animate();



