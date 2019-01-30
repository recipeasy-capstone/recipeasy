"use strict";
const notFood = require("./notFood");

module.exports = function detectText(fileName) {
  const vision = require("@google-cloud/vision");

  const client = new vision.ImageAnnotatorClient({
    projectId: "receipt-detection-app",
    keyFilename: "../googleSecret/cloudKey.json"
  });

  const food = /[A-Z]/g;
  const [result] = client.textDetection(fileName).then(() => {
    const detections = result.textAnnotations[0].description;
    return detections
      .split("\n")
      .filter(
        text =>
          text.length !== 0 && text[0].match(food) && !notFood.includes(text)
      );
  });
};
