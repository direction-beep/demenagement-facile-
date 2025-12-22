/**
 * ============================================
 * GESTIONNAIRE DE NOTIFICATIONS
 * ============================================
 * 
 * Gère l'affichage des notifications toast
 */

import { CONFIG } from './constants.js';
import { addClass, removeClass, createElement } from './dom-helpers.js';

/**
 * Classe pour gérer les notifications
 */
export class NotificationManager {
    /**
     * @param {Object} options - Options de configuration
     */
    constructor(options = {}) {
        this.options = {
            duration: CONFIG.FORM.NOTIFICATION_DURATION,
            position: 'top-right',
            ...options
        };
        
        this.notifications = [];
    }
    
    /**
     * Affiche une notification
     * @param {string} message - Le message à afficher
     * @param {string} type - Le type (success, error, info, warning)
     * @param {Object} options - Options supplémentaires
     */
    show(message, type = 'info', options = {}) {
        const notification = this.createNotification(message, type, options);
        document.body.appendChild(notification);
        this.notifications.push(notification);
        
        // Animation d'apparition
        requestAnimationFrame(() => {
            addClass(notification, 'show');
        });
        
        // Fermeture automatique (sauf pour les erreurs)
        if (type !== 'error' && !options.persistent) {
            setTimeout(() => {
                this.hide(notification);
            }, this.options.duration);
        }
        
        return notification;
    }
    
    /**
     * Crée un élément de notification
     * @param {string} message - Le message
     * @param {string} type - Le type
     * @param {Object} options - Options supplémentaires
     * @returns {HTMLElement} L'élément de notification
     */
    createNotification(message, type, options = {}) {
        const notification = createElement('div', {
            className: `notification notification-${type}`,
            role: 'alert',
            'aria-live': 'assertive'
        });
        
        const icon = this.getIcon(type);
        const closeButton = createElement('button', {
            className: 'notification-close',
            'aria-label': 'Fermer'
        }, '×');
        
        closeButton.addEventListener('click', () => {
            this.hide(notification);
        });
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icon}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        notification.querySelector('.notification-content').appendChild(closeButton);
        
        return notification;
    }
    
    /**
     * Retourne l'icône selon le type
     * @param {string} type - Le type de notification
     * @returns {string} Le SVG de l'icône
     */
    getIcon(type) {
        const icons = {
            success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
            info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
            warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
        };
        
        return icons[type] || icons.info;
    }
    
    /**
     * Cache une notification
     * @param {HTMLElement} notification - L'élément de notification
     */
    hide(notification) {
        if (!notification || !notification.parentNode) {
            return;
        }
        
        removeClass(notification, 'show');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
            
            // Retirer de la liste
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 300);
    }
    
    /**
     * Cache toutes les notifications
     */
    hideAll() {
        this.notifications.forEach(notification => {
            this.hide(notification);
        });
    }
}

// Export une instance par défaut
export default new NotificationManager();





