function processImage() {
  const input = document.getElementById('imageUpload');
  const file = input.files[0];
  
  if (file) {
    console.log("Processing image...");
    Tesseract.recognize(file, 'eng', {
      logger: (m) => console.log(m), // Optional: track OCR progress
    }).then(({ data: { text } }) => {
      console.log("Extracted Text:", text); // Debugging: Log extracted text
      generateSBAR(text);
    });
  } else {
    alert("Please upload an image.");
  }
}

function generateSBAR(text) {
  // Simple keyword-based extraction for demo purposes
  const sections = {
    situation: extractText(text, ["Situation", "SIT"]),
    background: extractText(text, ["Background", "BG"]),
    assessment: extractText(text, ["Assessment", "ASMT"]),
    recommendation: extractText(text, ["Recommendation", "REC"]),
  };

  // Update HTML with extracted text
  document.getElementById("situation").innerText = sections.situation;
  document.getElementById("background").innerText = sections.background;
  document.getElementById("assessment").innerText = sections.assessment;
  document.getElementById("recommendation").innerText = sections.recommendation;
}

function extractText(text, keywords) {
  for (const keyword of keywords) {
    const index = text.indexOf(keyword);
    if (index !== -1) {
      return text.substring(index + keyword.length).split("\n")[0].trim();
    }
  }
  return "Not found";
}