
# Google Meet Auto Camera Enabler

**Google Meet Auto Camera Enabler** is a Chrome extension designed to automatically enable your camera in Google Meet when a specified number of participants have their cameras turned on. This tool is especially useful for students in online classes where camera usage is mandatory. By pairing this extension with OBS Studio's Virtual Camera, you can ensure compliance with attendance policies while maintaining privacy.

## Features
- Automatically turns on your camera when the number of active cameras exceeds a user-defined threshold.
- Works seamlessly with OBS Studio's Virtual Camera to simulate camera presence.
- Allows users to customize the detection threshold for active cameras.
- Lightweight and easy to use.

---

## How It Works
1. **Active Camera Detection**:
   - The extension scans the Google Meet interface to count the number of participants with active cameras.
   - If the number of active cameras exceeds the user-defined threshold, your camera will automatically turn on.

2. **Integration with OBS Studio**:
   - Use OBS Studio's Virtual Camera feature as your video source.
   - Configure OBS to display a static image, blurred background, or any other content to maintain privacy while meeting camera requirements.

3. **Customizable Threshold**:
   - You can adjust the number of active cameras required to trigger your camera (e.g., 1, 2, or more).

---

## Installation

### Step 1: Load the Extension
1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** by toggling the switch in the top-right corner.
4. Click **Load unpacked** and select the folder containing the extension files.
5. The extension should now appear in your list of installed extensions.

### Step 2: Set Up OBS Studio
1. Download and install [OBS Studio](https://obsproject.com/).
2. Configure OBS Studio to use a static image, blurred background, or any other content as your video source.
   - Add a **Video Source** (e.g., Image, Color Source, or Webcam).
   - Customize the source to display the desired content.
3. Start the **Virtual Camera** in OBS Studio:
   - Go to `Tools > Virtual Camera` in OBS Studio.
   - Click **Start Virtual Camera**.
4. In Google Meet, select **OBS Virtual Camera** as your video source.

---

## Usage

### Step 1: Open Google Meet
- Join a Google Meet session where camera usage is required.

### Step 2: Start Tracking
1. Click the extension icon in your Chrome toolbar to open the popup.
2. Click **Start Tracking** to begin monitoring active cameras in the session.

### Step 3: Adjust the Detection Threshold
- To change the number of active cameras required to trigger your camera:
  1. Open the `content.js` file in the extension folder.
  2. Locate the following line in the script:
     ```javascript
     if (activeCameraCount > 1) {
     ```
  3. Change the value `1` to your desired threshold (e.g., `2`, `3`, etc.).
  4. Save the file and reload the extension in `chrome://extensions/`.

### Step 4: Monitor Active Cameras
- The popup will display:
  - **Total Participants**: The total number of participants in the call.
  - **Active Cameras**: The number of participants with their cameras turned on.
- If the number of active cameras exceeds the threshold, your camera will automatically turn on.

---

## Troubleshooting

### Issue: "An error occurred while fetching data"
- Ensure you are on a valid Google Meet page (`https://meet.google.com/`).
- Reload the extension and try again.

### Issue: Camera Does Not Turn On
- Verify that OBS Studio's Virtual Camera is running and selected as your video source in Google Meet.
- Check the console logs (`F12` in Chrome) for errors and ensure the DOM structure of Google Meet matches the selectors in `content.js`.

### Issue: Incorrect Active Camera Count
- Open Chrome DevTools (`F12`) and inspect the DOM structure of Google Meet.
- Update the selectors in `content.js` if Google Meet's DOM has changed.

---

## Customization

### Changing the Detection Threshold
To modify the number of active cameras required to trigger your camera:
1. Open `content.js`.
2. Locate the following line:
   ```javascript
   if (activeCameraCount > 1) {
   ```
3. Replace `1` with your desired threshold (e.g., `2`, `3`, etc.).
4. Save the file and reload the extension.

### Adding Debugging Logs
If you encounter issues, you can add additional `console.log` statements in `content.js` to debug the script:
```javascript
console.log('Active Camera Count:', activeCameraCount);
```

---

## Known Limitations
- The extension relies on Google Meet's DOM structure, which may change over time. If the selectors break, you may need to update them manually.
- The extension only works on Google Meet and requires OBS Studio's Virtual Camera for privacy.

---

## Contributing
Contributions are welcome! If you find a bug or have suggestions for improvement, please open an issue or submit a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support
For questions or support, feel free to reach out via GitHub issues or email.

## Future Updates
Audio to text "Name detection" - for detecting your name being called and playing a video file to simulate attendance entry.
