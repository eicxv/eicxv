const vertexShader = /* glsl */ `
#include <noise_3D>

uniform float u_time;

varying vec3 vertexPosition;

void main() {

  float zComponent = snoise(vec3(position.xy, u_time));
	vec4 mvPosition = vec4( position.xy, zComponent, 1.0 );
  mvPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * mvPosition;

	vertexPosition = position;
}
`;

const fragmentShader = /* glsl */ `
varying vec3 vertexPosition;

void main() {

  gl_FragColor = vec4( 1., 1., 1., 1.);
}
`;

let material = {
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
};

export default material;
