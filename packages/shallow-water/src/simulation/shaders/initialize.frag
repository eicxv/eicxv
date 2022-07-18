#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
in vec2 v_texCoord;
out vec2 fragColor;

vec2 centralDot(vec2 co) {
  vec2 center = vec2(0.5, 0.5);
  vec2 dist = center - co;
  float d = sqrt(dot(dist, dist));
  float h = 1.0 - smoothstep(0.0, 0.1, d);
  return vec2(h, 0.0);
}

void main()	{
    // fragColor = centralDot(v_texCoord);
    fragColor = vec2(0, 0);
    // fragColor = v_texCoord;
}