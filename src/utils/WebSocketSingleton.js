class WebSocketSingleton {
  constructor(){
    this.webSocket = null;
    this.onMessageCallback = null;
    this.instance = null;
  }

  static getInstance() {
    if (!WebSocketSingleton.instance) {
      WebSocketSingleton.instance = new WebSocketSingleton();
    }
    return WebSocketSingleton.instance;
  }

  initialize(username) {
    if (this.webSocket === null) {
      this.webSocket = new WebSocket(`ws://localhost:3010/chat/${username}`);

      this.webSocket.onopen = () => {
        console.log('WebSocket connection established for', username);
      };

      this.webSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.webSocket.onclose = () => {
        console.log('WebSocket connection closed for', username);
        this.webSocket = null;
      };

      this.webSocket.onmessage = (event) => {
        const message = event.data.toString();
        console.log('Raw message received:', message);
        if (message.includes(':')) {
          const [sender, messageText] = message.split(':');
          if (this.onMessageCallback) {
            this.onMessageCallback(sender.trim(), messageText.trim());
          } else {
            console.error('onMessageCallback not defined');
          }
        } else {
          console.log('Processed message (no sender):', message.trim());
          this.onMessageCallback(null, message.trim());
        }
      };
    }
  }

  setOnMessageCallback(callback) {
    this.onMessageCallback = callback;
  }

  sendMessage(message) {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(message);
    } else {
      console.error('WebSocket connection is not open.');
    }
  }
}

const instance = WebSocketSingleton.getInstance();
export default instance;
