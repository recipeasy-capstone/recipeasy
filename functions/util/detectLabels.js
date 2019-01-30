"use strict";

module.exports = function detectLabels(fileName) {
  const vision = require("@google-cloud/vision");

  const client = new vision.ImageAnnotatorClient({
    projectId: "receipt-detection-app",
    keyFilename: "../googleSecret/cloudKey.json"
  });

  const [result] = client.labelDetection(fileName).then(() => {
    const labels = result.labelAnnotations;
    return labels.filter(
      label => label.description === "Receipt" && label.score > 0.5
    );
  });
};
