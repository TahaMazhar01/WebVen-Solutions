import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export default function Globe({ className = '', size = 600 }) {
  const canvasRef = useRef(null)
  const phiRef = useRef(0)
  const widthRef = useRef(size)
  const pointerInteractingRef = useRef(null)
  const pointerInteractionMovementRef = useRef(0)

  useEffect(() => {
    let globe
    let rafId

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener('resize', onResize)
    onResize()

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: Math.min(window.devicePixelRatio, 2),
        width: widthRef.current * 2,
        height: widthRef.current * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.25, 0.3, 0.5],
        markerColor: [0.0, 0.4, 1.0],
        glowColor: [0.4, 0.5, 1.0],
        markers: [
          { location: [25.276987, 55.296249], size: 0.10 }, // Dubai — ASHGroup
          { location: [24.860966, 67.001137], size: 0.08 }, // Karachi
          { location: [40.7128,  -74.0060],   size: 0.06 }, // New York
          { location: [51.5074,  -0.1278],    size: 0.06 }, // London
          { location: [35.6762,  139.6503],   size: 0.05 }, // Tokyo
          { location: [1.3521,   103.8198],   size: 0.05 }, // Singapore
          { location: [-33.8688, 151.2093],   size: 0.05 }, // Sydney
          { location: [37.7749,  -122.4194],  size: 0.05 }, // San Francisco
          { location: [52.5200,  13.4050],    size: 0.04 }, // Berlin
        ],
        onRender: (state) => {
          if (!pointerInteractingRef.current) {
            phiRef.current += 0.005
          }
          state.phi = phiRef.current + pointerInteractionMovementRef.current
          state.width  = widthRef.current * 2
          state.height = widthRef.current * 2
        },
      })

      // Fade in
      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = '1'
      }, 0)
    }

    return () => {
      if (globe) globe.destroy()
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [size])

  return (
    <div
      className={`relative w-full aspect-square ${className}`}
      style={{ maxWidth: size, margin: '0 auto' }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteractingRef.current = e.clientX - pointerInteractionMovementRef.current
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
        }}
        onPointerUp={() => {
          pointerInteractingRef.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
        }}
        onPointerOut={() => {
          pointerInteractingRef.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
        }}
        onMouseMove={(e) => {
          if (pointerInteractingRef.current !== null) {
            const delta = e.clientX - pointerInteractingRef.current
            pointerInteractionMovementRef.current = delta / 200
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteractingRef.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteractingRef.current
            pointerInteractionMovementRef.current = delta / 100
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  )
}
