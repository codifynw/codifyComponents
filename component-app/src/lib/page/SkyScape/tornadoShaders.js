/*
	Three.js "TornadoVR"
	Author: Rodolfo Aramayo
	Date: May 2016
 */

import { vertexShaderCell } from './static/models/shader/fragment_shaderCell.glsl'

// MAIN

// standard global variables
var container, scene, camera, renderer, effect, controls, stats
// var keyboard = new THREEx.KeyboardState()
var clock = new THREE.Clock()

// custom global variables
var lastFrameTime = new Date().getTime() / 1000
var totalGameTime = 0
var dt
var currTime

var particles = []
var mesh
//global physics properties
var B = new THREE.Vector3(0, 0.01, 0) //magnetic field
var G = new THREE.Vector3(0.0, -0.001, 0.0)
var Gravity = new THREE.Vector3(0.0, 0.01, 0.0)

//particle properties
var S = new THREE.Vector3(100, 0, 100) //position
var V = new THREE.Vector3(0.0, 0.1, 0.1) //velocity
var M = 1 //mass
var mesh_falling = false
var mesh_raising = true
var mesh_height = 5

var tornadoTexture
var tornadoGeometry
var tornadoMaterial

var deviceOrientation = false

var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2

var uniforms1, uniforms2

var deviceOrientationFieldParam = getUrlVars()['deviceOrientation']
if (
  typeof deviceOrientationFieldParam !== 'undefined' &&
  deviceOrientationFieldParam != 'undefined'
) {
  deviceOrientation = true
}

function getUrlVars() {
  var vars = {}
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value
  })
  return vars
}

init()
animate()
$('body').scrollTop(1)

// FUNCTIONS
function init() {
  particleOptions = {
    particleCount: 1000,
    deltaTime: 500,
    betaX: 0.0,
    betaY: 0.01,
    betaZ: 0.0,
    GX: 0.0,
    GY: 0.001,
    GZ: 0.0,
    gravity: 0.01,
    betaLiftChaos: 10,
    height: 750,
    heightChaos: 250,
    tornadoFactor: 25,
    instantRespawn: false,
    tracer: false,
  }

  uniforms1 = {
    time: { type: 'f', value: 1.0 },
    resolution: { type: 'v2', value: new THREE.Vector2() },
  }
  uniforms2 = {
    time: { type: 'f', value: 1.0 },
    resolution: { type: 'v2', value: new THREE.Vector2() },
    texture: { type: 't', value: new THREE.TextureLoader().load('img/disturb.jpg') },
  }
  uniforms2.texture.value.wrapS = uniforms2.texture.value.wrapT = THREE.RepeatWrapping
  uniforms3 = {
    uDirLightPos: { type: 'v3', value: new THREE.Vector3(1, 0, 0) },
    uDirLightColor: { type: 'c', value: new THREE.Color(0xeeeeee) },
    uAmbientLightColor: { type: 'c', value: new THREE.Color(0x050505) },
    uBaseColor: { type: 'c', value: new THREE.Color(0xff0000) },
  }

  rebuildParticles()

  //   var gui = new dat.GUI()

  particleOptions = {
    particleCount: 1000,
    deltaTime: 485,
    gravity: 0.01,
    height: 500,
    heightChaos: 300,
    instantRespawn: false,
    tracer: false,
    betaX: 0,
    betaY: 0.01,
    betaZ: 0,
    GX: 0,
    GY: 0.005,
    GZ: 0,
    tornadoFactor: 12,
    betaLiftChaos: 1,
  }

  //   window.addEventListener('resize', onWindowResize, false)
}

function rebuildParticles() {
  console.log('rebuildParticles' + scene.children)

  B.x = particleOptions.betaX
  B.y = particleOptions.betaY
  B.z = particleOptions.betaZ

  G.x = -particleOptions.GX
  G.y = -particleOptions.GY
  G.z = -particleOptions.GZ
  //   Cody - test this later
  //   material = new THREE.MeshLambertMaterial({ color: 0xffff00 })

  material = new THREE.ShaderMaterial({
    uniforms: 'fragment_shaderCell',
    vertexShader: vertexShader,
    fragmentShader: vertexShaderCell,
  })

  //remove all particles meshes from the scene

  var children = scene.children
  for (var i = children.length - 1; i >= 0; i--) {
    var child = children[i]
    if (child.isParticle) {
      scene.remove(child)
    }
  }

  particles = []

  for (var i = 0; i < particleOptions.particleCount; i++) {
    mesh = new THREE.Mesh(geometry, material) //THREEx.Crates.createCrate1();   //
    mesh.position.set(
      -500 + Math.floor(Math.random() * 1000 + 1),
      5,
      -500 + Math.floor(Math.random() * 1000 + 1)
    )
    scene.add(mesh)
    mesh.S = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z) //position
    mesh.V = new THREE.Vector3(0.0, 0.1, 0.1) //Math.floor((Math.random() * 1))-0.5,Math.floor((Math.random() * 1))-0.5); //velocity
    mesh.M = 1 //mass
    mesh.mesh_falling = true
    mesh.mesh_raising = false
    mesh.isParticle = true
    mesh.topCutOff =
      particleOptions.height + Math.floor(Math.random() * particleOptions.heightChaos + 1)
    //G is the raising velocity and makes a great tornado when its randomness is varied
    //tempG just holds individual values for each particle
    mesh.tempG = new THREE.Vector3(
      G.x,
      G.y -
        Math.floor(
          Math.random() * particleOptions.betaLiftChaos - particleOptions.betaLiftChaos / 2.0
        ) *
          0.0001,
      G.z
    ) // -.001
    particles.push(mesh)
  }
}

// function onWindowResize() {
//   windowHalfX = window.innerWidth / 2
//   windowHalfY = window.innerHeight / 2

//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()

//   if (deviceOrientation) {
//   } else {
//     // *** OTHER CONTROLS WILL NEED THIS!!! ***
//     //controls.handleResize(); OrbitControls do not have this function
//   }

//   renderer.setSize(window.innerWidth, window.innerHeight)
// }

function animate() {
  requestAnimationFrame(animate)
  render()
  update()
}

function update() {
  currTime = new Date().getTime() / 1000
  dt = currTime - (lastFrameTime || currTime)
  //console.log(dt);
  totalGameTime += dt
  lastFrameTime = currTime

  for (particle of particles) {
    var F = new THREE.Vector3(0, 0, 0)
    var A = new THREE.Vector3(0, 0, 0)
    var Vnew = new THREE.Vector3(0, 0, 0) //Velocity at t+dt
    var Snew = new THREE.Vector3(0, 0, 0) //Position at t+dt

    if (
      Math.abs(particle.S.x - 100) < 10 &&
      Math.abs(particle.S.y - 5) < 10 &&
      Math.abs(particle.S.z - 100) < 10 &&
      particle.mesh_falling == true
    ) {
      A.x = 0
      A.y = 0
      A.z = 0
      particle.mesh_falling = false
      particle.mesh_raising = true
      //Controlling the Vx when raising gives us a cool variable magnetic function
      //50 = tornado level 5
      //10 = tornado level 1

      particle.V.x = 0.01 + Math.floor(Math.random() * particleOptions.tornadoFactor + 1) * 0.1
      particle.V.y = 0.0
      particle.V.z = 0.01 + Math.floor(Math.random() * particleOptions.tornadoFactor + 1) * 0.1
    }

    if (particle.S.y > particle.topCutOff && particle.mesh_falling == false) {
      particle.mesh_falling = true
      particle.mesh_raising = false
    }

    if (particle.mesh_raising) {
      F.crossVectors(particle.V, B) // F = (VxB)
      F.addVectors(F, particle.tempG)
    } else {
      if (particle.position.y > mesh_height && particle.mesh_falling) {
        F.addVectors(F, Gravity)
      } else {
        particle.V = new THREE.Vector3(
          80 - particle.position.x + Math.floor(Math.random() * 40 + 1),
          0,
          80 - particle.position.z + Math.floor(Math.random() * 40 + 1)
        )
        particle.V.normalize()
        particle.V.multiplyScalar(1)
        particle.S.y = mesh_height
        particle.position.y = mesh_height

        //----------
        //Use these two lines to make the tornado infinite without suction
        if (particleOptions.instantRespawn) {
          particle.S.set(
            60 + Math.floor(Math.random() * 80 + 1),
            5,
            60 + Math.floor(Math.random() * 80 + 1)
          )
          particle.position.set(
            60 + Math.floor(Math.random() * 80 + 1),
            5,
            60 + Math.floor(Math.random() * 80 + 1)
          )
        }
        //----------
      }
    }

    F.multiplyScalar(-1) //negative charge
    //F.multiplyScalar(M); //just 1
    A.copy(F) // A = F/M

    A.multiplyScalar(dt * particleOptions.deltaTime)

    Vnew.addVectors(particle.V, A)
    //Vnew.multiplyScalar(dt*80)
    particle.S.add(Vnew)

    Snew.copy(particle.S)
    particle.V.copy(Vnew)

    particle.position.x = Snew.x
    particle.position.y = Snew.y
    particle.position.z = Snew.z
  }
}

function render() {
  //This function does not work on iOS safari as of Three.js-r76
  var delta = clock.getDelta()

  uniforms1.time.value += delta * 5
  uniforms2.time.value = clock.elapsedTime

  renderer.render(scene, camera)
}
