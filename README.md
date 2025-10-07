# JavaScript Calculator 🧮

A fully functional calculator built with HTML, CSS, and JavaScript.  
It performs basic arithmetic operations and updates results dynamically on screen, mimicking the behavior of a real calculator.

Live demo: [JavaScript Calculator by jr-delfin](https://codepen.io/jr-delfin/pen/PwZWdya)

---

## Table of Contents

1. What This Does  
2. Tools & Technologies Used  
3. How It Works  
4. Project Structure  
5. Usage / Instructions  
6. Possible Enhancements  
7. License  

---

## 1. What This Does

This project is a **browser-based calculator** that allows users to perform standard arithmetic operations directly from the web interface.  
It includes:

- Addition (+)  
- Subtraction (−)  
- Multiplication (×)  
- Division (÷)  
- Decimal support  
- Clear (AC) and Delete (DEL) functions  
- Real-time display of current input and result  
- Keyboard input support (optional, if included in your JS logic)

The calculator updates instantly as the user clicks buttons, showing both the current expression and the computed result.

---

## 2. Tools & Technologies Used

- **HTML5** – for structuring the calculator layout and buttons  
- **CSS3** – for styling, layout, and responsive design  
- **JavaScript (ES6)** – for handling all calculator logic and user interactions  
- **FreeCodeCamp Test Suite** – (if included) for validation against required user stories  
- **CodePen** – development and live demo environment  

---

## 3. How It Works

1. **Layout:**  
   The calculator is made up of:
   - A display area showing the current input and result  
   - Number buttons (0–9)  
   - Operator buttons (+, −, ×, ÷)  
   - Special buttons (AC, DEL, =)  

2. **Input Handling:**  
   Each button click triggers a JavaScript event listener that appends the value to the display.  
   The logic checks:
   - Prevents multiple consecutive operators  
   - Prevents multiple decimals in a single number  
   - Handles negative numbers if implemented  

3. **Computation:**  
   When the `=` button is pressed:
   - The expression string is parsed and evaluated using JavaScript’s `eval()` or a custom arithmetic function.  
   - The result is displayed in real time.  

4. **Clear & Delete:**  
   - **AC (All Clear):** Resets both display and stored expression.  
   - **DEL:** Removes the last entered character.  

5. **Responsive Design:**  
   CSS Grid or Flexbox ensures the calculator adapts to different screen sizes, making it usable on both desktop and mobile devices.  
