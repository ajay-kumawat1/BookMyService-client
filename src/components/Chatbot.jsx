import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

// CSS for animations
const animations = `
@keyframes typing {
  0% {
    transform: translateY(0px);
    background-color: #666;
  }
  28% {
    transform: translateY(-5px);
    background-color: #999;
  }
  44% {
    transform: translateY(0px);
    background-color: #666;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

const Chatbot = ({ position = 'bottom-right', height = 500, width = 400 }) => {
  // Get authentication state
  const [authUser] = useAuth();

  const [chatBotVisible, setChatBotVisible] = useState(false);
  // Set initial message based on authentication status
  const [messages, setMessages] = useState([
    {
      text: authUser
        ? `Hello ${authUser.firstName || ''}! I'm the BookMyService AI Assistant. I can help you with booking services, account information, payment methods, and more. How can I assist you today?`
        : 'Hello! I\'m the BookMyService AI Assistant. I can help with general information, but for personalized assistance with bookings or account details, please log in first.',
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getPosition = () => {
    switch (position) {
      case 'bottom-right':
        return {
          right: '0.75rem',
          bottom: '4rem',
        };
      case 'bottom-left':
        return {
          left: '0.75rem',
          bottom: '4rem',
        };
      case 'top-right':
        return {
          right: '0.75rem',
          top: '4rem',
        };
      case 'top-left':
        return {
          left: '0.75rem',
          top: '4rem',
        };
      default:
        return {
          right: '0.75rem',
          bottom: '4rem',
        };
    }
  };

  const getPositionButton = () => {
    switch (position) {
      case 'bottom-right':
        return {
          right: '0.75rem',
          bottom: '0.75rem',
        };
      case 'bottom-left':
        return {
          left: '0.75rem',
          bottom: '0.75rem',
        };
      case 'top-right':
        return {
          right: '0.75rem',
          top: '0.75rem',
        };
      case 'top-left':
        return {
          left: '0.75rem',
          top: '0.75rem',
        };
      default:
        return {
          right: '0.75rem',
          bottom: '0.75rem',
        };
    }
  };

  // Store conversation history
  const [conversationHistory, setConversationHistory] = useState([]);

  // Function to get predefined response (fallback if API fails)
  const getPredefinedResponse = (userMessage) => {
    // Convert user message to lowercase for easier matching
    const message = userMessage.toLowerCase();

    // Check for keywords and return appropriate responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return authUser
        ? `Hello ${authUser.firstName ? authUser.firstName : authUser.ownerFirstName}! How can I help you today?`
        : "Hello! How can I help you today?";
    } else if (message.includes('book') || message.includes('appointment') || message.includes('schedule')) {
      return "To book a service, please navigate to our Services page and select the service you're interested in.";
    } else if (message.includes('cancel') || message.includes('reschedule')) {
      return "To cancel or reschedule a booking, please go to your profile and select 'My Bookings'.";
    } else if (message.includes('payment') || message.includes('pay') || message.includes('cost') || message.includes('price')) {
      return "We accept various payment methods including credit/debit cards and online payments. Prices vary depending on the service.";
    } else if (message.includes('contact') || message.includes('support') || message.includes('help')) {
      return "For additional support, you can reach us at support@bookmyservice.com or call us at +1-234-567-8900.";
    } else if (message.includes('register') || message.includes('sign up') || message.includes('account')) {
      return "You can create an account by clicking on the 'Login' button and then selecting 'Register'.";
    } else if (message.includes('business') || message.includes('provider') || message.includes('service provider')) {
      return "If you want to register as a business owner, please click on 'Login' and then 'Register as Business'.";
    } else if (message.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I'm not sure I understand. Could you please rephrase or ask about our services, bookings, payments, or account creation?";
    }
  };

  // Function to get response from ChatGPT API with fallback to predefined responses
  const getBotResponse = async (userMessage) => {
    try {
      // Add user message to conversation history
      const updatedHistory = [...conversationHistory, { role: 'user', content: userMessage }];
      setConversationHistory(updatedHistory);

      try {
        // Prepare API request - using a different endpoint that might work better
        const options = {
          method: 'POST',
          url: 'https://chatgpt-42.p.rapidapi.com/chat',
          headers: {
            'X-RapidAPI-Key': '73ee7f65f7msh964e389dfcc4e5bp122986jsn6555700cc396',
            'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com',
            'Content-Type': 'application/json'
          },
          data: {
            messages: [
              // Add system message to provide context about BookMyService and user info if logged in
              {
                role: 'user',
        content: 'hi'},
              // Include conversation history
              ...updatedHistory
            ],
             model: 'gpt-4o-mini',
            web_access: false,
            temperature: 0.7
          }
        };

        // Make API request
        const response = await axios.request(options);

        // Log the response for debugging
        console.log('ChatGPT API Response:', response.data);

        // Extract bot response from the API response based on the new API format
        const botResponse = response.data?.choices?.[0]?.message?.content ||
                           response.data?.generated_text ||
                           response.data?.message ||
                           response.data?.content;

        // If we got a valid response, use it
        if (botResponse) {
          // Add bot response to conversation history
          setConversationHistory([
            ...updatedHistory,
            { role: 'assistant', content: botResponse }
          ]);

          return botResponse;
        } else {
          // If no valid response, fall back to predefined responses
          throw new Error('No valid response from API');
        }
      } catch (apiError) {
        console.error('API request failed, using fallback responses:', apiError);

        // Fall back to predefined responses
        const fallbackResponse = getPredefinedResponse(userMessage);

        // Add fallback response to conversation history
        setConversationHistory([
          ...updatedHistory,
          { role: 'assistant', content: fallbackResponse }
        ]);

        return fallbackResponse;
      }
    } catch (error) {
      console.error('Error in getBotResponse:', error);

      // Ultimate fallback if everything else fails
      return "I'm having trouble processing your request right now. Please try again later or contact support@bookmyservice.com for immediate assistance.";
    }
  };

  const handleSend = async () => {
    if (inputValue.trim() && !isLoading) {
      // Set loading state
      setIsLoading(true);

      // Add user message
      const userMessage = inputValue.trim();
      setMessages([...messages, { text: userMessage, sender: 'user' }]);
      setInputValue('');

      // Show typing indicator
      setIsTyping(true);

      // Check if user is logged in
      if (!authUser) {
        // If not logged in, respond with login message after a short delay
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prevMessages => [
            ...prevMessages,
            {
              text: "To get personalized assistance, please log in first. This helps me provide more relevant information about your bookings and account.",
              sender: 'bot'
            }
          ]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      try {
        // Get bot response from API
        const botResponse = await getBotResponse(userMessage);

        // Calculate typing time based on response length (for more realism)
        // Assume average reading speed of 15ms per character with a minimum of 1 second
        const typingTime = Math.max(1000, Math.min(3000, botResponse.length * 15));

        // Wait for a realistic amount of time before showing the response
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prevMessages => [
            ...prevMessages,
            { text: botResponse, sender: 'bot' }
          ]);
          setIsLoading(false);
        }, typingTime);
      } catch (error) {
        // Handle errors
        console.error('Error in handleSend:', error);

        // Hide typing indicator and show error message after a short delay
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prevMessages => [
            ...prevMessages,
            {
              text: "I'm having trouble connecting right now. Please try again later.",
              sender: 'bot'
            }
          ]);
          setIsLoading(false);
        }, 1000);
      }
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      try {
        await handleSend();
      } catch (error) {
        console.error('Error in handleKeyDown:', error);
      }
    }
  };

  return (
    <div>
      {/* Add animation styles */}
      <style>{animations}</style>
      {/* Chat Popup */}
      <div
        style={{
          ...getPosition(),
          position: 'fixed',
          zIndex: 9999,
          overflow: 'hidden',
          borderRadius: '0.75rem',
          border: '1px solid #d1d5db',
          backgroundColor: '#ffffff',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          width: window.innerWidth > 768 ? `${width}px` : 'calc(100% - 64px)',
          transform: chatBotVisible ? 'scale(1)' : 'scale(0)',
        }}
      >
        <div
          style={{
            height: `${height}px`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: '1rem',
              borderBottom: '1px solid #d1d5db',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 640 512">
                <path
                  fill="#ffffff"
                  d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z"
                />
              </svg>
              <span>BookMyService Assistant</span>
            </div>
            <div
              onClick={() => setChatBotVisible(false)}
              style={{ cursor: 'pointer' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                <path
                  fill="#ffffff"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </div>
          </div>

          {/* Message Container */}
          <div
            ref={messageContainerRef}
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: '10px',
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: message.sender === 'user' ? 'flex-start' : 'flex-end',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '80%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '9999px',
                      width: '35px',
                      height: '35px',
                      minWidth: '35px',
                      minHeight: '35px',
                      maxWidth: '35px',
                      maxHeight: '35px',
                      backgroundColor: message.sender === 'user' ? '#3b82f6' : '#d1d5db',
                      order: message.sender === 'user' ? 0 : 2,
                    }}
                  >
                    {message.sender === 'user' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512">
                        <path
                          fill="#ffffff"
                          d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                        />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 640 512">
                        <path
                          fill="#000000"
                          d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    style={{
                      padding: '0.5rem',
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem',
                      borderRadius: '0.5rem',
                      width: 'calc(100% - 43px)',
                      wordWrap: 'break-word',
                      backgroundColor: message.sender === 'user' ? '#3b82f6' : '#d1d5db',
                      color: message.sender === 'user' ? '#fff' : '#000',
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-end',
                  marginTop: '0.5rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '80%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '9999px',
                      width: '35px',
                      height: '35px',
                      minWidth: '35px',
                      minHeight: '35px',
                      maxWidth: '35px',
                      maxHeight: '35px',
                      backgroundColor: '#d1d5db',
                      order: 2,
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 640 512">
                      <path
                        fill="#000000"
                        d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32z"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      padding: '0.5rem',
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem',
                      borderRadius: '0.5rem',
                      width: 'calc(100% - 43px)',
                      backgroundColor: '#d1d5db',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '3px' }}>
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#666',
                          animation: 'typing 1s infinite',
                          animationDelay: '0s',
                        }}
                      ></div>
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#666',
                          animation: 'typing 1s infinite',
                          animationDelay: '0.2s',
                        }}
                      ></div>
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#666',
                          animation: 'typing 1s infinite',
                          animationDelay: '0.4s',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Container */}
          <div
            style={{
              display: 'flex',
              padding: '1rem',
              gap: '0.5rem',
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderTop: '1px solid #d1d5db',
              backgroundColor: '#ffffff',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                outlineStyle: 'none',
                width: 'calc(100% - 50px)',
                backgroundColor: isLoading ? '#f3f4f6' : '#ffffff',
                cursor: isLoading ? 'not-allowed' : 'text',
              }}
              placeholder={isLoading ? "Waiting for response..." : "Type a message..."}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '9999px',
                backgroundColor: isLoading ? '#93c5fd' : '#3b82f6',
                outline: 'none',
                border: 'none',
                width: '42px',
                height: '42px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              {isLoading ? (
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #ffffff', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="20" width="20">
                  <path
                    fill="#ffffff"
                    d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setChatBotVisible(!chatBotVisible)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '9999px',
          backgroundColor: '#3b82f6',
          outline: 'none',
          border: 'none',
          width: '60px',
          height: '60px',
          position: 'fixed',
          zIndex: 9999,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          ...getPositionButton(),
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)';
        }}
      >
        {chatBotVisible ? (
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512">
            <path
              fill="#ffffff"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 640 512">
            <path
              fill="#ffffff"
              d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
