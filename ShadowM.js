import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  100,
  10000
);
camera.position.setZ(120);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);

// light
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(40, 20, 10);
pointLight.castShadow = true;
scene.add(pointLight);


// pointLight.shadow.mapSize.width = 512; // default
// pointLight.shadow.mapSize.height = 512; // default
// pointLight.shadow.camera.near = 0.5; // default
// pointLight.shadow.camera.far = 500;

// floor
var geo = new THREE.PlaneGeometry(100, 100, 50, 50);
var mat = new THREE.MeshLambertMaterial({ color: 0xaaffaa });
var floor = new THREE.Mesh(geo, mat);
floor.material.side = THREE.DoubleSide;
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// grid helper
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(100, 25);
scene.add(lightHelper, gridHelper);
scene.add(gridHelper);

const geometry = new THREE.BoxGeometry(10, 10, 10);

const material2 = new THREE.ShadowMaterial({ doubleSided: true});
material2.opacity = 1;
material2.color = new THREE.Color("rgb(4, 158, 244)");
// material2.opacity = 1;
const material3 = new THREE.MeshLambertMaterial({
  color: "rgb(4, 158, 244)",
});

const cube2 = new THREE.Mesh(geometry, material2);
const cube3 = new THREE.Mesh(geometry, material3);


cube2.receiveShadow = true;
//cube2.castShadow = true;
cube3.receiveShadow = true;
cube3.castShadow = true;


cube2.position.set(-10, 5, 0);
cube3.position.set(10, 5, 0);


scene.add(cube2);
scene.add(cube3);




const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}

animate();
