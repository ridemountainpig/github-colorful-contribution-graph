chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the changeInfo includes a URL (indicating a navigation event)
  if (changeInfo.url) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content_script.js"],
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "setColor") {
    const data = message.data;
    setColor(data);
    return true;
  }
  if (message.type === "getColor") {
    getColor(message.data, function (result: any) {
      sendResponse(result);
    });
    return true;
  }
  if (message.type === "updatePageGraphColor") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTabId = tabs[0].id;
      if (currentTabId) {
        updatePageGraphColor(currentTabId);
      }
    });
    return true;
  }
});

const setColor = (data: string[]) => {
  chrome.storage.local.set(data, function () {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      console.log("Data saved:", data);
    }
  });
};

const getColor = (key: string, callback: (result: string[]) => void) => {
  chrome.storage.local.get(key, function (result) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      const colors: string[] = result[key];
      callback(colors);
    }
  });
};

const updatePageGraphColor = (tabId: number) => {
  chrome.scripting
    .executeScript({
      target: { tabId: tabId },
      files: ["setcolor_script.js"],
    })
    .catch((error) => {
      console.error(`Error injecting script: ${error}`);
    });
};
