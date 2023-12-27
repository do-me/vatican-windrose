const imageSources = [
    'https://raw.githubusercontent.com/do-me/vatican-windrose/main/markers/nord.png',
    'https://raw.githubusercontent.com/do-me/vatican-windrose/main/markers/sud.png',
    'https://raw.githubusercontent.com/do-me/vatican-windrose/main/markers/est.png',
    'https://raw.githubusercontent.com/do-me/vatican-windrose/main/markers/west.png'
];

function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        body {
            margin: 0;
            overflow: hidden;
            position: relative;
        }

        .overlay {
            position: fixed;
            z-index: 100000000;
        }

        .overlay img {
            width: 100px;
        }

        .top {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        }

        .left {
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }

        .right {
            top: 50%;
            right: 0;
            transform: translateY(-50%);
        }

        .bottom {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    `;
    document.head.appendChild(style);
}

function scrollToDirection(direction) {
    const scrollAmount = 200; // Adjust this value based on your preference

    switch (direction) {
        case 'up':
            map.panBy([0, -100]);
            break;
        case 'down':
            map.panBy([0, 100]);
            break;
        case 'left':
            map.panBy([-100, 0]);
            break;
        case 'right':
            map.panBy([100, 0]);
            break;
        default:
            console.error('Invalid direction');
    }
}

function createOverlay(positionClass, imageUrl, scrollDirection) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay', positionClass);

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = positionClass;

    // Add a click event listener to the image
    img.addEventListener('click', function () {
        scrollToDirection(scrollDirection);
    });

    overlay.appendChild(img);
    document.body.appendChild(overlay);
}

injectStyles();
// Pass the scroll direction as the third argument for each overlay
createOverlay('top', imageSources[0], 'up');
createOverlay('left', imageSources[3], 'left');
createOverlay('right', imageSources[2], 'right');
createOverlay('bottom', imageSources[1], 'down');
