document.addEventListener('DOMContentLoaded', () => {
    // Game data - replace image URLs with your actual game images later

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        fullscreenMenu.classList.toggle('active');
        // Prevent scrolling when menu is open
        document.body.style.overflow = fullscreenMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.fullscreen-menu nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            fullscreenMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    const games = {
        single: [
            { id: 'truck-tunk', name: 'Truck Tunk', image: 'Images/truck-tunk.png' },
            { id: 'color-chaser', name: 'Color Chaser', image: 'Images/color-chaser.png' },
            { id: 'snake', name: 'Classical Snake', image: 'Images/classical-snake.png' },
            { id: 'tetris', name: 'Tetris Puzzle', image: 'Images/Tetris.png' },
            { id: 'whack-a-hole', name: 'Whack a Hole', image: 'Images/Whack-a-Hole.png' },
            { id: 'bloom', name: 'Bloom', image: 'Images/Bloom.png' },
            { id: 'pixel-runner', name: 'Pixel Run', image: 'Images/Pixel-Runner.png' },
            { id: 'dodger', name: 'Dodger', image: 'Images/Dodger.png' },
            
            
        ],
        multi: [
            { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', image: 'Images/tic-tac-toe.png' },
            { id: 'broken-platform', name: 'Broken Platform', image: 'Images/broken-platform.png' },
            { id: 'chess-retro', name: 'Retro Chess', image: 'Images/chess.png' },
        ]
    };

    const gameGrid = document.querySelector('.game-grid');
    const navButtons = document.querySelectorAll('.nav-btn');
    let currentGameType = 'single';

    // Function to populate game grid
    function populateGames(gameType) {
        gameGrid.innerHTML = '';
        
        games[gameType].forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');
            gameCard.setAttribute('data-game-id', game.id);
            
            // For now, we'll use placeholders. You can replace with actual images later
            gameCard.innerHTML = `
                <div class="game-placeholder">
                    <img src="${game.image}" alt="${game.name}">
                </div>
            `;
            
            gameCard.addEventListener('click', () => {
                // Handle game click - will link to your games later
                window.location.href = `games/${game.id}/index.html`;
                // You can add a redirect or modal here
            });
            
            gameGrid.appendChild(gameCard);
        });
    }

    // Initialize with single player games
    populateGames(currentGameType);

    // Handle navigation button clicks
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const gameType = button.getAttribute('data-type');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update games
            currentGameType = gameType;
            populateGames(gameType);
        });
    });

    // Action buttons
    document.querySelector('.action-btn.request').addEventListener('click', () => {
        // Handle request game action
        console.log('Request game clicked');
        // You can add a form modal or redirect here
    });

    document.querySelector('.action-btn.donate').addEventListener('click', () => {
        // Handle donation action
        console.log('Donate clicked');
        // You can add payment integration or redirect here
    });
});