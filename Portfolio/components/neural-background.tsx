"use client"

import { useEffect, useRef, useCallback, memo } from "react"

const PARTICLE_COUNT = 25 // Reduced from 50 for better performance
const CONNECTION_DISTANCE = 120 // Reduced connection distance
const TARGET_FPS = 30 // Target 30 FPS instead of 60 for background animation
const FRAME_INTERVAL = 1000 / TARGET_FPS

function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const isVisibleRef = useRef(true)
  const lastFrameTimeRef = useRef(0)

  const initParticles = useCallback((width: number, height: number) => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3, // Slower movement
      vy: (Math.random() - 0.5) * 0.3,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Use device pixel ratio for sharp rendering but cap it for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }
    updateCanvasSize()

    let particles = initParticles(canvas.width / dpr, canvas.height / dpr)
    const width = canvas.width / dpr
    const height = canvas.height / dpr

    const animate = (currentTime: number) => {
      // Throttle to target FPS
      if (currentTime - lastFrameTimeRef.current < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTimeRef.current = currentTime

      // Skip animation when tab is not visible
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "rgba(15, 23, 42, 0.02)"
      ctx.fillRect(0, 0, width, height)

      // Update and draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.fillStyle = "rgba(6, 182, 212, 0.7)"
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw connections (optimized loop)
      ctx.lineWidth = 0.4
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const distance = Math.sqrt(distSq)
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.4 * (1 - distance / CONNECTION_DISTANCE)})`
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    // Visibility change handler - pause animation when tab is hidden
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
    }

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        updateCanvasSize()
        particles = initParticles(canvas.width / dpr, canvas.height / dpr)
      }, 150)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      cancelAnimationFrame(animationRef.current)
      clearTimeout(resizeTimeout)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("resize", handleResize)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-25 will-change-transform"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  )
}

export default memo(NeuralBackground)
