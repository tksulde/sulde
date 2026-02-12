'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  color: string;
  bgColor: string;
  x: number;
  y: number;
  capabilities: string[];
}

const agents: Agent[] = [
  {
    id: 'coordinator',
    name: 'Coordinator',
    role: 'Orchestrates workflow & delegates tasks',
    icon: '🎼',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    x: 50,
    y: 20,
    capabilities: ['Task routing', 'Quality check', 'Final synthesis'],
  },
  {
    id: 'researcher',
    name: 'Researcher',
    role: 'Gathers information from sources',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    x: 20,
    y: 55,
    capabilities: ['Web search', 'Data collection', 'Source verification'],
  },
  {
    id: 'analyst',
    name: 'Analyst',
    role: 'Processes data & extracts insights',
    icon: '📊',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    x: 50,
    y: 85,
    capabilities: ['Pattern recognition', 'Trend analysis', 'Statistical modeling'],
  },
  {
    id: 'writer',
    name: 'Writer',
    role: 'Creates content & documentation',
    icon: '✍️',
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    x: 80,
    y: 55,
    capabilities: ['Draft creation', 'Style adaptation', 'Review & edit'],
  },
];

interface WorkflowStep {
  id: number;
  from: string;
  to: string;
  message: string;
  dataType: 'task' | 'data' | 'result' | 'feedback';
  description: string;
}

const workflow: WorkflowStep[] = [
  { 
    id: 1, 
    from: 'coordinator', 
    to: 'researcher', 
    message: 'Research: AI agent market trends 2024',
    dataType: 'task',
    description: 'Coordinator delegates research task'
  },
  { 
    id: 2, 
    from: 'researcher', 
    to: 'coordinator', 
    message: 'Found 15 sources, 50+ data points',
    dataType: 'data',
    description: 'Researcher returns collected data'
  },
  { 
    id: 3, 
    from: 'coordinator', 
    to: 'analyst', 
    message: 'Analyze market patterns & growth rates',
    dataType: 'task',
    description: 'Coordinator sends data for analysis'
  },
  { 
    id: 4, 
    from: 'analyst', 
    to: 'coordinator', 
    message: 'Key insights: 3 major trends identified',
    dataType: 'result',
    description: 'Analyst provides insights'
  },
  { 
    id: 5, 
    from: 'coordinator', 
    to: 'writer', 
    message: 'Draft comprehensive market report',
    dataType: 'task',
    description: 'Coordinator requests report creation'
  },
  { 
    id: 6, 
    from: 'writer', 
    to: 'coordinator', 
    message: 'Report draft complete (2,500 words)',
    dataType: 'result',
    description: 'Writer delivers final document'
  },
  { 
    id: 7, 
    from: 'coordinator', 
    to: 'writer', 
    message: 'Revise section 3, add citations',
    dataType: 'feedback',
    description: 'Coordinator provides feedback'
  },
  { 
    id: 8, 
    from: 'writer', 
    to: 'coordinator', 
    message: 'Revisions complete, ready for final',
    dataType: 'result',
    description: 'Writer applies feedback'
  },
];

const dataTypeColors = {
  task: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700', dot: 'bg-blue-500' },
  data: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-700', dot: 'bg-purple-500' },
  result: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700', dot: 'bg-green-500' },
  feedback: { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-700', dot: 'bg-amber-500' },
};

export function MultiAgent() {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [speed, setSpeed] = React.useState(1);
  const [selectedAgent, setSelectedAgent] = React.useState<string | null>(null);
  const [showLogs, setShowLogs] = React.useState(false);

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % workflow.length);
    }, 2500 / speed);

    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const currentMsg = workflow[currentStep];
  const fromAgent = agents.find((a) => a.id === currentMsg.from);
  const toAgent = agents.find((a) => a.id === currentMsg.to);
  const msgColors = dataTypeColors[currentMsg.dataType];

  // Calculate bezier curve path for message flow
  const getPath = (from: Agent, to: Agent) => {
    const x1 = from.x;
    const y1 = from.y;
    const x2 = to.x;
    const y2 = to.y;
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${y1} Q ${midX} ${y1} ${midX} ${(y1 + y2) / 2} T ${x2} ${y2}`;
  };

  return (
    <div className="w-full max-w-[80ch] mx-auto p-4 sm:p-6 relative bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Multi-Agent Collaboration</h3>
          <p className="text-xs text-gray-500">Coordinated workflow across specialized agents</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              showLogs ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {showLogs ? 'Hide Logs' : 'Show Logs'}
          </button>
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Network Diagram */}
      <div className="relative h-[360px] w-full">
        {/* Connection Lines (Background) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          {/* Static connections between all agents */}
          {agents.map((agent, i) =>
            agents.slice(i + 1).map((other) => (
              <line
                key={`${agent.id}-${other.id}`}
                x1={`${agent.x}%`}
                y1={`${agent.y}%`}
                x2={`${other.x}%`}
                y2={`${other.y}%`}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            ))
          )}

          {/* Active message flow */}
          <AnimatePresence mode="wait">
            {fromAgent && toAgent && (
              <motion.g key={currentStep}>
                {/* Glow effect */}
                <motion.path
                  d={getPath(fromAgent, toAgent)}
                  fill="none"
                  stroke={msgColors.dot.replace('bg-', '').replace('500', '200')}
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1.2 / speed, ease: "easeInOut" }}
                />
                {/* Main line */}
                <motion.path
                  d={getPath(fromAgent, toAgent)}
                  fill="none"
                  stroke={msgColors.dot.replace('bg-', '').replace('500', '500')}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 / speed, ease: "easeOut" }}
                />
                {/* Moving dot */}
                <motion.circle
                  r="5"
                  fill={msgColors.dot.replace('bg-', '').replace('500', '500')}
                  initial={{ 
                    cx: `${fromAgent.x}%`, 
                    cy: `${fromAgent.y}%`,
                    opacity: 1
                  }}
                  animate={{ 
                    cx: `${toAgent.x}%`, 
                    cy: `${toAgent.y}%`,
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 0.8 / speed, ease: "easeInOut" }}
                />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Agents */}
        {agents.map((agent) => {
          const isActive = currentMsg.from === agent.id || currentMsg.to === agent.id;
          const isSelected = selectedAgent === agent.id;

          return (
            <motion.div
              key={agent.id}
              className="absolute cursor-pointer"
              style={{
                left: `${agent.x}%`,
                top: `${agent.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
              whileHover={{ scale: 1.08 }}
              animate={{
                scale: isSelected ? 1.1 : isActive ? 1.05 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Agent Card */}
              <div
                className={`relative flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br ${agent.color} shadow-lg transition-all ${
                  isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-blue-200' : ''
                } ${isSelected ? 'ring-4 ring-gray-200 ring-offset-2' : ''}`}
              >
                {/* Status indicator */}
                <div className="absolute -top-1 -right-1">
                  <span className="relative flex h-3 w-3">
                    {isActive && (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </>
                    )}
                    {!isActive && (
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white/50"></span>
                    )}
                  </span>
                </div>

                <span className="text-2xl sm:text-3xl mb-1">{agent.icon}</span>
                <span className="text-[10px] sm:text-xs font-bold text-white whitespace-nowrap">
                  {agent.name}
                </span>
              </div>

              {/* Label below */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-[10px] text-gray-500 text-center max-w-[80px] leading-tight">
                  {agent.role}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Active Message Bubble */}
        <AnimatePresence mode="wait">
          {fromAgent && toAgent && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className={`${msgColors.bg} ${msgColors.border} border rounded-xl px-4 py-3 shadow-lg max-w-[220px]`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-2 h-2 rounded-full ${msgColors.dot}`} />
                  <span className={`text-[10px] uppercase tracking-wider font-semibold ${msgColors.text}`}>
                    {currentMsg.dataType}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-[10px] text-gray-500">
                    {fromAgent.name} → {toAgent.name}
                  </span>
                </div>
                <p className="text-sm text-gray-800 font-medium leading-snug">
                  {currentMsg.message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Section: Agent Details OR Message Log */}
      <AnimatePresence mode="wait">
        {selectedAgent ? (
          <motion.div
            key="agent-detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            {agents
              .filter((a) => a.id === selectedAgent)
              .map((agent) => (
                <div 
                  key={agent.id} 
                  className={`p-4 rounded-xl ${agent.bgColor} border border-gray-200`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{agent.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-800">{agent.name}</h4>
                        <p className="text-xs text-gray-600">{agent.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAgent(null);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.map((cap, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/80 text-gray-700 border border-gray-200"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </motion.div>
        ) : showLogs ? (
          <motion.div
            key="message-log"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 max-h-[180px] overflow-y-auto">
              <div className="space-y-2">
                {workflow.map((msg, idx) => {
                  const colors = dataTypeColors[msg.dataType];
                  const isCurrent = idx === currentStep;
                  const from = agents.find((a) => a.id === msg.from);
                  const to = agents.find((a) => a.id === msg.to);
                  
                  return (
                    <motion.div
                      key={msg.id}
                      className={`flex items-center gap-3 p-2 rounded-lg text-xs transition-all ${
                        isCurrent ? `${colors.bg} border ${colors.border}` : 'bg-white border border-gray-100'
                      }`}
                      animate={{ 
                        opacity: isCurrent ? 1 : 0.6,
                        scale: isCurrent ? 1.02 : 1
                      }}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? colors.dot : 'bg-gray-300'}`} />
                      <span className="text-gray-400 w-5">#{msg.id}</span>
                      <span className="text-gray-500">
                        {from?.icon} → {to?.icon}
                      </span>
                      <span className={`font-medium ${isCurrent ? 'text-gray-800' : 'text-gray-600'}`}>
                        {msg.message}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4"
          >
            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 whitespace-nowrap">Workflow Progress</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentStep + 1) / workflow.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {currentStep + 1}/{workflow.length}
              </span>
            </div>
            
            {/* Current step description */}
            <motion.p 
              key={currentStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-gray-500 mt-2 text-center"
            >
              {currentMsg.description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls & Legend */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Speed controls */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400 mr-2">Speed:</span>
            {[0.5, 1, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  speed === s 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-[10px]">
            {Object.entries(dataTypeColors).map(([type, colors]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                <span className="text-gray-500 capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {!selectedAgent && !showLogs && (
          <p className="text-center text-xs text-gray-400 mt-3">
            Click any agent to view details, or click "Show Logs" to see all messages
          </p>
        )}
      </div>
    </div>
  );
}
