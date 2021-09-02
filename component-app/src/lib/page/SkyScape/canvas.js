import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { vertexShader, fragmentShader } from './static/models/shader/fragment_shaderCell.glsl'
// gl_FragColor = vec4(0.5, 0.294, .2, 1);

let liftPoint = {
  x: 10,
  y: 5,
  z: 10,
}
const particleSize = 1.0

let initialScatter = 100

var particleOptions = {
  particleCount: 5000,
  deltaTime: 500,
  betaX: 0.0,
  betaY: 0.01,
  betaZ: 0.0,
  GX: 0.0,
  GY: 0.001,
  GZ: 0.0,
  gravity: 0.01,
  betaLiftChaos: 10,
  height: 150,
  heightChaos: 250,
  tornadoFactor: 5,
  instantRespawn: false,
  tracer: false,
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
  controls = false

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
var S = new THREE.Vector3(0, 0, 0) //position
var V = new THREE.Vector3(0.0, 0.1, 0.1) //velocity
var M = 1 //mass
var mesh_falling = false
var mesh_raising = true
var mesh_height = -5
var tornadoTexture
var tornadoGeometry
var tornadoMaterial

var deviceOrientation = false

var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2

var uniforms1, uniforms2, uniforms3

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
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  //   renderer.setClearColor('#11111f')
  scene.fog = new THREE.FogExp2(0x11111f, 0.002)
  renderer.setClearColor(scene.fog.color)

  // Controls
  if (controls) {
    // controls = new OrbitControls(camera)
    // controls.target.set(0, 2, -2)
    // controls.enableDamping = true
    // document.documentElement.className += ' controls-added'
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

  // Floor / GROUND / ground
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
  )
  floor.rotation.x = -Math.PI * 0.5
  floor.position.y = 0
  //   scene.add(floor)

  // TORNADO
  // TORNADO
  // TORNADO

  // change colors of meshes
  // root.traverse((object) => {
  //   if (object.isMesh) {
  //     object.material.color.set(0xffffff * Math.random())
  //   }
  // })

  var gridXZ = new THREE.GridHelper(100, 10)
  gridXZ.position.set(0, 0, 0)
  //   scene.add(gridXZ)

  var gridXY = new THREE.GridHelper(100, 10)
  gridXY.position.set(0, 0, 0)
  gridXY.rotation.x = Math.PI / 2
  //   scene.add(gridXY)

  var gridYZ = new THREE.GridHelper(100, 10)
  gridYZ.position.set(0, 0, 0)
  gridYZ.rotation.z = Math.PI / 2
  //   scene.add(gridYZ)

  // direction (normalized), origin, length, color(hex)
  var origin = new THREE.Vector3(0, 0, 0)
  var terminus = new THREE.Vector3(B.x, B.y + 100, B.z)
  var direction = new THREE.Vector3().subVectors(terminus, origin).normalize()
  var arrow = new THREE.ArrowHelper(direction, origin, 100, 0x884400)
  //   scene.add(arrow)

  // FUNCTIONS

  function initTornado() {
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

    //   var gui = new dat.GUI()

    rebuildParticles()
    // cody - add later
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

    //remove all particles meshes from the scene

    var children = scene.children
    for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i]
      if (child.isParticle) {
        scene.remove(child)
      }
    }

    particles = []

    // tornadoTexture = new THREE.TextureLoader().load('/img/smoke.png')
    tornadoGeometry = new THREE.BoxGeometry(particleSize, particleSize, particleSize)
    const tornadoMaterial = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    for (var i = 0; i < particleOptions.particleCount; i++) {
      mesh = new THREE.Mesh(tornadoGeometry, tornadoMaterial) //THREEx.Crates.createCrate1();   //
      mesh.position.set(
        100 + Math.floor(Math.random() * initialScatter + 1),
        mesh_height,
        100 + Math.floor(Math.random() * initialScatter + 1)
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

  // CALL THE TORNADO
  initTornado()
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
    if (flash.power < 100) flash.position.set(Math.random() * 400, 0, 100)
    flash.power = 50 + Math.random() * 500
  }

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
  updateTornado()
}

function updateTornado() {
  currTime = new Date().getTime() / 1000
  dt = currTime - (lastFrameTime || currTime)
  //console.log(dt);
  totalGameTime += dt
  lastFrameTime = currTime

  for (const particle of particles) {
    var F = new THREE.Vector3(0, 0, 0)
    var A = new THREE.Vector3(0, 0, 0)
    var Vnew = new THREE.Vector3(0, 0, 0) //Velocity at t+dt
    var Snew = new THREE.Vector3(0, 0, 0) //Position at t+dt

    // console.log('Math.abs(particle.S.x) < liftPoint.x: ', Math.abs(particle.S.x) < liftPoint.x)
    // console.log('Math.abs(particle.S.y) < liftPoint.x: ', Math.abs(particle.S.y) < liftPoint.y)
    // console.log('Math.abs(particle.S.z) < liftPoint.x: ', Math.abs(particle.S.x) < liftPoint.z)

    if (
      Math.abs(particle.S.x) < liftPoint.x &&
      particle.S.y < liftPoint.y &&
      Math.abs(particle.S.z) < liftPoint.z &&
      particle.mesh_falling == true
    ) {
      //   console.log('arise')
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
      //   console.log('RISING')
      F.crossVectors(particle.V, B) // F = (VxB)
      F.addVectors(F, particle.tempG)
    } else {
      if (particle.position.y > mesh_height && particle.mesh_falling) {
        // console.log('FALLING')
        F.addVectors(F, Gravity)
      } else {
        particle.V = new THREE.Vector3(
          0 - particle.position.x + Math.floor(Math.random() * 10 + 1),
          0,
          0 - particle.position.z + Math.floor(Math.random() * 10 + 1)
        )
        // console.log('particle.V: ', particle.V)
        particle.V.normalize()
        particle.V.multiplyScalar(1)
        particle.S.y = mesh_height
        particle.position.y = mesh_height

        // particle.S.set(
        //     0 + Math.floor(Math.random() + 1),
        //     mesh_height,
        //     0 + Math.floor(Math.random() + 1)
        //   )
        //   particle.position.set(
        //     0 + Math.floor(Math.random() + 1),
        //     mesh_height,
        //     0 + Math.floor(Math.random() + 1)
        //   )

        //----------
        //Use these two lines to make the tornado infinite without suction
        // if (particleOptions.instantRespawn) {
        //   particle.S.set(
        //     60 + Math.floor(Math.random() * 80 + 1),
        //     mesh_height,
        //     60 + Math.floor(Math.random() * 80 + 1)
        //   )
        //   particle.position.set(
        //     60 + Math.floor(Math.random() * 80 + 1),
        //     mesh_height,
        //     60 + Math.floor(Math.random() * 80 + 1)
        //   )
        // }
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

export { initThree }
