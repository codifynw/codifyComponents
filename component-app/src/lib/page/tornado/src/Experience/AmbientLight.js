import * as THREE from 'three'

import Experience from './Experience.js'

export default class AmbientLight {
  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.scene = this.experience.scene
    this.world = this.experience.world
    this.time = this.experience.time

    this.setLight()
  }

  setLight() {
    // let light = new THREE.AmbientLight(0x404040); // soft white light
    // this.scene.add(light);
  }

  update() {}
}
