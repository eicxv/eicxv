#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_dt;
uniform sampler2D u_texturePositionT0;
uniform sampler2D u_texturePositionT1;
varying vec2 v_textureCoord;

const vec2 textureSize = vec2(50., 50.);
const float softeningSqr = 0.01;

void main()	{
    vec4 currEntry = texture2D( u_texturePositionT0, v_textureCoord );
    vec3 currPos = currEntry.xyz;
    float mass = currEntry.w;
    vec3 prevPos = texture2D( u_texturePositionT1, v_textureCoord ).xyz;
    vec3 acceleration;
    vec2 ref;

    for ( float s = 0.5; s < textureSize.x; s++ ) {
        for ( float t = 0.5; t < textureSize.y; t++ ) {
            ref = vec2(s, t) / textureSize;
            vec4 otherEntry = texture2D( u_texturePositionT0, ref );
            if (currEntry == otherEntry) continue;
            vec3 otherPos = otherEntry.xyz;
            float otherMass = otherEntry.w;
            vec3 toOther = otherPos - currPos;
            float inv_r3 = pow(dot(toOther, toOther) + softeningSqr, -1.5);
            // float inv_r3 = pow(dot(toOther, toOther), -1.5);
            acceleration += otherMass * toOther * inv_r3;
        }
    }
    vec3 nextPosition = 2.0 * currPos - prevPos + acceleration * u_dt * u_dt;
    gl_FragColor = vec4(nextPosition, mass);
}
