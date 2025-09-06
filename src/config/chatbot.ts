// Chatbot configuration
export const CHATBOT_CONFIG = {
  // Default chatbot ID - users can override this in settings
  defaultChatbotId: '', // Leave empty - users will set their own
  
  // Get chatbot ID from localStorage or use default
  getChatbotId: (): string => {
    return localStorage.getItem('chatbot_id') || CHATBOT_CONFIG.defaultChatbotId;
  },
  
  // Set chatbot ID in localStorage
  setChatbotId: (chatbotId: string): void => {
    localStorage.setItem('chatbot_id', chatbotId);
  },
  
  // Check if chatbot is configured
  isConfigured: (): boolean => {
    return Boolean(CHATBOT_CONFIG.getChatbotId());
  }
};