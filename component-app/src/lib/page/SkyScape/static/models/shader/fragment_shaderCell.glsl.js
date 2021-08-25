let vertexShader = `
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;

    attribute vec3 position;

    void main()
    {
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
`

let fragmentShader = `
    precision mediump float;
        
    void main()
    {
        gl_FragColor = vec4(0.4, 0.4, 0.4, 1);
    }
`

export { vertexShader, fragmentShader }
