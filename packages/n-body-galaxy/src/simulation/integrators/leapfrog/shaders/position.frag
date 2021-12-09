#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_dt;
uniform sampler2D u_texturePosition;
uniform sampler2D u_textureVelocity;
uniform sampler2D u_textureAcceleration;
varying vec2 v_textureCoord;

void main()	{
    vec4 entry = texture2D( u_texturePosition, v_textureCoord );
    vec3 position = entry.xyz;
    float mass = entry.w;
    vec3 velocity = texture2D( u_textureVelocity, v_textureCoord ).xyz;
    vec3 acceleration = texture2D( u_textureAcceleration, v_textureCoord ).xyz;

    gl_FragColor = vec4( position + velocity * u_dt + 0.5 * acceleration * u_dt * u_dt, mass );
}