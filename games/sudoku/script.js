class SudokuGame {
        constructor() {
            this.currentLevel = 1;
            this.puzzle = [];
            this.solution = [];
            this.currentGrid = [];
            this.selectedCell = null;
            this.timer = 0;
            this.timerInterval = null;
            this.timerStarted = false;
            this.hintsLeft = 3;
            
            this.init();
        }
        
        init() {
            this.generatePuzzle();
            this.createGrid();
            this.bindEvents();
            this.updateDisplay();
            this.updateHintsDisplay();
            this.updateLevelDisplay();
        }
        
        // Simple puzzle generator based on level
        generatePuzzle() {
            // Base easy puzzle
            const basePuzzle = [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9]
            ];
            
            const baseSolution = [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ];
            
            // Make puzzle harder by removing more numbers based on level
            this.puzzle = basePuzzle.map(row => [...row]);
            this.solution = baseSolution.map(row => [...row]);
            
            // Remove additional numbers based on level
            const cellsToRemove = Math.min(this.currentLevel * 2, 20);
            for (let i = 0; i < cellsToRemove; i++) {
                const row = Math.floor(Math.random() * 9);
                const col = Math.floor(Math.random() * 9);
                if (this.puzzle[row][col] !== 0) {
                    this.puzzle[row][col] = 0;
                }
            }
            
            this.currentGrid = this.puzzle.map(row => [...row]);
            this.hintsLeft = Math.max(5 - Math.floor(this.currentLevel / 3), 2);
        }
        
        createGrid() {
            const gridContainer = document.getElementById('sudokuGrid');
            gridContainer.innerHTML = '';
            
            for (let i = 0; i < 81; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.index = i;
                cell.addEventListener('click', () => this.selectCell(i));
                gridContainer.appendChild(cell);
            }
        }
        
        bindEvents() {
            // Number buttons
            document.querySelectorAll('.num-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const num = parseInt(btn.dataset.num);
                    this.inputNumber(num);
                });
            });
            
            // Control buttons
            document.getElementById('newGameBtn').addEventListener('click', () => this.newGame());
            document.getElementById('checkBtn').addEventListener('click', () => this.checkSolution());
            document.getElementById('hintBtn').addEventListener('click', () => this.useHint());
            
            // Keyboard input
            document.addEventListener('keydown', (e) => {
                if (this.selectedCell === null) return;
                
                const num = parseInt(e.key);
                if (num >= 1 && num <= 9) {
                    this.inputNumber(num);
                } else if (e.key === 'Delete' || e.key === 'Backspace') {
                    this.inputNumber(0);
                }
            });
        }
        
        selectCell(index) {
            const row = Math.floor(index / 9);
            const col = index % 9;
            
            // Don't select cells that have original numbers
            if (this.puzzle[row][col] !== 0) {
                return;
            }
            
            this.selectedCell = {row, col, index};
            this.updateCellHighlights();
        }
        
        updateCellHighlights() {
            const cells = document.querySelectorAll('.cell');
            
            cells.forEach((cell, index) => {
                cell.classList.remove('selected');
                
                if (this.selectedCell && index === this.selectedCell.index) {
                    cell.classList.add('selected');
                }
            });
        }
        
        inputNumber(num) {
            if (this.selectedCell === null) return;
            
            // Start timer on first input
            if (!this.timerStarted) {
                this.startTimer();
                this.timerStarted = true;
            }
            
            const {row, col} = this.selectedCell;
            
            // Don't change original numbers
            if (this.puzzle[row][col] !== 0) return;
            
            // Clear any error states
            this.clearErrors();
            
            if (num === 0) {
                // Clear the cell
                this.currentGrid[row][col] = 0;
            } else {
                // Place the number
                this.currentGrid[row][col] = num;
                
                // Check if it's correct
                if (num !== this.solution[row][col]) {
                    this.showError(row, col);
                    this.showMessage('Wrong number! Try again.', 'error');
                } else {
                    this.showMessage('Correct!', 'success');
                }
            }
            
            this.updateDisplay();
            
            // Check if puzzle is complete
            if (this.isPuzzleComplete()) {
                this.puzzleComplete();
            }
        }
        
        useHint() {
            if (this.hintsLeft <= 0) {
                this.showMessage('No hints left!', 'error');
                return;
            }
            
            // Find an empty cell and fill it with the correct number
            const emptyCells = [];
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (this.currentGrid[row][col] === 0) {
                        emptyCells.push({row, col});
                    }
                }
            }
            
            if (emptyCells.length === 0) {
                this.showMessage('Puzzle is complete!', 'success');
                return;
            }
            
            // Pick a random empty cell
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const {row, col} = randomCell;
            
            // Fill it with the correct number
            this.currentGrid[row][col] = this.solution[row][col];
            this.hintsLeft--;
            
            this.updateDisplay();
            this.updateHintsDisplay();
            this.showMessage(`Hint used! ${this.hintsLeft} hints remaining.`, 'success');
            
            // Check if puzzle is complete
            if (this.isPuzzleComplete()) {
                this.puzzleComplete();
            }
        }
        
        updateHintsDisplay() {
            document.getElementById('hintsLeft').textContent = this.hintsLeft;
        }
        
        updateLevelDisplay() {
            document.getElementById('levelValue').textContent = this.currentLevel;
        }
        
        updateDisplay() {
            const cells = document.querySelectorAll('.cell');
            
            cells.forEach((cell, index) => {
                const row = Math.floor(index / 9);
                const col = index % 9;
                const value = this.currentGrid[row][col];
                
                cell.textContent = value === 0 ? '' : value;
                
                // Mark original numbers
                if (this.puzzle[row][col] !== 0) {
                    cell.classList.add('fixed');
                } else {
                    cell.classList.remove('fixed');
                }
            });
        }
        
        showError(row, col) {
            const index = row * 9 + col;
            const cell = document.querySelectorAll('.cell')[index];
            cell.classList.add('error');
            
            // Remove error class after animation
            setTimeout(() => {
                cell.classList.remove('error');
            }, 1000);
        }
        
        clearErrors() {
            document.querySelectorAll('.cell').forEach(cell => {
                cell.classList.remove('error');
            });
        }
        
        isPuzzleComplete() {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (this.currentGrid[row][col] === 0) {
                        return false;
                    }
                }
            }
            return true;
        }
        
        checkSolution() {
            let correct = 0;
            let total = 0;
            
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (this.puzzle[row][col] === 0) {
                        total++;
                        if (this.currentGrid[row][col] === this.solution[row][col]) {
                            correct++;
                        }
                    }
                }
            }
            
            if (this.isPuzzleComplete()) {
                if (correct === total) {
                    this.showMessage('Perfect! All correct!', 'success');
                } else {
                    this.showMessage(`${correct} out of ${total} correct.`, 'error');
                }
            } else {
                this.showMessage(`${correct} out of ${total} filled correctly.`, 'success');
            }
        }
        
        newGame() {
            this.generatePuzzle();
            this.selectedCell = null;
            this.clearErrors();
            this.updateDisplay();
            this.updateHintsDisplay();
            this.updateLevelDisplay();
            this.resetTimer();
            this.showMessage('New game started!', 'success');
        }
        
        puzzleComplete() {
            this.stopTimer();
            this.currentLevel++;
            this.showMessage(`🎉 Level ${this.currentLevel - 1} completed in ${this.formatTime(this.timer)}! Next level loaded.`, 'success');
            
            // Auto-generate next level
            setTimeout(() => {
                this.newGame();
            }, 2000);
        }
        
        startTimer() {
            this.timer = 0;
            this.timerInterval = setInterval(() => {
                this.timer++;
                document.getElementById('timer').textContent = this.formatTime(this.timer);
            }, 1000);
        }
        
        stopTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
        }
        
        resetTimer() {
            this.stopTimer();
            this.timer = 0;
            this.timerStarted = false;
            document.getElementById('timer').textContent = '00:00';
        }
        
        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        
        showMessage(text, type = '') {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            messageEl.className = `message ${type}`;
            
            setTimeout(() => {
                messageEl.textContent = '';
                messageEl.className = 'message';
            }, 3000);
        }
    }

    // Start the game when page loads
    document.addEventListener('DOMContentLoaded', () => {
        new SudokuGame();
    });