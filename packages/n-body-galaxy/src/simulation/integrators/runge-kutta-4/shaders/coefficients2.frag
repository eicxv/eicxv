#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_dt;
uniform sampler2D u_texturePosition;
uniform sampler2D u_textureVelocity;
uniform sampler2D u_textureCoefficients1;
varying vec2 v_textureCoord;

const vec2 textureSize = vec2(50., 50.);
const float softening = 0.01;

vec3 adjustPosition(vec3 p, vec3 v, vec3 a1) {
    return p + v * u_dt + 0.5 * u_dt * u_dt * a1;
}

void main()	{
    vec4 entry = texture2D( u_texturePosition, v_textureCoord );
    vec3 position = entry.xyz;
    vec3 velocity = texture2D( u_textureVelocity, v_textureCoord ).xyz;
    vec3 a1 = texture2D( u_textureCoefficients1, v_textureCoord ).xyz;
    position = adjustPosition(position, velocity, a1);
    vec3 acceleration;
    vec2 ref;

    for ( float s = 0.5; s < textureSize.x; s++ ) {
        for ( float t = 0.5; t < textureSize.y; t++ ) {
            ref = vec2(s, t) / textureSize;
            vec4 otherEntry = texture2D( u_texturePosition, ref );
            if (entry == otherEntry) continue;
            vec3 otherPos = otherEntry.xyz;
            float otherMass = otherEntry.w;
            vec3 otherVel = texture2D( u_textureVelocity, v_textureCoord ).xyz;
            vec3 other_a1 = texture2D( u_textureCoefficients1, v_textureCoord ).xyz;
            otherPos = adjustPosition(otherPos, otherVel, other_a1);
            vec3 toOther = otherPos - position;
            // float inv_r3 = pow(dot(toOther, toOther) + softening, -1.5);
            float inv_r3 = pow(dot(toOther, toOther), -1.5);
            acceleration += otherMass * toOther * inv_r3;
        }
    }
    gl_FragColor = vec4(acceleration, 1.);
}