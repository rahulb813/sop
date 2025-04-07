document.getElementById('closeUnpinned').addEventListener('click', () => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      for (let tab of tabs) {
        if (!tab.pinned) {
          chrome.tabs.remove(tab.id);
        }
      }
    });
  });
  