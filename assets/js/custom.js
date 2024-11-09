// Put your custom JS code here

// CUSTOM THEME TOGGLE LOGIC

(function() {
    function syncTheme() {
        console.log("AAA")
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        console.log(currentTheme)
        const iframe = document.getElementById('your-iframe-id');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({ theme: currentTheme }, '*');
        }

        // Dummy test
        function updateTerminalColor(row, color) {
            document.documentElement.style.setProperty(`--terminal-r${row}-fill`, color);
        }

        if (currentTheme == "light"){
            updateTerminalColor(1, '#ff0000'); // Changes r1 to red
        } else {
            updateTerminalColor(1, '#00ff00'); // Changes r3 to green
        }

        console.log("ZZZ")
    }

    // Initial sync
    syncTheme();

    // Listen for theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
            syncTheme();
        }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-bs-theme']
    });
})();
