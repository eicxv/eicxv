import {
  Flex,
  Slider,
  TextField,
  ToggleGroup,
  ToggleGroupItem,
  Typography,
} from '@eicxv/ui';
import { useEffect, useState } from 'react';
import { D65, E, specToSrgb } from '../thin-film-color';
import Graph from './graph';
import { thinFilmInterference } from './spectrum';

const toRad = (a) => (2 * Math.PI * a) / 360;

const illuminants = {
  D65,
  E,
};

export default function Main() {
  const [filmWidth, setFilmWidth] = useState(300);
  const [angle, setAngle] = useState(0);
  const [illuminant, setIlluminant] = useState('D65');
  const [color, setColor] = useState('#000000');
  const [spd, setSpd] = useState([]);

  useEffect(() => {
    const newSpd = thinFilmInterference(
      illuminants[illuminant],
      toRad(angle),
      filmWidth,
      refractiveIndex.air,
      refractiveIndex.film
    );
    setSpd(newSpd);
    setColor(specToSrgb(newSpd, true));
  }, [filmWidth, angle, illuminant]);

  const refractiveIndex = { air: 1, film: 1.3 };
  return (
    <div>
      <div>
        <div>
          <Typography>Light reflected by a thin film</Typography>
          <br />
          <Typography id="thickness-input">Film Thickness (nm)</Typography>
          <Slider
            css={(theme) => ({
              flexGrow: 1,
            })}
            min={0}
            max={1000}
            step={1}
            value={[filmWidth]}
            onValueChange={setFilmWidth}
            aria-labelledby="thickness-input"
          ></Slider>
          <Typography id="thickness-input">{filmWidth} nm</Typography>
          <br />
        </div>
        <div>
          <Typography id="angle-input">Angle of Incidence (degrees)</Typography>
          <Slider
            css={(theme) => ({
              flexGrow: 1,
            })}
            min={0}
            max={90}
            step={0.1}
            value={[angle]}
            onValueChange={setAngle}
            aria-labelledby="angle-input"
          ></Slider>
          <Typography>{angle}&deg;</Typography>
          <br />
        </div>
        <div>
          <Typography>Illuminant</Typography>
          <ToggleGroup
            type="single"
            value={illuminant}
            onValueChange={(v) => setIlluminant(v)}
          >
            <ToggleGroupItem value="D65">D65 (Daylight)</ToggleGroupItem>
            <ToggleGroupItem value="E">E (Constant Power)</ToggleGroupItem>
          </ToggleGroup>
          <br />
        </div>
      </div>
      <div>
        <div>Spectral Power Density</div>
        <Graph spd={spd} spdInterval={5} spdSpan={[360, 830]} />
      </div>
      <div>
        <div>Perceived Colour</div>
        <div
          style={{
            width: '100%',
            height: 100,
            backgroundColor: color,
            border: 'solid medium #777777',
          }}
        ></div>
      </div>
    </div>
  );
}
