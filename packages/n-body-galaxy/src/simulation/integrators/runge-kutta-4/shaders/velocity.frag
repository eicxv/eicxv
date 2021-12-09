#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_dt;
uniform sampler2D u_textureVelocity;
uniform sampler2D u_textureCoefficients0;
uniform sampler2D u_textureCoefficients1;
uniform sampler2D u_textureCoefficients2;
varying vec2 v_textureCoord;

void main()	{
    vec3 velocity = texture2D( u_textureVelocity, v_textureCoord ).xyz;
    vec3 a0 = texture2D( u_textureCoefficients0, v_textureCoord ).xyz;
    vec3 a1 = texture2D( u_textureCoefficients1, v_textureCoord ).xyz;
    vec3 a2 = texture2D( u_textureCoefficients2, v_textureCoord ).xyz;

    gl_FragColor = vec4(velocity + (1.0 / 6.0) * u_dt * (a0 + 4.0 * a1 + a2), 1.);
    // gl_FragColor = vec4(velocity + u_dt * acceleration, acceleration.x);
}