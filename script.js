
// Password untuk masuk ke website
const correctPassword = "2agustus";

// Fungsi untuk cek password
function checkPassword() {
    const inputPassword = document.getElementById('passwordInput').value;
    const errorMessage = document.getElementById('errorMessage');

    if (inputPassword === correctPassword) {
        // Password benar, slide ke halaman welcome
        slideToWelcome();
        errorMessage.textContent = '';
        document.getElementById('passwordInput').value = '';
    } else {
        // Password salah
        errorMessage.textContent = ' cih enub banget gitu aja gatau😒 ';
        document.getElementById('passwordInput').value = '';
        
        // Animasi shake
        const input = document.getElementById('passwordInput');
        input.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
}

// Fungsi untuk slide ke halaman welcome
function slideToWelcome() {
    const passwordPage = document.getElementById('passwordPage');
    const welcomePage = document.getElementById('welcomePage');
    
    // Slide password page ke kiri
    passwordPage.style.transform = 'translateX(-100%)';
    
    // Tampilkan welcome page dari kanan
    welcomePage.classList.remove('hidden');
    welcomePage.style.transform = 'translateX(100%)';
    
    // Mulai musik background
    backgroundMusic = playBackgroundMusic();

    setTimeout(() => {
        welcomePage.style.transform = 'translateX(0)';
        
        // Setelah 3 detik otomatis slide ke main content
        setTimeout(() => {
            slideToMainContent();
        }, 3000);
    }, 100);
}

// Fungsi untuk slide ke main content
function slideToMainContent() {
    const welcomePage = document.getElementById('welcomePage');
    const mainContent = document.getElementById('mainContent');
    
    // Slide welcome page ke atas
    welcomePage.style.transform = 'translateY(-100%)';
    
    // Tampilkan main content dari bawah
    mainContent.classList.remove('hidden');
    mainContent.style.transform = 'translateY(100%)';
    
    setTimeout(() => {
        mainContent.style.transform = 'translateY(0)';
        
        // Tampilkan timeline sebagai halaman default
        showPage('timeline');
    }, 100);
}

// Fungsi untuk menampilkan halaman tertentu
function showPage(pageId) {
    // Sembunyikan semua halaman content
    const pages = ['timeline', 'memories', 'letter', 'wishes'];
    pages.forEach(page => {
        const pageElement = document.getElementById(page);
        if (pageElement) {
            pageElement.classList.add('hidden');
        }
    });

    // Tampilkan halaman yang dipilih
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }

    // Update active button
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Cari dan aktifkan button yang sesuai
    const buttonTexts = {
        'timeline': 'Timeline Kita',
        'memories': 'Kenangan',
        'letter': 'Surat Cinta',
        'wishes': 'Harapan'
    };
    
    navButtons.forEach(btn => {
        if (btn.textContent.trim() === buttonTexts[pageId]) {
            btn.classList.add('active');
        }
    });
}

// Event listener untuk Enter key pada password input
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

// CSS untuk animasi shake dan slide
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .container {
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    #passwordPage, #welcomePage, #mainContent {
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

// Floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-50px';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatUp 4s linear forwards';
    heart.style.opacity = '0.7';

    document.body.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 4000);
}

// CSS untuk floating hearts
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatingStyle);

// Mulai floating hearts setiap 1.5 detik (lebih sering)
setInterval(createFloatingHeart, 2000);

// Fungsi untuk memutar musik background
function playBackgroundMusic() {
    const audio = new Audio();
    // Gunakan file musik lokal atau URL audio yang valid
    audio.src = 'musik.mp3'; // Contoh: ganti dengan file musik.mp3 yang kamu upload
    audio.loop = true;
    audio.volume = 0.3; // Volume 50%

    // Coba putar musik
    audio.play().catch(error => {
        console.log('Musik tidak bisa diputar otomatis. User perlu interaksi terlebih dahulu.');

        // Tambahkan event listener untuk memutar musik setelah user klik
        document.addEventListener('click', function() {
            audio.play().catch(e => console.log('Gagal memutar musik:', e));
        }, { once: true });
    });

    return audio;
}

// Inisialisasi musik background
let backgroundMusic = null;

// Fungsi untuk toggle musik on/off
function toggleMusic() {
    if (backgroundMusic) {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    }
}

