#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_dt;
uniform vec2 u_resolution;
uniform sampler2D u_heightTexture;
in vec2 v_texCoord;
out vec2 fragColor;

const float g = 9.81;
const float D = 1.0;
const float GridScale = 100.0;
const float dt = 0.03;
const float dt2 =  dt * dt;


vec2 getAaAb() {
    const int r  = 2;
    const int r1 = r + 1;
 
    float kernA[r1] = float[r1](2.85, -1.5792207792207793, 0.15422077922077923);
 
    float kernB[r1*r1] = float[r1*r1](2.0933782605117255  , -0.32987120049780483, -0.026408964879028916, 
                                     -0.32987120049780483 , -0.1670643997510976 ,  0.0                 ,
                                     -0.026408964879028916,  0.0                ,  0.0                 );

    float Aa = 0.0;
    float Ab = 0.0;

    vec2 uv;

    for(int y = -r; y <= r; ++y)
    for(int x = -r; x <= r; ++x)
    {
        float w = (kernB[abs(x) + abs(y) * r1]);

        if(w == 0.0) continue;

        uv = v_texCoord + vec2(x, y) / u_resolution;

        float f = texture(u_heightTexture, uv).x;

        Ab += f * w;

        if(y == 0) Aa += f * kernA[abs(x)];
        if(x == 0) Aa += f * kernA[abs(y)];
    }
    return vec2(Aa, Ab);
}


void main()	{
    float terrH = -1.0;
    float mask = smoothstep(0.0, -0.05, terrH);
    float D = clamp(-terrH, 0.0, 1.0);
    float lD2 = clamp(-terrH-1.0, 0.0, 1.0);

    vec2 h12 = texture( u_heightTexture, v_texCoord ).xy;
    float h1 = h12.x;
    float h2 = h12.y;

    vec2 AaAb = getAaAb();
    float Aa = AaAb.x;
    float Ab = AaAb.y;

    // float A = mix(Aa, Ab, (D*D) / (2.0/7.0 + 5.0/7.0 * (D*D))) * D;
    float A = Ab;
    // float A = Aa * 0.5;

    A *= -9.81 * GridScale;

    float h0 = (2.0 * h1 - h2) + A * dt2;

    vec2 h01 = vec2(h0, h1);

    // exponential state buffer smoothing
    float beta = 2.0;
    h01 = mix(h01, h12, 1.0-exp2(-dt*beta));
    fragColor = h01;
}