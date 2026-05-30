import { useEffect, useRef } from 'react'

/* Adapted from atzedent / Matthias Hurrle's nebula shader
 * (originally on 21st.dev community). Recolored to Webven's
 * blue → violet → ink palette. */

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`

const FRAGMENT_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 touch;
uniform vec2 move;
uniform int pointerCount;
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
  vec3 col = vec3(0.0);
  float bg = clouds(vec2(st.x + T * 0.35, -st.y));
  uv *= 1.0 - 0.3 * (sin(T * 0.2) * 0.5 + 0.5);

  for (float i = 1.0; i < 12.0; i++) {
    uv += 0.1 * cos(i * vec2(0.1 + 0.01 * i, 0.8) + i * i + T * 0.5 + 0.1 * uv.x);
    vec2 p = uv;
    float d = length(p);
    // bright stars — bluish-violet
    col += 0.00125 / d * (cos(sin(i) * vec3(0.3, 0.55, 1.0)) + 1.0);
    float b = noise(i + p + bg * 1.731);
    col += 0.002 * b / length(max(p, vec2(b * p.x * 0.02, p.y)));
    // Webven palette — deep blue/violet/ink
    col = mix(col, vec3(bg * 0.02, bg * 0.06, bg * 0.30), d);
  }

  O = vec4(col, 1.0);
}`

class Renderer {
  constructor(canvas, dpr) {
    this.canvas = canvas
    this.scale = dpr
    this.gl = canvas.getContext('webgl2', { antialias: true })
    if (!this.gl) return
    this.move = [0, 0]
    this.touch = [0, 0]
    this.pointers = [0, 0]
    this.pointerCount = 0
    this.gl.viewport(0, 0, canvas.width, canvas.height)
    this._setup()
    this._init()
  }
  _compile(shader, src) {
    const gl = this.gl
    gl.shaderSource(shader, src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('shader:', gl.getShaderInfoLog(shader))
    }
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
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program))
    }
  }
  _init() {
    const gl = this.gl
    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(this.program, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
    this.uRes = gl.getUniformLocation(this.program, 'resolution')
    this.uTime = gl.getUniformLocation(this.program, 'time')
    this.uMove = gl.getUniformLocation(this.program, 'move')
    this.uTouch = gl.getUniformLocation(this.program, 'touch')
    this.uPointerCount = gl.getUniformLocation(this.program, 'pointerCount')
  }
  resize(dpr) {
    this.scale = dpr
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }
  render(now) {
    const gl = this.gl
    if (!this.program) return
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(this.program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.uniform2f(this.uRes, this.canvas.width, this.canvas.height)
    gl.uniform1f(this.uTime, now * 1e-3)
    gl.uniform2f(this.uMove, this.move[0], this.move[1])
    gl.uniform2f(this.uTouch, this.touch[0], this.touch[1])
    gl.uniform1i(this.uPointerCount, this.pointerCount)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
  destroy() {
    const gl = this.gl
    if (!gl) return
    if (this.program) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs) }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs) }
      gl.deleteProgram(this.program)
    }
  }
}

export default function ShaderBackground({ className = '' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Detect WebGL2
    if (!canvas.getContext('webgl2')) return

    const dpr = Math.max(1, 0.6 * window.devicePixelRatio)
    let renderer = new Renderer(canvas, dpr)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width  = Math.max(2, rect.width  * dpr)
      canvas.height = Math.max(2, rect.height * dpr)
      renderer.resize(dpr)
    }
    resize()

    // Pointer interaction (subtle parallax)
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      renderer.touch = [
        (e.clientX - rect.left) * dpr,
        (rect.height - (e.clientY - rect.top)) * dpr,
      ]
      renderer.pointerCount = 1
    }
    const onLeave = () => { renderer.pointerCount = 0 }

    canvas.addEventListener('mousemove', onMove, { passive: true })
    canvas.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', resize)

    const loop = (now) => {
      renderer.render(now)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      renderer.destroy()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background: '#03030a' }}
      aria-hidden
    />
  )
}
