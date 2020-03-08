import { UniformsLib } from "three/src/renderers/shaders/UniformsLib";
import { mergeUniforms } from "three/src/renderers/shaders/UniformsUtils";

const vertexShader = /* glsl */ `

varying vec3 vViewPosition;

void main() {


	vec3 transformed = vec3( position );
	vec4 mvPosition = vec4( transformed, 1.0 );
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;
    


	vViewPosition = transformed;
}
`;

const fragmentShader = /* glsl */ `
uniform float opacity;
// uniform vec3 lightDir;

varying vec3 vViewPosition;

vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

void main() {

	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
    vec3 normal = normalize( cross( fdx, fdy ) );

    vec3 cameraDir = vViewPosition - cameraPosition;
    vec3 reflected = normalize(cameraDir - (2. * dot(cameraDir, normal) * normal));
    
    vec3 lightDir = normalize( - vec3(1, 0, -1));
    float align = dot(lightDir, reflected);
    float val = floor(align + 0.005);
    // float val = align * 80. - 79.5;

    gl_FragColor = vec4( val, val, val, opacity);

	// gl_FragColor = vec4( packNormalToRGB( normal ), opacity );

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
