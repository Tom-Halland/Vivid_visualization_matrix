# Agentic Pipeline Observability Visualizations

A collection of interactive frontend components designed to monitor, debug, and visualize the internal state of multi-agent LLM systems and advanced Retrieval-Augmented Generation (RAG) loops. 

These components translate complex, asynchronous agent interactions and cross-attention discrepancies into readable, interactive topological layouts.

## Table of Contents
- [Components Overview](#components-overview)
  - [1. Agentic Pipeline Flow Visualizer](#1-agentic-pipeline-flow-visualizer)
  - [2. Agentic RAG State Machine](#2-agentic-rag-state-machine)
- [Tech Stack](#tech-stack)
- [Integration Example](#integration-example)

---

## Components Overview

### 1. Agentic Pipeline Flow Visualizer
A dynamic Sankey diagram engineered to trace data flow, tool invocations, and error propagation ("cross-indiscretions") across a multi-agent network.

* **Component ID:** `agentic-pipeline-sankey`
* **Layout Strategy:** Standard Visualization (Canvas Top, Controls Bottom)
* **Core Objective:** Map the lifecycle of a prompt from the Router Agent through Retrieval, Synthesis, and Evaluation, highlighting logic breaks.
* **Interactive Inputs:**
  * **Pipeline Complexity (Slider):** Scales the UI from a simple linear RAG to a complex, multi-agent peer-to-peer network.
  * **Error Injection Rate (Slider):** Simulates hallucination triggers or dropped context, dynamically updating the Sankey node weights to show feedback loop bottlenecks.

### 2. Agentic RAG State Machine
An interactive directed graph visualizing the conditional routing and fallback logic within an evaluative RAG `while` loop. 

* **Component ID:** `agentic-rag-loop-diagram`
* **Layout Strategy:** Standard Visualization
* **Core Objective:** Demonstrate the decision-making process of the Grader/Evaluator agent and the subsequent paths for query rewriting.
* **Interactive Inputs:**
  * **Query Status (Toggle Buttons):** 
    * `Relevant Context Found`: Triggers the linear path to Generator -> Final Output.
    * `Irrelevant Context`: Triggers the fallback path to the Query Rewriter -> Retriever loop.
    * `Hallucination Detected`: Triggers the defensive path from Generator back to Rewriter.

---

## Tech Stack
These visualizations are framework-agnostic but designed to be mounted within modern component-based architectures.
* **Rendering Engines:** `D3.js`, `D3-Sankey`, `Mermaid.js`
* **State Handling:** Vanilla JS or standard React state hooks.
* **Styling:** Inherits local CSS variables; no hardcoded theme values to ensure seamless integration with existing UI libraries.

---

## Integration Example

Below is a standard implementation pattern for mounting these widgets within a React environment.

```jsx
import React, { useState } from 'react';
import { AgenticSankey, RAGStateMachine } from './components/visualizations';

const ObservabilityDashboard = () => {
  const [activeView, setActiveView] = useState('pipeline');

  return (
    <div className="dashboard-container">
      <header>
        <h2>System Observability</h2>
        <nav>
          <button onClick={() => setActiveView('pipeline')}>Pipeline Flow</button>
          <button onClick={() => setActiveView('rag-loop')}>RAG Logic</button>
        </nav>
      </header>

      <main className="visualization-viewport" style={{ height: '700px' }}>
        {activeView === 'pipeline' ? (
          <AgenticSankey height="100%" id="agentic-pipeline-sankey"/>
        ) : (
          <RAGStateMachine height="100%" id="agentic-rag-loop-diagram"/>
        )}
      </main>
    </div>
  );
};

export default ObservabilityDashboard;
<!-- debug 2 -->
