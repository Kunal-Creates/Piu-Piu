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
            { id: 'chicago', name: 'Chicago', image: 'placeholder-6.jpg' },
            { id: 'temple-run', name: 'Temple Run', image: 'placeholder-7.jpg' },
            { id: 'crush-it-2', name: 'Crush It 2', image: 'placeholder-1.jpg' },
            
        ],
        multi: [
            { id: 'multi-race', name: 'Multi Race', image: 'placeholder-8.jpg' },
            { id: 'battle-royale', name: 'Battle Royale', image: 'placeholder-9.jpg' },
            { id: 'team-fortress', name: 'Team Fortress', image: 'placeholder-10.jpg' },
            { id: 'pubg-clone', name: 'PUBG Clone', image: 'placeholder-11.jpg' },
            { id: 'rocket-league', name: 'Rocket League', image: 'placeholder-12.jpg' },
            { id: 'fortnite-clone', name: 'Fortnite Clone', image: 'placeholder-13.jpg' },
            { id: 'among-us', name: 'Among Us', image: 'placeholder-14.jpg' },
            { id: 'fall-guys', name: 'Fall Guys', image: 'placeholder-15.jpg' },
            { id: 'chess-online', name: 'Chess Online', image: 'placeholder-16.jpg' },
            { id: 'uno-online', name: 'UNO Online', image: 'placeholder-17.jpg' }
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