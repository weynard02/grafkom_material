import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 100, 150);
camera.position.setZ(120);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// geometry
const geometry = new THREE.BoxGeometry(20, 20, 20);

// material
const material = new THREE.MeshDepthMaterial();

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