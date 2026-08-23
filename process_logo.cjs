const { Jimp } = require("jimp");

async function processImage() {
  try {
    const image = await Jimp.read("public/tenazity-new-logo.jpeg");
    
    // Make white transparent and invert black to white
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0; // Transparent
      } else {
        this.bitmap.data[idx + 0] = 255 - red;
        this.bitmap.data[idx + 1] = 255 - green;
        this.bitmap.data[idx + 2] = 255 - blue;
        this.bitmap.data[idx + 3] = 255;
      }
    });

    // Autocrop the transparent edges so the bird takes up the full frame!
    image.autocrop();

    // Save as favicon
    await image.write("public/favicon.png");
    
    // Save as logo for header/footer
    await image.write("public/tenazity-logo-cropped.png");
    
    console.log("Successfully cropped and processed logo!");
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

processImage();
