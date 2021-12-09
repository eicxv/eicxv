#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_dt;
uniform sampler2D u_texturePositionT0;
uniform sampler2D u_texturePositionT2;
varying vec2 v_textureCoord;

void main()	{
    vec3 nextPos = texture2D( u_texturePositionT0, v_textureCoord ).xyz;
    vec3 prevPos = texture2D( u_texturePositionT2, v_textureCoord ).xyz;
    vec3 currVel = (nextPos - prevPos) / (2.0 * u_dt);
    gl_FragColor = vec4(currVel, 1.);
}