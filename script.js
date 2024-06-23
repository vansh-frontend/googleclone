

function handleKeyPress(event) {
  // Check if Enter key is pressed
  if (event.keyCode === 13 || event.which === 13) {
    // Get the search query from the desktop input field
    var searchQuery = document.getElementById('searchInputDesktop').value;

    // Perform the search
    search(searchQuery);
  }
}

function handleMicClick() {
  // Request permission to use the microphone
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      // Create a new SpeechRecognition object
      const recognition = new window.webkitSpeechRecognition();
      
      // Start speech recognition
      recognition.start();

      // Event listener for when the recognition engine recognizes speech
      recognition.onresult = function(event) {
        // Get the first recognition result
        const speechToText = event.results[0][0].transcript;
        // Fill the input field with the recognized text
        document.getElementById('searchInputDesktop').value = speechToText;
        // Perform the search
        search(speechToText);
      };

      // Event listener for when the recognition process ends
      recognition.onend = function() {
        // Stop the stream
        stream.getTracks().forEach(track => track.stop());
      };
    })
    .catch(function(err) {
      console.error('Error accessing the microphone:', err);
    });
}

function search(query) {
  // Construct the search URL
  var searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(query);
  // Open the search URL in a new tab
  window.open(searchURL, '_self');
}

// popus for mic
document.addEventListener('DOMContentLoaded', function() {
  const micIcon = document.getElementById('googleMic');
  const popup = document.getElementById('popup');

  micIcon.addEventListener('click', function() {
    popup.style.display = 'block';
  });

  document.body.addEventListener('click', function(event) {
    if (event.target !== micIcon) {
      popup.style.display = 'none';
    }
  });
});
