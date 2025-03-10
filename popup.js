document.addEventListener('DOMContentLoaded', () => {
  const startTrackingButton = document.getElementById('start-tracking');
  const closeButton = document.getElementById('close-popup');
  const participantCountElement = document.getElementById('participant-count');
  const cameraCountElement = document.getElementById('camera-count');

  // Add event listener to the "Start Tracking" button
  startTrackingButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      // Ensure the active tab is a Google Meet page
      if (!activeTab || !activeTab.url.includes('https://meet.google.com/')) {
        console.error('Active tab is not a Google Meet page.');
        alert('Please open a Google Meet page to use this extension.');
        return;
      }

      // Inject the content script dynamically
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ['content.js']
      }).then(() => {
        console.log('Content script injected successfully.');

        // Request participant data from the content script
        chrome.tabs.sendMessage(activeTab.id, { action: 'getParticipantData' }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error communicating with content script:', chrome.runtime.lastError.message);
            alert('An error occurred while fetching data. Please try again.');
            return;
          }

          // Update the popup UI with the response data
          participantCountElement.textContent = response?.participantCount || 'N/A';
          cameraCountElement.textContent = response?.activeCameraCount || 'N/A';
        });
      }).catch((error) => {
        console.error('Error injecting content script:', error);
        alert('Failed to inject content script. Please reload the extension.');
      });
    });
  });

  // Add event listener to the "Close" button
  closeButton.addEventListener('click', () => {
    window.close(); // Close the popup
  });
});