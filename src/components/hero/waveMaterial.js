import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const noiseGLSL = /* glsl */ `
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`

export const WaveMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uIntensity: 1,
    uColorYellow: new THREE.Color('#ffd873'),
    uColorOrange: new THREE.Color('#ff9d42'),
    uColorOrangeDeep: new THREE.Color('#ff7327'),
    uColorRed: new THREE.Color('#f2401f'),
  },
  // vertex
  /* glsl */ `
    ${noiseGLSL}

    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uIntensity;

    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;

    float surface(vec2 p) {
      float t = uTime * 0.2;

      // two large, clean directional swells — this is what reads as "wave"
      // rather than a random blob. Crests travel diagonally across the plane.
      float swellA = sin(p.x * 0.85 + p.y * 0.35 + t * 1.15) * 0.5;
      float swellB = sin(p.x * 0.45 - p.y * 0.7 + t * 0.75) * 0.34;
      float swellC = cos(p.x * 0.22 + p.y * 0.5 - t * 0.5) * 0.18;

      // light organic detail on top, kept subtle so the swells stay dominant
      float detail = snoise(vec3(p.x * 1.7 + t * 0.35, p.y * 1.7, t * 0.6)) * 0.1;

      // fluid, interactive push near the cursor
      float d = length(p - uMouse * 2.2);
      float mouseBump = exp(-d * d * 1.5) * 0.6;

      return (swellA + swellB + swellC + detail + mouseBump) * uIntensity;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      float e = surface(pos.xy);
      pos.z += e;

      float eps = 0.06;
      float ex = surface(pos.xy + vec2(eps, 0.0)) - e;
      float ey = surface(pos.xy + vec2(0.0, eps)) - e;
      vec3 tangentX = normalize(vec3(eps, 0.0, ex));
      vec3 tangentY = normalize(vec3(0.0, eps, ey));
      vNormal = normalize(cross(tangentX, tangentY));

      vElevation = e;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // fragment
  /* glsl */ `
    precision highp float;

    uniform vec3 uColorYellow;
    uniform vec3 uColorOrange;
    uniform vec3 uColorOrangeDeep;
    uniform vec3 uColorRed;
    uniform vec2 uMouse;

    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;

    void main() {
      // Wrap elevation into repeating bands so the surface reads as several
      // travelling wave crests (like the brand mark) instead of one smooth
      // gradient blob — each band is a full red→orange→yellow→orange→red
      // cycle that rides along with the geometry as it animates.
      float bands = fract(vElevation * 0.85 + 0.5);

      vec3 color = mix(uColorRed, uColorOrangeDeep, smoothstep(0.0, 0.22, bands));
      color = mix(color, uColorOrange, smoothstep(0.18, 0.42, bands));
      color = mix(color, uColorYellow, smoothstep(0.4, 0.58, bands));
      color = mix(color, uColorOrange, smoothstep(0.56, 0.74, bands));
      color = mix(color, uColorRed, smoothstep(0.7, 0.95, bands));

      vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
      float fresnel = pow(1.0 - clamp(dot(vNormal, viewDir), 0.0, 1.0), 2.4);
      color += fresnel * vec3(1.0, 0.85, 0.55) * 0.3;

      vec3 lightDir = normalize(vec3(uMouse.x * 0.6 - 0.3, uMouse.y * 0.6 + 0.6, 1.0));
      float diffuse = max(dot(vNormal, lightDir), 0.0);
      color += diffuse * 0.16;

      // gentle vignette only — never dips toward black
      float vign = smoothstep(1.15, 0.15, length(vUv - 0.5) * 1.3);
      color *= mix(0.82, 1.05, vign);

      gl_FragColor = vec4(color, 1.0);
    }
  `,
)

extend({ WaveMaterial })
