import * as THREE from 'three'

import Experience from './Experience.js'

export default class ShaderBG {
  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.scene = this.experience.scene
    this.time = this.experience.time

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'ShaderBG',
        expanded: false,
      })
    }

    this.setModel()
  }

  setModel() {
    const plane = new THREE.PlaneGeometry(2, 2)

    const fragmentShader = `
    #include <common>
  
    uniform vec3 iResolution;
    uniform float iTime;
  
    // By iq: https://www.shadertoy.com/user/iq  
    // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = fragCoord/iResolution.xy;
  
        // Time varying pixel color
        vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
  
        // Output to screen
        fragColor = vec4(col,1.0);
    }
  
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3() },
    }
    const material = new THREE.ShaderMaterial({
      fragmentShader,
      uniforms,
    })
    this.scene.add(new THREE.Mesh(plane, material))
  }

  update() {}
}
