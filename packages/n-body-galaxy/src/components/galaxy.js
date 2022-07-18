import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import Compute from '../simulation/integrators/verlet-stormer/compute';
// import Compute from '../simulation/integrators/runge-kutta-4/compute';
// import Compute from '../simulation/integrators/leapfrog/compute';
// import Compute from '../simulation/integrators/forward-euler/compute';

// import { TwoBodyUnityCircular as initialConditions } from '../simulation/initial-conditions/2-body-tests';
// import { TwoBodyCircular as initialConditions } from '../simulation/initial-conditions/2-body-tests';
// import { TwoBodyElliptical as initialConditions } from '../simulation/initial-conditions/2-body-tests';

import initialConditions from '../simulation/initial-conditions/random-box';

import FixedLengthQueue from '@eicxv/utility/src/fixed-length-queue';

import nBodyGalaxy from '../simulation/main';
import Graph from './graph';

const Canvas = styled.canvas`
  width: 1200px;
  height: 1200px;
`;

const ENERGY_LENGTH = 201;
const DRIVER_OPTIONS = {
  energy: {
    record: false,
    recordInterval: 10,
  },
};

const SIMULATION_SETTINGS = {
  dt: 0.001,
  width: 50,
  height: 50,
};

export default function Galaxy() {
  const canvasRef = useRef(null);
  const driverRef = useRef(null);
  const energyQueueRef = useRef(new FixedLengthQueue(ENERGY_LENGTH));
  const [energy, setEnergy] = useState(new Array());
  const [initialEnergy, setInitialEnergy] = useState({
    potential: null,
    kinetic: null,
    total: null,
  });

  const addEnergy = (e) => {
    energyQueueRef.current.push(e);
    setEnergy([...energyQueueRef.current]);
  };

  useEffect(() => {
    const driver = nBodyGalaxy(
      canvasRef.current,
      Compute,
      initialConditions,
      SIMULATION_SETTINGS,
      DRIVER_OPTIONS
    );
    driver.start();
    setInitialEnergy(driver.integrator.energy());
    driver.energy.subscribe(addEnergy);
    driverRef.current = driver;
  }, []);

  const yDomain = initialEnergy.kinetic - initialEnergy.potential;
  return (
    <div>
      <Canvas ref={canvasRef}></Canvas>
      <div>
        <div>integrator: {Compute.name}</div>
        <div>time: {driverRef.current?.time}</div>
        <div>step: {driverRef.current?.step}</div>
        <div>energy:</div>
        <div>potential: {energy[energy.length - 1]?.potential}</div>
        <div>kinetic: {energy[energy.length - 1]?.kinetic}</div>
        <div>total: {energy[energy.length - 1]?.total}</div>
        <div>energy initial:</div>
        <div>potential: {initialEnergy.potential}</div>
        <div>kinetic: {initialEnergy.kinetic}</div>
        <div>total: {initialEnergy.total}</div>
        <div>
          energy:{' '}
          {(100 * energy[energy.length - 1]?.total) / initialEnergy.total}%
        </div>
      </div>
      <Graph energy={energy} yDomain={[-yDomain, yDomain]}></Graph>
    </div>
  );
}
