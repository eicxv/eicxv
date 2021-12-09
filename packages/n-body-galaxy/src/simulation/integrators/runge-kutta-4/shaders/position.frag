#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_dt;
uniform sampler2D u_texturePosition;
uniform sampler2D u_textureVelocity;
uniform sampler2D u_textureCoefficients0;
uniform sampler2D u_textureCoefficients1;
varying vec2 v_textureCoord;

void main()	{
    vec4 entry = texture2D( u_texturePosition, v_textureCoord );
    vec3 position = entry.xyz;
    float mass = entry.w;
    vec3 velocity = texture2D( u_textureVelocity, v_textureCoord ).xyz;
    vec3 a0 = texture2D( u_textureCoefficients0, v_textureCoord ).xyz;
    vec3 a1 = texture2D( u_textureCoefficients1, v_textureCoord ).xyz;
    gl_FragColor = vec4( position + velocity * u_dt + (1.0 / 6.0) * u_dt * u_dt * (a0 + 2.0 * a1), mass );
    // gl_FragColor = vec4( position + velocity * u_dt, mass );
}