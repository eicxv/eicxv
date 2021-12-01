#version 300 es

in vec2 a_position;
in vec2 a_textureCoord;

out vec2 v_textureCoord;
out vec2 v_brushCoord;
uniform vec2 u_resolution;
uniform float u_brushRadius;
uniform vec2 u_brushPosition;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_textureCoord = a_position;

    // vec2 pos = (a_position * u_brushRadius / u_resolution) + u_brushPosition;
    // gl_Position = vec4(pos, 0.0, 1.0);
    // v_textureCoord = pos + 1.0 / 2.0;
    // v_brushCoord = a_position;
}