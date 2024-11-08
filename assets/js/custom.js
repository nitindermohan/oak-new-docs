// Put your custom JS code here

// CUSTOM THEME TOGGLE LOGIC

(function() {
    function syncTheme() {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const iframe = document.getElementById('your-iframe-id');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({ theme: currentTheme }, '*');
        }
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
