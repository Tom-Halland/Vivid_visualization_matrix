import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import '../styles/visualizations.css';

const AgenticSankey = ({ height = '100%', id = 'agentic-pipeline-sankey' }) => {
  const containerRef = useRef(null);
  const [complexity, setComplexity] = useState(50);
  const [errorRate, setErrorRate] = useState(20);

  const generateSankeyData = (complexity, errorRate) => {
    const nodes = [
      { name: 'User Query' },
      { name: 'Router Agent' },
      { name: 'Retriever' },
      { name: 'Synthesizer' },
      { name: 'Evaluator' },
      { name: 'Output Cache' },
      { name: 'Final Response' }
    ];

    // Add complexity nodes
    const complexityLevel = Math.floor((complexity / 100) * 3);
    if (complexityLevel > 0) {
      nodes.splice(3, 0, { name: 'Query Rewriter' });
    }
    if (complexityLevel > 1) {
      nodes.splice(5, 0, { name: 'Grader Agent' });
    }
    if (complexityLevel > 2) {
      nodes.splice(6, 0, { name: 'Feedback Loop' });
    }

    const baseLinks = [
      { source: 0, target: 1, value: 100 - errorRate },
      { source: 1, target: 2, value: 100 - errorRate },
      { source: 2, target: 3, value: 100 - (errorRate * 0.5) },
      { source: 3, target: 4, value: 100 - errorRate },
      { source: 4, target: 5, value: 100 - (errorRate * 0.8) },
      { source: 5, target: 6, value: 100 - errorRate },
      { source: 1, target: 4, value: errorRate * 0.5 }
    ];

    return { nodes, links: baseLinks };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const data = generateSankeyData(complexity, errorRate);
    const margin = { top: 20, right: 160, bottom: 20, left: 160 };
    const width = containerRef.current.clientWidth - margin.left - margin.right;
    const containerHeight = containerRef.current.clientHeight - margin.top - margin.bottom;

    // Clear previous SVG
    d3.select(containerRef.current).selectAll('svg').remove();

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', containerHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create sankey generator
    const sankeyGenerator = sankey()
      .nodeWidth(15)
      .nodePadding(50)
      .extent([[1, 1], [Math.max(2, width - 1), Math.max(2, containerHeight - 1)]]);

    // Generate sankey layout
    const { nodes, links } = sankeyGenerator({
      nodes: data.nodes.map(d => ({ ...d })),
      links: data.links.map(d => ({ ...d }))
    });

    // Draw links
    const link = svg.append('g')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', d => {
        const value = d.value;
        return d3.interpolateRdYlGn(Math.min(value / 100, 1));
      })
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', d => Math.max(1, d.width));

    // Add link labels
    svg.append('g')
      .selectAll('text')
      .data(links)
      .join('text')
      .attr('x', d => (d.source.x1 + d.target.x0) / 2)
      .attr('y', d => (d.source.y1 + d.target.y1) / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#666')
      .text(d => `${Math.round(d.value)}%`);

    // Draw nodes
    svg.append('g')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('height', d => d.y1 - d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('fill', '#4a90e2')
      .attr('opacity', 0.7)
      .on('hover', function() {
        d3.select(this).attr('opacity', 1);
      });

    // Add node labels
    svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr('y', d => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', d => d.x0 < width / 2 ? 'start' : 'end')
      .text(d => d.name)
      .attr('font-size', '12px')
      .attr('fill', '#333');

  }, [complexity, errorRate]);

  return (
    <div className="visualization-container">
      <div className="controls-panel">
        <div className="control-group">
          <label>Pipeline Complexity</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={complexity}
            onChange={(e) => setComplexity(Number(e.target.value))}
            className="slider"
          />
          <span className="control-value">{complexity}%</span>
        </div>
        <div className="control-group">
          <label>Error Injection Rate</label>
          <input 
            type="range" 
            min="0" 
            max="50" 
            value={errorRate}
            onChange={(e) => setErrorRate(Number(e.target.value))}
            className="slider"
          />
          <span className="control-value">{errorRate}%</span>
        </div>
      </div>
      <div ref={containerRef} className="sankey-container" style={{ height }} />
    </div>
  );
};

export default AgenticSankey;
