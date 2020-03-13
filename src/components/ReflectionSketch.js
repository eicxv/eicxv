import React from "react";

// THREE
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Stats from "stats-js";

//shaders
import reflectMaterial from "../materials/reflectMaterial";
import { noise3D, noise3Dgrad } from "../materials/simpleNoise";

//add glsl noise to THREE.ShaderChunk so it can be imported by glsl preprocessor
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
    this.camera.position.set(18, -34, 14);
    this.camera.lookAt(18, 30, 0);

    // orbit controls
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.target.set(18, 30, 0);
    // this.controls.update();

    // stats
    this.showStats = true;
    if (this.showStats) {
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(this.stats.dom);
    }

    // geometry
    this.geometry = new THREE.BufferGeometry();

    // create arrributes
    const WIDTH = 36;
    const HEIGHT = 124;

    function* makeTranslationIterator() {
      const [a, b, c] = [0.5, Math.sqrt(3) / 3, Math.sqrt(3) / 6];
      while (true) {
        for (let sign of [1, -1]) {
          yield [-sign * a, -sign * c];
          yield [sign * a, -sign * c];
          yield [0, sign * b];
        }
      }
    }

    function* makeTranslationIndexIterator() {
      let n = 0;
      while (true) {
        yield n;
        n = (n + 1) % 6;
      }
    }

    function* makeVertexIterator(totalWidth, totalHeight) {
      const [a, c, d] = [0.5, Math.sqrt(3) / 6, Math.sqrt(3) / 2];
      let signX = -1;
      let offsetX;
      for (let height = 0; height < totalHeight; height++) {
        signX = -signX;
        offsetX = signX === -1 ? a : 0;
        for (let width = 0; width < totalWidth; width++) {
          for (let i of [0, 1]) {
            yield [width + offsetX + signX * i * a, d * height + c * i, 0];
          }
        }
      }
    }

    let vertices = [];
    let translations = [];
    const vertexIt = makeVertexIterator(WIDTH, HEIGHT);
    const translationIt = makeTranslationIterator();
    const translationIndexIt = makeTranslationIndexIterator();

    for (let vertex of vertexIt) {
      for (let _ = 0; _ < 3; _++) {
        vertices.push(...vertex);
        translations.push(translationIndexIt.next().value);
      }
    }

    //bind attributes
    vertices = new Float32Array(vertices);
    const positionAttribute = new THREE.BufferAttribute(vertices, 3);
    this.geometry.setAttribute("position", positionAttribute);

    translations = new Float32Array(translations);
    const translationAttribute = new THREE.BufferAttribute(translations, 1);
    this.geometry.setAttribute("translation", translationAttribute);

    // create material
    this.uniforms = {
      u_time: { type: "f", value: 0.005 }
    };

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

  animate = () => {
    if (this.showStats) this.stats.begin();

    this.uniforms.u_time.value += 0.003;
    this.resizeRenderer();
    this.renderer.render(this.scene, this.camera);

    if (this.showStats) this.stats.end();

    requestAnimationFrame(this.animate);
  };

  render() {
    return (
      <canvas id="sketchCanvas" className={this.props.canvasStyle}></canvas>
    );
  }
}

export default ThreeSketch;
