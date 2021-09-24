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

    this.radius = 10
    var turns = 2
    var objPerTurn = 10

    var angleStep = (Math.PI * 2) / objPerTurn
    var heightStep = 1.0

    var geom = new THREE.BoxBufferGeometry(2, 3, 0.1)
    this.plane = new THREE.Group()
    this.scene.add(this.plane)

    for (let i = 0; i < turns * objPerTurn; i++) {
      let plane = new THREE.Mesh(
        geom,
        new THREE.MeshBasicMaterial({
          color: Math.random() * 0x888888 + 0x888888,
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
  }

  update() {
    // console.log('Math.sin(this.time.elapsed * 0.0005): ', Math.sin(this.time.elapsed * 0.0005))
    let sinElapsed = Math.sin(this.time.elapsed * 0.0005)
    // let cosElapsed = Math.cos(this.time.elapsed * 0.0005)

    this.plane.rotation.y -= sinElapsed * 0.05
    this.plane.position.y += sinElapsed * 0.05

    // console.log('cosE: ', cosElapsed)
    // console.log('cosElapsed * this.radius: ', cosElapsed * this.radius)

    // for (const plane of this.plane) {
    // Steady breath
    // plane.position.y += sinElapsed * 0.05
    // plane.rotation.y -= sinElapsed * 0.005

    // plane.position.z += sinElapsed * 0.05
    // plane.position.x += cosElapsed * 0.05
    // plane.position.y += cosElapsed * 0.05
    // plane.position.z += sinElapsed * this.radius
    // X := originX + ;
    // Y := originY + sin(angle)*this.radius;
    // }
  }
}
