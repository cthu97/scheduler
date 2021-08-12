import {useState} from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    setMode(newMode);
    history.push(newMode);
    setHistory([...history]);
  };
  
  const back = () => {
    if (history.length === 1) return;
    setHistory(prev => [...prev.slice(0, prev.length - 1)])
    setMode(history[history.length - 2])
  }

  return {
    mode,
    transition,
    back
  }
};
