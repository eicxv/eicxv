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
  gl_FragColor = color;
}
