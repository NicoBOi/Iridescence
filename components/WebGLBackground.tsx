'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uScrollY;
varying vec2 vUv;

vec3 spectral(float t) {
  return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.05, 0.38, 0.72)));
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float smoothHash(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * smoothHash(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.06;

  // Scroll shifts the color palette over the full page
  float scrollShift = uScrollY * 2.8;

  vec2 mouseNudge = (uMouse - 0.5) * 0.12;

  vec2 q = vec2(fbm(uv + vec2(0.0, 0.0)),
                fbm(uv + vec2(5.2, 1.3)));
  vec2 r = vec2(fbm(uv + 4.0 * q + vec2(1.7 + t * 0.15, 9.2) + mouseNudge),
                fbm(uv + 4.0 * q + vec2(8.3 + t * 0.1,  2.8) + mouseNudge));
  float f = fbm(uv + 4.0 * r + vec2(t * 0.08));

  float edge     = abs(f - 0.5);
  float veinMask = smoothstep(0.12, 0.0, edge);
  float glowMask = smoothstep(0.42, 0.78, f);
  float flareMask = smoothstep(0.62, 0.82, f) * smoothstep(0.0, 0.3, veinMask);

  vec3 iridColor = spectral(f * 2.5 + t * 0.12 + scrollShift);
  vec3 base = vec3(0.014, 0.014, 0.018);

  float intensity = veinMask * 0.32 + glowMask * 0.10 + flareMask * 0.45;
  vec3 color = base + iridColor * intensity;

  vec2 c = uv - 0.5;
  float vignette = 1.0 - smoothstep(0.25, 0.85, dot(c, c) * 2.0);
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>(0)
  const pausedRef = useRef(false)
  const targetMouseRef  = useRef(new THREE.Vector2(0.5, 0.5))
  const targetScrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.innerWidth < 768
    const w = window.innerWidth
    const h = window.innerHeight

    const dpr = isMobile
      ? Math.min(window.devicePixelRatio, 1.0)
      : Math.min(window.devicePixelRatio, 1.5)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' })
    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h)

    const scene  = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      uTime:       { value: 0 },
      uResolution: { value: new THREE.Vector2(w, h) },
      uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
      uScrollY:    { value: 0 },
    }

    scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    ))

    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      )
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      targetScrollRef.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const frameInterval = isMobile ? 1000 / 30 : 0
    let lastFrame = 0
    const startTime = performance.now()

    const animate = (now: number) => {
      animRef.current = requestAnimationFrame(animate)
      if (pausedRef.current) return
      if (frameInterval && now - lastFrame < frameInterval) return
      lastFrame = now
      uniforms.uTime.value = (now - startTime) / 1000
      uniforms.uMouse.value.lerp(targetMouseRef.current, 0.025)
      uniforms.uScrollY.value += (targetScrollRef.current - uniforms.uScrollY.value) * 0.04
      renderer.render(scene, camera)
    }
    animRef.current = requestAnimationFrame(animate)

    const onVisibility = () => { pausedRef.current = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(() => {
      const nw = window.innerWidth
      const nh = window.innerHeight
      renderer.setSize(nw, nh, false)
      uniforms.uResolution.value.set(nw, nh)
    })
    ro.observe(document.body)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      ro.disconnect()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
