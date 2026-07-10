# Integration Example Setup Guide

This directory contains a complete React implementation of the Agentic Pipeline Observability visualization dashboard.

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── AgenticSankey.jsx          # Sankey diagram for pipeline flow
│   │   ├── RAGStateMachine.jsx         # Mermaid-based state machine diagram
│   │   └── visualizations.js           # Component exports
│   ├── styles/
│   │   └── visualizations.css          # Visualization styling
│   ├── App.jsx                         # Main dashboard component
│   ├── App.css                         # Dashboard styling
│   ├── index.css                       # Global styles
│   └── main.jsx                        # React entry point
├── index.html                          # HTML entry point
├── vite.config.js                      # Vite configuration
├── package.json                        # Dependencies and scripts
├── .eslintrc.json                      # ESLint configuration
└── .gitignore                          # Git ignore rules
```

## Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```
   Output will be in the `dist/` directory

## Component Overview

### AgenticSankey Component
- **Purpose**: Visualizes multi-agent pipeline flow using D3.js Sankey diagram
- **Interactive Controls**:
  - **Pipeline Complexity Slider**: Adjusts the complexity from simple linear to multi-agent peer-to-peer
  - **Error Injection Rate Slider**: Simulates hallucination and dropped context scenarios
- **Features**:
  - Dynamic node and link generation based on complexity level
  - Color-coded links showing health/error rates
  - Responsive sizing and smooth transitions

### RAGStateMachine Component
- **Purpose**: Displays conditional routing and fallback logic in RAG evaluation loops
- **Interactive Controls**:
  - **Query Status Buttons**:
    - ✓ **Relevant Context Found**: Shows linear path to generation and output
    - ✗ **Irrelevant Context**: Demonstrates fallback to query rewriting and retrieval loop
    - ⚠ **Hallucination Detected**: Shows defensive path from generator back to rewriter
- **Features**:
  - Dynamic Mermaid diagram generation
  - Color-coded states for visual clarity
  - Real-time state transitions

### ObservabilityDashboard Component
- **Purpose**: Main integration component that manages visualization switching
- **Features**:
  - Tab-based navigation between visualizations
  - Responsive layout with header and viewport
  - Theme-aware styling using CSS variables

## Styling System

The project uses CSS custom properties (variables) for theming:

```css
--primary-color: #4a90e2;
--secondary-color: #50c878;
--accent-color: #ff6b6b;
--background-color: #f5f7fa;
--text-color: #333;
--success-color: #90ee90;
--warning-color: #ffd700;
--error-color: #ff6b6b;
--info-color: #87ceeb;
```

Customize the theme by modifying these variables in `src/index.css`.

## Dependencies

- **React 18.3.1**: UI framework
- **D3.js 7.8.5**: Data visualization
- **D3-Sankey 0.12.3**: Sankey diagram layout
- **Mermaid 10.6.1**: Diagram rendering
- **Vite 5.0.8**: Build tool and dev server

## Development Tips

1. **Hot Module Replacement (HMR)**: Changes to React components are reflected instantly during development
2. **D3 Debugging**: Use browser DevTools to inspect SVG elements and D3 selections
3. **Mermaid Rendering**: Clear the mermaid cache if diagrams don't update: `mermaid.contentLoaded()`
4. **Responsive Design**: Test on mobile by resizing browser or using DevTools device emulation

## Integration into Existing Projects

To integrate these components into your own React application:

```jsx
import { AgenticSankey, RAGStateMachine } from './components/visualizations';

// Use in your component
<AgenticSankey height="600px" id="my-sankey" />
<RAGStateMachine height="600px" id="my-rag-diagram" />
```

## Performance Considerations

- Sankey diagram complexity is limited to ~7 nodes by default; adjust `sankeyGenerator.extent()` for larger networks
- Mermaid diagrams are re-rendered when `queryStatus` changes; consider memoization for frequent updates
- D3 selections are cleaned up before re-rendering to prevent memory leaks

## Troubleshooting

### Visualizations Not Appearing
- Check browser console for errors
- Verify that ref containers have defined dimensions
- Ensure D3 and Mermaid have loaded before component mount

### Slider Not Working
- Verify that the state update handler is correctly bound
- Check that the `onChange` event is firing

### Mermaid Diagram Not Updating
- Manually trigger `mermaid.contentLoaded()` after diagram updates
- Clear the mermaid cache: `mermaid.mermaidAPI.reset()`

## Next Steps

- Integrate real data from your agentic system
- Add WebSocket connections for live pipeline monitoring
- Implement state persistence using localStorage or a backend API
- Extend with additional visualization types (graph layouts, timelines, etc.)

## License

This project is part of the Agentic Pipeline Observability Visualizations suite. See the root README for license details.
