// Function to count participants
function countParticipants() {
  try {
    // Find all participant elements
    const participantElements = document.querySelectorAll('.oZRSLe');
    return participantElements.length;
  } catch (error) {
    console.error('Error counting participants:', error);
    return 0; // Fallback value
  }
}

// Function to count participants with active cameras
function countActiveCameras() {
  let activeCameras = 0;

  try {
    // Find all participant elements
    document.querySelectorAll('.oZRSLe').forEach(participant => {
      try {
        // Exclude your own video tile
        const isYourTile = participant.querySelector('[data-self-name]');
        if (isYourTile) {
          console.log('Skipping your own tile...');
          return;
        }

        // Check if the participant has the 'S7urwe' class
        const isActiveCameraClass = participant.querySelector('.S7urwe') !== null;

        // Fallback: Check for visible <video> elements
        const videoElements = participant.querySelectorAll('video');
        let hasVisibleVideo = Array.from(videoElements).some(video => {
          const style = window.getComputedStyle(video);
          return style.display !== 'none' && video.readyState > 0; // Ensure the video is loaded
        });

        // Determine if the camera is active
        const hasCameraOn = isActiveCameraClass || hasVisibleVideo;

        if (hasCameraOn) {
          activeCameras++;
        }
      } catch (error) {
        console.error('Error checking camera status for a participant:', error);
      }
    });
  } catch (error) {
    console.error('Error counting active cameras:', error);
  }

  return activeCameras;
}

// Function to toggle the camera on or off
function toggleCamera(turnOn) {
  try {
    // Find the camera button
    const cameraButton = document.querySelector(
      '.VYBDae-Bz112c-LgbsSe[aria-label="Turn off camera"], .VYBDae-Bz112c-LgbsSe[aria-label="Turn on camera"]'
    );

    if (!cameraButton) {
      console.error('Camera button not found.');
      return;
    }

    // Check if the camera is currently on
    const isCameraOn = cameraButton.getAttribute('aria-pressed') === 'true';

    // Toggle the camera based on the `turnOn` parameter
    if (turnOn && !isCameraOn) {
      console.log('Turning camera on...');
      cameraButton.click();
    } else if (!turnOn && isCameraOn) {
      console.log('Turning camera off...');
      cameraButton.click();
    } else {
      console.log(`Camera is already ${turnOn ? 'on' : 'off'}. No action taken.`);
    }
  } catch (error) {
    console.error('Error toggling camera:', error);
  }
}

// Main function to monitor active cameras and toggle the camera
function monitorAndToggleCamera() {
  try {
    const activeCameraCount = countActiveCameras();

    console.log('Active Camera Count:', activeCameraCount);

    // Define the threshold for active cameras
    const activeCameraThreshold = 1; // Change this value as needed

    // If there are more than the threshold active cameras, turn on your camera
    if (activeCameraCount > activeCameraThreshold) {
      console.log('Condition met: Active cameras > threshold. Attempting to turn camera on...');
      toggleCamera(true); // Turn camera on
    } 
    // If there are less than or equal to the threshold active cameras, turn off your camera
    else {
      console.log('Condition not met: Active cameras <= threshold. Attempting to turn camera off...');
      toggleCamera(false); // Turn camera off
    }
  } catch (error) {
    console.error('Error monitoring and toggling camera:', error);
  }
}

// MutationObserver to detect DOM changes
let observer;

function initializeObserver() {
  if (observer) {
    observer.disconnect();
  }

  observer = new MutationObserver(() => {
    // Check if the extension context is still valid
    if (!chrome || !chrome.runtime || !chrome.runtime.id) {
      console.error('Extension context invalidated.');
      return;
    }

    // Monitor active cameras and toggle the camera if needed
    setTimeout(() => {
      monitorAndToggleCamera();
    }, 500); // Add a small delay to avoid race conditions
  });

  // Start observing DOM changes
  observer.observe(document.body, { childList: true, subtree: true });
}

// Initialize the observer when the script runs
initializeObserver();

// Initial check
monitorAndToggleCamera();

// Prevent interference with manual actions
document.addEventListener('click', (event) => {
  const clickedElement = event.target;

  // Check if the user clicked the camera button
  if (
    clickedElement.matches('.VYBDae-Bz112c-LgbsSe[aria-label="Turn off camera"], .VYBDae-Bz112c-LgbsSe[aria-label="Turn on camera"]')
  ) {
    console.log('Manual camera toggle detected. Temporarily disabling observer...');
    observer.disconnect(); // Temporarily stop observing DOM changes

    // Re-enable the observer after a short delay
    setTimeout(() => {
      console.log('Re-enabling observer...');
      initializeObserver();
    }, 1000); // Adjust the delay as needed
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getParticipantData') {
    try {
      const participantCount = countParticipants();
      const activeCameraCount = countActiveCameras();

      console.log('Participant Count:', participantCount);
      console.log('Active Camera Count:', activeCameraCount);

      // Send the data back to the popup
      sendResponse({
        participantCount,
        activeCameraCount
      });
    } catch (error) {
      console.error('Error processing participant data:', error);
      sendResponse({
        participantCount: 0,
        activeCameraCount: 0
      });
    }
  }
});