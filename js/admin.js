/**
 * admin.js - سکریپتی بەڕێوەبردنی پەیجی ئەدمینی ئەکادێمیای شەترەنجی هەولێر
 */

// دڵنیابوون لە ئەوەی بەکارهێنەر داخڵی سیستەم بووە
document.addEventListener('DOMContentLoaded', function() {
    // چێککردنی سێشنی بەکارهێنەر
    checkUserSession();
    
    // دانانی ئیڤێنتەکانی تابەکان
    setupTabEvents();
    
    // وەرگرتنی داتای داشبۆرد
    loadDashboardData();
    
    // دانانی ئیڤێنتەکانی چالاکییەکان
    setupActivityEvents();
    
    // وەرگرتنی هەموو چالاکییەکان
    loadAllActivities();
});

/**
 * چێککردنی سێشنی بەکارهێنەر
 */
function checkUserSession() {
    fetch('../php/check_session.php')
        .then(response => response.json())
        .then(data => {
            if (!data.logged_in) {
                // بەکارهێنەر داخڵی سیستەم نەبووە، گواستنەوە بۆ پەیجی لۆگین
                window.location.href = '../admin_login.html';
                return;
            }
            
            // نیشاندانی ناوی تەواوی بەکارهێنەر
            document.getElementById('user-fullname').textContent = data.fullname || 'ئەدمین';
        })
        .catch(error => {
            console.error('هەڵە لە کاتی پشکنینی سێشن:', error);
            // لە کاتی هەڵەدا، گواستنەوە بۆ پەیجی لۆگین
            window.location.href = '../admin_login.html';
        });
}

/**
 * دانانی ئیڤێنتەکان بۆ تابەکان
 */
function setupTabEvents() {
    const menuItems = document.querySelectorAll('.menu-item[data-tab]');
    const contentTabs = document.querySelectorAll('.content-tab');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // لابردنی چالاکی لە هەموو ئایتمەکان
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // لابردنی چالاکی لە هەموو تابەکان
            contentTabs.forEach(tab => tab.classList.remove('active'));
            
            // زیادکردنی چالاکی بۆ ئایتەمی کلیک لێکراو
            this.classList.add('active');
            
            // زیادکردنی چالاکی بۆ تابی هەڵبژێردراو
            const tabId = `${this.dataset.tab}-tab`;
            document.getElementById(tabId).classList.add('active');
            
            // ئەگەر تابی چالاکییەکان بێت، دووبارە باری بکەرەوە
            if (this.dataset.tab === 'activities') {
                loadAllActivities();
            }
        });
    });
}

/**
 * وەرگرتنی داتای داشبۆرد
 */
function loadDashboardData() {
    fetch('../php/get_dashboard_data.php')
        .then(response => response.json())
        .then(data => {
            // نیشاندانی کۆی چالاکییەکان
            document.getElementById('total-activities').textContent = data.total_activities || 0;
            
            // نیشاندانی بەرواری دوایین چالاکی
            document.getElementById('latest-activity-date').textContent = 
                data.latest_activity ? formatDate(data.latest_activity) : 'هیچ چالاکییەک نییە';
            
            // پڕکردنەوەی لیستی دوایین چالاکییەکان
            displayRecentActivities(data.recent_activities || []);
        })
        .catch(error => {
            console.error('هەڵە لە کاتی وەرگرتنی داتای داشبۆرد:', error);
            document.getElementById('total-activities').textContent = 'هەڵە ڕوویدا';
            document.getElementById('latest-activity-date').textContent = 'هەڵە ڕوویدا';
            document.getElementById('recent-activities-list').innerHTML = 
                '<tr><td colspan="3" class="error-data">هەڵەیەک ڕوویدا لە کاتی وەرگرتنی داتاکان</td></tr>';
        });
}

/**
 * نیشاندانی دوایین چالاکییەکان لە داشبۆرد
 */
function displayRecentActivities(activities) {
    const recentActivitiesList = document.getElementById('recent-activities-list');
    recentActivitiesList.innerHTML = '';
    
    if (activities.length === 0) {
        recentActivitiesList.innerHTML = '<tr><td colspan="3" class="no-data">هیچ چالاکییەک بەردەست نییە</td></tr>';
        return;
    }
    
    activities.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="activity-title">${activity.title}</td>
            <td>${formatDate(activity.date)}</td>
            <td>
                <button class="btn btn-sm btn-primary view-activity" data-id="${activity.id}" title="بینین">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-info edit-activity" data-id="${activity.id}" title="دەستکاریکردن">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        
        recentActivitiesList.appendChild(row);
        
        // زیادکردنی ئیڤێنتەکان بۆ دوگمەکان
        row.querySelector('.view-activity').addEventListener('click', function() {
            window.open(`../activities.html?id=${activity.id}`, '_blank');
        });
        
        row.querySelector('.edit-activity').addEventListener('click', function() {
            openActivityModal(activity.id);
        });
    });
}

/**
 * دانانی ئیڤێنتەکان بۆ بەڕێوەبردنی چالاکییەکان
 */
function setupActivityEvents() {
    // دوگمەی زیادکردنی چالاکی نوێ
    document.getElementById('add-activity-btn').addEventListener('click', function() {
        openActivityModal();
    });
    
    // دوگمەی داخستنی مۆدێل
    document.querySelector('.close-modal').addEventListener('click', function() {
        closeActivityModal();
    });
    
    // دوگمەی پاشگەزبوونەوە لە مۆدێل
    document.getElementById('cancel-activity').addEventListener('click', function() {
        closeActivityModal();
    });
    
    // دوگمەی پاشگەزبوونەوە لە سڕینەوە
    document.getElementById('cancel-delete').addEventListener('click', function() {
        closeDeleteModal();
    });
    
    // دوگمەی پشتڕاستکردنەوەی سڕینەوە
    document.getElementById('confirm-delete').addEventListener('click', function() {
        const activityId = this.getAttribute('data-id');
        if (activityId) {
            deleteActivity(activityId);
        }
    });
    
    // دانانی ئیڤێنت بۆ نیشاندانی پێشبینینی وێنە
    const imageInput = document.getElementById('image');
    imageInput.addEventListener('change', function() {
        previewImage(this);
    });
    
    // دانانی ئیڤێنت بۆ ڕاکێشانی وێنە
    const imagePreview = document.getElementById('image-preview');
    
    // دانانی ئیڤێنتەکانی دراگ اند درۆپ
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        imagePreview.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // زیادکردنی کلاسی highlight لە کاتی دراگ کردنی وێنە
    ['dragenter', 'dragover'].forEach(eventName => {
        imagePreview.addEventListener(eventName, function() {
            this.classList.add('highlight');
        }, false);
    });
    
    // لابردنی کلاسی highlight لە کاتی دراگ لیڤ
    ['dragleave', 'drop'].forEach(eventName => {
        imagePreview.addEventListener(eventName, function() {
            this.classList.remove('highlight');
        }, false);
    });
    
    // هەڵگرتنی وێنە لە کاتی دراگ اند درۆپ
    imagePreview.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            imageInput.files = files;
            previewImage(imageInput);
        }
    }, false);
    
    // دانانی ئیڤێنت بۆ فۆرمی چالاکی
    document.getElementById('activity-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveActivity(this);
    });
}

/**
 * پێشبینینی وێنە پێش ئپلۆدکردن
 */
function previewImage(input) {
    const preview = document.getElementById('preview-image');
    const previewContainer = document.getElementById('image-preview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            previewContainer.querySelector('p').style.display = 'none';
        };
        
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.src = '';
        preview.style.display = 'none';
        previewContainer.querySelector('p').style.display = 'block';
    }
}

/**
 * وەرگرتنی هەموو چالاکییەکان
 */
function loadAllActivities() {
    const activitiesList = document.getElementById('activities-list');
    activitiesList.innerHTML = '<tr><td colspan="5" class="loading-data">چاوەڕوان بە...</td></tr>';
    
    fetch('../php/get_admin_activities.php')
        .then(response => response.json())
        .then(data => {
            displayAllActivities(data);
        })
        .catch(error => {
            console.error('هەڵە لە کاتی وەرگرتنی چالاکییەکان:', error);
            activitiesList.innerHTML = '<tr><td colspan="5" class="error-data">هەڵەیەک ڕوویدا لە کاتی وەرگرتنی داتاکان</td></tr>';
        });
}

/**
 * نیشاندانی هەموو چالاکییەکان
 */
function displayAllActivities(activities) {
    const activitiesList = document.getElementById('activities-list');
    activitiesList.innerHTML = '';
    
    if (activities.length === 0) {
        activitiesList.innerHTML = '<tr><td colspan="5" class="no-data">هیچ چالاکییەک بەردەست نییە</td></tr>';
        return;
    }
    
    activities.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${activity.image || '../images/default-activity.jpg'}" alt="${activity.title}" class="activity-thumbnail">
            </td>
            <td class="activity-title">${activity.title}</td>
            <td>${formatDate(activity.date)}</td>
            <td>
                ${activity.video_url ? '<i class="fas fa-video text-success"></i> هەیە' : '<i class="fas fa-times text-muted"></i> نییە'}
            </td>
            <td>
                <button class="btn btn-sm btn-primary view-activity" data-id="${activity.id}" title="بینین">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-info edit-activity" data-id="${activity.id}" title="دەستکاریکردن">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-activity" data-id="${activity.id}" title="سڕینەوە">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        activitiesList.appendChild(row);
        
        // زیادکردنی ئیڤێنتەکان بۆ دوگمەکان
        row.querySelector('.view-activity').addEventListener('click', function() {
            window.open(`../activities.html?id=${activity.id}`, '_blank');
        });
        
        row.querySelector('.edit-activity').addEventListener('click', function() {
            openActivityModal(activity.id);
        });
        
        row.querySelector('.delete-activity').addEventListener('click', function() {
            openDeleteModal(activity.id, activity.title);
        });
    });
}

/**
 * کردنەوەی مۆدێلی چالاکی (بۆ زیادکردن یان دەستکاریکردن)
 */
function openActivityModal(activityId = null) {
    // ڕیسێت کردنی فۆرم
    document.getElementById('activity-form').reset();
    document.getElementById('preview-image').style.display = 'none';
    document.getElementById('image-preview').querySelector('p').style.display = 'block';
    
    // دانانی ئایدی چالاکی (0 بۆ زیادکردنی نوێ)
    document.getElementById('activity-id').value = activityId || 0;
    
    // گۆڕینی سەردێڕی مۆدێل
    const modalTitle = document.getElementById('modal-title');
    
    if (activityId) {
        modalTitle.textContent = 'دەستکاریکردنی چالاکی';
        
        // وەرگرتنی زانیاری چالاکی لە داتابەیس
        fetch(`../php/get_activity_details.php?id=${activityId}&admin=1`)
            .then(response => response.json())
            .then(activity => {
                if (activity) {
                    // پڕکردنەوەی فۆرم بە زانیارییەکانی چالاکی
                    document.getElementById('title').value = activity.title || '';
                    document.getElementById('description').value = activity.description || '';
                    document.getElementById('date').value = activity.date || '';
                    document.getElementById('video_url').value = activity.video_url || '';
                    
                    // نیشاندانی وێنەی ئێستا ئەگەر هەبێت
                    if (activity.image) {
                        const preview = document.getElementById('preview-image');
                        preview.src = activity.image;
                        preview.style.display = 'block';
                        document.getElementById('image-preview').querySelector('p').style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('هەڵە لە کاتی وەرگرتنی زانیاری چالاکی:', error);
                alert('هەڵەیەک ڕوویدا لە کاتی وەرگرتنی زانیاری چالاکی');
                closeActivityModal();
            });
    } else {
        modalTitle.textContent = 'زیادکردنی چالاکی نوێ';
        
        // دانانی بەرواری ئەمڕۆ
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
    }
    
    // نیشاندانی مۆدێل
    document.getElementById('activity-modal').style.display = 'block';
}

/**
 * داخستنی مۆدێلی چالاکی
 */
function closeActivityModal() {
    document.getElementById('activity-modal').style.display = 'none';
}

/**
 * کردنەوەی مۆدێلی دڵنیابوونەوە لە سڕینەوە
 */
function openDeleteModal(activityId, activityTitle) {
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    confirmDeleteBtn.setAttribute('data-id', activityId);
    
    // ئەگەر ناونیشانی چالاکی هەبێت، زیادی بکە بۆ نامەی پشتڕاستکردنەوە
    if (activityTitle) {
        document.querySelector('#confirm-delete-modal p:first-of-type').textContent = 
            `ئایا دڵنیای لە سڕینەوەی چالاکی "${activityTitle}"؟`;
    }
    
    // نیشاندانی مۆدێل
    document.getElementById('confirm-delete-modal').style.display = 'block';
}

/**
 * داخستنی مۆدێلی دڵنیابوونەوە لە سڕینەوە
 */
function closeDeleteModal() {
    document.getElementById('confirm-delete-modal').style.display = 'none';
}

/**
 * خەزنکردنی چالاکی (زیادکردن یان دەستکاریکردن)
 */
function saveActivity(form) {
    // دروستکردنی فۆرم داتا بۆ ناردن
    const formData = new FormData(form);
    
    // دیاریکردنی ئۆپەراسیۆن (زیادکردن یان دەستکاریکردن)
    const activityId = formData.get('activity_id');
    const isEdit = activityId && activityId !== '0';
    
    // ناردنی داتا بۆ سێرڤەر
    fetch('../php/save_activity.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // نیشاندانی پەیامی سەرکەوتن
            alert(isEdit ? 'چالاکی بە سەرکەوتوویی دەستکاری کرا' : 'چالاکی نوێ بە سەرکەوتوویی زیاد کرا');
            
            // داخستنی مۆدێل
            closeActivityModal();
            
            // نوێکردنەوەی لیستی چالاکییەکان
            loadAllActivities();
            
            // نوێکردنەوەی داشبۆرد
            loadDashboardData();
        } else {
            // نیشاندانی هەڵە
            alert(data.message || 'هەڵەیەک ڕوویدا لە کاتی خەزنکردنی چالاکی');
        }
    })
    .catch(error => {
        console.error('هەڵە لە کاتی خەزنکردنی چالاکی:', error);
        alert('هەڵەیەک ڕوویدا لە کاتی خەزنکردنی چالاکی');
    });
}

/**
 * سڕینەوەی چالاکی
 */
function deleteActivity(activityId) {
    fetch('../php/delete_activity.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `activity_id=${activityId}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // نیشاندانی پەیامی سەرکەوتن
            alert('چالاکی بە سەرکەوتوویی سڕایەوە');
            
            // داخستنی مۆدێل
            closeDeleteModal();
            
            // نوێکردنەوەی لیستی چالاکییەکان
            loadAllActivities();
            
            // نوێکردنەوەی داشبۆرد
            loadDashboardData();
        } else {
            // نیشاندانی هەڵە
            alert(data.message || 'هەڵەیەک ڕوویدا لە کاتی سڕینەوەی چالاکی');
        }
    })
    .catch(error => {
        console.error('هەڵە لە کاتی سڕینەوەی چالاکی:', error);
        alert('هەڵەیەک ڕوویدا لە کاتی سڕینەوەی چالاکی');
    });
}

/**
 * فۆرماتکردنی بەروار بۆ شێوازی کوردی
 */
function formatDate(dateString) {
    if (!dateString) return '';
    
    // پارچەکردنی بەروار بۆ ساڵ، مانگ و ڕۆژ
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    
    const year = parts[0];
    const month = parts[1];
    const day = parts[2].split(' ')[0]; // لابردنی کات ئەگەر هەبێت
    
    // دانانی ناوی مانگەکان بە کوردی
    const monthNames = [
        'کانوونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران',
        'تەمووز', 'ئاب', 'ئەیلوول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانوونی یەکەم'
    ];
    
    // ژمارەی مانگ لە 1-12 بەڵام ئیندێکسی لیست لە 0-11ـە
    const monthIndex = parseInt(month) - 1;
    const monthName = monthNames[monthIndex] || month;
    
    // گەڕاندنەوەی بەرواری فۆرماتکراو
    return `${day}ی ${monthName} ${year}`;
}
function loadActivityData(activityId) {
    // لێرەدا داواکاری AJAX بۆ سێرڤەر دەکرێت بۆ بارکردنی داتا
    // بۆ مەبەستی نیشاندان، داتای نموونە دادەنێین
    
    const sampleActivity = {
        id: activityId,
        title: 'خولی شەترەنج بۆ قوتابیان ' + activityId,
        description: 'خولی فێرکاری شەترەنج بۆ قوتابیانی پۆلی ٦-١٢',
        date: '2025-05-15',
        location: 'هۆڵی ئەکادێمیای شەترەنجی هەولێر',
        image: 'images/sample-activity.jpg'
    };
    
    // پڕکردنەوەی فۆرمەکە
    document.getElementById('title').value = sampleActivity.title;
    document.getElementById('description').value = sampleActivity.description;
    document.getElementById('date').value = sampleActivity.date;
    document.getElementById('location').value = sampleActivity.location;
    
    // پیشاندانی وێنە
    previewImage.src = sampleActivity.image;
    previewImage.style.display = 'block';
    document.querySelector('#image-preview p').style.display = 'none';
}

// کردنەوەی مۆدێلی دڵنیابوونەوە بۆ سڕینەوە
function openDeleteModal(activityId) {
    currentActivityId = activityId;
    deleteModal.style.display = 'block';
}

// داخستنی مۆدێلی دڵنیابوونەوە
function closeDeleteModal() {
    deleteModal.style.display = 'none';
}

// سڕینەوەی چالاکی
function deleteActivity(activityId) {
    // لێرەدا داواکاری AJAX بۆ سڕینەوەی چالاکی دەکرێت
    
    // بۆ مەبەستی نیشاندان، سڕینەوەی ڕیزەکە لە دۆکیومێنت
    const activityRow = document.querySelector(`tr[data-id="${activityId}"]`);
    if (activityRow) {
        activityRow.remove();
        
        // پیشاندانی پەیامی سەرکەوتن
        showNotification('چالاکی بە سەرکەوتوویی سڕایەوە', 'success');
    }
    
    closeDeleteModal();
}

// ناردنی فۆرمی چالاکی
function submitActivityForm(e) {
    e.preventDefault();
    
    // بەدەستهێنانی بەهاکانی فۆرم
    const activityId = document.getElementById('activity-id').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const image = imageInput.files[0];
    
    // پشکنینی بەتاڵی
    if (!title || !description || !date || !location) {
        showNotification('تکایە هەموو خانە پێویستەکان پڕ بکەرەوە', 'error');
        return;
    }
    
    // دروستکردنی داتا بۆ ناردن (لە پرۆژەی ڕاستەقینەدا FormData بەکار دەهێنرێت)
    const formData = {
        id: activityId,
        title: title,
        description: description,
        date: date,
        location: location,
        image: image ? image.name : null
    };
    
    // ناردنی داتا (بۆ مەبەستی نیشاندان)
    console.log('Sending activity data:', formData);
    
    // بۆ مەبەستی نیشاندان، پێویستە چالاکیەکە زیاد بکرێت یان نوێ بکرێتەوە
    if (activityId === '0') {
        // زیادکردنی چالاکی نوێ
        addActivityToTable({
            id: new Date().getTime(), // ID-ی کاتی بۆ نیشاندان
            ...formData
        });
        showNotification('چالاکی بە سەرکەوتوویی زیادکرا', 'success');
    } else {
        // نوێکردنەوەی چالاکی
        updateActivityInTable({
            ...formData,
            id: parseInt(activityId)
        });
        showNotification('چالاکی بە سەرکەوتوویی نوێکرایەوە', 'success');
    }
    
    closeActivityModal();
}

// زیادکردنی چالاکی بۆ خشتە
function addActivityToTable(activity) {
    const activitiesTable = document.querySelector('#activities-tab table tbody');
    if (!activitiesTable) return;
    
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', activity.id);
    
    // دروستکردنی ناوەرۆکی ڕیز
    newRow.innerHTML = `
        <td>${activity.id}</td>
        <td>${activity.title}</td>
        <td>${activity.date}</td>
        <td>${activity.location}</td>
        <td>
            <img src="${activity.image ? 'images/' + activity.image : 'images/placeholder.jpg'}" class="table-image">
        </td>
        <td>
            <div class="table-actions">
                <span class="action-btn edit-btn" onclick="openActivityModal(${activity.id})">
                    <i class="fas fa-edit"></i>
                </span>
                <span class="action-btn delete-btn" onclick="openDeleteModal(${activity.id})">
                    <i class="fas fa-trash"></i>
                </span>
                <span class="action-btn view-btn">
                    <i class="fas fa-eye"></i>
                </span>
            </div>
        </td>
    `;
    
    activitiesTable.appendChild(newRow);
}

// نوێکردنەوەی چالاکی لە خشتە
function updateActivityInTable(activity) {
    const activityRow = document.querySelector(`tr[data-id="${activity.id}"]`);
    if (!activityRow) return;
    
    // نوێکردنەوەی ناوەرۆکی ڕیز
    const cells = activityRow.getElementsByTagName('td');
    cells[1].innerText = activity.title;
    cells[2].innerText = activity.date;
    cells[3].innerText = activity.location;
    
    // نوێکردنەوەی وێنە، ئەگەر وێنەی نوێ هەبێت
    if (activity.image) {
        cells[4].querySelector('img').src = 'images/' + activity.image;
    }
}

// پیشاندانی پەیام
function showNotification(message, type) {
    // دروستکردنی ئیلیمێنتی پەیام
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    
    // زیادکردنی بۆ دۆکیومێنت
    document.body.appendChild(notification);
    
    // پیشاندانی پەیام
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // سڕینەوەی پەیام دوای ماوەیەک
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// بارکردنی داتای داشبۆرد
function loadDashboardData() {
    // بۆ مەبەستی نیشاندان
    document.getElementById('users-count').innerText = "١٢٥";
    document.getElementById('courses-count').innerText = "٨";
    document.getElementById('events-count').innerText = "١٥";
    document.getElementById('tournaments-count').innerText = "٦";
    
    // بارکردنی چالاکییە نوێیەکان
    loadRecentActivities();
}

// بارکردنی چالاکییە نوێیەکان
function loadRecentActivities() {
    const recentActivitiesList = document.getElementById('recent-activities-list');
    if (!recentActivitiesList) return;
    
    // بارکردنی چالاکییەکانی نموونە
    const recentActivities = [
        { id: 1, title: 'خولی فێرکاری پێشکەوتوو', date: '2025-04-12', status: 'completed' },
        { id: 2, title: 'پاڵەوانێتی هاوینە', date: '2025-05-20', status: 'upcoming' },
        { id: 3, title: 'خولی مامۆستایان', date: '2025-04-28', status: 'active' }
    ];
    
    // پاککردنەوەی ناوەرۆکی پێشوو
    recentActivitiesList.innerHTML = '';
    
    // زیادکردنی چالاکییەکان
    recentActivities.forEach(activity => {
        const listItem = document.createElement('li');
        
        let statusClass = '';
        let statusText = '';
        
        if (activity.status === 'completed') {
            statusClass = 'completed';
            statusText = 'تەواوبووە';
        } else if (activity.status === 'upcoming') {
            statusClass = 'upcoming';
            statusText = 'داهاتوو';
        } else {
            statusClass = 'active';
            statusText = 'چالاک';
        }
        
        listItem.innerHTML = `
            <div class="activity-info">
                <h4>${activity.title}</h4>
                <p>بەرواری: ${activity.date}</p>
            </div>
            <span class="activity-status ${statusClass}">${statusText}</span>
        `;
        
        recentActivitiesList.appendChild(listItem);
    });
}

// بارکردنی خشتەی چالاکییەکان
function loadActivitiesTable() {
    const activitiesTable = document.querySelector('#activities-tab table tbody');
    if (!activitiesTable) return;
    
    // نیشاندانی بارکردن
    activitiesTable.innerHTML = '<tr><td colspan="6" class="loading-data"><i class="fas fa-spinner fa-spin"></i> چاوەڕوانبە...</td></tr>';
    
    // نموونەی داتا (لە پرۆژەی ڕاستەقینەدا داواکاری AJAX بۆ سێرڤەر دەکرێت)
    const activities = [
        { id: 1, title: 'خولی فێرکاری بۆ منداڵان', date: '2025-05-15', location: 'هۆڵی ئەکادێمیا', image: 'course1.jpg' },
        { id: 2, title: 'پاڵەوانێتی هاوینە', date: '2025-06-10', location: 'پارکی شەقڵاوە', image: 'tournament1.jpg' },
        { id: 3, title: 'خولی مامۆستایان', date: '2025-04-28', location: 'زانکۆی سەلاحەدین', image: 'course2.jpg' }
    ];
    
    // دواخستنێکی کاتی بۆ نیشاندان
    setTimeout(() => {
        // پاککردنەوەی ناوەرۆکی پێشوو
        activitiesTable.innerHTML = '';
        
        // زیادکردنی چالاکییەکان بۆ خشتە
        activities.forEach(activity => {
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-id', activity.id);
            
            newRow.innerHTML = `
                <td>${activity.id}</td>
                <td>${activity.title}</td>
                <td>${activity.date}</td>
                <td>${activity.location}</td>
                <td>
                    <img src="images/${activity.image}" class="table-image">
                </td>
                <td>
                    <div class="table-actions">
                        <span class="action-btn edit-btn" onclick="openActivityModal(${activity.id})">
                            <i class="fas fa-edit"></i>
                        </span>
                        <span class="action-btn delete-btn" onclick="openDeleteModal(${activity.id})">
                            <i class="fas fa-trash"></i>
                        </span>
                        <span class="action-btn view-btn">
                            <i class="fas fa-eye"></i>
                        </span>
                    </div>
                </td>
            `;
            
            activitiesTable.appendChild(newRow);
        });
    }, 1000);
}

// پێشبینینی وێنە
function previewSelectedImage() {
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            document.querySelector('#image-preview p').style.display = 'none';
        }
        
        reader.readAsDataURL(imageInput.files[0]);
    }
}

// دەرچوون
function logout() {
    // سڕینەوەی زانیاری لۆگین لە حیفز
    localStorage.removeItem('admin_logged_in');
    
    // گەڕانەوە بۆ پەیجی لۆگین
    window.location.href = 'admin_login.html';
}

// دەستپێکردنی بەڕێوەبەرایەتی
function initAdmin() {
    // پشکنینی داخڵبوون
    checkLogin();
    
    // چالاککردنی گۆڕینی تاب
    switchTab();
    
    // ڕووداوی کلیک بۆ زیادکردنی چالاکی نوێ
    if (addActivityBtn) {
        addActivityBtn.addEventListener('click', function() {
            openActivityModal();
        });
    }
    
    // ڕووداوی داخستنی مۆدێل
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeActivityModal);
    }
    
    // ڕووداوی پوچەڵکردنەوەی چالاکی
    if (cancelActivityBtn) {
        cancelActivityBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeActivityModal();
        });
    }
    
    // ڕووداوی ناردنی فۆرمی چالاکی
    if (activityForm) {
        activityForm.addEventListener('submit', submitActivityForm);
    }
    
    // ڕووداوی گۆڕینی وێنە
    if (imageInput) {
        imageInput.addEventListener('change', previewSelectedImage);
    }
    
    // ڕووداوی کلیک لەسەر خانەی وێنە
    if (imagePreviewContainer) {
        imagePreviewContainer.addEventListener('click', function() {
            imageInput.click();
        });
    }
    
    // ڕووداوەکانی مۆدێلی سڕینەوە
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            deleteActivity(currentActivityId);
        });
    }
    
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    }
    
    // بارکردنی داتای داشبۆرد
    loadDashboardData();
    
    // بارکردنی خشتەی چالاکییەکان
    loadActivitiesTable();
    
    // کردنەوەی مۆدێلەکان بە کلیک لەسەر دەرەوەی مۆدێل
    window.onclick = function(event) {
        if (event.target === activityModal) {
            closeActivityModal();
        }
        if (event.target === deleteModal) {
            closeDeleteModal();
        }
    }
    
    // چالاککردنی دەرچوون
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

// دەستپێکردنی بەرنامە کاتێک DOM ئامادە بوو
initAdmin();

// گۆڕاوەکانی دەستپێگەیشتنی گشتی (global accessibility)
window.openActivityModal = openActivityModal;
window.openDeleteModal = openDeleteModal;
