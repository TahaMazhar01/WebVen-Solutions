import { useEffect, useRef } from 'react'

/* Soft drifting clouds — NO stars, NO lightings.
 * Used as fixed background for the entire site. */

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`

const FRAGMENT_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x, R.y)

float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(in vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = rnd(i),
        b = rnd(i + vec2(1, 0)),
        c = rnd(i + vec2(0, 1)),
        d = rnd(i + 1.0);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float t = 0.0, a = 1.0;
  mat2 m = mat2(1.0, -0.5, 0.2, 1.2);
  for (int i = 0; i < 5; i++) {
    t += a * noise(p);
    p *= 2.0 * m;
    a *= 0.5;
  }
  return t;
}

float clouds(vec2 p) {
  float d = 1.0, t = 0.0;
  for (float i = 0.0; i < 3.0; i++) {
    float a = d * fbm(i * 10.0 + p.x * 0.2 + 0.2 * (1.0 + i) * p.y + d + i * i + p);
    t = mix(t, d, a);
    d = a;
    p *= 2.0 / (i + 1.0);
  }
  return t;
}

void main(void) {
  vec2 uv = (FC - 0.5 * R) / MN, st = uv * vec2(2, 1);

  // Two slow drifting cloud layers (different speeds + directions = depth)
  float layerA = clouds(vec2(st.x + T * 0.18, -st.y));
  float layerB = clouds(vec2(st.x * 0.7 - T * 0.10, st.y * 0.7 + T * 0.05));

  // Base — deep ink with hint of blue
  vec3 col = vec3(0.018, 0.024, 0.060);

  // Soft blue cloud
  col += vec3(layerA * 0.04, layerA * 0.10, layerA * 0.32);

  // Soft violet wisp
  col += vec3(layerB * 0.07, layerB * 0.04, layerB * 0.18);

  // Subtle vignette so corners are darker (focuses attention)
  float d = length(uv);
  col *= 1.0 - 0.25 * d;

  O = vec4(col, 1.0);
}`

class Renderer {
  constructor(canvas) {
    this.canvas = canvas
    this.gl = canvas.getContext('webgl2', { antialias: true })
    if (!this.gl) return
    this.gl.viewport(0, 0, canvas.width, canvas.height)
    this._setup()
    this._init()
  }
  _compile(s, src) {
    this.gl.shaderSource(s, src)
    this.gl.compileShader(s)
    if (!this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS))
      console.error('shader:', this.gl.getShaderInfoLog(s))
  }
  _setup() {
    const gl = this.gl
    this.vs = gl.createShader(gl.VERTEX_SHADER)
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)
    this._compile(this.vs, VERTEX_SRC)
    this._compile(this.fs, FRAGMENT_SRC)
    this.program = gl.createProgram()
    gl.attachShader(this.program, this.vs)
    gl.attachShader(this.program, this.fs)
    gl.linkProgram(this.program)
  }
  _init() {
    const gl = this.gl
    this.buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(this.program, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
    this.uRes = gl.getUniformLocation(this.program, 'resolution')
    this.uTime = gl.getUniformLocation(this.program, 'time')
  }
  resize() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }
  render(now) {
    const gl = this.gl
    if (!this.program) return
    gl.useProgram(this.program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf)
    gl.uniform2f(this.uRes, this.canvas.width, this.canvas.height)
    gl.uniform1f(this.uTime, now * 1e-3)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
  destroy() {
    const gl = this.gl
    if (!gl || !this.program) return
    gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs)
    gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs)
    gl.deleteProgram(this.program)
  }
}

export default function CloudsBackdrop() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !canvas.getContext('webgl2')) return

    const dpr = Math.max(1, 0.55 * window.devicePixelRatio)
    let renderer = new Renderer(canvas)

    const resize = () => {
      canvas.width  = Math.max(2, window.innerWidth  * dpr)
      canvas.height = Math.max(2, window.innerHeight * dpr)
      renderer.resize()
    }
    resize()
    window.addEventListener('resize', resize)

    // Throttle to ~40fps + pause while splash is up (saves GPU)
    let last = 0
    const FRAME_MS = 1000 / 40
    const loop = (now) => {
      rafRef.current = requestAnimationFrame(loop)
      if (window.__webvenSplashActive) return       // pause while splash
      if (now - last < FRAME_MS) return
      last = now
      renderer.render(now)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      renderer.destroy()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 w-screen h-screen -z-10"
      style={{ background: '#03030a' }}
    />
  )
}
