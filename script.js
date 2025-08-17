let currentInput = '';
        let currentOperation = '';
        let previousInput = '';

        function appendNumber(number) {
            currentInput += number;
            document.getElementById('display').value = `${previousInput} ${currentOperation} ${currentInput}`;
        }



         

        function calculateLog() {
            let value = parseFloat(currentInput);
            if (isNaN(value) || value <= 0) {
                document.getElementById('display').value = 'Error';
                return;
            }
            let result = Math.log10(value);
            currentInput = result.toString();
            previousInput = '';
            currentOperation = '';
            document.getElementById('display').value = currentInput;
        }



        function calculateTrig(func) {
        let display = document.getElementById('display');
        let angleDegrees = parseFloat(display.value);

        if (isNaN(angleDegrees)) {
        display.value = "Error";
        return;
        }

        let angleRadians = angleDegrees * (Math.PI / 180);
        let result;

        if (func === 'sin') {
        result = Math.sin(angleRadians);
        } else if (func === 'cos') {
        result = Math.cos(angleRadians);
       }

        display.value = result;
     }


        function backspace() {
          if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          updateDisplay();
          }
          }

        function appendOperation(operation) {
            if (currentInput === '') return;
            if (previousInput !== '') {
                calculate(); // Calculate the previous operation before appending a new one
            }
            currentOperation = operation;
            previousInput = currentInput;
            currentInput = '';
            document.getElementById('display').value = `${previousInput} ${currentOperation}`;
        }

        function calculate() {
            // Evaluate the full expression in currentInput (and previousInput/currentOperation if present)
            let expression = '';
            if (previousInput && currentOperation && currentInput) {
                expression = previousInput + currentOperation + currentInput;
            } else {
                expression = currentInput;
            }
            // Replace ^ with ** for exponentiation
            expression = expression.replace(/\^/g, '**');
            try {
                // Only allow safe characters
                if (!/^[0-9+\-*/().% ]+$/.test(expression)) {
                    throw new Error('Invalid characters in expression');
                }
                let result = eval(expression);
                if (typeof result === 'undefined' || isNaN(result)) {
                    throw new Error('Invalid calculation');
                }
                currentInput = result.toString();
                currentOperation = '';
                previousInput = '';
                document.getElementById('display').value = currentInput;
            } catch (e) {
                document.getElementById('display').value = 'Error';
            }
        }

        function clearDisplay() {
            currentInput = '';
            previousInput = '';
            currentOperation = '';
            document.getElementById('display').value = '';
        }
        
        
        function backspace() {
            currentInput = '';
            previousInput = '';
            currentOperation = '';
            document.getElementById('display').value = '';
        }

