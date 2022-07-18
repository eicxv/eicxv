#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec3 v_color;

void main() {
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);
  float alpha = 1.0 - smoothstep(0.8, 1.0, r);
  gl_FragColor = vec4( v_color, alpha );
}
