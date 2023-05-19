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

// light
// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.set(0, 20, 30);
// scene.add(pointLight);


// helper
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

// geometry
const geometry = new THREE.BoxGeometry(20, 20, 20);

// texture
const matcapTexture = new THREE.TextureLoader().load("matcap.jpg");

// material
const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
});

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