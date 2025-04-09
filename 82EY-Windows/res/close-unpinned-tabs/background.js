function closeAllUnpinnedTabs() {
    chrome.windows.getAll({ populate: true }, (windows) => {
      windows.forEach((win) => {
        win.tabs.forEach((tab) => {
          if (!tab.pinned) {
            chrome.tabs.remove(tab.id);
          }
        });
      });
    });
  }
  
  // Trigger via keyboard shortcut
  chrome.commands.onCommand.addListener((command) => {
    if (command === "close-unpinned-tabs") {
      closeAllUnpinnedTabs();
    }
  });
  
  // Also make it callable from popup
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "close-unpinned-tabs") {
      closeAllUnpinnedTabs();
    }
  });
  