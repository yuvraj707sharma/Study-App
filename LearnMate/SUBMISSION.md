# LearnMate Submission

**App Name & Description:**
LearnMate – Your Personal Learning Assistant. LearnMate adapts to your unique learning style, offering mind maps for visual learners, text-to-speech for auditory learners, interactive quizzes for kinesthetic learners, and smart note-taking for reading/writing learners—all in one app!

**Learning Style Focus:**
Supports Visual, Auditory, Kinesthetic, and Reading/Writing learners.

**Key Features:**
- Visual: Mind map generator with draggable nodes
- Auditory: Text-to-speech summaries
- Kinesthetic: Interactive quick quizzes
- Reading/Writing: Smart note-taking

**Code Snippet (Copilot Agent Shined):**
```jsx
// Mind Map Generator (Visual Learner Feature)
function MindMap() {
  const [nodes, setNodes] = useState([
    { id: 1, text: 'Main Topic', x: 200, y: 100 }
  ]);
  const [newNodeText, setNewNodeText] = useState('');

  const addNode = () => {
    if (!newNodeText.trim()) return;
    setNodes([
      ...nodes,
      { id: nodes.length + 1, text: newNodeText, x: 200 + nodes.length * 40, y: 100 + nodes.length * 40 }
    ]);
    setNewNodeText('');
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h2>Mind Map Generator</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          value={newNodeText}
          onChange={e => setNewNodeText(e.target.value)}
          placeholder="Add a node..."
        />
        <button onClick={addNode}>Add</button>
      </div>
      <svg width="500" height="300" style={{ border: '1px solid #ccc', background: '#f9f9f9' }}>
        {nodes.map((node, idx) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r="30" fill="#90caf9" />
            <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fontSize="14">{node.text}</text>
            {idx > 0 && (
              <line x1={nodes[0].x} y1={nodes[0].y} x2={node.x} y2={node.y} stroke="#1976d2" strokeWidth="2" />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
```

**Demo Link:**
- (Replace with your live demo or repo link)
