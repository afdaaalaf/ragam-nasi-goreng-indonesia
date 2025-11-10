/* ========================================
   THEME TOGGLE FUNCTIONALITY
   ======================================== */

// Get theme toggle button
const themeToggle = document.getElementById("themeToggle");

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light";

// Apply saved theme on page load
document.documentElement.setAttribute("data-theme", currentTheme);

// Toggle theme function
function toggleTheme() {
	const currentTheme = document.documentElement.getAttribute("data-theme");
	const newTheme = currentTheme === "light" ? "dark" : "light";

	document.documentElement.setAttribute("data-theme", newTheme);
	localStorage.setItem("theme", newTheme);

	// Add rotation animation to toggle button
	themeToggle.style.transform = "scale(1.2) rotate(360deg)";
	setTimeout(() => {
		themeToggle.style.transform = "scale(1) rotate(0deg)";
	}, 300);
}

// Add click event listener
if (themeToggle) {
	themeToggle.addEventListener("click", toggleTheme);
}

/* ========================================
   SMOOTH SCROLL FUNCTIONALITY
   ======================================== */

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});

/* ========================================
   PAGE TRANSITION EFFECTS
   ======================================== */

// Add fade-in effect when navigating to detail pages
window.addEventListener("load", () => {
	document.body.style.opacity = "0";
	setTimeout(() => {
		document.body.style.transition = "opacity 0.5s ease";
		document.body.style.opacity = "1";
	}, 100);
});

// Add fade-out effect when leaving page
document.querySelectorAll('a:not([href^="#"])').forEach((link) => {
	link.addEventListener("click", function (e) {
		if (this.hostname === window.location.hostname) {
			e.preventDefault();
			const href = this.href;

			document.body.style.transition = "opacity 0.3s ease";
			document.body.style.opacity = "0";

			setTimeout(() => {
				window.location.href = href;
			}, 300);
		}
	});
});

/* ========================================
   HOVER SOUND EFFECT (Optional - Disabled by default)
   ======================================== */

// Uncomment below to enable hover sounds
/*
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi77eeTQw==');

document.querySelectorAll('.small-circle').forEach(circle => {
    circle.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {}); // Catch error if autoplay is blocked
    });
});
*/

/* ========================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ======================================== */

// Observe elements for scroll-based animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = "1";
			entry.target.style.transform = "translateY(0)";
		}
	});
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll(".detail-section, .detail-card").forEach((el) => {
	observer.observe(el);
});

/* ========================================
   MOBILE MENU HANDLING (if needed in future)
   ======================================== */

// Detect mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
	console.log("Mobile device detected");
	// Add mobile-specific behaviors here if needed
}

/* ========================================
   PERFORMANCE OPTIMIZATION
   ======================================== */

// Debounce function for resize events
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// Handle window resize
const handleResize = debounce(() => {
	// Add resize handling logic here if needed
	console.log("Window resized");
}, 250);

window.addEventListener("resize", handleResize);

/* ========================================
   KEYBOARD NAVIGATION (for center circle)
   ======================================== */

// Allow Enter key to activate center circle
document
	.querySelectorAll(".center-circle, .small-circle")
	.forEach((element) => {
		element.setAttribute("tabindex", "0");
		element.addEventListener("keypress", (e) => {
			if (e.key === "Enter" && element.tagName === "A") {
				element.click();
			}
		});
	});

/* ========================================
   CONSOLE WELCOME MESSAGE
   ======================================== */

console.log(
	"%c🍚 Ragam Nasi Goreng Indonesia 🍚",
	"font-size: 20px; font-weight: bold; color: #FF6B9D;"
);
console.log(
	"%cSelamat datang! Website ini dibuat dengan ❤️",
	"font-size: 14px; color: #4ECDC4;"
);
console.log(
	"%cTekan F12 untuk melihat kode sumber!",
	"font-size: 12px; color: #FFD93D;"
);
