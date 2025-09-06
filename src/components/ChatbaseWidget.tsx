import { useEffect } from 'react';
import { CHATBOT_CONFIG } from '@/config/chatbot';

export const ChatbaseWidget = () => {
  useEffect(() => {
    const chatbotId = CHATBOT_CONFIG.getChatbotId();
    
    // Only load if chatbot ID is configured
    if (!chatbotId) {
      return;
    }

    // Create and inject the Chatbase script
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', chatbotId);
    script.setAttribute('domain', window.location.hostname);
    script.defer = true;
    
    // Add to document head
    document.head.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.querySelector(`script[chatbotId="${chatbotId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
      
      // Also remove the chatbase iframe if it exists
      const chatbaseFrame = document.querySelector('#chatbase-bubble-window');
      if (chatbaseFrame) {
        chatbaseFrame.remove();
      }
      
      const chatbaseButton = document.querySelector('#chatbase-bubble-button');
      if (chatbaseButton) {
        chatbaseButton.remove();
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};