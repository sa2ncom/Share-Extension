// Function to update the input with the current page URL
function updateCurrentPageUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var url = decodeURIComponent(currentTab.url);
    document.getElementById('currentPageUrl').value = url;
  });
}

// Function to copy the current page URL to clipboard
function copyCurrentPageUrl() {
  var copyText = document.getElementById('currentPageUrl');
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy");

  // Show the toast message
  var toast = new bootstrap.Toast(document.getElementById('copyToast'));
  toast.show();

  // Hide the toast message after 3 seconds
  setTimeout(function() {
    toast.hide();
  }, 3000);
}

document.getElementById('button-copy').addEventListener('click', copyCurrentPageUrl);

document.getElementById('shareFacebook').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var url = currentTab.url;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  });
});

document.getElementById('shareWhatsApp').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var url = currentTab.url;
    window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
  });
});

document.getElementById('shareX').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var url = currentTab.url;
    window.open(`https://x.com/intent/tweet?url=${url}`, '_blank');
  });
});

document.getElementById('shareLinkedIn').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var url = currentTab.url;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  });
});

document.getElementById('shareTelegram').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var url = currentTab.url;
    window.open(`https://t.me/share/url?url=${url}`, '_blank');
  });
});

document.getElementById('shareEmail').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var url = currentTab.url;
    window.open(`mailto:?subject=Check this out&body=${url}`, '_blank');
  });
});

// Call the function to update the URL when the popup is opened
updateCurrentPageUrl();
