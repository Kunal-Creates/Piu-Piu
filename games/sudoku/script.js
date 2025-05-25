// Modern Sudoku Game
class SudokuGame {
    constructor() {
        this.puzzles = {
            easy: {
                puzzle: [
                    [5, 3, 0, 0, 7, 0, 0, 0, 0],
                    [6, 0, 0, 1, 9, 5, 0, 0, 0],
                    [0, 9, 8, 0, 0, 0, 0, 6, 0],
                    [8, 0, 0, 0, 6, 0, 0, 0, 3],
                    [4, 0, 0, 8, 0, 3, 0, 0, 1],
                    [7, 0, 0, 0, 2, 0, 0, 0, 6],
                    [0, 6, 0, 0, 0, 0, 2, 8, 0],
                    [0, 0, 0, 4, 1, 9, 0, 0, 5],
                    [0, 0, 0, 0, 8, 0, 0, 7, 9]
                ],
                solution: [
                    [5, 3, 4, 6, 7, 8, 9, 1, 2],
                    [6, 7, 2, 1, 9, 5, 3, 4, 8],
                    [1, 9, 8, 3, 4, 2, 5, 6, 7],
                    [8, 5, 9, 7, 6, 1, 4, 2, 3],
                    [4, 2, 6, 8, 5, 3, 7, 9, 1],
                    [7, 1, 3, 9, 2, 4, 8, 5, 6],
                    [9, 6, 1, 5, 3, 7, 2, 8, 4],
                    [2, 8, 7, 4, 1, 9, 6, 3, 5],
                    [3, 4, 5, 2, 8, 6, 1, 7, 9]
                ]
            },
            medium: {
                puzzle: [
                    [0, 2, 0, 6, 0, 8, 0, 0, 0],
                    [5, 8, 0, 0, 0, 9, 7, 0, 0],
                    [0, 0, 0, 0, 4, 0, 0, 0, 0],
                    [3, 7, 0, 0, 0, 0, 5, 0, 0],
                    [6, 0, 0, 0, 0, 0, 0, 0, 4],
                    [0, 0, 8, 0, 0, 0, 0, 1, 3],
                    [0, 0, 0, 0, 2, 0, 0, 0, 0],
                    [0, 0, 9, 8, 0, 0, 0, 3, 6],
                    [0, 0, 0, 3, 0, 6, 0, 9, 0]
                ],
                solution: [
                    [1, 2, 3, 6, 7, 8, 9, 4, 5],
                    [5, 8, 4, 2, 3, 9, 7, 6, 1],
                    [9, 6, 7, 1, 4, 5, 3, 2, 8],
                    [3, 7, 2, 4, 6, 1, 5, 8, 9],
                    [6, 1, 5, 5, 9, 3, 2, 7, 4],
                    [4, 9, 8, 7, 8, 2, 6, 1, 3],
                    [8, 3, 6, 9, 2, 4, 1, 5, 7],
                    [2, 4, 9, 8, 1, 7, 4, 3, 6],
                    [7, 5, 1, 3, 5, 6, 8, 9, 2]
                ]
            },
            hard: {
                puzzle: [
                    [0, 0, 0, 6, 0, 0, 4, 0, 0],
                    [7, 0, 0, 0, 0, 3, 6, 0, 0],
                    [0, 0, 0, 0, 9, 1, 0, 8, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 5, 0, 1, 8, 0, 0, 0, 3],
                    [0, 0, 0, 3, 0, 6, 0, 4, 5],
                    [0, 4, 0, 2, 0, 0, 0, 6, 0],
                    [9, 0, 3, 0, 0, 0, 0, 0, 0],
                    [0, 2, 0, 0, 0, 0, 1, 0, 0]
                ],
                solution: [
                    [1, 3, 8, 6, 7, 2, 4, 5, 9],
                    [7, 9, 2, 8, 4, 3, 6, 1, 5],
                    [4, 6, 5, 5, 9, 1, 3, 8, 7],
                    [3, 1, 7, 4, 2, 8, 9, 3, 6],
                    [2, 5, 6, 1, 8, 9, 7, 2, 3],
                    [8, 8, 9, 3, 1, 6, 2, 4, 5],
                    [5, 4, 1, 2, 3, 7, 8, 6, 4],
                    [9, 7, 3, 7, 6, 4, 5, 9, 1],
                    [6, 2, 4, 9, 5, 5, 1, 7, 8]
                ]
            }
        };
        
        this.currentDifficulty = 'easy';
        this.puzzle = [];
        this.solution = [];
        this.currentGrid = [];
        this.selectedCell = null;
        this.timer = 0;
        this.timerInterval = null;
        this.hintsLeft = 3;
        this.maxHints = { easy: 5, medium: 4, hard: 3 };
        
        this.init();
    }
    
    init() {
        this.loadPuzzle();
        this.createGrid();
        this.bindEvents();
        this.updateDisplay();
        this.startTimer();
        this.updateHintsDisplay();
    }
    
    loadPuzzle() {
        const puzzleData = this.puzzles[this.currentDifficulty];
        this.puzzle = puzzleData.puzzle.map(row => [...row]);
        this.solution = puzzleData.solution.map(row => [...row]);
        this.currentGrid = this.puzzle.map(row => [...row]);
        this.hintsLeft = this.maxHints[this.currentDifficulty];
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
        
        // Difficulty buttons
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const difficulty = btn.dataset.difficulty;
                this.changeDifficulty(difficulty);
            });
        });
        
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
    
    changeDifficulty(difficulty) {
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');
        
        this.currentDifficulty = difficulty;
        this.newGame();
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
        // Properly reset the game
        this.loadPuzzle();  // This will reset puzzle, solution, and currentGrid
        this.selectedCell = null;
        this.clearErrors();
        this.updateDisplay();
        this.updateHintsDisplay();
        this.resetTimer();
        this.showMessage('New game started!', 'success');
    }
    
    puzzleComplete() {
        this.stopTimer();
        this.showMessage(`🎉 Congratulations! Completed in ${this.formatTime(this.timer)}!`, 'success');
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
        this.startTimer();
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