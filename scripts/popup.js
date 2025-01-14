// Function to get the query parameter value
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Set the input value to the URL passed as a query parameter
function setCurrentPageUrl() {
  const url = decodeURIComponent(getQueryParam('url'));
  if (url && url !== 'null') {
    document.getElementById('currentPageUrl').value = decodeURIComponent(url);
  } else {
    // Handle the case when URL parameter is null by getting the active tab's URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        document.getElementById('currentPageUrl').value = decodeURIComponent(tabs[0].url);
      } else {
        document.getElementById('currentPageUrl').value = 'Unable to get URL';
      }
    });
  }
}

// Function to copy the current page URL to clipboard
function copyCurrentPageUrl() {
  var copyText = document.getElementById('currentPageUrl');
  copyText.select();
  document.execCommand("copy");

  // Show the toast message
  var toast = new bootstrap.Toast(document.getElementById('copyToast'));
  toast.show();

  // Hide the toast message after 3 seconds
  setTimeout(function() {
    toast.hide();
  }, 3000);
}

// Ensure DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', (event) => {
  setCurrentPageUrl(); // Set the URL when the popup is opened

  document.getElementById('button-copy').addEventListener('click', copyCurrentPageUrl);

  document.getElementById('shareFacebook').addEventListener('click', function() {
    const url = document.getElementById('currentPageUrl').value;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  });

  document.getElementById('shareWhatsApp').addEventListener('click', function() {
    const url = document.getElementById('currentPageUrl').value;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
  });

  document.getElementById('shareX').addEventListener('click', function() {
    const url = document.getElementById('currentPageUrl').value;
    window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
  });

  document.getElementById('shareLinkedIn').addEventListener('click', function() {
    const url = document.getElementById('currentPageUrl').value;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  });

  document.getElementById('shareTelegram').addEventListener('click', function() {
    const url = document.getElementById('currentPageUrl').value;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`, '_blank');
  });

  document.getElementById('shareEmail').addEventListener('click', function() {
    const url = document.getElementById('currentPageUrl').value;
    window.open(`mailto:?subject=Check this out&body=${encodeURIComponent(url)}`, '_blank');
  });
});
