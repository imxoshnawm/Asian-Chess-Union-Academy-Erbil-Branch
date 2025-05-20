  // دۆکیومێنت ئامادەیە
  document.addEventListener('DOMContentLoaded', function() {
    // وەرگرتنی هەموو چالاکییەکان
    fetchAllActivities();
    
    // گوێگرتن لە گەڕان
    const searchInput = document.getElementById('search-activities');
    searchInput.addEventListener('input', function() {
        filterActivities(this.value);
    });
});

// فەنکشنی وەرگرتنی هەموو چالاکییەکان
function fetchAllActivities() {
    fetch('php/get_activities.php')
        .then(response => response.json())
        .then(data => {
            displayAllActivities(data);
        })
        .catch(error => {
            console.error('هەڵە لە کاتی وەرگرتنی چالاکییەکان:', error);
            document.getElementById('all-activities').innerHTML = '<p class="error-message">هەڵەیەک ڕوویدا لە کاتی وەرگرتنی داتاکان</p>';
        });
}

// فەنکشنی نیشاندانی هەموو چالاکییەکان
function displayAllActivities(activities) {
    const activitiesContainer = document.getElementById('all-activities');
    activitiesContainer.innerHTML = '';
    
    if (activities.length === 0) {
        activitiesContainer.innerHTML = '<p class="no-activities">هیچ چالاکییەک نەدۆزرایەوە</p>';
        return;
    }
    
    activities.forEach(activity => {
        const activityCard = document.createElement('div');
        activityCard.className = 'activity-card';
        activityCard.setAttribute('data-id', activity.id);
        
        activityCard.innerHTML = `
            <img src="${activity.image || 'images/default-activity.jpg'}" alt="${activity.title}" class="activity-image">
            <div class="activity-content">
                <h3>${activity.title}</h3>
                <p>${activity.description.substring(0, 100)}${activity.description.length > 100 ? '...' : ''}</p>
                <div class="activity-date">
                    <i class="far fa-calendar-alt"></i>
                    ${formatDate(activity.date)}
                </div>
                <button class="btn view-details" data-id="${activity.id}">زانیاری زیاتر</button>
            </div>
        `;
        
        activitiesContainer.appendChild(activityCard);
        
        // زیادکردنی ڕووداوی کلیک
        activityCard.querySelector('.view-details').addEventListener('click', function() {
            showActivityDetails(activity.id);
        });
    });
}

// فەنکشنی فلتەرکردنی چالاکییەکان بە گەڕان
function filterActivities(searchText) {
    const activityCards = document.querySelectorAll('.activity-card');
    const searchLower = searchText.toLowerCase();
    
    activityCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchLower) || description.includes(searchLower)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// فەنکشنی نیشاندانی وردەکاری چالاکی
function showActivityDetails(activityId) {
    // وەرگرتنی زانیاری چالاکی لە داتابەیس
    fetch(`php/get_activity_details.php?id=${activityId}`)
        .then(response => response.json())
        .then(activity => {
            if (activity) {
                const modalContent = document.getElementById('activity-detail-content');
                
                // ئامادەکردنی بەشی ڤیدیۆ ئەگەر هەبێت
                let videoSection = '';
                if (activity.video_url) {
                    // دڵنیابوون لە جۆری لینکی ڤیدیۆ (یوتیوب، ...)
                    if (activity.video_url.includes('youtube.com') || activity.video_url.includes('youtu.be')) {
                        // گۆڕینی لینکی یوتیوب بۆ فۆرماتی embed
                        let videoId = '';
                        if (activity.video_url.includes('youtube.com/watch?v=')) {
                            videoId = activity.video_url.split('v=')[1].split('&')[0];
                        } else if (activity.video_url.includes('youtu.be/')) {
                            videoId = activity.video_url.split('youtu.be/')[1];
                        }
                        
                        if (videoId) {
                            videoSection = `
                                <div class="activity-video">
                                    <h3>ڤیدیۆی چالاکی</h3>
                                    <div class="video-container">
                                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
                                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen></iframe>
                                    </div>
                                </div>
                            `;
                        }
                    } else {
                        videoSection = `
                            <div class="activity-video">
                                <h3>ڤیدیۆی چالاکی</h3>
                                <div class="video-container">
                                    <video controls>
                                        <source src="${activity.video_url}" type="video/mp4">
                                        براوسەرەکەت پشتگیری ڤیدیۆ ناکات
                                    </video>
                                </div>
                            </div>
                        `;
                    }
                }
                
                // ئامادەکردنی ناوەڕۆکی مۆدال
                modalContent.innerHTML = `
                    <div class="activity-header">
                        <h2>${activity.title}</h2>
                        <div class="activity-date">
                            <i class="far fa-calendar-alt"></i>
                            ${formatDate(activity.date)}
                        </div>
                    </div>
                    <div class="activity-images">
                        <img src="${activity.image || 'images/default-activity.jpg'}" alt="${activity.title}" class="main-image">
                    </div>
                    <div class="activity-description">
                        <h3>وەسفی چالاکی</h3>
                        <p>${activity.description}</p>
                    </div>
                    ${videoSection}
                `;
                
                // نیشاندانی مۆدال
                const modal = document.getElementById('activity-modal');
                modal.style.display = 'block';
                
                // زیادکردنی ڕووداوی داخستنی مۆدال
                document.querySelector('.close-modal').addEventListener('click', function() {
                    modal.style.display = 'none';
                });
                
                // داخستنی مۆدال بە کلیک لە دەرەوەی ناوەڕۆک
                window.addEventListener('click', function(event) {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            }
        })
        .catch(error => {
            console.error('هەڵە لە کاتی وەرگرتنی وردەکاری چالاکی:', error);
            alert('هەڵەیەک ڕوویدا لە کاتی وەرگرتنی وردەکاری چالاکی');
        });
}