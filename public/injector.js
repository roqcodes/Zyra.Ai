(() => {
  // Prevent multiple injections
  if (window.LoyalBotProInitialized) return;
  window.LoyalBotProInitialized = true;

  // Create and inject styles
  const style = document.createElement('style');
  style.textContent = `
    .loyalbot-fab {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #4f46e5;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      cursor: pointer;
      z-index: 9999;
      transition: transform 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loyalbot-fab:hover {
      transform: scale(1.1);
    }

    .loyalbot-chat-window {
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      z-index: 9998;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }

    .loyalbot-chat-header {
      background: #4f46e5;
      color: white;
      padding: 16px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .loyalbot-chat-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
    }

    .loyalbot-chat-input {
      border-top: 1px solid #e5e7eb;
      padding: 16px;
      display: flex;
      gap: 8px;
    }

    .loyalbot-input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      outline: none;
    }

    .loyalbot-send {
      background: #4f46e5;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Create chat window
  const chatWindow = document.createElement('div');
  chatWindow.className = 'loyalbot-chat-window';
  chatWindow.innerHTML = `
    <div class="loyalbot-chat-header">
      <span>LoyalBot Pro</span>
      <button style="background: none; border: none; color: white; cursor: pointer;">×</button>
    </div>
    <div class="loyalbot-chat-body">
      <div style="text-align: center; color: #6b7280;">
        Chat functionality coming soon!
      </div>
    </div>
    <div class="loyalbot-chat-input">
      <input type="text" class="loyalbot-input" placeholder="Type your message..." disabled>
      <button class="loyalbot-send" disabled>Send</button>
    </div>
  `;

  // Create FAB button
  const fab = document.createElement('div');
  fab.className = 'loyalbot-fab';
  fab.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;

  // Add elements to DOM
  document.body.appendChild(chatWindow);
  document.body.appendChild(fab);

  // Add event listeners
  fab.addEventListener('click', () => {
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
  });

  chatWindow.querySelector('.loyalbot-chat-header button').addEventListener('click', () => {
    chatWindow.style.display = 'none';
  });

  // Error logging function
  window.logLoyalBotError = (error) => {
    fetch('/api/log-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop: window.Shopify?.shop,
        error: error.toString(),
      }),
    }).catch(console.error);
  };
})(); 