import React, { useState } from 'react';
import { AgenticSankey, RAGStateMachine } from './components/visualizations';
import './App.css';

const ObservabilityDashboard = () => {
  const [activeView, setActiveView] = useState('pipeline');

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>System Observability</h2>
        <nav className="dashboard-nav">
          <button 
            className={`nav-button ${activeView === 'pipeline' ? 'active' : ''}`}
            onClick={() => setActiveView('pipeline')}
          >
            Pipeline Flow
          </button>
          <button 
            className={`nav-button ${activeView === 'rag-loop' ? 'active' : ''}`}
            onClick={() => setActiveView('rag-loop')}
          >
            RAG Logic
          </button>
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
