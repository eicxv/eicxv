#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec3 u_cameraPosition;
uniform float u_time;
uniform samplerCube u_environment;

varying vec3 v_normal;
varying vec3 v_position;

const float nAir = 1.;
const float nFilm = 1.3;
const float R0AirToFilm = pow((nAir - nFilm) / (nAir + nFilm), 2.);
const float R0FilmToAir = pow((nFilm - nAir) / (nFilm + nAir), 2.);
const float Y_D65 = 2113.459438050404;

const mat3 XYZ_to_RGB_transform = mat3(
  3.24096994, -0.96924364, 0.05563008,
  -1.53738318, 1.8759675, -0.20397696,
  -0.49861076, 0.04155506, 1.05697151
);

float value3D( vec3 P )
{
    //  https://github.com/BrianSharpe/Wombat/blob/master/Value3D.glsl

    // establish our grid cell and unit position
    vec3 Pi = floor(P);
    vec3 Pf = P - Pi;
    vec3 Pf_min1 = Pf - 1.0;

    // clamp the domain
    Pi.xyz = Pi.xyz - floor(Pi.xyz * ( 1.0 / 69.0 )) * 69.0;
    vec3 Pi_inc1 = step( Pi, vec3( 69.0 - 1.5 ) ) * ( Pi + 1.0 );

    // calculate the hash
    vec4 Pt = vec4( Pi.xy, Pi_inc1.xy ) + vec2( 50.0, 161.0 ).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec2 hash_mod = vec2( 1.0 / ( 635.298681 + vec2( Pi.z, Pi_inc1.z ) * 48.500388 ) );
    vec4 hash_lowz = fract( Pt * hash_mod.xxxx );
    vec4 hash_highz = fract( Pt * hash_mod.yyyy );

    //	blend the results and return
    vec3 blend = Pf * Pf * Pf * (Pf * (Pf * 6.0 - 15.0) + 10.0);
    vec4 res0 = mix( hash_lowz, hash_highz, blend.z );
    vec4 blend2 = vec4( blend.xy, vec2( 1.0 - blend.xy ) );
    return dot( res0, blend2.zxzx * blend2.wwyy );
}

float flowPattern(vec3 pos, float time) {
  float strength = 0.3;

  for(float k = 1.0; k < 6.0; k+=1.0){
    pos.x += strength * cos(time+k*1.5 * pos.z);
    pos.y += strength * cos(time+k*1.5 * pos.x);
    pos.z += strength * cos(time+k*1.5 * pos.y);
  }
  return value3D(pos);
}


vec3 linearToSRGB(vec3 linearRGB)
{
    vec3 cutoff = vec3(lessThan(linearRGB, vec3(0.0031308)));
    vec3 higher = vec3(1.055)*pow(linearRGB, vec3(1.0/2.4)) - vec3(0.055);
    vec3 lower = linearRGB * vec3(12.92);

    return mix(higher, lower, cutoff);
}

vec3 XYZtoSRGB(vec3 XYZ) {
  vec3 rgb = XYZ_to_RGB_transform * XYZ;
  return linearToSRGB(rgb);
}

float calcReflectionCoeff(float incidenceAngle, float R0) {
  return R0 + (1. - R0) * pow(1. - cos(incidenceAngle), 5.);
}

float calcInterferenceCoeff(float phaseOffset, float coeffSqSum, float coeff2Prod) {
  return sqrt(
    coeffSqSum
    + coeff2Prod * cos(phaseOffset)
  );
}

float calcLightIntensity(vec3 direction) {
  float i = 1.;
  if (dot(direction, vec3(1.)) > .9) {
    i = 10.;
  }
  return i;
}


vec3 calcInterferenceXYZ(float filmWidth, float refractionAngle, float primaryPower, float secondaryPower, float lightIntensity) {
  float phaseOffset = TWO_PI * 2. * filmWidth * nFilm * cos(refractionAngle);

  vec3 XYZ = vec3(0.);
  float primaryAmplitude = sqrt(primaryPower);
  float secondaryAmplitude = sqrt(secondaryPower);
  float interferencePowerCoeff;
  float coeffSqSum = primaryAmplitude * primaryAmplitude + secondaryAmplitude * secondaryAmplitude;
  float coeff2Prod = 2. * primaryAmplitude * secondaryAmplitude;

  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 360. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 360.);
  XYZ += vec3(0.000129900000, 0.000003917000, 0.000606100000) * 46.638300 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 365. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 365.);
  XYZ += vec3(0.000232100000, 0.000006965000, 0.001086000000) * 49.363700 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 370. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 370.);
  XYZ += vec3(0.000414900000, 0.000012390000, 0.001946000000) * 52.089100 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 375. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 375.);
  XYZ += vec3(0.000741600000, 0.000022020000, 0.003486000000) * 51.032300 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 380. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 380.);
  XYZ += vec3(0.001368000000, 0.000039000000, 0.006450001000) * 49.975500 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 385. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 385.);
  XYZ += vec3(0.002236000000, 0.000064000000, 0.010549990000) * 52.311800 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 390. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 390.);
  XYZ += vec3(0.004243000000, 0.000120000000, 0.020050010000) * 54.648200 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 395. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 395.);
  XYZ += vec3(0.007650000000, 0.000217000000, 0.036210000000) * 68.701500 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 400. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 400.);
  XYZ += vec3(0.014310000000, 0.000396000000, 0.067850010000) * 82.754900 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 405. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 405.);
  XYZ += vec3(0.023190000000, 0.000640000000, 0.110200000000) * 87.120400 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 410. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 410.);
  XYZ += vec3(0.043510000000, 0.001210000000, 0.207400000000) * 91.486000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 415. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 415.);
  XYZ += vec3(0.077630000000, 0.002180000000, 0.371300000000) * 92.458900 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 420. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 420.);
  XYZ += vec3(0.134380000000, 0.004000000000, 0.645600000000) * 93.431800 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 425. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 425.);
  XYZ += vec3(0.214770000000, 0.007300000000, 1.039050100000) * 90.057000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 430. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 430.);
  XYZ += vec3(0.283900000000, 0.011600000000, 1.385600000000) * 86.682300 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 435. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 435.);
  XYZ += vec3(0.328500000000, 0.016840000000, 1.622960000000) * 95.773600 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 440. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 440.);
  XYZ += vec3(0.348280000000, 0.023000000000, 1.747060000000) * 104.865000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 445. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 445.);
  XYZ += vec3(0.348060000000, 0.029800000000, 1.782600000000) * 110.936000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 450. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 450.);
  XYZ += vec3(0.336200000000, 0.038000000000, 1.772110000000) * 117.008000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 455. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 455.);
  XYZ += vec3(0.318700000000, 0.048000000000, 1.744100000000) * 117.410000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 460. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 460.);
  XYZ += vec3(0.290800000000, 0.060000000000, 1.669200000000) * 117.812000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 465. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 465.);
  XYZ += vec3(0.251100000000, 0.073900000000, 1.528100000000) * 116.336000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 470. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 470.);
  XYZ += vec3(0.195360000000, 0.090980000000, 1.287640000000) * 114.861000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 475. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 475.);
  XYZ += vec3(0.142100000000, 0.112600000000, 1.041900000000) * 115.392000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 480. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 480.);
  XYZ += vec3(0.095640000000, 0.139020000000, 0.812950100000) * 115.923000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 485. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 485.);
  XYZ += vec3(0.057950010000, 0.169300000000, 0.616200000000) * 112.367000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 490. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 490.);
  XYZ += vec3(0.032010000000, 0.208020000000, 0.465180000000) * 108.811000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 495. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 495.);
  XYZ += vec3(0.014700000000, 0.258600000000, 0.353300000000) * 109.082000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 500. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 500.);
  XYZ += vec3(0.004900000000, 0.323000000000, 0.272000000000) * 109.354000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 505. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 505.);
  XYZ += vec3(0.002400000000, 0.407300000000, 0.212300000000) * 108.578000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 510. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 510.);
  XYZ += vec3(0.009300000000, 0.503000000000, 0.158200000000) * 107.802000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 515. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 515.);
  XYZ += vec3(0.029100000000, 0.608200000000, 0.111700000000) * 106.296000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 520. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 520.);
  XYZ += vec3(0.063270000000, 0.710000000000, 0.078249990000) * 104.790000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 525. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 525.);
  XYZ += vec3(0.109600000000, 0.793200000000, 0.057250010000) * 106.239000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 530. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 530.);
  XYZ += vec3(0.165500000000, 0.862000000000, 0.042160000000) * 107.689000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 535. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 535.);
  XYZ += vec3(0.225749900000, 0.914850100000, 0.029840000000) * 106.047000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 540. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 540.);
  XYZ += vec3(0.290400000000, 0.954000000000, 0.020300000000) * 104.405000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 545. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 545.);
  XYZ += vec3(0.359700000000, 0.980300000000, 0.013400000000) * 104.225000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 550. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 550.);
  XYZ += vec3(0.433449900000, 0.994950100000, 0.008749999000) * 104.046000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 555. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 555.);
  XYZ += vec3(0.512050100000, 1.000000000000, 0.005749999000) * 102.023000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 560. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 560.);
  XYZ += vec3(0.594500000000, 0.995000000000, 0.003900000000) * 100.000000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 565. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 565.);
  XYZ += vec3(0.678400000000, 0.978600000000, 0.002749999000) * 98.167100 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 570. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 570.);
  XYZ += vec3(0.762100000000, 0.952000000000, 0.002100000000) * 96.334200 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 575. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 575.);
  XYZ += vec3(0.842500000000, 0.915400000000, 0.001800000000) * 96.061100 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 580. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 580.);
  XYZ += vec3(0.916300000000, 0.870000000000, 0.001650001000) * 95.788000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 585. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 585.);
  XYZ += vec3(0.978600000000, 0.816300000000, 0.001400000000) * 92.236800 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 590. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 590.);
  XYZ += vec3(1.026300000000, 0.757000000000, 0.001100000000) * 88.685600 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 595. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 595.);
  XYZ += vec3(1.056700000000, 0.694900000000, 0.001000000000) * 89.345900 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 600. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 600.);
  XYZ += vec3(1.062200000000, 0.631000000000, 0.000800000000) * 90.006200 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 605. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 605.);
  XYZ += vec3(1.045600000000, 0.566800000000, 0.000600000000) * 89.802600 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 610. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 610.);
  XYZ += vec3(1.002600000000, 0.503000000000, 0.000340000000) * 89.599100 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 615. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 615.);
  XYZ += vec3(0.938400000000, 0.441200000000, 0.000240000000) * 88.648900 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 620. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 620.);
  XYZ += vec3(0.854449900000, 0.381000000000, 0.000190000000) * 87.698700 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 625. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 625.);
  XYZ += vec3(0.751400000000, 0.321000000000, 0.000100000000) * 85.493600 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 630. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 630.);
  XYZ += vec3(0.642400000000, 0.265000000000, 0.000049999990) * 83.288600 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 635. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 635.);
  XYZ += vec3(0.541900000000, 0.217000000000, 0.000030000000) * 83.493900 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 640. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 640.);
  XYZ += vec3(0.447900000000, 0.175000000000, 0.000020000000) * 83.699200 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 645. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 645.);
  XYZ += vec3(0.360800000000, 0.138200000000, 0.000010000000) * 81.863000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 650. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 650.);
  XYZ += vec3(0.283500000000, 0.107000000000, 0.000000000000) * 80.026800 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 655. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 655.);
  XYZ += vec3(0.218700000000, 0.081600000000, 0.000000000000) * 80.120700 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 660. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 660.);
  XYZ += vec3(0.164900000000, 0.061000000000, 0.000000000000) * 80.214600 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 665. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 665.);
  XYZ += vec3(0.121200000000, 0.044580000000, 0.000000000000) * 81.246200 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 670. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 670.);
  XYZ += vec3(0.087400000000, 0.032000000000, 0.000000000000) * 82.277800 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 675. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 675.);
  XYZ += vec3(0.063600000000, 0.023200000000, 0.000000000000) * 80.281000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 680. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 680.);
  XYZ += vec3(0.046770000000, 0.017000000000, 0.000000000000) * 78.284200 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 685. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 685.);
  XYZ += vec3(0.032900000000, 0.011920000000, 0.000000000000) * 74.002700 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 690. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 690.);
  XYZ += vec3(0.022700000000, 0.008210000000, 0.000000000000) * 69.721300 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 695. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 695.);
  XYZ += vec3(0.015840000000, 0.005723000000, 0.000000000000) * 70.665200 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 700. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 700.);
  XYZ += vec3(0.011359160000, 0.004102000000, 0.000000000000) * 71.609100 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 705. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 705.);
  XYZ += vec3(0.008110916000, 0.002929000000, 0.000000000000) * 72.979000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 710. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 710.);
  XYZ += vec3(0.005790346000, 0.002091000000, 0.000000000000) * 74.349000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 715. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 715.);
  XYZ += vec3(0.004109457000, 0.001484000000, 0.000000000000) * 67.976500 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 720. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 720.);
  XYZ += vec3(0.002899327000, 0.001047000000, 0.000000000000) * 61.604000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 725. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 725.);
  XYZ += vec3(0.002049190000, 0.000740000000, 0.000000000000) * 65.744800 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 730. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 730.);
  XYZ += vec3(0.001439971000, 0.000520000000, 0.000000000000) * 69.885600 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 735. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 735.);
  XYZ += vec3(0.000999949300, 0.000361100000, 0.000000000000) * 72.486300 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 740. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 740.);
  XYZ += vec3(0.000690078600, 0.000249200000, 0.000000000000) * 75.087000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 745. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 745.);
  XYZ += vec3(0.000476021300, 0.000171900000, 0.000000000000) * 69.339800 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 750. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 750.);
  XYZ += vec3(0.000332301100, 0.000120000000, 0.000000000000) * 63.592700 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 755. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 755.);
  XYZ += vec3(0.000234826100, 0.000084800000, 0.000000000000) * 55.005400 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 760. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 760.);
  XYZ += vec3(0.000166150500, 0.000060000000, 0.000000000000) * 46.418200 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 765. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 765.);
  XYZ += vec3(0.000117413000, 0.000042400000, 0.000000000000) * 56.611800 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 770. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 770.);
  XYZ += vec3(0.000083075270, 0.000030000000, 0.000000000000) * 66.805400 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 775. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 775.);
  XYZ += vec3(0.000058706520, 0.000021200000, 0.000000000000) * 65.094100 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 780. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 780.);
  XYZ += vec3(0.000041509940, 0.000014990000, 0.000000000000) * 63.382800 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 785. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 785.);
  XYZ += vec3(0.000029353260, 0.000010600000, 0.000000000000) * 63.843400 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 790. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 790.);
  XYZ += vec3(0.000020673830, 0.000007465700, 0.000000000000) * 64.304000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 795. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 795.);
  XYZ += vec3(0.000014559770, 0.000005257800, 0.000000000000) * 61.877900 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 800. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 800.);
  XYZ += vec3(0.000010253980, 0.000003702900, 0.000000000000) * 59.451900 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 805. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 805.);
  XYZ += vec3(0.000007221456, 0.000002607800, 0.000000000000) * 55.705400 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 810. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 810.);
  XYZ += vec3(0.000005085868, 0.000001836600, 0.000000000000) * 51.959000 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 815. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 815.);
  XYZ += vec3(0.000003581652, 0.000001293400, 0.000000000000) * 54.699800 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 820. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 820.);
  XYZ += vec3(0.000002522525, 0.000000910930, 0.000000000000) * 57.440600 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 825. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 825.);
  XYZ += vec3(0.000001776509, 0.000000641530, 0.000000000000) * 58.876500 * interferencePowerCoeff * lightIntensity;
  // interferencePowerCoeff = 1. - abs(cos(phaseOffset / 2. / 830. ));
  interferencePowerCoeff = coeffSqSum + coeff2Prod * cos(phaseOffset / 830.);
  XYZ += vec3(0.000001251141, 0.000000451810, 0.000000000000) * 60.312500 * interferencePowerCoeff * lightIntensity;

  return XYZ / Y_D65;
}

void main() {
  // float incidenceAngle = 0.;
  float incidenceAngle = acos(dot(normalize(v_position - u_cameraPosition), -v_normal));
  if (incidenceAngle > PI / 2.) {
    incidenceAngle = abs(incidenceAngle - PI);
  }
  // float lightIntensity = calcLightIntensity();
  // float filmWidth = 400. + pattern2(v_position) * 200.;
  // float filmWidth = 1000.;
  float filmWidth = 700. - (v_position.y + 0.5) * 400. + flowPattern(v_position * 20., u_time * 0.25) * 80.;
  
  float refractionAngle = asin(nAir / nFilm * sin(incidenceAngle));
  float primaryReflectionCoeff = calcReflectionCoeff(incidenceAngle, R0AirToFilm);
  float internalReflectionCoeff = calcReflectionCoeff(refractionAngle, R0FilmToAir);
  float secondaryReflectionCoeff = (1. - primaryReflectionCoeff) * internalReflectionCoeff * (1. - internalReflectionCoeff);

  vec3 reflection = normalize(reflect(v_position - u_cameraPosition, -v_normal));
  vec4 environment = textureCube(u_environment, reflection);
  float lightIntensity = (environment.r + environment.g + environment.b) / 3. * exp2(environment.a  * 255. - 128.);
  // vec3 light = environment.rgb * exp2(environment.a  * 255. - 128.);
  // float lightIntensity = (environment.r + environment.g + environment.b) / 3.;
  lightIntensity *= 3.;
  vec3 XYZ = calcInterferenceXYZ(filmWidth, refractionAngle, primaryReflectionCoeff, secondaryReflectionCoeff, lightIntensity);
  vec3 rgb = XYZtoSRGB(XYZ);
  // rgb *= 2.;


  gl_FragColor = vec4(rgb, primaryReflectionCoeff + secondaryReflectionCoeff);
}