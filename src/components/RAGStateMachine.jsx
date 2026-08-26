import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import '../styles/visualizations.css';

const RAGStateMachine = ({ height = '100%', id = 'agentic-rag-loop-diagram' }) => {
  const containerRef = useRef(null);
  const [queryStatus, setQueryStatus] = useState('relevant');

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'default' });
  }, []);

  const getStateTransitionDiagram = (status) => {
    let diagram = `graph TD
    A["User Query"] -->|Submitted| B["Retriever"]
    B -->|Fetch Context| C["Context Window"]
    C -->|Evaluate| D["Grader Agent"]`;

    if (status === 'relevant') {
      diagram += `
    D -->|✓ Relevant Context Found| E["Generator"]
    E -->|Synthesize| F["Final Output"]
    F -->|Return| G["User Response"]
    style D fill:#90EE90
    style E fill:#90EE90
    style F fill:#90EE90`;
    } else if (status === 'irrelevant') {
      diagram += `
    D -->|✗ Irrelevant Context| H["Query Rewriter"]
    H -->|Reformulate Query| I["Refined Query"]
    I -->|Loop Back| B
    style D fill:#FFB6C6
    style H fill:#FFD700
    style I fill:#FFD700`;
    } else if (status === 'hallucination') {
      diagram += `
    D -->|✓ Context OK| E["Generator"]
    E -->|Generating...| J["Hallucination Detector"]
    J -->|⚠ Hallucination Detected| H["Query Rewriter"]
    H -->|Reformulate Query| I["Refined Query"]
    I -->|Loop Back| B
    E -->|No Hallucination| F["Final Output"]
    F -->|Return| G["User Response"]
    style J fill:#FF6B6B
    style H fill:#FFD700
    style E fill:#FFE4B5`;
    }

    diagram += `
    style A fill:#87CEEB
    style G fill:#98FB98`;

    return diagram;
  };

  useEffect(() => {
    const diagram = getStateTransitionDiagram(queryStatus);
    const element = containerRef.current;
    if (element) {
      element.innerHTML = '';
      mermaid.contentLoaded();
      mermaid.render(id, diagram).then(({ svg }) => {
        element.innerHTML = svg;
      });
    }
  }, [queryStatus]);

  return (
    <div className="visualization-container">
      <div className="controls-panel">
        <div className="control-group">
          <label>Query Status</label>
          <div className="button-group">
            <button
              className={`state-button ${queryStatus === 'relevant' ? 'active' : ''}`}
              onClick={() => setQueryStatus('relevant')}
              title="Context is relevant and sufficient"
            >
              ✓ Relevant Context Found
            </button>
            <button
              className={`state-button ${queryStatus === 'irrelevant' ? 'active' : ''}`}
              onClick={() => setQueryStatus('irrelevant')}
              title="Context is not relevant"
            >
              ✗ Irrelevant Context
            </button>
            <button
              className={`state-button ${queryStatus === 'hallucination' ? 'active' : ''}`}
              onClick={() => setQueryStatus('hallucination')}
              title="Hallucination detected in generation"
            >
              ⚠ Hallucination Detected
            </button>
          </div>
        </div>
      </div>
      <div 
        ref={containerRef} 
        className="mermaid-container" 
        style={{ 
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto'
        }}
      />
    </div>
  );
};

export default RAGStateMachine;
