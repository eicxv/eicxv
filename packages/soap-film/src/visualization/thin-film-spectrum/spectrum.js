const span = [360, 830];
const wavelengths = [];
for (let wavelength = span[0]; wavelength <= span[1]; wavelength += 5) {
  wavelengths.push(wavelength);
}

const elementwiseMult = (out, a, b) => {
  for (let i = 0; i < a.length; i++) {
    out[i] = a[i] * b[i];
  }
  return out;
};

function calcRefractionAngle(incidenceAngle, nAir, nFilm) {
  return (nAir / nFilm) * Math.sin(incidenceAngle);
}

function calcInterferenceCoefficients(incidenceAngle, filmWidth, nAir, nFilm) {
  let refractionAngle = calcRefractionAngle(incidenceAngle, nAir, nFilm);
  let phaseOffset = 2 * nFilm * filmWidth * Math.cos(refractionAngle);
  const calcCoeff = (wavelength) =>
    1 - Math.abs(Math.cos((phaseOffset * Math.PI) / wavelength));
  let interferenceCoefficients = wavelengths.map(calcCoeff);
  return interferenceCoefficients;
}

function thinFilmInterference(
  illuminant,
  incidenceAngle,
  filmWidth,
  nAir,
  nFilm
) {
  let interferenceCoefficients = calcInterferenceCoefficients(
    incidenceAngle,
    filmWidth,
    nAir,
    nFilm
  );
  return elementwiseMult(
    interferenceCoefficients,
    illuminant,
    interferenceCoefficients
  );
}

export { thinFilmInterference };
