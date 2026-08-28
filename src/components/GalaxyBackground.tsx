import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/*
  GPU-driven spiral galaxy background.

  Instead of painting a 1024x1024 texture pixel-by-pixel on the CPU (slow to
  build and static once done), the galaxy is rendered as tens of thousands of
  star particles on the GPU:

  - Stars are laid out along logarithmic spiral arms, denser toward the core.
  - Color grades from a warm golden bulge to a cool blue rim.
  - Differential rotation happens inside the vertex shader (inner stars orbit
    faster than outer ones), so the arms visibly wind over time.
  - A dim spherical starfield plus a soft additive core glow add depth.

  Per-frame CPU work is just a single uniform update; the GPU does the rest,
  which keeps it smooth even with 60k particles.
*/

interface Props {
  isActive?: boolean
}

/* ── Tuneable galaxy parameters ── */
const GALAXY = {
  radius: 10,
  branches: 3,
  spin: 0.85,
  randomness: 0.26,
  randomnessPower: 2.7,
  insideColor: '#ffb267', // warm golden core
  outsideColor: '#3f66ff', // cool blue rim
}

/* Parse "#rrggbb" into sRGB 0..1 (three's color management is bypassed here
   so the shader output maps straight to the sRGB drawing buffer). */
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/* ── Spiral galaxy particle cloud ── */
function buildGalaxy(count: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const seeds = new Float32Array(count)

  const inside = hexToRgb(GALAXY.insideColor)
  const outside = hexToRgb(GALAXY.outsideColor)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // Radius: pow() bias packs more stars toward the bright core.
    const t = Math.pow(Math.random(), 1.8)
    const radius = t * GALAXY.radius
    const branch = ((i % GALAXY.branches) / GALAXY.branches) * Math.PI * 2
    const spinAngle = radius * GALAXY.spin

    // Lateral scatter, wider on the outside; Y is flattened into a thin disk.
    const spread = GALAXY.randomness * (radius + 0.7)
    const rp = () =>
      Math.pow(Math.random(), GALAXY.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1)
    const rx = rp() * spread
    const ry = rp() * spread * 0.4
    const rz = rp() * spread

    positions[i3] = Math.cos(branch + spinAngle) * radius + rx
    positions[i3 + 1] = ry * (1.0 - t * 0.55) // thicker bulge near the core
    positions[i3 + 2] = Math.sin(branch + spinAngle) * radius + rz

    // Color: core -> rim, with a little per-star brightness variance.
    const flick = 0.8 + Math.random() * 0.2
    colors[i3] = mix(inside[0], outside[0], t) * flick
    colors[i3 + 1] = mix(inside[1], outside[1], t) * flick
    colors[i3 + 2] = mix(inside[2], outside[2], t) * flick

    // A few bright giants, mostly small stars.
    scales[i] =
      Math.random() < 0.035 ? 2.4 + Math.random() * 2.6 : 0.45 + Math.random() * 1.0
    seeds[i] = Math.random() * 6.2831853
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
  g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  return g
}

/* ── Distant background starfield (spherical shell) ── */
function buildStarfield(count: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const seeds = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const r = 25 + Math.random() * 65
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = r * Math.cos(phi) * 0.6
    positions[i3 + 2] = r * Math.sin(phi) * Math.sin(theta)

    const c = 0.55 + Math.random() * 0.45
    colors[i3] = c * (0.8 + Math.random() * 0.2)
    colors[i3 + 1] = c * 0.9
    colors[i3 + 2] = c * (0.9 + Math.random() * 0.1)

    scales[i] = 0.4 + Math.random() * 1.2
    seeds[i] = Math.random() * 6.2831853
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
  g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  return g
}

/* Vertex shader for the galaxy: differential rotation + perspective sizing. */
const galaxyVertex = `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uSpin;
  attribute vec3 aColor;
  attribute float aScale;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vTw;

  void main() {
    vec3 p = position;
    float dist = length(p.xz);

    // Inner stars orbit faster -> the arms wind up over time.
    float angle = atan(p.x, p.z);
    angle += (uTime * uSpin) / (dist * 0.30 + 1.0);
    p.x = sin(angle) * dist;
    p.z = cos(angle) * dist;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float tw = 0.75 + 0.25 * sin(uTime * 2.0 + aSeed);
    vTw = tw;

    float size = uSize * aScale * uPixelRatio * tw * (1.0 / -mv.z);
    gl_PointSize = clamp(size, 0.0, 42.0);
    vColor = aColor;
  }
`

/* Vertex shader for the background stars: fixed-size twinkling points. */
const starVertex = `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aColor;
  attribute float aScale;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vTw;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;

    float tw = 0.5 + 0.5 * sin(uTime * 1.2 + aSeed);
    vTw = tw;

    float size = uSize * aScale * uPixelRatio * (0.5 + 0.5 * tw);
    gl_PointSize = clamp(size, 0.0, 4.0);
    vColor = aColor;
  }
`

/* Shared fragment shader: a soft, additive glowing dot. */
const glowFragment = `
  varying vec3 vColor;
  varying float vTw;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float strength = 0.05 / d - 0.1;
    strength = clamp(strength, 0.0, 1.0);
    gl_FragColor = vec4(vColor, strength * vTw);
  }
`

export default function GalaxyBackground({ isActive = true }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(isActive)
  useEffect(() => {
    activeRef.current = isActive
  }, [isActive])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Adapt workload to the device.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const smallScreen = window.matchMedia('(max-width: 768px)').matches
    const lowCore = (navigator.hardwareConcurrency || 8) <= 4
    const light = smallScreen || lowCore

    const GAL_COUNT = light ? 20000 : 60000
    const STAR_COUNT = light ? 2500 : 6000

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    })
    let w = container.clientWidth || window.innerWidth
    let h = container.clientHeight || window.innerHeight
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(w, h)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 200)
    camera.position.set(0, 5.2, 9.5)
    camera.lookAt(0, -1.0, 0)

    // Uniforms (uPixelRatio is shared so resize updates both materials).
    const uPixelRatio = { value: pixelRatio }
    const galaxyUniforms = {
      uTime: { value: 0 },
      uSize: { value: light ? 46 : 36 },
      uPixelRatio,
      uSpin: { value: 0.9 },
    }
    const starUniforms = {
      uTime: { value: 0 },
      uSize: { value: 1.8 },
      uPixelRatio,
    }

    const galaxyMaterial = new THREE.ShaderMaterial({
      uniforms: galaxyUniforms,
      vertexShader: galaxyVertex,
      fragmentShader: glowFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: starUniforms,
      vertexShader: starVertex,
      fragmentShader: glowFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const galaxyGeo = buildGalaxy(GAL_COUNT)
    const starGeo = buildStarfield(STAR_COUNT)

    const galaxy = new THREE.Points(galaxyGeo, galaxyMaterial)
    const starGroup = new THREE.Group()
    const stars = new THREE.Points(starGeo, starMaterial)
    starGroup.add(stars)
    scene.add(starGroup)
    scene.add(galaxy)

    // Soft core glow sprite.
    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = 256
    glowCanvas.height = 256
    const gctx = glowCanvas.getContext('2d')!
    const grd = gctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    grd.addColorStop(0, 'rgba(255, 226, 170, 0.55)')
    grd.addColorStop(0.18, 'rgba(255, 190, 120, 0.28)')
    grd.addColorStop(0.45, 'rgba(210, 150, 90, 0.06)')
    grd.addColorStop(1, 'rgba(0,0,0,0)')
    gctx.fillStyle = grd
    gctx.fillRect(0, 0, 256, 256)
    const glowTex = new THREE.CanvasTexture(glowCanvas)
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const glow = new THREE.Sprite(glowMaterial)
    glow.scale.set(7, 7, 1)
    scene.add(glow)

    // Animation loop. CPU work per frame is just the uniform/camera update.
    const clock = new THREE.Clock()
    let elapsed = 0
    let raf = 0

    const renderFrame = () => {
      renderer.render(scene, camera)
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      const delta = clock.getDelta()
      if (!activeRef.current || document.hidden) return
      elapsed += delta
      galaxyUniforms.uTime.value = elapsed
      starUniforms.uTime.value = elapsed
      starGroup.rotation.y = elapsed * 0.01
      // Very gentle camera drift for a living, three-dimensional feel.
      const a = elapsed * 0.05
      camera.position.x = Math.sin(a) * 0.6
      camera.position.z = 9.5 + Math.cos(a) * 0.3
      camera.lookAt(0, -1.0, 0)
      renderFrame()
    }

    if (reduceMotion) {
      // Respect reduced-motion: render a single, nicely wound static frame.
      galaxyUniforms.uTime.value = 6.0
      starUniforms.uTime.value = 6.0
      renderFrame()
    } else {
      loop()
    }

    const onResize = () => {
      w = container.clientWidth || window.innerWidth
      h = container.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      if (reduceMotion) renderFrame()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      galaxyGeo.dispose()
      starGeo.dispose()
      galaxyMaterial.dispose()
      starMaterial.dispose()
      glowTex.dispose()
      glowMaterial.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background:
          'radial-gradient(ellipse at 50% 42%, #0a0f24 0%, #050813 45%, #01020a 100%)',
      }}
    />
  )
}
