import * as THREE from 'three'

import Experience from './Experience.js'

export default class ImageSpiral {
  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.y = 0
    this.position = 0

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'ImageSpiral',
        expanded: false,
      })
    }

    this.setModel()
  }

  setModel() {
    // this.scene.add(new THREE.GridHelper(20, 10))
    const textureLoader = new THREE.TextureLoader()

    this.radius = 10
    var turns = 2
    var objPerTurn = 10

    var angleStep = (Math.PI * 2) / objPerTurn
    var heightStep = 1.0

    this.plane = new THREE.Group()
    this.scene.add(this.plane)

    for (let i = 0; i < turns * objPerTurn; i++) {
      let geom = new THREE.BoxGeometry(3, 2, 0.1)
      if (this.resources.items[`spiral-${i}`].height > this.resources.items[`spiral-${i}`].width) {
        geom = new THREE.BoxGeometry(2, 3, 0.1)
      }
      let plane = new THREE.Mesh(
        geom,
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(`/spiral/${i}.jpg`),
          // map: this.resources.items[`spiral-${i}`],
        })
      )

      // position
      plane.position.set(
        Math.cos(angleStep * i) * this.radius,
        -5.0 + heightStep * i,
        Math.sin(angleStep * i) * this.radius
      )

      // rotation
      plane.rotation.y = -angleStep * i
      plane.rotation.y += 1.5

      this.plane.add(plane)
    }

    // WHEEL
    let self = this
    let onWheel = function (_event) {
      _event.preventDefault()
      self.y = _event.deltaY * 0.0007
    }

    window.addEventListener('mousewheel', onWheel, { passive: false })
    window.addEventListener('wheel', onWheel, { passive: false })
  }

  update() {
    if (this.plane) {
      this.position += this.y
      this.y *= 0.009
      this.plane.rotation.y = this.position
      this.plane.position.y = -this.position
    }

    // let sinElapsed = Math.sin(this.time.elapsed * 0.0005)
    // let cosElapsed = Math.cos(this.time.elapsed * 0.0005)
    // window.addEventListener('mousewheel', this.view.onWheel, { passive: false })
    // this.plane.rotation.y -= sinElapsed * 0.05
    // this.plane.position.y += sinElapsed * 0.05
  }
}
