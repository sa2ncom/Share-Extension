chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "sharePage",
      title: "Share this page",
      contexts: ["page", "link", "image", "selection", "all"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sharePage") {
      openPopupWithUrl(tab.url);
    }
  });
  
  chrome.action.onClicked.addListener((tab) => {
    openPopupWithUrl(tab.url);
  });
  
  function openPopupWithUrl(url) {
    chrome.windows.getCurrent((currentWindow) => {
      const width = 466;
      const height = 400;
      const left = Math.round((currentWindow.width - width) / 2 + currentWindow.left);
      const top = Math.round((currentWindow.height - height) / 2 + currentWindow.top);
  
      chrome.windows.create({
        url: `popup.html?url=${encodeURIComponent(url)}`,
        type: 'popup',
        width: width,
        height: height,
        left: left,
        top: top
      });
    });
  }
  