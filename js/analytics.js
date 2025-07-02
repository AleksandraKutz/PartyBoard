// PartyBoard - Privacy-First Analytics Module

class Analytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.events = [];
        this.initialized = false;
    }
    
    init() {
        if (this.initialized) return;
        
        // Generate anonymous user ID if not exists
        if (!localStorage.getItem('pb_anonymous_id')) {
            localStorage.setItem('pb_anonymous_id', this.generateUserId());
        }
        
        this.userId = localStorage.getItem('pb_anonymous_id');
        this.initialized = true;
        
        // Track session start
        this.track('session_start', {
            referrer: document.referrer || 'direct',
            screen_size: `${window.screen.width}x${window.screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            language: navigator.language,
            platform: this.getPlatform()
        });
        
        // Set up page visibility tracking
        this.setupVisibilityTracking();
        
        // Set up error tracking
        this.setupErrorTracking();
    }
    
    track(eventName, properties = {}) {
        if (!this.initialized) return;
        
        const event = {
            event: eventName,
            properties: {
                ...properties,
                timestamp: new Date().toISOString(),
                session_id: this.sessionId,
                user_id: this.userId,
                page: window.location.pathname,
                user_agent: navigator.userAgent
            }
        };
        
        // Store event locally
        this.events.push(event);
        
        // In production, this would send to analytics service
        // For now, just log to console in development
        if (window.location.hostname === 'localhost') {
            console.log('Analytics Event:', event);
        } else {
            // Send to analytics service (Plausible, Fathom, etc.)
            this.sendToAnalytics(event);
        }
    }
    
    sendToAnalytics(event) {
        // This is where you'd integrate with your analytics provider
        // Example for Plausible:
        if (window.plausible) {
            window.plausible(event.event, { props: event.properties });
        }
        
        // Or custom endpoint:
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(event)
        // }).catch(err => console.error('Analytics error:', err));
    }
    
    setupVisibilityTracking() {
        let startTime = Date.now();
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Page is hidden, track time spent
                const timeSpent = Math.round((Date.now() - startTime) / 1000);
                this.track('page_hidden', { time_spent_seconds: timeSpent });
            } else {
                // Page is visible again
                startTime = Date.now();
                this.track('page_visible');
            }
        });
        
        // Track when user leaves
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            this.track('session_end', { time_spent_seconds: timeSpent });
        });
    }
    
    setupErrorTracking() {
        window.addEventListener('error', (event) => {
            this.track('javascript_error', {
                message: event.message,
                source: event.filename,
                line: event.lineno,
                column: event.colno,
                stack: event.error?.stack
            });
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            this.track('unhandled_promise_rejection', {
                reason: event.reason?.toString()
            });
        });
    }
    
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    getPlatform() {
        const userAgent = navigator.userAgent;
        
        if (/Android/i.test(userAgent)) return 'Android';
        if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS';
        if (/Windows/i.test(userAgent)) return 'Windows';
        if (/Mac/i.test(userAgent)) return 'Mac';
        if (/Linux/i.test(userAgent)) return 'Linux';
        
        return 'Unknown';
    }
    
    // Utility methods for common events
    trackGameEvent(action, gameData) {
        this.track(`game_${action}`, {
            game_name: gameData.game || 'unknown',
            category: gameData.category,
            ...gameData
        });
    }
    
    trackShare(platform, content) {
        this.track('share_clicked', {
            platform: platform,
            content_type: content.type || 'result',
            content_id: content.id
        });
    }
    
    trackConversion(type, value) {
        this.track('conversion', {
            conversion_type: type,
            value: value,
            currency: 'USD'
        });
    }
    
    // Get analytics summary (for internal use)
    getSummary() {
        return {
            session_id: this.sessionId,
            user_id: this.userId,
            events_count: this.events.length,
            session_duration: this.events.length > 0 ? 
                Date.now() - new Date(this.events[0].properties.timestamp).getTime() : 0
        };
    }
}

// Create and export analytics instance
window.Analytics = new Analytics();
