import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 3);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer(); // render
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
(document.getElementById("demo") || document.body).appendChild(
  renderer.domElement
);
//-------- ----------
// POINTS
//-------- ----------
const geometry = new THREE.SphereGeometry(1, 10, 60);
const pt = new THREE.Points(
  geometry,
  new THREE.PointsMaterial({
    color: 0x00afaf,
    size: 0.05,
  })
);
scene.add(pt);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
