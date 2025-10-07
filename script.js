// JavaScript Calculator - formula logic, precise, and test-ready.
// Exact required IDs are present in HTML (zero..nine, add, subtract, multiply, divide, decimal, clear, equals, display).

(function () {
  // DOM references
  const displayEl = document.getElementById('display');
  const btns = document.querySelectorAll('.btn');

  // State
  let expression = '';      // full formula string used for evaluation, e.g. "5+3*2"
  let current = '0';        // what is shown on screen for the current operand
  let lastType = 'clear';   // 'num' | 'op' | 'equals' | 'clear'
  // currentDecimal flag derived from current.includes('.')

  // helpers
  const updateDisplay = (value) => {
    displayEl.textContent = value;
  };

  const isOperator = (ch) => ['+', '-', '*', '/'].includes(ch);

  const sanitizeForEval = (expr) => {
    // ensure no trailing operator (strip operators at end)
    return expr.replace(/[+\-*/]+$/g, '');
  };

  const evaluateExpression = (expr) => {
    // Use Function to evaluate safely in this context
    try {
      const safe = sanitizeForEval(expr);
      // In case empty
      if (!safe) return 0;
      const result = Function('"use strict"; return (' + safe + ')')();
      // Round to 10 decimal places and trim trailing zeros
      if (!isFinite(result)) return 'Error';
      const rounded = parseFloat(result.toFixed(10));
      return rounded;
    } catch (err) {
      return 'Error';
    }
  };

  // Input handlers
  function inputNumber(num) {
    if (lastType === 'equals') {
      // start new calculation
      expression = num === '0' ? '0' : num;
      current = num;
      lastType = 'num';
      updateDisplay(current);
      return;
    }

    if (lastType === 'op') {
      // start a new operand
      current = num;
      expression += num;
      lastType = 'num';
      updateDisplay(current);
      return;
    }

    // lastType is 'num' or 'clear'
    if (lastType === 'clear') {
      expression = num;
      current = num;
      lastType = 'num';
      updateDisplay(current);
      return;
    }

    // Prevent multiple leading zeros
    if (current === '0' && num === '0') {
      // ignore
      return;
    }
    if (current === '0' && num !== '0' && !current.includes('.')) {
      // replace the leading zero both in current and expression
      current = num;
      // remove the last char from expression (the '0') then append
      expression = expression.slice(0, -1) + num;
      updateDisplay(current);
      return;
    }

    // Normal append
    current += num;
    expression += num;
    lastType = 'num';
    updateDisplay(current);
  }

  function inputDecimal() {
    if (lastType === 'equals') {
      // start new number "0."
      expression = '0.';
      current = '0.';
      lastType = 'num';
      updateDisplay(current);
      return;
    }

    if (current.includes('.')) return; // disallow second decimal in current number

    if (lastType === 'op' || lastType === 'clear') {
      current = '0.';
      expression += '0.';
      lastType = 'num';
      updateDisplay(current);
      return;
    }

    // last is num and doesn't contain decimal
    current += '.';
    expression += '.';
    lastType = 'num';
    updateDisplay(current);
  }

  function inputOperator(opSymbol) {
    // Convert display symbols to JS operators if needed
    const op = opSymbol;

    if (lastType === 'clear' && op === '-') {
      // allow negative start
      expression = '-';
      current = '-';
      lastType = 'op';
      updateDisplay(current);
      return;
    }

    if (lastType === 'op') {
      // If user enters two or more operators in a row:
      // If new operator is '-' and the last operator is not '-' => append minus (for negative)
      const lastChar = expression.slice(-1);
      if (op === '-' && lastChar !== '-') {
        expression += '-';
        current = '-';
        lastType = 'op';
        updateDisplay(op);
        return;
      } else {
        // Replace trailing operator(s) with the new operator (so last operator wins)
        expression = expression.replace(/[+\-*/]+$/g, '') + op;
        current = op;
        lastType = 'op';
        updateDisplay(op);
        return;
      }
    }

    if (lastType === 'equals') {
      // Start new expression using result (expression holds the result already)
      expression = expression + op;
      current = op;
      lastType = 'op';
      updateDisplay(op);
      return;
    }

    // lastType is 'num'
    expression += op;
    current = op;
    lastType = 'op';
    updateDisplay(op);
  }

  function clearAll() {
    expression = '';
    current = '0';
    lastType = 'clear';
    updateDisplay('0');
  }

  function handleEquals() {
    if (lastType === 'op') {
      // Strip trailing operators before eval
      expression = sanitizeForEval(expression);
    }
    if (!expression) {
      updateDisplay('0');
      lastType = 'equals';
      return;
    }
    const result = evaluateExpression(expression);
    updateDisplay(result.toString());
    // set expression to result so operator after equals can use it
    expression = (typeof result === 'number' || !isNaN(Number(result))) ? result.toString() : '';
    current = expression || '0';
    lastType = 'equals';
  }

  // Attach event listeners
  // number buttons zero..nine
  const mapNumbers = {
    'zero': '0','one':'1','two':'2','three':'3','four':'4',
    'five':'5','six':'6','seven':'7','eight':'8','nine':'9'
  };
  Object.keys(mapNumbers).forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => inputNumber(mapNumbers[id]));
  });

  // decimal
  const decimalBtn = document.getElementById('decimal');
  if (decimalBtn) decimalBtn.addEventListener('click', inputDecimal);

  // clear
  const clearBtn = document.getElementById('clear');
  if (clearBtn) clearBtn.addEventListener('click', clearAll);

  // operators
  const ops = {
    'add': '+',
    'subtract': '-',
    'multiply': '*',
    'divide': '/'
  };
  Object.keys(ops).forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => inputOperator(ops[id]));
  });

  // equals
  const eqBtn = document.getElementById('equals');
  if (eqBtn) eqBtn.addEventListener('click', handleEquals);

  // Keyboard support (optional): numbers, operators, decimal, enter, backspace, escape (clear)
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (/^[0-9]$/.test(key)) {
      inputNumber(key);
      return;
    }
    if (key === '.') {
      inputDecimal();
      return;
    }
    if (key === '+' || key === '-' || key === '*' || key === '/') {
      inputOperator(key);
      return;
    }
    if (key === 'Enter' || key === '=') {
      e.preventDefault();
      handleEquals();
      return;
    }
    if (key === 'Escape') {
      clearAll();
      return;
    }
  });

  // initialize
  clearAll();

})();
