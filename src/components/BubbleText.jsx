import { useState, Children, isValidElement, cloneElement } from 'react'

/**
 * BubbleText — characters near your cursor get heavier weight.
 * Adapted from @thanh / 21st.dev. Handles nested <span> children
 * (so it preserves <span className="gradient-text">…</span>).
 */
export default function BubbleText({ children, className = '', as: As = 'span' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  let charCounter = 0

  const renderChars = (text) => {
    return text.split('').map((char) => {
      const idx = charCounter++
      const distance =
        hoveredIndex !== null ? Math.abs(hoveredIndex - idx) : null

      let extra = ''
      switch (distance) {
        case 0:  extra = 'font-black bubble-char-strong'; break
        case 1:  extra = 'font-extrabold'; break
        case 2:  extra = 'font-bold'; break
        default: break
      }

      return (
        <span
          key={idx}
          onMouseEnter={() => setHoveredIndex(idx)}
          className={`transition-all duration-300 ease-in-out cursor-default inline-block ${extra}`}
        >
          {char === ' ' ? ' ' : char}
        </span>
      )
    })
  }

  // Walk through children, recursively wrap text. Keep elements (gradient-text etc.) intact.
  const processNode = (node) => {
    if (typeof node === 'string') return renderChars(node)
    if (typeof node === 'number') return renderChars(String(node))
    if (Array.isArray(node)) return node.map(processNode)
    if (isValidElement(node)) {
      const inner = []
      Children.forEach(node.props.children, (sub) => {
        inner.push(processNode(sub))
      })
      return cloneElement(node, { key: node.key ?? Math.random() }, inner)
    }
    return node
  }

  const processed = processNode(children)

  return (
    <As
      onMouseLeave={() => setHoveredIndex(null)}
      className={className}
    >
      {processed}
    </As>
  )
}
