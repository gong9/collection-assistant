function polling() {
  console.log("polling");
  setTimeout(polling, 1000 * 30);
}

// polling();


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  
  if (request.action === "processData"){
    console.log("processData", request.content);
    sendResponse({ status: 'processing' });
    chrome.runtime.sendMessage({ action: 'downloadComplete' });
    return true; // 保持消息通道打开以便发送异步响应
  }
});