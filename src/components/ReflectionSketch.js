import React, { createRef } from "react";

// THREE
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { makeNoise3D } from "open-simplex-noise";

//shaders
import reflectMaterial from "../materials/reflectMaterial";

class ThreeSketch extends React.Component {
  constructor(props) {
    super(props);
    this.noiseGen = new makeNoise3D();
    this.time = 0;
    this.canvasRef = createRef();
  }

  componentDidMount() {
    this.init();
    this.animate();
  }

  waves = (x, y, time) => {
    return 0.5 * Math.sin((time + x) * 1) + 0.1 * this.noiseGen(x, y, time);
  };

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
        vertices.push(i, j, this.waves(i, j, this.time));
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
    this.material = new THREE.ShaderMaterial(reflectMaterial);
    this.material.flatShading = true;

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
    this.time += 0.01;
    for (let i = 2; i < this.verticesArr.length; i += 3) {
      this.verticesArr[i] = this.waves(
        this.verticesArr[i - 2],
        this.verticesArr[i - 1],
        this.time
      );
    }
    this.mesh.geometry.attributes.position.needsUpdate = true;

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
