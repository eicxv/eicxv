const vertexShader = /* glsl */ `
#include <noise_3D>

attribute float translation;

uniform float u_time;
uniform vec3 u_color;

varying float v_value;

const float moveA = 0.5;
const float moveB = 0.57735026919; //sqrt(3) / 3
const float moveC = 0.28867513459; //sqrt(3) / 6

void getTranslation(int i, float sign, out vec2 translation) {
  translation = (
    vec2(-sign * moveA, -sign * moveC) * float(i == 0) +
    vec2(sign * moveA, -sign * moveC) * float(i == 1) +
    vec2(0., sign * moveB) * float(i == 2)
  );
}

const float noiseAmplitude = 0.1;
const float noiseSpeed = .5;
const float waveAmplitude = .5;
const float wavePeriod = 1.5;
const float waveWaveLength = 1. / 3.;
const float waveSpeed = 5.;


float waves(float x, float y, float time) {
  float val = noiseAmplitude * snoise(vec3(x, y, noiseSpeed * time));
  val += waveAmplitude * sin((waveWaveLength * y + waveSpeed * time) * wavePeriod);
  return val;
}

void main() {

  vec2 translationVec;
  vec2 translatedPos;
  int i = int(translation + 0.5);
  float sign = 1. - 2. * float(i > 2);

  //loop
  i = int(mod(translation, 3.));
  getTranslation(i, sign, translationVec);
  translatedPos = position.xy + translationVec;
  vec3 p0 = vec3(translatedPos, waves(translatedPos.x, translatedPos.y, u_time));

  i = int(mod(translation + 1., 3.));
  getTranslation(i, sign, translationVec);
  translatedPos = position.xy + translationVec;
  vec3 p1 = vec3(translatedPos, waves(translatedPos.x, translatedPos.y, u_time));

  i = int(mod(translation + 2., 3.));
  getTranslation(i, sign, translationVec);
  translatedPos = position.xy + translationVec;
  vec3 p2 = vec3(translatedPos, waves(translatedPos.x, translatedPos.y, u_time));
  //end loop

  vec3 v1 = p1 - p0;
  vec3 v2 = p2 - p0;
  vec3 surfaceNormal = normalize(cross(v1, v2));

  vec3 cameraDir = position - cameraPosition;
  vec3 reflected = normalize(cameraDir - (2. * dot(cameraDir, surfaceNormal) * surfaceNormal));
  
  vec3 lightDir = normalize( - vec3(0, -3, -1));
  float align = dot(lightDir, reflected);
  v_value = step(0.995, align);

	vec4 mvPosition = vec4( p0, 1.0 );
  mvPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 u_color;

varying float v_value;

void main() {

  gl_FragColor = vec4( u_color, v_value);
}
`;

let material = {
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
};

export default material;
