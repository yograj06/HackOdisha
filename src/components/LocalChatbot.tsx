import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const PREDEFINED_RESPONSES: Record<string, string> = {
  // Greetings
  'hello': 'Hello! I\'m your ElderCare+ assistant. How can I help you today?',
  'hi': 'Hi there! I\'m here to help with your health and wellness questions.',
  'help': 'I can help you with medication reminders, health tips, emergency contacts, and general eldercare questions. What would you like to know?',
  
  // Specific Symptoms & Conditions
  'cold': 'A common cold usually goes away in 5–7 days. Stay hydrated, rest well, and drink warm fluids. If you have high fever, breathing issues, or symptoms last longer, please consult a doctor.',
  'cough': 'A common cold usually goes away in 5–7 days. Stay hydrated, rest well, and drink warm fluids. If you have high fever, breathing issues, or symptoms last longer, please consult a doctor.',
  'fever': 'Monitor your temperature, drink plenty of fluids, and take rest. If fever is above 102°F, or continues for more than 2 days, please seek medical care.',
  'headache': 'Headaches can be due to stress, dehydration, or lack of sleep. Drink water, rest in a quiet place, and avoid screen time. If pain is severe, frequent, or with vision changes, consult a doctor.',
  'stomach pain': 'Stomach pain can have many causes. Try drinking warm water, avoid spicy/oily food, and rest. If pain is severe, frequent, or with vomiting/diarrhea, consult a doctor.',
  'stomach': 'Stomach pain can have many causes. Try drinking warm water, avoid spicy/oily food, and rest. If pain is severe, frequent, or with vomiting/diarrhea, consult a doctor.',
  'diabetes': 'Diabetes is a condition where blood sugar levels stay high. Simple tips: eat balanced meals, exercise regularly, and avoid too much sugar. Always follow your doctor\'s treatment plan.',
  'high blood pressure': 'High BP means your blood pressure stays above normal levels. To manage: reduce salt intake, exercise regularly, avoid stress, and go for regular checkups.',
  'hypertension': 'High BP means your blood pressure stays above normal levels. To manage: reduce salt intake, exercise regularly, avoid stress, and go for regular checkups.',
  'sore throat': 'Gargle with warm salt water, drink warm fluids like tea or soup, and avoid cold drinks. If pain is severe, or you have high fever, consult a doctor.',
  'throat': 'Gargle with warm salt water, drink warm fluids like tea or soup, and avoid cold drinks. If pain is severe, or you have high fever, consult a doctor.',
  'diarrhea': 'Drink plenty of fluids and ORS to prevent dehydration. Avoid oily and spicy foods. If it lasts more than 2 days or with blood in stool, seek medical care.',
  'loose motion': 'Drink plenty of fluids and ORS to prevent dehydration. Avoid oily and spicy foods. If it lasts more than 2 days or with blood in stool, seek medical care.',
  'constipation': 'Eat more fiber-rich foods like fruits, vegetables, and whole grains. Drink enough water and try light exercise. If constipation lasts long, consult a doctor.',
  'constipated': 'Eat more fiber-rich foods like fruits, vegetables, and whole grains. Drink enough water and try light exercise. If constipation lasts long, consult a doctor.',
  'back pain': 'Rest for a short time, maintain good posture, and apply a warm compress. Regular stretching and exercise can help. If pain is severe or persistent, see a doctor.',
  'skin rash': 'Keep the area clean, avoid scratching, and use mild soap. If rashes spread quickly, come with fever, or cause swelling, consult a dermatologist.',
  'rash': 'Keep the area clean, avoid scratching, and use mild soap. If rashes spread quickly, come with fever, or cause swelling, consult a dermatologist.',
  'itching': 'Keep the area clean, avoid scratching, and use mild soap. If rashes spread quickly, come with fever, or cause swelling, consult a dermatologist.',
  'toothache': 'Rinse with warm salt water, avoid very hot or cold foods, and keep teeth clean. For persistent or severe pain, visit a dentist.',
  'tooth pain': 'Rinse with warm salt water, avoid very hot or cold foods, and keep teeth clean. For persistent or severe pain, visit a dentist.',
  'eye pain': 'Rest your eyes, avoid too much screen time, and rinse with clean water. If there is redness, swelling, or vision issues, consult an eye doctor.',
  'eyes hurt': 'Rest your eyes, avoid too much screen time, and rinse with clean water. If there is redness, swelling, or vision issues, consult an eye doctor.',
  'flu': 'Rest, drink fluids, and take over-the-counter medicines if needed. Cover your mouth when coughing and avoid crowded places. If symptoms worsen, visit a doctor.',
  'seasonal flu': 'Rest, drink fluids, and take over-the-counter medicines if needed. Cover your mouth when coughing and avoid crowded places. If symptoms worsen, visit a doctor.',
  
  // Health & Medicine
  'medicine': 'For medication reminders, use our Medicine & Health Reminder feature. Always consult your doctor before starting or stopping any medication.',
  'medication': 'Remember to take medications as prescribed. You can set up reminders in our app. Never skip doses without consulting your healthcare provider.',
  'doctor': 'You can schedule appointments using our Doctor Schedule Manager. Keep a list of your medications and symptoms ready for your visit.',
  'appointment': 'Use our scheduling feature to book doctor appointments. Remember to arrive 15 minutes early and bring your insurance card.',
  'health': 'Maintain regular exercise, eat balanced meals, stay hydrated, and get adequate sleep. Regular check-ups are important for preventive care.',
  
  // Emergency
  'emergency': 'In case of emergency, call 911 immediately. You can also use our SOS feature to alert your emergency contacts with your location.',
  'sos': 'Our SOS feature allows you to quickly contact emergency services and notify your trusted contacts. Make sure your emergency contacts are up to date.',
  'help me': 'If this is an emergency, please call 911. For non-emergency assistance, I\'m here to help with health questions and app features.',
  
  // General Care
  'pain': 'For persistent pain, please consult your healthcare provider. Keep a pain diary noting when it occurs and what helps.',
  'blood pressure': 'Monitor your blood pressure regularly if advised by your doctor. Maintain a healthy diet, exercise regularly, and manage stress.',
  'exercise': 'Light exercises like walking, stretching, or chair exercises are great for seniors. Always consult your doctor before starting new exercise routines.',
  
  // General Health Tips
  'health tips': 'Here are some daily health tips: Drink 7-8 glasses of water, sleep 7-8 hours, eat fruits and vegetables, wash hands regularly, exercise 30 minutes daily, and take regular health check-ups.',
  'healthy lifestyle': 'Maintain a healthy lifestyle by: eating balanced meals, staying hydrated, getting adequate sleep, exercising regularly, managing stress, and avoiding smoking and excessive alcohol.',
  'water': 'Drink at least 7–8 glasses of water daily to stay hydrated and support your overall health.',
  'sleep': 'Sleep 7–8 hours every night for better health and recovery. Maintain a regular sleep schedule.',
  'nutrition': 'Eat more fruits, vegetables, and whole grains. Limit sugar-sweetened drinks and junk food. Eat small, balanced meals instead of heavy ones.',
  'hygiene': 'Wash your hands regularly to prevent infections. Always wear a mask if you have cough/cold to protect others.',
  'stress': 'Keep stress low with meditation, hobbies, or light activities. Take short breaks from screen time to relax your eyes.',
  'weight': 'Maintain a healthy body weight through balanced diet and regular exercise. Consult your doctor for personalized advice.',
  'checkup': 'Take regular health check-ups even if you feel healthy. Prevention is better than cure.',
  'first aid': 'Keep a first aid kit at home with basic supplies like bandages, antiseptic, and emergency contact numbers.',
  
  // App Features
  'features': 'ElderCare+ offers medication reminders, appointment scheduling, medicine ordering, emergency SOS, and daily activity reminders.',
  'reminders': 'Set up medication and activity reminders in the app to help maintain your daily routine and health schedule.',
  'ordering': 'You can order medicines online through our trusted pharmacy partnerships. Your prescriptions will be delivered safely to your door.',
  
  // Default responses
  'thanks': 'You\'re welcome! I\'m always here to help with your eldercare needs.',
  'thank you': 'You\'re welcome! I\'m always here to help with your eldercare needs.',
  'bye': 'Take care and stay healthy! Remember, I\'m always here when you need assistance.',
  'goodbye': 'Take care and stay healthy! Remember, I\'m always here when you need assistance.',
  'default': 'I\'m here to help with eldercare questions. You can ask me about medications, health tips, emergencies, or app features. What would you like to know?'
};

export const LocalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your ElderCare+ assistant. I can help you with health questions, medication reminders, and using our app features. How can I assist you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (userInput: string): string => {
    const input = userInput.toLowerCase().trim();
    
    // Handle "I have..." patterns
    if (input.startsWith('i have') || input.includes('i have')) {
      const symptom = input.replace('i have', '').replace('a', '').replace('an', '').trim();
      for (const [keyword, response] of Object.entries(PREDEFINED_RESPONSES)) {
        if (keyword !== 'default' && symptom.includes(keyword)) {
          return response;
        }
      }
    }
    
    // Handle "My ... hurts/hurt" patterns
    if (input.includes('hurts') || input.includes('hurt') || input.includes('pain')) {
      if (input.includes('stomach') || input.includes('belly')) return PREDEFINED_RESPONSES['stomach pain'];
      if (input.includes('head')) return PREDEFINED_RESPONSES.headache;
      if (input.includes('back')) return PREDEFINED_RESPONSES['back pain'];
      if (input.includes('tooth') || input.includes('teeth')) return PREDEFINED_RESPONSES.toothache;
      if (input.includes('throat')) return PREDEFINED_RESPONSES['sore throat'];
      if (input.includes('eye')) return PREDEFINED_RESPONSES['eye pain'];
    }
    
    // Direct keyword match
    for (const [keyword, response] of Object.entries(PREDEFINED_RESPONSES)) {
      if (keyword !== 'default' && input.includes(keyword)) {
        return response;
      }
    }
    
    // Check for question words
    if (input.includes('what') || input.includes('how') || input.includes('when') || input.includes('where')) {
      if (input.includes('medicine') || input.includes('medication')) {
        return PREDEFINED_RESPONSES.medicine;
      }
      if (input.includes('emergency')) {
        return PREDEFINED_RESPONSES.emergency;
      }
      if (input.includes('feature')) {
        return PREDEFINED_RESPONSES.features;
      }
      if (input.includes('tip') || input.includes('advice') || input.includes('healthy')) {
        return PREDEFINED_RESPONSES['health tips'];
      }
    }
    
    // Handle common medical terms and synonyms
    if (input.includes('sick') || input.includes('unwell') || input.includes('not feeling well')) {
      return 'I understand you\'re not feeling well. Can you tell me more about your specific symptoms? I can provide guidance for common issues like fever, headache, stomach pain, or other symptoms.';
    }
    
    return PREDEFINED_RESPONSES.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    const botResponse = findBestResponse(inputValue);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 h-[500px] shadow-xl border-0 bg-background/95 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">ElderCare+ Assistant</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[350px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isBot ? 'items-start' : 'items-end justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground ml-auto'
                  }`}
                >
                  {message.text}
                </div>
                {!message.isBot && (
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3 h-3 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about eldercare..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};