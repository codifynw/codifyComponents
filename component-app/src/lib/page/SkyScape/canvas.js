import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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

function initThree() {
  scene = new THREE.Scene()

  //   CAMERA
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 1
  camera.rotation.x = 1.16
  camera.rotation.y = -0.12
  camera.rotation.z = 0.27

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
  scene.fog = new THREE.FogExp2(0x11111f, 0.002)
  renderer.setClearColor(scene.fog.color)
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Controls
  if (controls) {
    controls = new OrbitControls(camera, canvas)
    controls.target.set(0, 2, -2)
    controls.enableDamping = true
    document.documentElement.className += ' controls-added'
  }

  //   CLOUDS
  let loader = new THREE.TextureLoader()
  loader.load('/img/smoke.png', function (texture) {
    cloudGeo = new THREE.PlaneBufferGeometry(500, 500)
    cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
    })
    for (let p = 0; p < 25; p++) {
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial)
      cloud.position.set(Math.random() * 800 - 400, 500, Math.random() * 500 - 450)
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

  // change colors of meshes
  // root.traverse((object) => {
  //   if (object.isMesh) {
  //     object.material.color.set(0xffffff * Math.random())
  //   }
  // })
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
