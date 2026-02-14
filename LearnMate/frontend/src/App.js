import React, { useState } from 'react';

const learningStyles = [
  { key: 'visual', label: 'Visual (Mind Map, Diagrams)' },
  { key: 'auditory', label: 'Auditory (Text-to-Speech, Audio)' },
  { key: 'kinesthetic', label: 'Kinesthetic (Quizzes, Games)' },
  { key: 'reading', label: 'Reading/Writing (Notes, Summaries)' },
];

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

function App() {
  const [style, setStyle] = useState('');

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>LearnMate: Personal Learning Assistant</h1>
      {!style && (
        <>
          <p>Select your learning style to get started!</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {learningStyles.map(ls => (
              <button key={ls.key} onClick={() => setStyle(ls.key)}>{ls.label}</button>
            ))}
          </div>
        </>
      )}
      {style === 'visual' && <MindMap />}
      {style === 'auditory' && <TextToSpeech />}
      {style === 'kinesthetic' && <Quiz />}
      {style === 'reading' && <NoteTaker />}
      {style && <button onClick={() => setStyle('')} style={{ marginTop: '2rem' }}>Back</button>}
    </div>
  );
}

// Kinesthetic learner feature: Simple Quiz
function Quiz() {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const questions = [
    { q: 'What is the capital of France?', a: 'Paris' },
    { q: '2 + 2 = ?', a: '4' },
    { q: 'What color do you get when you mix red and blue?', a: 'Purple' },
  ];

  const check = () => {
    if (answer.trim().toLowerCase() === questions[idx].a.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback('Try again!');
    }
  };

  const next = () => {
    setIdx((i) => (i + 1) % questions.length);
    setAnswer('');
    setFeedback('');
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h2>Quick Quiz</h2>
      <div style={{ marginBottom: '1rem' }}>{questions[idx].q}</div>
      <input
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        placeholder="Your answer"
      />
      <button onClick={check} style={{ marginLeft: '0.5rem' }}>Check</button>
      {feedback && <div style={{ marginTop: '0.5rem' }}>{feedback}</div>}
      <br />
      <button onClick={next} style={{ marginTop: '1rem' }}>Next Question</button>
    </div>
  );
}

// Reading/Writing learner feature: Smart Note-Taking
function NoteTaker() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  const addNote = () => {
    if (!input.trim()) return;
    setNotes([...notes, input]);
    setInput('');
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h2>Smart Note-Taking</h2>
      <textarea
        rows={3}
        style={{ width: '100%', maxWidth: 400 }}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Write your note here..."
      />
      <br />
      <button onClick={addNote} style={{ marginTop: '0.5rem' }}>Add Note</button>
      <ul style={{ marginTop: '1rem' }}>
        {notes.map((note, i) => (
          <li key={i} style={{ background: '#f1f8e9', margin: '0.5rem 0', padding: '0.5rem', borderRadius: '4px' }}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

// Auditory learner feature: Text-to-Speech
function TextToSpeech() {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!text.trim()) return;
    const utter = new window.SpeechSynthesisUtterance(text);
    setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h2>Text-to-Speech Summary</h2>
      <textarea
        rows={4}
        style={{ width: '100%', maxWidth: 400 }}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type or paste text to hear it aloud..."
      />
      <br />
      <button onClick={speak} disabled={speaking} style={{ marginTop: '0.5rem' }}>
        {speaking ? 'Speaking...' : 'Speak'}
      </button>
    </div>
  );
}

export default App;
