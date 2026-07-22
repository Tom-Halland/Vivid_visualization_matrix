# Vivid Visualization Matrix - Project Architecture

This document provides a comprehensive overview of the architecture of the Vivid Visualization Matrix project, outlining the key components, data flow, and technologies used.

## Architecture Diagram

The following diagram illustrates the high-level architecture and component interactions within the system:

```mermaid
flowchart TD

subgraph group_runtime["Browser Runtime"]
  node_vite["Vite delivery<br/>build server<br/>[vite.config.js]"]
  node_html["HTML entry<br/>browser entry<br/>[index.html]"]
  node_main["React mount<br/>React entry<br/>[main.jsx]"]
  node_app["Dashboard shell<br/>React component<br/>[App.jsx]"]
  node_app_styles["Shell styles<br/>CSS<br/>[App.css]"]
  node_global_styles["Global styles<br/>CSS<br/>[index.css]"]
end

subgraph group_widgets["Observability Widgets"]
  node_sankey["Agentic Sankey<br/>React widget<br/>[AgenticSankey.jsx]"]
  node_rag["RAG state machine<br/>React widget"]
  node_visualizations["Widget export surface<br/>component module<br/>[visualizations.js]"]
  node_sankey_data(("Local pipeline graph<br/>derived UI data<br/>[AgenticSankey.jsx]"))
  node_rag_state(("Semantic routing state<br/>derived UI state"))
end

subgraph group_rendering["Rendering Engines"]
  node_d3["D3 and D3-Sankey<br/>flow renderer<br/>[package.json]"]
  node_mermaid["Mermaid<br/>graph renderer<br/>[package.json]"]
  node_widget_styles["Visualization styles<br/>CSS<br/>[visualizations.css]"]
end

node_vite -->|serves| node_html
node_html -->|loads| node_main
node_main -->|mounts| node_app
node_app -->|composes| node_sankey
node_app -->|composes| node_rag
node_app -.->|uses| node_app_styles
node_main -.->|uses| node_global_styles
node_sankey -->|derives| node_sankey_data
node_sankey_data -->|node and link model| node_d3
node_rag -->|derives| node_rag_state
node_rag_state -->|active paths| node_mermaid
node_sankey -.->|exports through| node_visualizations
node_rag -.->|exports through| node_visualizations
node_sankey -.->|uses| node_widget_styles
node_rag -.->|uses| node_widget_styles

click node_vite "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/vite.config.js"
click node_html "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/index.html"
click node_main "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/src/main.jsx"
click node_app "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/src/App.jsx"
click node_app_styles "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/src/App.css"
click node_global_styles "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/src/index.css"
click node_sankey "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/src/components/AgenticSankey.jsx"
click node_rag "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/src/components/RAGStateMachine.jsx"
click node_visualizations "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/src/components/visualizations.js"
click node_sankey_data "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/src/components/AgenticSankey.jsx"
click node_rag_state "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/src/components/RAGStateMachine.jsx"
click node_d3 "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/package.json"
click node_mermaid "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/package.json"
click node_widget_styles "https://github.com/tom-halland/vivid_visualization_matrix/blob/main/src/styles/visualizations.css"

classDef toneNeutral fill:#f8fafc,stroke:#334155,stroke-width:1.5px,color:#0f172a
classDef toneBlue fill:#dbeafe,stroke:#2563eb,stroke-width:1.5px,color:#172554
classDef toneAmber fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#78350f
classDef toneMint fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#14532d
classDef toneRose fill:#ffe4e6,stroke:#e11d48,stroke-width:1.5px,color:#881337
classDef toneIndigo fill:#e0e7ff,stroke:#4f46e5,stroke-width:1.5px,color:#312e81
classDef toneTeal fill:#ccfbf1,stroke:#0f766e,stroke-width:1.5px,color:#134e4a
class node_vite,node_html,node_main,node_app,node_app_styles,node_global_styles toneBlue
class node_sankey,node_rag,node_visualizations,node_sankey_data,node_rag_state toneAmber
class node_d3,node_mermaid,node_widget_styles toneMint
```

## System Components

The application is structured into three primary sub-systems:

### 1. Browser Runtime
This layer handles the core application delivery, initialization, and layout.
- **Vite:** Acts as the build tool and development server, serving the initial HTML.
- **HTML & React Entry (`index.html`, `main.jsx`):** Bootstraps the React application and mounts it to the DOM.
- **Dashboard Shell (`App.jsx`):** The main container component that orchestrates layout and composes the various visualization widgets.
- **Styling:** Global styles (`index.css`) and shell-specific styles (`App.css`) manage the baseline aesthetic and layout of the application.

### 2. Observability Widgets
These components encapsulate the domain logic for the distinct visualizations.
- **Agentic Sankey (`AgenticSankey.jsx`):** A widget responsible for visualizing data pipelines or flow data. It derives a "local pipeline graph" data model for rendering.
- **RAG State Machine (`RAGStateMachine.jsx`):** A widget that visualizes semantic routing states and active paths.
- **Export Surface (`visualizations.js`):** A module serving as a consolidated export point for the widgets, facilitating easier imports elsewhere in the application.

### 3. Rendering Engines
The underlying libraries that power the actual drawing of the visualizations.
- **D3 & D3-Sankey:** Utilized by the Agentic Sankey widget to calculate and render complex flow diagrams based on the node/link model.
- **Mermaid:** Employed by the RAG State Machine widget to dynamically render state transitions based on active paths.
- **Visualization Styles (`visualizations.css`):** Scoped CSS intended specifically for tuning the appearance of the rendered SVG/HTML output from D3 and Mermaid.

## Data Flow & Interaction

1. **Initialization:** The Vite server delivers `index.html`, which loads the React entry point (`main.jsx`).
2. **Mounting:** `main.jsx` mounts the primary `App.jsx` dashboard component.
3. **Composition:** `App.jsx` composes and renders the `AgenticSankey` and `RAGStateMachine` widgets.
4. **Data Derivation & Rendering:**
   - The `AgenticSankey` component processes input to derive a structured node/link model, which is then fed into the D3/D3-Sankey engine for visual output.
   - The `RAGStateMachine` component processes its input to derive active semantic routing states, which are formulated into syntax that the Mermaid rendering engine interprets.
5. **Styling:** The rendering outputs are ultimately styled using shared and specific CSS files to ensure a cohesive look and feel.

## Future Research & Considerations

- **Performance Optimization:** As data sets for Sankey diagrams grow, evaluating WebGL-based rendering alternatives (e.g., deck.gl or custom Pixi.js implementations) over standard SVG might become necessary to maintain high frame rates.
- **Dynamic State Updates:** Investigating robust state management (like Zustand or Redux) to handle real-time streaming updates into the observability widgets without causing full re-renders of the component tree.
- **Accessibility:** Ensuring that generated SVG elements from D3 and Mermaid include appropriate ARIA labels and structure to be navigable by screen readers.
