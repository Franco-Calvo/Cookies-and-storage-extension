document
  .getElementById("clearLocalStorage")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: clearLocalStorage,
      });
    });
  });

document.getElementById("clearCookies").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: clearCookies,
    });
  });
});

function clearLocalStorage() {
  localStorage.clear();
}

function clearCookies() {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    document.cookie = `${
      c.split("=")[0]
    }=;expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/`;
  }

  window.location.reload();
}
