import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Jalankan dengan perintah npm run dev

// Scene
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

//render
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry();
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
const fTone = new THREE.TextureLoader().load("fiveTone.jpg");

const material = new THREE.MeshToonMaterial();
material.color = new THREE.Color(0xdb0065); // Warna hijau
material.gradientMap = fTone;

const cube = new THREE.Mesh(geometry, material);
cube.position.x = 2;

scene.add(cube);
const ico = new THREE.Mesh(icosahedronGeometry, material);

scene.add(ico);
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;

  ico.rotation.x += 0.005;
  ico.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}

animate();
