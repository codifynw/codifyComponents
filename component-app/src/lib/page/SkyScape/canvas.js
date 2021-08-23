import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

var particleOptions = {
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

function getUrlVars() {
  var vars = {}
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value
  })
  return vars
}

let scene,
  ambient,
  camera,
  directionalLight,
  renderer,
  cloudGeo,
  cloudMaterial,
  cloudParticles = [],
  flash,
  controls = true

function initThree() {
  scene = new THREE.Scene()

  //   CAMERA
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000)
  camera.position.z = 2
  camera.position.y = 1
  camera.rotation.x = 1.16
  camera.rotation.y = -0.12
  camera.rotation.z = 0.27
  camera.lookAt(0, 1, 0)

  //   LIGHTS
  ambient = new THREE.AmbientLight(0x555555)
  scene.add(ambient)

  directionalLight = new THREE.DirectionalLight(0xffeedd)
  directionalLight.position.set(0, 0, 1)
  scene.add(directionalLight)

  flash = new THREE.PointLight(0x062d89, 30, 500, 1.7)
  flash.position.set(200, 300, 100)
  scene.add(flash)

  //   RENDER
  var canvas = document.getElementById('canvas')
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas })
  renderer.setSize(window.innerWidth, window.innerHeight)
  //   renderer.setClearColor('#11111f')
  scene.fog = new THREE.FogExp2(0x11111f, 0.002)
  renderer.setClearColor(scene.fog.color)

  // Controls
  if (controls) {
    controls = new OrbitControls(camera, canvas)
    // controls.target.set(0, 2, -2)
    controls.enableDamping = true
    document.documentElement.className += ' controls-added'
  }

  // FOG
  // const fog = new THREE.Fog('#11111f', 2, 40)
  // scene.fog = fog

  //   CLOUDS
  let loader = new THREE.TextureLoader()
  loader.load('/img/smoke.png', function (texture) {
    cloudGeo = new THREE.PlaneBufferGeometry(500, 500)
    cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.01,
    })
    for (let p = 0; p < 25; p++) {
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial)
      cloud.position.set(Math.random() * 800 - 400, 100, -Math.random() * 1000)
      //   cloud.position.set(Math.random() * 800 - 400, 500, Math.random() * 500 - 450)
      cloud.rotation.x = 1.16
      cloud.rotation.y = -0.12
      cloud.rotation.z = Math.random() * 360
      cloud.material.opacity = 0.6
      cloudParticles.push(cloud)
      scene.add(cloud)
    }
    animate()
  })

  // MAN
  const gltfLoader = new GLTFLoader()
  gltfLoader.load(
    '/models/man/scene.gltf',
    (gltf) => {
      // ADD SCENE
      var model = gltf.scene
      var newMaterial = new THREE.MeshStandardMaterial({ color: 0x909090 })
      model.traverse((o) => {
        if (o.isMesh) o.material = newMaterial
      })
      model.rotateY(Math.PI)
      model.position.x = 1

      model.scale.set(0.2, 0.2, 0.2)
      scene.add(model)

      // ONE WAY
      // const children = [...gltf.scene.children]
      // for (const child of children) {
      //   scene.add(child)
      // }

      // ANOTHER WAY
      // while (gltf.scene.children.length) {
      //   scene.add(gltf.scene.children[0])
      // }
    },
    () => {
      console.log('2')
    },
    () => {
      console.log('3')
    }
  )

  // Floor / GROUND
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
  )
  floor.rotation.x = -Math.PI * 0.5
  floor.position.y = 0
  scene.add(floor)

  // TORNADO
  // TORNADO
  // TORNADO
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
  //   var tornadoTexture
  //   var tornadoGeometry
  var tornadoMaterial

  var deviceOrientation = false

  var windowHalfX = window.innerWidth / 2
  var windowHalfY = window.innerHeight / 2

  var shaderSelection = 4
  var uniforms1, uniforms2

  var deviceOrientationFieldParam = getUrlVars()['deviceOrientation']
  if (
    typeof deviceOrientationFieldParam !== 'undefined' &&
    deviceOrientationFieldParam != 'undefined'
  ) {
    deviceOrientation = true
  }

  // change colors of meshes
  // root.traverse((object) => {
  //   if (object.isMesh) {
  //     object.material.color.set(0xffffff * Math.random())
  //   }
  // })

  var gridXZ = new THREE.GridHelper(100, 10)
  gridXZ.position.set(0, 0, 0)
  scene.add(gridXZ)

  var gridXY = new THREE.GridHelper(100, 10)
  gridXY.position.set(0, 0, 0)
  gridXY.rotation.x = Math.PI / 2
  scene.add(gridXY)

  var gridYZ = new THREE.GridHelper(100, 10)
  gridYZ.position.set(0, 0, 0)
  gridYZ.rotation.z = Math.PI / 2
  scene.add(gridYZ)

  // direction (normalized), origin, length, color(hex)
  var origin = new THREE.Vector3(0, 0, 0)
  var terminus = new THREE.Vector3(B.x, B.y + 100, B.z)
  var direction = new THREE.Vector3().subVectors(terminus, origin).normalize()
  var arrow = new THREE.ArrowHelper(direction, origin, 100, 0x884400)
  scene.add(arrow)
}

// ANIMATE
function animate() {
  // Update controls
  if (controls !== false) {
    controls.update()
  }

  // Update Storm
  cloudParticles.forEach((p) => {
    p.rotation.z -= 0.002
  })

  if (Math.random() > 0.93 || flash.power > 100) {
    if (flash.power < 100) flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100)
    flash.power = 50 + Math.random() * 500
  }

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

export { initThree }
