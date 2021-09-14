var scene1 = new THREE.Scene()
var scene2 = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(new THREE.Color(0.95, 0.95, 0.95), 1)
document.body.appendChild(renderer.domElement)

//add objects to scene1
var geometry = new THREE.BoxGeometry(1, 0.1, 0.1)
var material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
})
var cube1 = new THREE.Mesh(geometry, material)
scene1.add(cube1)

//add objects to scene2
var geometry = new THREE.BoxGeometry(0.15, 0.15, 1.5)
var material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: true,
  opacity: 0.75,
})
var cube2 = new THREE.Mesh(geometry, material)
scene1.add(cube2)

camera.position.z = 2

var animate = function () {
  requestAnimationFrame(animate)

  cube1.rotation.x += 0.01
  cube1.rotation.y += 0.01

  cube2.rotation.x += 0.0025
  cube2.rotation.z += 0.0025

  //render scene1
  renderer.render(scene1, camera)

  //don't let renderer eraase canvas
  renderer.autoClear = false

  //render scene2
  renderer.render(scene2, camera)

  //let renderer clean next time
  // (next time is when we render scene1 again)
  renderer.autoClear = true
}

animate()
