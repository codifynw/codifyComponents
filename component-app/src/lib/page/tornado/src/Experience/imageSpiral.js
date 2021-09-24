import * as THREE from 'three'

import Experience from './Experience.js'

export default class CoffeeSteam {
  constructor() {
    console.log('adding coffee file')
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.scene = this.experience.scene
    this.time = this.experience.time

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'coffeeSteam',
        expanded: false,
      })
    }

    this.setModel()
  }

  setModel() {
    // this.scene.add(new THREE.GridHelper(20, 10))

    var radius = 10
    var turns = 2
    var objPerTurn = 10

    var angleStep = (Math.PI * 2) / objPerTurn
    var heightStep = 1.0

    var geom = new THREE.BoxBufferGeometry(2, 3, 0.1)
    this.plane = []

    for (let i = 0; i < turns * objPerTurn; i++) {
      let plane = new THREE.Mesh(
        geom,
        new THREE.MeshBasicMaterial({
          color: Math.random() * 0x888888 + 0x888888,
        })
      )

      // position
      plane.position.set(
        Math.cos(angleStep * i) * radius,
        -5.0 + heightStep * i,
        Math.sin(angleStep * i) * radius
      )

      // rotation
      plane.rotation.y = -angleStep * i
      plane.rotation.y += 1.5

      this.plane.push(plane)
      this.scene.add(plane)
    }
  }

  update() {
    for (const plane of this.plane) {
      plane.position.y += Math.sin(this.time.elapsed * 0.0005) * 0.05
    }
  }
}
