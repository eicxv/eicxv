import React from "react";

// material ui
import { withTheme } from "@material-ui/styles";

// THREE
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Stats from "stats-js";

//shaders
import reflectMaterial from "../materials/reflectMaterial";
import { noise3D, noise3Dgrad } from "../materials/simpleNoise";

//add glsl noise to THREE.ShaderChunk so it can be imported by glsl preprocessor
THREE.ShaderChunk.noise_3D = noise3D;
THREE.ShaderChunk.noise_3D_grad = noise3Dgrad;

class ThreeSketch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { faceMultiplier: 1 };
  }

  setFaceMultiplier = num => {
    this.setState({
      faceMultiplier: num
    });
  };

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
    this.scene.background = new THREE.Color(
      this.props.theme.palette.secondary.main
    );

    // camera
    this.camera = new THREE.PerspectiveCamera(
      32,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.up = new THREE.Vector3(0, 0, 1);
    this.camera.position.set(18, -20, 10);
    this.camera.lookAt(18, 12, 0);

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
    this.WIDTH = 36;
    this.HEIGHT = 124;
    this.numberOfVertices = this.WIDTH * this.HEIGHT * 2 * 3;

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

    function shuffleSynchronously(arr1, arr2) {
      for (let i = arr1.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr1[i], arr1[j]] = [arr1[j], arr1[i]];
        [arr2[i], arr2[j]] = [arr2[j], arr2[i]];
      }
      return [arr1, arr2];
    }

    let vertices = [];
    let translations = [];
    const vertexIt = makeVertexIterator(this.WIDTH, this.HEIGHT);
    const translationIt = makeTranslationIterator();
    const translationIndexIt = makeTranslationIndexIterator();

    for (let vertex of vertexIt) {
      let faceVertices = [];
      let faceTranslations = [];
      for (let _ = 0; _ < 3; _++) {
        faceVertices.push(...vertex);
        faceTranslations.push(translationIndexIt.next().value);
      }
      vertices.push(faceVertices);
      translations.push(faceTranslations);
    }

    // shuffle faces so .setDrawRange removes faces randomly
    [vertices, translations] = shuffleSynchronously(vertices, translations);
    vertices = vertices.flat();
    translations = translations.flat();

    //bind attributes
    vertices = new Float32Array(vertices);

    const positionAttribute = new THREE.BufferAttribute(vertices, 3);
    this.geometry.setAttribute("position", positionAttribute);

    translations = new Float32Array(translations);
    const translationAttribute = new THREE.BufferAttribute(translations, 1);
    this.geometry.setAttribute("translation", translationAttribute);

    // create material
    this.uniforms = {
      u_time: { type: "f", value: 0.005 },
      u_color: {
        type: "fv",
        value: new THREE.Color(this.props.theme.palette.primary.main)
      }
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: reflectMaterial.vertexShader,
      fragmentShader: reflectMaterial.fragmentShader
    });
    this.material.transparent = true;

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
    this.geometry.setDrawRange(
      0,
      this.numberOfVertices * this.state.faceMultiplier
    );
    if (this.showStats) this.stats.begin();

    this.uniforms.u_time.value += 0.003;
    this.resizeRenderer();
    this.renderer.render(this.scene, this.camera);

    if (this.showStats) this.stats.end();

    requestAnimationFrame(this.animate);
  };

  render() {
    return (
      <canvas
        id="sketchCanvas"
        className={this.props.canvasClass}
        style={this.props.canvasStyle}
      ></canvas>
    );
  }
}

export default withTheme(ThreeSketch);
