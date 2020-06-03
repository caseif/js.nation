attribute float size;
attribute float alpha;

uniform vec3 color;

varying float vAlpha;
varying vec3 vColor;

void main() {
    vColor = color;
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 100.0 * size / length(mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
}
