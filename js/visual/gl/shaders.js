let Shaders = new function() {

    this.vertShader =
        "attribute float size; \
        attribute float alpha; \
        uniform vec3 color; \
        varying float vAlpha; \
        varying vec3 vColor; \
        void main() { \
            vColor = color; \
            vAlpha = alpha; \
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); \
            gl_PointSize = 100.0 * size / length(mvPosition.xyz); \
            gl_Position = projectionMatrix * mvPosition; \
        }";

    this.fragShader =
        "uniform sampler2D texture; \
        varying float vAlpha; \
        varying vec3 vColor; \
        void main() { \
            gl_FragColor = vec4(vColor, vAlpha); \
            gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord); \
        }";

}