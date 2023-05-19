import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Buat shader code
const vertexShader = `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

const fragmentShader = `
        uniform float time;

        void main() {
          // Menggunakan uniform value time dalam fragment shader
          // Contoh penggunaan:
          // float pulsatingValue = sin(time);
          vec3 color = vec3(sin(time), cos(time), 0.5);
          gl_FragColor = vec4(color, 1.0);
        }
      `;

// Buat material dengan ShaderMaterial
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    time: { value: 0.0 }, // Contoh uniform value time
  },
});

const scene = new THREE.Scene();
// white background
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // Update uniform value time
  material.uniforms.time.value += 0.01;

  renderer.render(scene, camera);
}

animate();
