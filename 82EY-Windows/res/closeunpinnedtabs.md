## Folder Structure

- manifest.json
- background.js
- popup.html
- popup.js


### manifest.json 

```
{
  "manifest_version": 3,
  "name": "Close Unpinned Tabs",
  "version": "1.0",
  "description": "Closes all unpinned tabs in the current window",
  "permissions": ["tabs"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon.png"
    }
  },
  "background": {
    "service_worker": "background.js"
  }
}

```

## background.js

```
// background.js (not used in this case but required by manifest)
```

## popup.html

```
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 10px; width: 200px; }
    button { width: 100%; padding: 10px; font-size: 14px; }
  </style>
</head>
<body>
  <button id="closeUnpinned">Close Unpinned Tabs</button>
  <script src="popup.js"></script>
</body>
</html>

```

## popup.js

```
document.getElementById('closeUnpinned').addEventListener('click', () => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    for (let tab of tabs) {
      if (!tab.pinned) {
        chrome.tabs.remove(tab.id);
      }
    }
  });
});

```