// PartyBoard - Share Manager Module
console.log('Loading share.js...');

class ShareManager {
    constructor() {
        this.shareData = null;
    }
    
    shareResult(result) {
        this.shareData = result;
        
        // Create share text
        const shareText = `I'm a ${result.type}! ${result.icon} Find out your party personality at PartyBoard!`;
        const shareUrl = window.location.origin;
        const hashtags = ['PartyBoard', 'WouldYouRather', result.type.replace(/\s+/g, '')];
        
        // Track share attempt
        if (window.Analytics) {
            window.Analytics.trackShare('attempt', { type: 'personality_result' });
        }
        
        // Check if Web Share API is available
        if (navigator.share && this.isMobile()) {
            this.nativeShare(shareText, shareUrl);
        } else {
            this.showShareOptions(shareText, shareUrl, hashtags);
        }
    }
    
    async nativeShare(text, url) {
        try {
            await navigator.share({
                title: 'PartyBoard - My Personality Result',
                text: text,
                url: url
            });
            
            // Track successful share
            if (window.Analytics) {
                window.Analytics.trackShare('native_success', { type: 'personality_result' });
            }
        } catch (err) {
            // User cancelled or error occurred
            if (err.name !== 'AbortError') {
                console.error('Share failed:', err);
                this.showShareOptions(text, url);
            }
        }
    }
    
    showShareOptions(text, url, hashtags = []) {
        // Create share modal
        const modal = this.createShareModal(text, url, hashtags);
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
    
    createShareModal(text, url, hashtags) {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <h3 class="share-modal-title">Share Your Result!</h3>
                <div class="share-options">
                    <button class="share-option" data-platform="twitter">
                        <span class="share-icon">𝕏</span>
                        <span>Twitter</span>
                    </button>
                    <button class="share-option" data-platform="facebook">
                        <span class="share-icon">f</span>
                        <span>Facebook</span>
                    </button>
                    <button class="share-option" data-platform="whatsapp">
                        <span class="share-icon">📱</span>
                        <span>WhatsApp</span>
                    </button>
                    <button class="share-option" data-platform="copy">
                        <span class="share-icon">📋</span>
                        <span>Copy Link</span>
                    </button>
                </div>
                <button class="share-close">Close</button>
            </div>
        `;
        
        // Add styles
        this.injectShareStyles();
        
        // Set up event listeners
        const options = modal.querySelectorAll('.share-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.shareViaPlatform(platform, text, url, hashtags);
                this.closeShareModal(modal);
            });
        });
        
        // Close button
        modal.querySelector('.share-close').addEventListener('click', () => {
            this.closeShareModal(modal);
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeShareModal(modal);
            }
        });
        
        return modal;
    }
    
    shareViaPlatform(platform, text, url, hashtags = []) {
        const encodedText = encodeURIComponent(text);
        const encodedUrl = encodeURIComponent(url);
        const hashtagString = hashtags.map(tag => `#${tag}`).join(' ');
        const encodedHashtags = encodeURIComponent(hashtagString);
        
        let shareUrl;
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${hashtags.join(',')}`;
                break;
                
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
                break;
                
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
                break;
                
            case 'copy':
                this.copyToClipboard(`${text} ${url}`);
                this.showCopyNotification();
                
                // Track copy
                if (window.Analytics) {
                    window.Analytics.trackShare('copy', { type: 'personality_result' });
                }
                return;
                
            default:
                return;
        }
        
        // Open share window
        window.open(shareUrl, '_blank', 'width=600,height=400');
        
        // Track share
        if (window.Analytics) {
            window.Analytics.trackShare(platform, { type: 'personality_result' });
        }
    }
    
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
    
    showCopyNotification() {
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Link copied to clipboard!';
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('active');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    closeShareModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    injectShareStyles() {
        if (document.getElementById('share-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'share-styles';
        styles.textContent = `
            .share-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
                padding: 20px;
            }
            
            .share-modal.active {
                opacity: 1;
            }
            
            .share-modal-content {
                background: #0a0a0a;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 32px;
                max-width: 400px;
                width: 100%;
                transform: translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .share-modal.active .share-modal-content {
                transform: translateY(0);
            }
            
            .share-modal-title {
                font-size: 24px;
                margin-bottom: 24px;
                text-align: center;
                color: #fff;
            }
            
            .share-options {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
                margin-bottom: 24px;
            }
            
            .share-option {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 16px;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                color: #fff;
                font-size: 14px;
            }
            
            .share-option:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
                border-color: #FF006E;
            }
            
            .share-icon {
                font-size: 24px;
                display: block;
            }
            
            .share-close {
                width: 100%;
                padding: 16px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 50px;
                color: #fff;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .share-close:hover {
                background: rgba(255, 255, 255, 0.15);
            }
            
            .copy-notification {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: #00F5FF;
                color: #000;
                padding: 16px 24px;
                border-radius: 50px;
                font-weight: 600;
                z-index: 10000;
                transition: transform 0.3s ease;
            }
            
            .copy-notification.active {
                transform: translateX(-50%) translateY(0);
            }
        `;
        
        document.head.appendChild(styles);
    }
}

// Create and export share manager instance
window.ShareManager = new ShareManager();