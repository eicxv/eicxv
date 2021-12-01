#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D u_concentrationTexture;
uniform vec2 u_brushConcentration;
uniform vec2 u_resolution;
uniform float u_brushRadius;
uniform vec2 u_brushPosition;

in vec2 v_textureCoord;
out vec2 fragColor;

void main() {
    vec2 concentration = texture(u_concentrationTexture, v_textureCoord).xy;
    vec2 toBrush = (u_brushPosition - v_textureCoord) * u_resolution;
    float distSqr = dot(toBrush, toBrush);
    float brushRadiusSqr = u_brushRadius * u_brushRadius;
    float alpha = smoothstep(0.8 * brushRadiusSqr, brushRadiusSqr, distSqr);
    fragColor = mix(u_brushConcentration, concentration, alpha);
}