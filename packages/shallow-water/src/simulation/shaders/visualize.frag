#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

const float ior = 3.0;
const float eta = ior;

uniform sampler2D u_heightTexture;
uniform vec2 u_resolution;
in vec2 v_texCoord;
out vec4 fragColor;

vec2 derivs(sampler2D tex, vec2 coord) {
    vec2 d = 1.0 / u_resolution;
    vec2 c = coord;
    float v = texture(tex, coord).x;
    vec2 r = vec2(0.0);
    r.x = texture(tex, vec2(c.x + d.x, c.y)).x - v;
    r.y = texture(tex, vec2(c.x, c.y + d.y)).x - v;
    return r;
}

float seaFloor2(vec2 coord) {
    coord = mod(coord, 0.1);
    coord = smoothstep(0.045, 0.05, coord) * (1.0 - smoothstep(0.05, 0.055, coord));
    float c = max(coord.x, coord.y);
    // c = step(0.095, c);
    return c;
}

float seaFloor(vec2 coord) {
    vec2 pxCoord = coord * u_resolution;
    pxCoord = mod(pxCoord, 0.1 * u_resolution.x);
    pxCoord = step(0.095 * u_resolution.x, pxCoord);

    float c = max(pxCoord.x, pxCoord.y);
    // c = step(0.095 * u_resolution.x, c);
    // c = smoothstep(0.03, 0.05, c) * (1.0 - smoothstep(0.05, 0.07, c));
    return c;
}

vec3 refractionDir(vec3 n) {
        // raydir = vec3(0.0, 0.0, -1.0);
        float cosi = n.z; // cosi = -dot(raydir, n)
        float k = 1.0 - eta * eta * (1.0 - cosi * cosi); 
        vec3 refrdir = vec3(0.0, 0.0, -eta) + n * (eta * cosi - sqrt(k)); 
        refrdir = normalize(refrdir);
        return refrdir; 
}

vec2 intersect(vec3 l0, vec3 refrdir) {
    vec3 p0 = vec3(0.0, 0.0, -1.0);
    vec3 n = vec3(0.0, 0.0, 1.0);
    float denom = refrdir.z;
    vec3 p0l0 = p0 - l0;
    float t = dot(p0l0, n) / denom;
    return (l0 + t * refrdir).xy;
}

vec3 calcRefraction(sampler2D tex, vec2 coord) {
    float h = texture(tex, coord).x;
    vec2 r = derivs(tex, coord);
    vec3 n = vec3(-r.x, -r.y, 1.0);
    n = normalize(n);
    vec3 refrDir = refract(vec3(0.0, 0.0, -1.0), n, eta);
    vec2 tCoord = intersect(vec3(coord, h), refrDir);
    return vec3(seaFloor(tCoord));
}

vec4 twoTone() {
    float dark = 0.2;
    float light = 0.8;
    float h = texture( u_heightTexture, v_texCoord ).x;
    float s = dark;
    if (h < 0.0) {
        s = light;
    }
    return vec4(s,s,s, 1.0);
}

void main()	{
    fragColor = vec4(calcRefraction(u_heightTexture, v_texCoord), 1.0);
    // fragColor = twoTone();
}

