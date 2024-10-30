function processImage() {
  const input = document.getElementById('imageUpload');
  const file = input.files[0];
  
  if (file) {
    // Show a message to indicate processing
    document.getElementById("situation").innerText = "Processing...";
    document.getElementById("background").innerText = "Processing...";
    document.getElementById("assessment").innerText = "Processing...";
    document.getElementById("recommendation").innerText = "Processing...";
    
    // Run OCR on the uploaded image
    Tesseract.recognize(file, 'eng', {
      logger: (m) => console.log(m), // Track OCR progress
    }).then(({ data: { text } }) => {
      console.log("Extracted Text:", text); // Debugging: Log extracted text
      generateSBAR(text);
    }).catch(error => {
      console.error("Error processing image:", error);
      alert("Failed to process image. Please try again.");
    });
  } else {
    alert("Please upload an image.");
  }
}

function generateSBAR(text) {
  // Extract basic sections using keywords for SBAR (simple approach)
  const sections = {
    situation: extractText(text, ["Situation", "SIT"]),
    background: extractText(text, ["Background", "BG"]),
    assessment: extractText(text, ["Assessment", "ASMT"]),
    recommendation: extractText(text, ["Recommendation", "REC"]),
  };

  // Populate the SBAR report fields with extracted data
  document.getElementById("situation").innerText = sections.situation || "No data found";
  document.getElementById("background").innerText = sections.background || "No data found";
  document.getElementById("assessment").innerText = sections.assessment || "No data found";
  document.getElementById("recommendation").innerText = sections.recommendation || "No data found";
}

function extractText(text, keywords) {
  for (const keyword of keywords) {
    const index = text.indexOf(keyword);
    if (index !== -1) {
      // Extract text after the keyword until the next line
      return text.substring(index + keyword.length).split("\n")[0].trim();
    }
  }
  return null;
}