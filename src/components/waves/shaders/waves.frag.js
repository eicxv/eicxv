export default /* glsl */ `
precision mediump float;

uniform vec3 u_lightColor;
uniform vec3 u_shadowColor;

varying float v_value;

void main() {
  vec4 color;
  if (v_value > 0.5) {
    color = vec4(u_lightColor, 1.);
  } else {
    color = vec4(u_shadowColor, 1.);
  }
  // float blend = smoothstep(0.98, 0.99, v_value);
  // color = u_lightColor * blend + u_shadowColor * (1. - blend);
  gl_FragColor = color;
}
`;
