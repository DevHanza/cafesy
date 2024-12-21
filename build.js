const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

// Configuration
const sourceDir = "views"; // Your EJS files directory
const outputDir = "dist"; // Static output directory
const routes = ["/", "/menu", "/about", "/contact", "/newsletter", "/faqs"];

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Function to compile EJS to HTML
async function compileTemplate(route) {
  const templatePath = path.join(
    sourceDir,
    route === "/" ? "home.ejs" : `${route.slice(1)}.ejs`
  );
  const outputPath = path.join(
    outputDir,
    route === "/" ? "index.html" : `${route.slice(1)}.html`
  );

  try {
    // Get your dynamic data that was previously provided by Express routes
    const data = {
      // Add any data your templates need
      title: "Cafesy ☕",
      // ... other data
    };

    const html = await ejs.renderFile(templatePath, data);
    fs.writeFileSync(outputPath, html);
    console.log(`Generated: ${outputPath}`);
  } catch (err) {
    console.error(`Error processing ${templatePath}:`, err);
  }
}

// Copy static assets
function copyStaticAssets() {
  const staticDir = "public"; // Your static files directory
  if (fs.existsSync(staticDir)) {
    fs.cpSync(staticDir, outputDir, { recursive: true });
    console.log("Static assets copied");
  }
}

// Build site
async function buildSite() {
  console.log("Building static site...");

  // Generate HTML for each route
  for (const route of routes) {
    await compileTemplate(route);
  }

  // Copy static assets
  copyStaticAssets();

  console.log("Build complete!");
}

buildSite();
