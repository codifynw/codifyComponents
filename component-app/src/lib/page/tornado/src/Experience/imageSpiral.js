import * as THREE from "three";

import Experience from "./Experience.js";

export default class CoffeeSteam {
  constructor() {
    console.log("adding coffee file");
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "coffeeSteam",
        expanded: false,
      });
    }

    this.setModel();
  }

  setModel() {
    this.scene.add(new THREE.GridHelper(20, 10));

    var radius = 10;
    var turns = 3;
    var objPerTurn = 30;

    var angleStep = (Math.PI * 2) / objPerTurn;
    var heightStep = 0.5;

    var geom = new THREE.BoxBufferGeometry(2, 3, 0.1);

    for (let i = 0; i < turns * objPerTurn; i++) {
      let plane = new THREE.Mesh(
        geom,
        new THREE.MeshBasicMaterial({
          color: Math.random() * 0x888888 + 0x888888,
        })
      );

      // position
      plane.position.set(
        Math.cos(angleStep * i) * radius,
        heightStep * i,
        Math.sin(angleStep * i) * radius
      );

      // rotation
      plane.rotation.y = -angleStep * i;

      this.scene.add(plane);
    }
  }

  update() {}
}
