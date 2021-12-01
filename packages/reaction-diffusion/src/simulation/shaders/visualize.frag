#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D u_concentrationTexture;
uniform bool u_visualizeV;
in vec2 v_textureCoord;
out vec4 fragColor;

vec3 colorMap(float t) {
    // viridis
    const vec3 c0 = vec3(0.2777273272234177, 0.005407344544966578, 0.3340998053353061);
    const vec3 c1 = vec3(0.1050930431085774, 1.404613529898575, 1.384590162594685);
    const vec3 c2 = vec3(-0.3308618287255563, 0.214847559468213, 0.09509516302823659);
    const vec3 c3 = vec3(-4.634230498983486, -5.799100973351585, -19.33244095627987);
    const vec3 c4 = vec3(6.228269936347081, 14.17993336680509, 56.69055260068105);
    const vec3 c5 = vec3(4.776384997670288, -13.74514537774601, -65.35303263337234);
    const vec3 c6 = vec3(-5.435455855934631, 4.645852612178535, 26.3124352495832);

    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}

vec3 fromLinear(vec3 linearRGB)
{
    bvec3 cutoff = lessThan(linearRGB, vec3(0.0031308));
    vec3 higher = vec3(1.055)*pow(linearRGB, vec3(1.0/2.3)) - vec3(0.055);
    vec3 lower = linearRGB * vec3(12.92);

    return mix(higher, lower, cutoff);
}

vec3 blackWhite(float t) {
    t = smoothstep(0.3, 0.35, t);
    return vec3(t);
}

vec3 weightedColor(float t) {
    t = pow(t, 1.0/2.2);
    return colorMap(t);
}

void main()	{
    float t;
    vec4 state = texture( u_concentrationTexture, v_textureCoord );
    if (u_visualizeV) {
        t = state.y;
    } else {
        t = state.x;
    }

    fragColor = vec4(weightedColor(t), 1.0);
}