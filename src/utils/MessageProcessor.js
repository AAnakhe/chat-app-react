class MessageProcessor {
    static processMessage(message, onMessageCallback) {
      console.log('Raw message received:', message);
      if (message.includes(':')) {
        const [selectedContact, messageText] = message.split(':');
        if (onMessageCallback && selectedContact && messageText) {
          console.log('Processed message - Sender:', selectedContact.trim(), 'Message:', messageText.trim());
          onMessageCallback(selectedContact.trim(), messageText.trim());
        } else {
          console.error('Failed to process message:', message);
        }
      } else {
        console.error('Incoming message does not include ":"');
      }
    }
  }
  
  export default MessageProcessor;
  