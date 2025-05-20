document.addEventListener('DOMContentLoaded', function() {
            // هەڵسەنگاندنی هەڵەکانی لۆگین
            const urlParams = new URLSearchParams(window.location.search);
            const error = urlParams.get('error');
            
            if (error) {
                const errorDiv = document.getElementById('login-error');
                errorDiv.style.display = 'block';
                
                if (error === 'empty_fields') {
                    errorDiv.textContent = 'تکایە هەموو خانەکان پڕ بکەرەوە';
                } else if (error === 'invalid_credentials') {
                    errorDiv.textContent = 'ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە';
                } else {
                    errorDiv.textContent = 'هەڵەیەک ڕوویدا لە کاتی چوونەژوورەوە';
                }
            }
            
            // ئیڤێنتی نیشاندان/شاردنەوەی وشەی نهێنی
            const togglePassword = document.querySelector('.toggle-password');
            const passwordInput = document.getElementById('password');
            const toggleIcon = document.getElementById('toggle-password-icon');
            
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // گۆڕینی ئایکۆن
                if (type === 'password') {
                    toggleIcon.classList.remove('fa-eye-slash');
                    toggleIcon.classList.add('fa-eye');
                } else {
                    toggleIcon.classList.remove('fa-eye');
                    toggleIcon.classList.add('fa-eye-slash');
                }
            });
        });