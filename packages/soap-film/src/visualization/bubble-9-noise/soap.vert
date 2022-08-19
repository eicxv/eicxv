uniform mat4 u_viewProjectionMatrix;

attribute vec3 position;
attribute vec3 normal;

varying vec3 v_normal;
varying vec3 v_position;

void main() {
  v_normal = normal;
  v_position = position;
  gl_Position = u_viewProjectionMatrix * vec4( position, 1.0 );
}
