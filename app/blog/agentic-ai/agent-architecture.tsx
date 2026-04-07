'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface ComponentInfo {
  id: string
  name: string
  icon: string
  description: string
  details: string[]
  color: string
  bgColor: string
  borderColor: string
  textColor: string
}

const components: ComponentInfo[] = [
  {
    id: 'planning',
    name: 'Planning Engine',
    icon: '🎯',
    description:
      'Decomposes complex goals into actionable subtasks and creates execution strategies',
    details: [
      'Task decomposition & sequencing',
      'Chain-of-thought reasoning',
      'Dynamic replanning on failure',
      'Goal-oriented strategy selection',
    ],
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-300',
    textColor: 'text-violet-700',
  },
  {
    id: 'memory',
    name: 'Memory System',
    icon: '🧠',
    description:
      'Maintains context across interactions and enables learning from past experiences',
    details: [
      'Working (short-term) memory',
      'Vector long-term storage',
      'Episodic experience recall',
      'Semantic knowledge retrieval',
    ],
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-700',
  },
  {
    id: 'tools',
    name: 'Tool Interface',
    icon: '🛠️',
    description:
      'Executes actions through external APIs, databases, and system integrations',
    details: [
      'API & database queries',
      'Code execution sandbox',
      'Web search & scraping',
      'File system operations',
    ],
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-700',
  },
]

const flowSequence = [
  { from: 'input', to: 'planning', label: 'User Request' },
  { from: 'planning', to: 'memory', label: 'Recall Context' },
  { from: 'memory', to: 'planning', label: 'Informed Plan' },
  { from: 'planning', to: 'tools', label: 'Execute Action' },
  { from: 'tools', to: 'memory', label: 'Store Result' },
  { from: 'planning', to: 'output', label: 'Final Response' },
]

export function AgentArchitecture() {
  const [activeComponent, setActiveComponent] = React.useState<string | null>(
    null,
  )
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [flowStep, setFlowStep] = React.useState(0)
  const [showDataFlow, setShowDataFlow] = React.useState(true)

  React.useEffect(() => {
    if (!isPlaying || !showDataFlow) return

    const timer = setInterval(() => {
      setFlowStep((prev) => (prev + 1) % flowSequence.length)
    }, 1800)

    return () => clearInterval(timer)
  }, [isPlaying, showDataFlow])

  const currentFlow = flowSequence[flowStep]

  const getComponentPos = (id: string) => {
    const positions: Record<string, { x: number; y: number }> = {
      input: { x: 50, y: 10 },
      output: { x: 50, y: 90 },
      planning: { x: 50, y: 35 },
      memory: { x: 20, y: 65 },
      tools: { x: 80, y: 65 },
    }
    return positions[id] || { x: 50, y: 50 }
  }

  return (
    <div className="relative mx-auto w-full max-w-[80ch] rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            Agent Architecture
          </h3>
          <p className="text-xs text-gray-500">Core components and data flow</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDataFlow(!showDataFlow)}
            className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
              showDataFlow
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {showDataFlow ? 'Hide Flow' : 'Show Flow'}
          </button>
          <button
            className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <svg
                className="h-4 w-4 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="relative h-[380px] w-full">
        {/* SVG Connections */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
            <marker
              id="arrowhead-active"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>

          {/* Static connections */}
          {!showDataFlow && (
            <>
              <line
                x1="50%"
                y1="20%"
                x2="50%"
                y2="28%"
                stroke="#e2e8f0"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="45%"
                y1="42%"
                x2="28%"
                y2="58%"
                stroke="#e2e8f0"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="55%"
                y1="42%"
                x2="72%"
                y2="58%"
                stroke="#e2e8f0"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="28%"
                y1="72%"
                x2="45%"
                y2="82%"
                stroke="#e2e8f0"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="72%"
                y1="72%"
                x2="55%"
                y2="82%"
                stroke="#e2e8f0"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="50%"
                y1="42%"
                x2="50%"
                y2="82%"
                stroke="#e2e8f0"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            </>
          )}

          {/* Animated flow */}
          {showDataFlow && currentFlow && (
            <>
              {/* Connection line */}
              <motion.line
                x1={`${getComponentPos(currentFlow.from).x}%`}
                y1={`${getComponentPos(currentFlow.from).y}%`}
                x2={`${getComponentPos(currentFlow.to).x}%`}
                y2={`${getComponentPos(currentFlow.to).y}%`}
                stroke="#3b82f6"
                strokeWidth="3"
                markerEnd="url(#arrowhead-active)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />

              {/* Flowing particle */}
              <motion.circle
                r="5"
                fill="#3b82f6"
                initial={{
                  cx: `${getComponentPos(currentFlow.from).x}%`,
                  cy: `${getComponentPos(currentFlow.from).y}%`,
                  opacity: 0,
                }}
                animate={{
                  cx: `${getComponentPos(currentFlow.to).x}%`,
                  cy: `${getComponentPos(currentFlow.to).y}%`,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </>
          )}
        </svg>

        {/* Input Node */}
        <div
          className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center"
          style={{ top: '5%' }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
            <span className="text-2xl">👤</span>
          </div>
          <span className="mt-1 text-xs font-medium text-gray-500">User</span>
        </div>

        {/* LLM Core - Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          animate={{
            boxShadow: showDataFlow
              ? [
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                  '0 0 0 10px rgba(59, 130, 246, 0.1)',
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                ]
              : '0 0 0 0 rgba(59, 130, 246, 0)',
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-orange-400 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 shadow-xl">
            <span className="mb-0.5 text-3xl">🤖</span>
            <span className="text-[10px] font-bold tracking-wider text-white uppercase">
              LLM Core
            </span>
          </div>
        </motion.div>

        {/* Component Nodes */}
        {components.map((comp, index) => {
          const positions = [
            { x: '50%', y: '25%' }, // Planning - top
            { x: '15%', y: '65%' }, // Memory - left
            { x: '85%', y: '65%' }, // Tools - right
          ]
          const pos = positions[index]
          const isActive = activeComponent === comp.id
          const isFlowTarget = showDataFlow && currentFlow?.to === comp.id
          const isFlowSource = showDataFlow && currentFlow?.from === comp.id

          return (
            <motion.div
              key={comp.id}
              className="absolute cursor-pointer"
              style={{
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => setActiveComponent(isActive ? null : comp.id)}
              whileHover={{ scale: 1.08 }}
              animate={{
                scale: isActive ? 1.1 : isFlowTarget || isFlowSource ? 1.05 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div
                className={`h-20 w-20 rounded-2xl bg-gradient-to-br sm:h-24 sm:w-24 ${comp.color} flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${
                  isActive ? 'ring-4 ring-gray-200 ring-offset-2' : ''
                } ${isFlowTarget || isFlowSource ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
              >
                <span className="mb-1 text-2xl sm:text-3xl">{comp.icon}</span>
                <span className="px-1 text-center text-[9px] leading-tight font-bold text-white sm:text-[10px]">
                  {comp.name.split(' ')[0]}
                </span>
              </div>
            </motion.div>
          )
        })}

        {/* Output Node */}
        <div
          className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center"
          style={{ bottom: '2%' }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-300 bg-gradient-to-br from-green-100 to-green-200 shadow-sm">
            <span className="text-2xl">✅</span>
          </div>
          <span className="mt-1 text-xs font-medium text-gray-500">
            Response
          </span>
        </div>

        {/* Flow Label */}
        <AnimatePresence mode="wait">
          {showDataFlow && currentFlow && (
            <motion.div
              key={flowStep}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {currentFlow.label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Component Details Panel */}
      <AnimatePresence>
        {activeComponent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            {components
              .filter((c) => c.id === activeComponent)
              .map((comp) => (
                <div
                  key={comp.id}
                  className={`rounded-xl border-2 p-4 ${comp.bgColor} ${comp.borderColor}`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{comp.icon}</span>
                    <div>
                      <h4 className={`font-bold ${comp.textColor}`}>
                        {comp.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {comp.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {comp.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-gray-700"
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${comp.textColor.replace('text-', 'bg-')}`}
                        />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-gradient-to-br from-violet-500 to-purple-600" />
            <span className="text-gray-600">Planning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-gradient-to-br from-emerald-500 to-teal-600" />
            <span className="text-gray-600">Memory</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-gradient-to-br from-blue-500 to-cyan-600" />
            <span className="text-gray-600">Tools</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
            <span className="text-gray-600">LLM Core</span>
          </div>
        </div>
        {!activeComponent && (
          <p className="mt-2 text-center text-xs text-gray-400">
            Click any component to see details
          </p>
        )}
      </div>
    </div>
  )
}
