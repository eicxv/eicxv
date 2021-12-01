#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_feed;
uniform float u_kill;
uniform float u_deltaTime;
uniform vec2 u_diffusion;
uniform vec2 u_resolution;
uniform sampler2D u_concentrationTexture;

in vec2 v_textureCoord;
out vec2 fragColor;

vec2 laplacian5(sampler2D tex, vec2 coord, vec2 texResolution, vec2 centralValue) {
    vec2 result = -4.0 * centralValue;
    vec2 h = 1.0 / texResolution;
    vec2 c = coord;
    result += texture( tex, vec2(c.x + h.x, c.y)).xy;
    result += texture( tex, vec2(c.x - h.x, c.y)).xy;
    result += texture( tex, vec2(c.x, c.y + h.y)).xy;
    result += texture( tex, vec2(c.x, c.y - h.y)).xy;
    return result;
}

void main()	{
    vec2 concentration = texture( u_concentrationTexture, v_textureCoord ).xy;
    vec2 lap = laplacian5(u_concentrationTexture, v_textureCoord, u_resolution, concentration);
    float u = concentration.x;
    float v = concentration.y;
    u += (u_diffusion.x * lap.x - u * v * v + u_feed * (1.0 - u)) * u_deltaTime;
    v += (u_diffusion.y * lap.y + u * v * v - (u_kill + u_feed) * v) * u_deltaTime;
    concentration = clamp(vec2(u, v), 0.0, 1.0);
    fragColor = concentration;
}