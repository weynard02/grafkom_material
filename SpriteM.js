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

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(40, 20, 10);
pointLight.castShadow = true;
scene.add(pointLight);
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

pointLight.shadow.mapSize.width = 512; // default
pointLight.shadow.mapSize.height = 512; // default
pointLight.shadow.camera.near = 0.5; // default
pointLight.shadow.camera.far = 500;

var geo = new THREE.PlaneGeometry(100, 100, 50, 50);
var mat = new THREE.MeshLambertMaterial({ color: 0xaaffaa });
var floor = new THREE.Mesh(geo, mat);
floor.material.side = THREE.DoubleSide;
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(100, 25);
scene.add(lightHelper, gridHelper);
scene.add(gridHelper);

const geometry = new THREE.BoxGeometry(10, 10, 10);

const matcapTexture = new THREE.TextureLoader().load("matcap.png");
// var alphaTex = new THREE.TextureLoader().load("alpha-Mask.png");
// var colorTex = new THREE.TextureLoader().load('https://i.postimg.cc/nrzgvqxk/siurana.jpg');
// red hex color = 0xff0000
const material1 = new THREE.MeshDepthMaterial();
const material2 = new THREE.ShadowMaterial();
material2.opacity = 0.5;
material2.color = new THREE.Color("rgb(4, 158, 244)");
// material2.opacity = 1;
const material3 = new THREE.MeshLambertMaterial({
  color: "rgb(4, 158, 244)",
});
const material4 = new THREE.MeshMatcapMaterial({
  color: "rgb(4, 158, 244)",
  matcap: matcapTexture,
});
const textureLoader = new THREE.TextureLoader();
const spriteTexture = textureLoader.load("sweater.png");
const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture });
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(20, 20, 1);
// rotate the sprite so that it faces the camera
sprite.position.set(0, 10, 0);
sprite.rotation.x = Math.PI / 2;

scene.add(sprite);

const cube1 = new THREE.Mesh(geometry, material1);
const cube2 = new THREE.Mesh(geometry, material2);
const cube3 = new THREE.Mesh(geometry, material3);
const cube4 = new THREE.Mesh(geometry, material4);
cube1.receiveShadow = true;
cube1.castShadow = true;
cube2.receiveShadow = true;
// cube2.castShadow = true;
cube3.receiveShadow = true;
cube3.castShadow = true;
cube4.receiveShadow = true;
cube4.castShadow = true;
cube1.position.set(-30, 5, 0);
cube2.position.set(-10, 5, 0);
cube3.position.set(10, 5, 0);
cube4.position.set(30, 5, 0);
// scene.add(cube1);
// scene.add(cube2);
// scene.add(cube3);
// scene.add(cube4);

// pointLight.shadow.camera.lookAt(0, 0, 0);
// cube2.customDistanceMaterial = new THREE.MeshDistanceMaterial({
//   alphaMap: alphaTex,
//   alphaTest: 0.5
// });

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  // cube1.rotation.x += 0.01;
  // cube1.rotation.y += 0.01;
  // cube2.rotation.x += 0.01;
  // cube2.rotation.y += 0.01;
  // cube3.rotation.x += 0.01;
  // cube3.rotation.y += 0.01;
  // cube4.rotation.x += 0.01;
  // cube4.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}

animate();
