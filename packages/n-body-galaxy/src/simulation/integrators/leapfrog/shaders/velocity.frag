#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_dt;
uniform sampler2D u_textureVelocity;
uniform sampler2D u_textureAccelerationT0;
uniform sampler2D u_textureAccelerationT1;
varying vec2 v_textureCoord;


void main()	{
    vec3 velocity = texture2D( u_textureVelocity, v_textureCoord ).xyz;
    vec3 accelerationT0 = texture2D( u_textureAccelerationT0, v_textureCoord ).xyz;
    vec3 accelerationT1 = texture2D( u_textureAccelerationT1, v_textureCoord ).xyz;
    gl_FragColor = vec4(velocity + ( 0.5 * accelerationT1 + 0.5 * accelerationT0) * u_dt, 1.);
}