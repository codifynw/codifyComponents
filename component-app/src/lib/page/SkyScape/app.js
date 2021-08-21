import * as THREE from 'three'
import './reset.css'
import './styles.css'

let scene,
  ambient,
  camera,
  directionalLight,
  renderer,
  cloudGeo,
  cloudMaterial,
  cloudParticles = [],
  flash

function init() {
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
  var myCanvas = document.getElementById('canvas')
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: myCanvas })
  scene.fog = new THREE.FogExp2(0x11111f, 0.002)
  renderer.setClearColor(scene.fog.color)
  renderer.setSize(window.innerWidth, window.innerHeight)

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
}

// ANIMATE
function animate() {
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

init()
