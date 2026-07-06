uniform float uOffset;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float dashLength = 0.2;   // length of one dash+gap cycle (in UV space)
  float dashRatio = 0.5;    // 0.5 = dash and gap equal length

  // fract makes a repeating 0→1 ramp along the line; uOffset slides it
  float pattern = fract((vUv.y - uOffset) / dashLength);

  // step: 1 where we're in the "dash" part, 0 in the "gap"
  float dash = step(pattern, dashRatio);

  if (dash < 0.5) discard;          // gap = transparent

  gl_FragColor = vec4(uColor, 1.0); // dash color
}
