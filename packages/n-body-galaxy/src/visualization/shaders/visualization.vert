#define SPRITE_SIZE 0.0001

attribute vec2 a_reference;
attribute vec3 a_color;

uniform mat4 u_viewProjectionMatrix;
uniform sampler2D u_texturePosition;
uniform float u_nearPlaneHeight;

varying vec3 v_color;

void main() {
    v_color = a_color;
    vec3 position = texture2D( u_texturePosition, a_reference ).xyz;
    vec4 worldPosition = vec4(position, 1);
    gl_Position = u_viewProjectionMatrix * worldPosition;
    gl_PointSize = max(1.0, (u_nearPlaneHeight * SPRITE_SIZE) / gl_Position.w);
}
