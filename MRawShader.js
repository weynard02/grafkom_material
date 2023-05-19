import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

// Membuat geometri kubus
const geometry = new THREE.BoxBufferGeometry();

// Menulis kode shader dalam bahasa GLSL
const vertexShader = `
    precision mediump float;
    precision mediump int;

    uniform mat4 modelViewMatrix; // optional
    uniform mat4 projectionMatrix; // optional

    attribute vec3 position;
    attribute vec4 color;

    varying vec3 vPosition;
    varying vec4 vColor;

    void main() {
        vPosition = position;
        vColor = color;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    precision mediump float;
    precision mediump int;

    uniform float time;

    varying vec3 vPosition;
    varying vec4 vColor;

    void main() {
        vec4 color = vColor;
        color.r += sin(vPosition.x * 10.0 + time) * 0.5;
        gl_FragColor = color;
    }
`;

// Membuat material dengan menggunakan RawShaderMaterial
const material = new THREE.RawShaderMaterial({
  uniforms: {
    time: { value: 0.0 },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  transparent: true,
});

// Membuat objek mesh dengan geometri dan material
const cube = new THREE.Mesh(geometry, material);

// Menambahkan objek ke scene
scene.add(cube);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const controls = new OrbitControls(camera, renderer.domElement);
// Fungsi animasi
function animate() {
  requestAnimationFrame(animate);

  // Mengubah nilai uniform 'time' setiap frame
  material.uniforms.time.value += 0.01;

  renderer.render(scene, camera);
}

// Memulai animasi
animate();
