import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//creating the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const orbitControls = new OrbitControls(camera, renderer.domElement)

//Creating Light
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

//Background
const background = new THREE.TextureLoader().load('skybg.jpg')
scene.background = background;

//Shapes
//sun
const sunGeometry = new THREE.SphereGeometry(7, 32, 16);
const sunTexture = new THREE.TextureLoader().load('suntexture.jpg')
const sunGeometryMaterial = new THREE.MeshStandardMaterial({map: sunTexture})
const sun = new THREE.Mesh(sunGeometry, sunGeometryMaterial)

//earth
const earthGeometry = new THREE.SphereGeometry(6, 32, 16);
const earthTexture = new THREE.TextureLoader().load('earthtexture.jpg');
const earthGeometryMaterial = new THREE.MeshStandardMaterial({map: earthTexture});
const earth = new THREE.Mesh(earthGeometry, earthGeometryMaterial);
scene.add(earth);

earth.position.setZ(30)

//Position of sun
sun.position.x = 17
sun.position.y = 10
scene.add(sun)

//Add random stars
function addStar() {
  const starGeometry = new THREE.TetrahedronGeometry(1, 1, 1);
  const starMaterial = new THREE.MeshBasicMaterial({color: 'white'});
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] =  Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(100).fill().forEach(addStar);

//Infinite animation loop
function animate() {
  requestAnimationFrame(animate);
  //Animating the sun
  sun.rotation.y += 0.01;

  //Orbit Controls
  orbitControls.update();
  renderer.render(scene, camera);
}
animate();