document.getElementById('closeUnpinned').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "close-unpinned-tabs" });
  });
  