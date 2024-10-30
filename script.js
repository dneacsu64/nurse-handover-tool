 <!-- JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/tesseract.js@2.1.4/dist/tesseract.min.js"></script>
  <script src="script.js"></script>
</body>
</html>

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  text-align: center;
  max-width: 500px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1, h2, h3 {
  color: #333;
}

#sbarReport p {
  padding: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  color: #333;
}

function processImage() {
  const input = document.getElementById('imageUpload');
  const file = input.files[0];
  
  if (file) {
    Tesseract.recognize(file, 'eng', {
      logger: (m) => console.log(m), // Optional: track OCR progress
    }).then(({ data: { text } }) => {
      // Simulate SBAR parsing logic
      generateSBAR(text);
    });
  } else {
    alert("Please upload an image.");
  }
}
