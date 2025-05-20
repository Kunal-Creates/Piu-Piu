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
            { id: 'truck-tunk', name: 'Truck Tunk', image: 'Images/truck-tunk.webp' },
            { id: 'color-chaser', name: 'Color Chaser', image: 'Images/color-chaser.webp' },
            { id: 'snake', name: 'Classical Snake', image: 'Images/classical-snake.webp' },
            { id: 'tetris', name: 'Tetris Puzzle', image: 'Images/Tetris.webp' },
            { id: 'whack-a-hole', name: 'Whack a Hole', image: 'Images/Whack-a-Hole.webp' },
            { id: 'bloom', name: 'Bloom', image: 'Images/Bloom.webp' },
            { id: 'pixel-runner', name: 'Pixel Run', image: 'Images/Pixel-Runner.webp' },
            { id: 'dodger', name: 'Dodger', image: 'Images/Dodger.webp' },
            
            
        ],
        multi: [
            { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', image: 'Images/tic-tac-toe.webp' },
            { id: 'broken-platform', name: 'Broken Platform', image: 'Images/broken-platform.webp' },
            { id: 'chess-retro', name: 'Retro Chess', image: 'Images/chess.webp' },
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

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Temporary code to unregister old service worker - remove after running once
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}