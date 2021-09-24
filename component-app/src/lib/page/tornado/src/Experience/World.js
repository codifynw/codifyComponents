import * as THREE from 'three'
import Experience from './Experience.js'
import AmbientLight from './AmbientLight.js'
// import Baked from './Baked.js'
// import GoogleLeds from './GoogleLeds.js'
// import LoupedeckButtons from './LoupedeckButtons.js'
import ImageSpiral from './imageSpiral.js'
// import TopChair from './TopChair.js'
// import ElgatoLight from './ElgatoLight.js'
// import BouncingLogo from './BouncingLogo.js'
// import Screen from "./Screen.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience()
    this.config = this.experience.config
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    let light = new THREE.AmbientLight(0x404040) // soft white light
    this.scene.add(light)

    this.resources.on('groupEnd', (_group) => {
      if (_group.name === 'base') {
        // this.setBaked()
        // this.setGoogleLeds()
        // this.setLoupedeckButtons()
        this.setImageSpiral()
        // this.setTopChair()
        // this.setElgatoLight()
        // this.setBouncingLogo()
        this.addAmbientLight()
        // this.setScreens();
      }
    })
  }

  setBaked() {
    this.baked = new Baked()
  }

  setGoogleLeds() {
    this.googleLeds = new GoogleLeds()
  }

  setLoupedeckButtons() {
    this.loupedeckButtons = new LoupedeckButtons()
  }

  setImageSpiral() {
    this.imageSpiral = new ImageSpiral()
  }

  setTopChair() {
    this.topChair = new TopChair()
  }

  setElgatoLight() {
    this.elgatoLight = new ElgatoLight()
  }

  addAmbientLight() {
    this.ambientLight = new AmbientLight()
  }

  setBouncingLogo() {
    this.bouncingLogo = new BouncingLogo()
  }

  setScreens() {
    this.pcScreen = new Screen(
      this.resources.items.pcScreenModel.scene.children[0],
      '/assets/videoPortfolio.mp4'
    )
    this.macScreen = new Screen(
      this.resources.items.macScreenModel.scene.children[0],
      '/assets/videoStream.mp4'
    )
  }

  resize() {}

  update() {
    if (this.imageSpiral) this.imageSpiral.update()
  }

  destroy() {}
}
