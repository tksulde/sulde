'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Step {
  id: number
  phase: 'thought' | 'action' | 'observation' | 'final'
  title: string
  description: string
  content: string
  icon: string
}

const steps: Step[] = [
  {
    id: 1,
    phase: 'thought',
    title: 'Thought',
    description: 'The agent reasons about the task',
    content:
      'I need to find the current weather in Tokyo. I should use the weather tool.',
    icon: '🧠',
  },
  {
    id: 2,
    phase: 'action',
    title: 'Action',
    description: 'The agent executes a tool call',
    content: 'weather_tool(location="Tokyo")',
    icon: '⚡',
  },
  {
    id: 3,
    phase: 'observation',
    title: 'Observation',
    description: 'The agent receives the result',
    content: 'Current weather in Tokyo: 22°C, partly cloudy',
    icon: '👁️',
  },
  {
    id: 4,
    phase: 'thought',
    title: 'Thought',
    description: 'The agent processes the information',
    content:
      'Now I have the weather data. I can provide the final answer to the user.',
    icon: '🧠',
  },
  {
    id: 5,
    phase: 'final',
    title: 'Final Answer',
    description: 'The agent delivers the result',
    content: 'The current weather in Tokyo is 22°C and partly cloudy.',
    icon: '✅',
  },
]

const phaseColors = {
  thought: {
    bg: 'bg-purple-100',
    border: 'border-purple-500',
    text: 'text-purple-700',
    icon: '🧠',
  },
  action: {
    bg: 'bg-blue-100',
    border: 'border-blue-500',
    text: 'text-blue-700',
    icon: '⚡',
  },
  observation: {
    bg: 'bg-green-100',
    border: 'border-green-500',
    text: 'text-green-700',
    icon: '👁️',
  },
  final: {
    bg: 'bg-orange-100',
    border: 'border-orange-500',
    text: 'text-orange-700',
    icon: '✅',
  },
}

export function ReActLoop() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [speed, setSpeed] = React.useState(1)
  const [completedCycles, setCompletedCycles] = React.useState(0)

  React.useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === steps.length - 1) {
          setCompletedCycles((c) => c + 1)
          return 0
        }
        return prev + 1
      })
    }, 2500 / speed)

    return () => clearInterval(timer)
  }, [isPlaying, speed])

  const currentStepData = steps[currentStep]
  const colors = phaseColors[currentStepData.phase]

  return (
    <div className="relative mx-auto w-full max-w-[80ch] rounded-md border border-gray-200 bg-white p-4 sm:p-6">
      {/* Header with cycle counter */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          ReAct Loop{' '}
          {completedCycles > 0 && (
            <span className="text-gray-400">({completedCycles} completed)</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Iteration:</span>
          <div className="flex gap-1">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-2 rounded-full transition-colors ${
                  idx === currentStep
                    ? 'bg-blue-500'
                    : idx < currentStep
                      ? 'bg-blue-200'
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main visualization */}
      <div className="flex flex-col items-center space-y-6">
        {/* Phase flow diagram */}
        <div className="flex w-full items-center justify-center gap-2 sm:gap-4">
          {['thought', 'action', 'observation'].map((phase, idx) => {
            const isActive = currentStepData.phase === phase
            const isPast =
              (currentStep > 0 &&
                phase === 'thought' &&
                currentStepData.phase !== 'thought') ||
              (currentStep > 1 &&
                phase === 'action' &&
                ['observation', 'thought', 'final'].includes(
                  currentStepData.phase,
                )) ||
              (currentStep > 2 &&
                phase === 'observation' &&
                ['thought', 'final'].includes(currentStepData.phase))

            return (
              <React.Fragment key={phase}>
                <motion.div
                  className={`flex flex-col items-center rounded-lg border-2 p-3 transition-colors ${
                    isActive
                      ? phaseColors[phase as keyof typeof phaseColors].bg +
                        ' ' +
                        phaseColors[phase as keyof typeof phaseColors].border
                      : isPast
                        ? 'border-gray-300 bg-gray-50'
                        : 'border-gray-200 bg-gray-50'
                  }`}
                  animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="mb-1 text-2xl">
                    {phase === 'thought'
                      ? '🧠'
                      : phase === 'action'
                        ? '⚡'
                        : '👁️'}
                  </span>
                  <span
                    className={`text-xs font-medium capitalize ${
                      isActive
                        ? phaseColors[phase as keyof typeof phaseColors].text
                        : 'text-gray-400'
                    }`}
                  >
                    {phase}
                  </span>
                </motion.div>
                {idx < 2 && (
                  <motion.div
                    className="text-gray-300"
                    animate={{ opacity: isActive || isPast ? 1 : 0.3 }}
                  >
                    →
                  </motion.div>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Current step display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`w-full rounded-lg border-2 p-4 ${colors.bg} ${colors.border}`}
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="text-2xl">{currentStepData.icon}</span>
              <div>
                <h4 className={`font-semibold ${colors.text}`}>
                  {currentStepData.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {currentStepData.description}
                </p>
              </div>
            </div>
            <div className="rounded bg-white/80 p-3 font-mono text-sm text-gray-700">
              {currentStepData.content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Loop visualization */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="h-px w-16 bg-gray-300" />
            <span className="text-xs">loop continues until goal achieved</span>
            <div className="h-px w-16 bg-gray-300" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute right-4 bottom-4 flex items-center space-x-1">
        <button
          className="rounded-full bg-gray-200 p-[2px] text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
          )}
        </button>
        {[0.5, 1, 1.5, 2].map((s) => (
          <button
            key={`speed-${s}`}
            className={`rounded px-2 py-1 text-xs ${
              speed === s
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            } hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            onClick={() => setSpeed(s)}
          >
            {s}x
          </button>
        ))}
      </div>

      {/* Step indicator */}
      <div className="absolute bottom-4 left-4">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm text-gray-600"
        >
          Step {currentStep + 1} of {steps.length}
        </motion.div>
      </div>
    </div>
  )
}
