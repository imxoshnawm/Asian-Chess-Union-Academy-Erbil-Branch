// داتای چالاکییەکان (ئەمە دەتوانرێت بە داتابەیس بگۆڕدرێت لە داهاتوودا)
const activities = [
    {
        id: 1,
        title: "خولی ڕاهێنانی شەترەنج بۆ مندالان",
        date: "2023-10-15",
        image: "images/activities/kids-training.jpg",
        shortDescription: "خولی ڕاهێنانی تایبەت بۆ مندالان لە تەمەنی ٦ بۆ ١٢ ساڵ.",
        fullDescription: "لەم خولەدا، مندالان فێری بنەماکانی یاری شەترەنج دەبن بە شێوازێکی خۆش و ڕاهێنەرانی بەتوانا. هەموو ڕۆژێکی هەینی و شەممە، دوو کاژێر خولەکی تایبەت بە ڕاهێنان.",
        location: "هۆڵی ئەکادێمیای شەترەنجی هەولێر",
        video: "https://www.youtube.com/embed/example1"
    },
    {
        id: 2,
        title: "پێشبڕکێی نێودەوڵەتی شەترەنج",
        date: "2023-11-20",
        image: "images/activities/tournament.jpg",
        shortDescription: "پێشبڕکێی شەترەنجی نێودەوڵەتی بە بەشداری یاریزانانی ناوچەکە.",
        fullDescription: "پێشبڕکێی نێودەوڵەتی شەترەنج کە تێیدا یاریزانانی ناسراوی کوردستان و وڵاتانی دەوروبەر بەشداری دەکەن. خەڵاتی گەورە بۆ براوەکان لە هەموو پۆلەکاندا.",
        location: "هوتێل شێراتۆن - هەولێر",
        video: "https://www.youtube.com/embed/example2"
    },
    {
        id: 3,
        title: "وۆرکشۆپی پێشکەوتووی شەترەنج",
        date: "2023-12-10",
        image: "images/activities/workshop.jpg",
        shortDescription: "وۆرکشۆپی تایبەت بە ستراتیژیەکانی شەترەنجی پێشکەوتوو.",
        fullDescription: "لەم وۆرکشۆپەدا، مامۆستا محمد عەلی (ڕاهێنەری نێودەوڵەتی) باس لە ستراتیژیە نوێکانی شەترەنج و چۆنیەتی بەرزکردنەوەی ئاستی یاریزان دەکات.",
        location: "هۆڵی کۆنفراسی زانکۆی سەلاحەدین",
        video: "https://www.youtube.com/embed/example3"
    },
    {
        id: 4,
        title: "خولی ڕاهێنانی مامۆستایان",
        date: "2024-01-05",
        image: "images/activities/teacher-training.jpg",
        shortDescription: "خولی تایبەت بۆ مامۆستایانی شەترەنج بۆ پەرەپێدانی شارەزاییەکانیان.",
        fullDescription: "ئەم خولە تایبەتە بە مامۆستایانی شەترەنج بۆ فێربوونی شێوازە نوێکانی وانە گوتنەوە و ڕاهێنان. لەلایەن مامۆستایانی بەناوبانگەوە پێشکەش دەکرێت.",
        location: "ئەکادێمیای شەترەنجی هەولێر",
        video: "https://www.youtube.com/embed/example4"
    },
    {
        id: 5,
        title: "کەمپی هاوینەی شەترەنج",
        date: "2024-02-15",
        image: "images/activities/summer-camp.jpg",
        shortDescription: "کەمپی هاوینەی شەترەنج بۆ گەنجان لە پشووی قوتابخانە.",
        fullDescription: "لە ماوەی پشووی هاوینەدا، کەمپێکی تایبەت بە شەترەنج بۆ گەنجان ڕێکدەخەین. ڕۆژانە ٤ کاژێر ڕاهێنان و چالاکی جۆراوجۆر.",
        location: "پارکی شار - هەولێر",
        video: "https://www.youtube.com/embed/example5"
    },
    {
        id: 6,
        title: "سیمیناری شێوازی فێرکردنی شەترەنج",
        date: "2024-03-20",
        image: "images/activities/seminar.jpg",
        shortDescription: "سیمیناری تایبەت بە شێوازی نوێی فێرکردنی شەترەنج بۆ مندالان.",
        fullDescription: "لەم سیمینارەدا، شارەزایانی بواری پەروەردە و شەترەنج باس لە شێوازی نوێی فێرکردنی شەترەنج بە مندالان دەکەن و چۆنیەتی تێکەڵکردنی لەگەڵ وانەکانی تر.",
        location: "هۆڵی ڕۆشنبیری - هەولێر",
        video: "https://www.youtube.com/embed/example6"
    }
];

// کۆدی تەختەی شەترەنج
function createChessBoard() {
    const boardContainer = document.querySelector('.board-container');
    if (!boardContainer) return;
    
    boardContainer.innerHTML = '';
    
    // دروستکردنی تەختەی شەترەنج 8x8
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = `chess-square ${(row + col) % 2 === 0 ? 'white' : 'black'}`;
            square.style.top = `${row * 12.5}%`;
            square.style.left = `${col * 12.5}%`;
            
            // ئەنیمەیشنی تەختەی شەترەنج
            square.style.transform = 'scale(0)';
            square.style.opacity = '0';
            
            setTimeout(() => {
                square.style.transform = 'scale(1)';
                square.style.opacity = '1';
            }, (row * 8 + col) * 20); // دواکەوتنی زیادبوو بۆ هەر خانەیەک
            
            boardContainer.appendChild(square);
        }
    }
}

// ڕێکخستنی سکرۆلی هێدەر
function handleHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// نیشاندانی چالاکییەکان لە پەڕەی سەرەکی
function displayRecentActivities() {
    const recentActivitiesContainer = document.getElementById('recent-activities');
    if (!recentActivitiesContainer) return;
    
    // گرتنی 3 چالاکی کۆتایی
    const recentActivities = [...activities].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    
    // پاککردنەوەی ناوەڕۆک
    recentActivitiesContainer.innerHTML = '';
    
    // زیادکردنی چالاکییەکان
    recentActivities.forEach((activity, index) => {
        const activityCard = document.createElement('div');
        activityCard.className = 'activity-card';
        activityCard.innerHTML = `
            <img src="${activity.image}" alt="${activity.title}" class="activity-image">
            <div class="activity-content">
                <div class="activity-date">
                    <i class="far fa-calendar-alt"></i>
                    ${formatDate(activity.date)}
                </div>
                <h3>${activity.title}</h3>
                <p>${activity.shortDescription}</p>
                <button class="btn view-details" "></button>
            </div>
        `;
        
        // ئەنیمەیشنی زیادکراو بۆ کارتەکانی چالاکی
        activityCard.style.animationDelay = `${index * 0.2}s`;
        
        recentActivitiesContainer.appendChild(activityCard);
        
        // زیادکردنی ڕووداوی کلیک بۆ دوگمەی وردەکاری
        activityCard.querySelector('.view-details').addEventListener('click', () => {
            openActivityModal(activity.id);
        });
    });
}

// ڕێکخستنی فۆرماتی بەروار
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}


// داخستنی مۆدێل
function closeModal() {
    const modal = document.getElementById('activity-modal');
    
    // ئەنیمەیشنی داخستنی مۆدێل
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// ڕێکخستنی مۆبایل مێنیو
function setupMobileMenu() {
    // زیادکردنی دوگمەی مۆبایل مێنیو ئەگەر نەبوو
    const navElement = document.querySelector('nav');
    
    if (!document.querySelector('.mobile-menu-btn')) {
        const menuButton = document.createElement('div');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        // دانانی دوگمەکە پێش ناڤ لیست
        document.querySelector('header').insertBefore(menuButton, navElement);
        
        // زیادکردنی ڕووداوی کلیک
        menuButton.addEventListener('click', toggleMobileMenu);
    }
}

// کردنەوە و داخستنی مۆبایل مێنیو
function toggleMobileMenu() {
    const navList = document.querySelector('nav ul');
    navList.classList.toggle('active');
    
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (navList.classList.contains('active')) {
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// ئەنیمەیشنی سکرۆل بۆ بینینی ئێلیمێنتەکان
function setupScrollAnimations() {
    // دۆزینەوەی هەموو ئێلیمێنتە گرنگەکان بۆ ئەنیمەیشن
    const animatedElements = document.querySelectorAll('.activity-card, .contact-item, .about-text, .chess-board');
    
    // دروستکردنی Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // ئەگەر ئێلیمێنت بینرا
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // لابردنی ئێلیمێنت دوای ئەنیمەیشن
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // کاتێک 10% ی ئێلیمێنت دەردەکەوێت
    
    // زیادکردنی ئێلیمێنتەکان بۆ چاودێری
    animatedElements.forEach(element => {
        // تەنها ئەگەر پێشتر ئەنیمەیت نەکرابێت
        if (!element.classList.contains('animated')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(element);
        }
    });
}

// ئەنیمەیشنی پاراگراف
function animateParagraphs() {
    const paragraphs = document.querySelectorAll('.about-text p');
    
    paragraphs.forEach((paragraph, index) => {
        paragraph.style.opacity = '0';
        paragraph.style.transform = 'translateX(-30px)';
        paragraph.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            paragraph.style.opacity = '1';
            paragraph.style.transform = 'translateX(0)';
        }, 300 + (index * 200)); // دواکەوتنی هەڕەمەکی بۆ هەر پاراگرافێک
    });
}

// فەنکشنی سەرەکی بۆ خستەکاری هەموو شتەکان
function initApp() {
    // چێککردنی بوونی تەختەی شەترەنج لە پەڕەکە
    createChessBoard();
    
    // ڕێکخستنی مۆبایل مێنیو
    setupMobileMenu();
    
    // ڕێکخستنی سکرۆل بۆ هێدەر
    handleHeaderScroll();
    
    // نیشاندانی چالاکییەکان
    displayRecentActivities();
    
    // ڕێکخستنی ئەنیمەیشنی سکرۆل
    setupScrollAnimations();
    
    // ئەنیمەیشنی پاراگرافەکان
    setTimeout(animateParagraphs, 500);
    
    // داخستنی سپینەری لۆدینگ ئەگەر هەبوو
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
        }, 1000);
    }
    
    // دوگمەی سکرۆل بۆ سەرەوە
    createScrollTopButton();
}

// دروستکردنی دوگمەی گەڕانەوە بۆ سەرەوە
function createScrollTopButton() {
    // دروستکردنی دوگمەکە
    const scrollButton = document.createElement('div');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.style.position = 'fixed';
    scrollButton.style.bottom = '30px';
    scrollButton.style.left = '30px';
    scrollButton.style.width = '45px';
    scrollButton.style.height = '45px';
    scrollButton.style.backgroundColor = 'var(--primary-color)';
    scrollButton.style.color = 'white';
    scrollButton.style.borderRadius = '50%';
    scrollButton.style.display = 'flex';
    scrollButton.style.justifyContent = 'center';
    scrollButton.style.alignItems = 'center';
    scrollButton.style.cursor = 'pointer';
    scrollButton.style.boxShadow = 'var(--shadow-sm)';
    scrollButton.style.transition = 'var(--transition)';
    scrollButton.style.opacity = '0';
    scrollButton.style.visibility = 'hidden';
    scrollButton.style.zIndex = '99';
    
    // زیادکردنی بۆ دۆکیومێنت
    document.body.appendChild(scrollButton);
    
    // نیشاندان و شاردنەوەی دوگمە بە پێی سکرۆل
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // ڕووداوی کلیک بۆ سکرۆل کردن بۆ سەرەوە
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ئیفێکتی هۆڤەر
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.backgroundColor = 'var(--secondary-color)';
        scrollButton.style.transform = 'translateY(-5px)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.backgroundColor = 'var(--primary-color)';
        scrollButton.style.transform = 'translateY(0)';
    });
}

// چاودێری دۆکیومێنت کە تەواو بارکرا
document.addEventListener('DOMContentLoaded', initApp);

// کۆدی تایبەت بە پەڕەی چالاکییەکان
if (window.location.pathname.includes('activities.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        // نیشاندانی هەموو چالاکییەکان
        displayAllActivities();
        
        // زیادکردنی گەڕان بۆ چالاکییەکان
        setupActivitySearch();
    });
}

// نیشاندانی هەموو چالاکییەکان لە پەڕەی چالاکییەکان
function displayAllActivities() {
    const activitiesContainer = document.getElementById('all-activities');
    if (!activitiesContainer) return;
    
    // ڕێکخستنی چالاکییەکان بە پێی بەروار (نوێترین بۆ کۆنترین)
    const sortedActivities = [...activities].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // پاککردنەوەی ناوەڕۆک
    activitiesContainer.innerHTML = '';
    
    // زیادکردنی چالاکییەکان
    sortedActivities.forEach((activity, index) => {
        const activityCard = document.createElement('div');
        activityCard.className = 'activity-card';
        activityCard.dataset.title = activity.title.toLowerCase();
        activityCard.dataset.description = activity.shortDescription.toLowerCase();
        
        activityCard.innerHTML = `
            <img src="${activity.image}" alt="${activity.title}" class="activity-image">
            <div class="activity-content">
                <div class="activity-date">
                    <i class="far fa-calendar-alt"></i>
                    ${formatDate(activity.date)}
                </div>
                <h3>${activity.title}</h3>
                <p>${activity.shortDescription}</p>
                <button class="btn view-details" data-id="${activity.id}">زیاتر ببینە</button>
            </div>
        `;
        
        // ئەنیمەیشنی دواکەوتوو
        activityCard.style.animationDelay = `${index * 0.1}s`;
        
        activitiesContainer.appendChild(activityCard);
        
        // زیادکردنی ڕووداوی کلیک بۆ کردنەوەی مۆدێل
        activityCard.querySelector('.view-details').addEventListener('click', () => {
            openActivityModal(activity.id);
        });
    });
    
    // شاردنەوەی لۆدینگ سپینەر
    const loadingSpinner = activitiesContainer.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
}

// ڕێکخستنی گەڕان لە چالاکییەکان
function setupActivitySearch() {
    const searchInput = document.getElementById('search-activities');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const activityCards = document.querySelectorAll('.activity-card');
        
        activityCards.forEach(card => {
            const title = card.dataset.title;
            const description = card.dataset.description;
            
            // گەڕان لە ناونیشان و وەسف
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                // ئەنیمەیشنی نیشاندان
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                // ئەنیمەیشنی شاردنەوە
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
}

// زیادکردنی ئیفێکتی چەماوە بۆ سێکشنەکان
function addWaveDividers() {
    // چێککردنی هەموو سێکشنەکان کە پێویستیان بە ئیفێکتی چەماوەیە
    const sections = document.querySelectorAll('section:not(:last-child)');
    
}

// خستنەکاری کۆتایی
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    addWaveDividers();
    
    // کارلێکردن لەگەڵ لینکەکانی ناڤیگەیشن
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // تەنها بۆ لینکەکانی ناو پەڕەی سەرەکی (#)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(this.getAttribute('href'));
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 90,
                        behavior: 'smooth'
                    });
                }
                
                // داخستنی مۆبایل مێنیو
                const navList = document.querySelector('nav ul');
                if (navList.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
});