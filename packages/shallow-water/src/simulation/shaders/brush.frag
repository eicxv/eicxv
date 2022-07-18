#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D u_heightTexture;
uniform vec2 u_resolution;
uniform vec2 u_brushPosition;

in vec2 v_texCoord;
out vec2 fragColor;

const float brushRadius = 10.0;
const float brushRadiusSqr = brushRadius * brushRadius;

void main() {
    vec2 h = texture(u_heightTexture, v_texCoord).xy;
    vec2 toBrush = (u_brushPosition - v_texCoord) * u_resolution;
    float distSqr = dot(toBrush, toBrush);
    float alpha = smoothstep(0.0, brushRadiusSqr, distSqr);
    h = mix(vec2(0.8, 0.8), h, alpha);
    fragColor = h;
}