import React from "react";

// THREE
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//shaders
import reflectMaterial from "../materials/reflectMaterial";
import { noise3D, noise3Dgrad } from "../materials/simpleNoise";

THREE.ShaderChunk.noise_3D = noise3D;
THREE.ShaderChunk.noise_3D_grad = noise3Dgrad;

class ThreeSketch extends React.Component {
  componentDidMount() {
    this.init();
    this.animate();
  }

  init = () => {
    // renderer
    this.sketchCanvas = document.querySelector("#sketchCanvas");
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.sketchCanvas,
      antialias: true
    });

    // scene
    this.scene = new THREE.Scene();

    // camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.up = new THREE.Vector3(0, 0, 1);
    this.camera.position.set(140, 45, 18);

    // orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 45, 0);
    this.controls.update();

    // geometry
    this.geometry = new THREE.BufferGeometry();

    // create vertices and faces
    const WIDTH = 100;
    const HEIGHT = 90;

    let vertices = [];
    let faces = [];
    for (let i = 0; i < WIDTH; i++) {
      for (let j = 0; j < HEIGHT; j++) {
        vertices.push(i, j, 0);
      }
    }

    for (let i = 0; i < (WIDTH - 1) * HEIGHT; i++) {
      if (i % HEIGHT === HEIGHT - 1) {
        continue;
      }
      faces.push(i + 1, i, i + HEIGHT);
      faces.push(i + 1, i + HEIGHT, i + HEIGHT + 1);
    }

    this.verticesArr = new Float32Array(vertices);
    const positionAttribute = new THREE.BufferAttribute(this.verticesArr, 3);
    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute("position", positionAttribute);
    this.geometry.setIndex(faces);

    // create material
    this.uniforms = { u_time: { value: 0.005 } };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: reflectMaterial.vertexShader,
      fragmentShader: reflectMaterial.fragmentShader
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  };

  resizeRenderer = () => {
    const width = this.sketchCanvas.clientWidth;
    const height = this.sketchCanvas.clientHeight;
    const needResize =
      this.sketchCanvas.width !== width || this.sketchCanvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
      this.camera.aspect =
        this.sketchCanvas.clientWidth / this.sketchCanvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
  };

  // animate
  animate = () => {
    this.uniforms.u_time.value += 0.01;

    this.resizeRenderer();

    requestAnimationFrame(this.animate);

    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <canvas id="sketchCanvas" className={this.props.canvasStyle}></canvas>
    );
  }
}

export default ThreeSketch;
