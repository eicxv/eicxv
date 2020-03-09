const vertexShader = /* glsl */ `
varying vec3 vertexPosition;

void main() {

	vec4 mvPosition = vec4( position, 1.0 );
  mvPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * mvPosition;

	vertexPosition = position;
}
`;

const fragmentShader = /* glsl */ `
uniform float opacity;

varying vec3 vertexPosition;

void main() {

	vec3 fdx = dFdx( vertexPosition );
	vec3 fdy = dFdy( vertexPosition );
  vec3 normal = normalize( cross( fdx, fdy ) );

  vec3 cameraDir = vertexPosition - cameraPosition;
  vec3 reflected = normalize(cameraDir - (2. * dot(cameraDir, normal) * normal));
    
  vec3 lightDir = normalize( - vec3(1, 0, -1));
  float align = dot(lightDir, reflected);
  float val = floor(align + 0.005);

  gl_FragColor = vec4( val, val, val, opacity);
}
`;

let material = {
  uniforms: {
    opacity: { value: 1.0 }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
};

export default material;
