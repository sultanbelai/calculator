import React, { useState, useEffect, useCallback } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const clearAll = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const clearDisplay = useCallback(() => {
    setDisplay('0');
    setWaitingForOperand(false);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const inputDigit = useCallback((digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const performOperation = useCallback((nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      // Add to history
      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [...prev.slice(-4), historyEntry]); // Keep last 5 entries
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = useCallback(() => {
    if (!previousValue || !operation) return;

    const inputValue = parseFloat(display);
    const newValue = calculate(previousValue, inputValue, operation);
    
    setDisplay(String(newValue));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
    
    // Add to history
    const historyEntry = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
    setHistory(prev => [...prev.slice(-4), historyEntry]);
  }, [previousValue, operation, display]);

  const handlePercentage = useCallback(() => {
    const inputValue = parseFloat(display);
    const newValue = inputValue / 100;
    setDisplay(String(newValue));
    setWaitingForOperand(true);
  }, [display]);

  const handlePlusMinus = useCallback(() => {
    const inputValue = parseFloat(display);
    const newValue = -inputValue;
    setDisplay(String(newValue));
  }, [display]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputDigit(parseInt(key));
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
      } else if (key === 'Escape') {
        clearAll();
      } else if (key === 'Backspace') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
      } else if (key === '%') {
        handlePercentage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDecimal, performOperation, handleEquals, clearAll, display, handlePercentage]);

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-header">
          <div className="history-label">History</div>
          {history.length > 0 && (
            <button 
              className="clear-history-btn" 
              onClick={clearHistory}
              title="Clear History"
              aria-label="Clear calculation history"
            >
              Clear
            </button>
          )}
        </div>
        <div className="calculator-history">
          {history.length === 0 ? (
            <div className="history-empty">No calculations yet</div>
          ) : (
            history.map((entry, index) => (
              <div key={index} className="history-entry">
                {entry}
              </div>
            ))
          )}
        </div>
        <div className="display-value">
          {display}
        </div>
      </div>
      
      <div className="calculator-buttons">
        <button className="btn btn-secondary" onClick={clearAll}>
          AC
        </button>
        <button className="btn btn-secondary" onClick={handlePlusMinus}>
          ±
        </button>
        <button className="btn btn-secondary" onClick={handlePercentage}>
          %
        </button>
        <button 
          className={`btn btn-operator ${operation === '÷' ? 'active' : ''}`}
          onClick={() => performOperation('÷')}
        >
          ÷
        </button>
        
        <button className="btn btn-number" onClick={() => inputDigit(7)}>
          7
        </button>
        <button className="btn btn-number" onClick={() => inputDigit(8)}>
          8
        </button>
        <button className="btn btn-number" onClick={() => inputDigit(9)}>
          9
        </button>
        <button 
          className={`btn btn-operator ${operation === '×' ? 'active' : ''}`}
          onClick={() => performOperation('×')}
        >
          ×
        </button>
        
        <button className="btn btn-number" onClick={() => inputDigit(4)}>
          4
        </button>
        <button className="btn btn-number" onClick={() => inputDigit(5)}>
          5
        </button>
        <button className="btn btn-number" onClick={() => inputDigit(6)}>
          6
        </button>
        <button 
          className={`btn btn-operator ${operation === '-' ? 'active' : ''}`}
          onClick={() => performOperation('-')}
        >
          −
        </button>
        
        <button className="btn btn-number" onClick={() => inputDigit(1)}>
          1
        </button>
        <button className="btn btn-number" onClick={() => inputDigit(2)}>
          2
        </button>
        <button className="btn btn-number" onClick={() => inputDigit(3)}>
          3
        </button>
        <button 
          className={`btn btn-operator ${operation === '+' ? 'active' : ''}`}
          onClick={() => performOperation('+')}
        >
          +
        </button>
        
        <button className="btn btn-number btn-zero" onClick={() => inputDigit(0)}>
          0
        </button>
        <button className="btn btn-number" onClick={inputDecimal}>
          .
        </button>
        <button className="btn btn-equals" onClick={handleEquals}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;