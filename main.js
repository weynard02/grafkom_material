import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Jalankan dengan perintah npm run dev
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry(10,10,10);

// Material
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

const material = new THREE.MeshBasicMaterial({color:0xffffff});
//const material = new THREE.MeshNormalMaterial({color:0xffffff});
//const material = new THREE.MeshStandardMaterial({color:0xffffff});
//const material = new THREE.MeshLambertMaterial({color:0xffffff});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//light (jika dibutuhkan)
const pointLight = new THREE.PointLight(0xffffff, 0.5);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);
// scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();



