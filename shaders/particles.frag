uniform sampler2D texture;

varying float vAlpha;
varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, vAlpha);
    gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);
}
