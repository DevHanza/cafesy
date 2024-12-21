const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

async function compileTemplate(templatePath, outputPath, data = {}) {
  try {
    // Default data for newsletter template
    const newsletterData = {
      title: "Newsletter",
      heading: "Subscribe to Our Newsletter",
      text: "Stay updated with our latest news and special offers!",
      form_action: "/subscribe",
      btntext: "Subscribe Now",
    };

    // Merge default newsletter data with any custom data passed in
    const templateData = templatePath.includes("newsletter")
      ? { ...newsletterData, ...data }
      : data;

    const html = await ejs.renderFile(templatePath, templateData);
    fs.writeFileSync(outputPath, html);
    console.log(`Generated: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${templatePath}:`, error);
  }
}

async function buildSite() {
  console.log("Building static site...");

  // Create docs directory if it doesn't exist
  if (!fs.existsSync("docs")) {
    fs.mkdirSync("docs");
  }

  // Array of pages to build
  const pages = [
    { template: "views/index.ejs", output: "docs/index.html" },
    { template: "views/menu.ejs", output: "docs/menu.html" },
    { template: "views/about.ejs", output: "docs/about.html" },
    { template: "views/contact.ejs", output: "docs/contact.html" },
    { template: "views/newsletter.ejs", output: "docs/newsletter.html" },
    { template: "views/faqs.ejs", output: "docs/faqs.html" },
  ];

  // Build each page
  for (const page of pages) {
    await compileTemplate(page.template, page.output);
  }

  // Copy static assets (assuming you have a public directory)
  if (fs.existsSync("public")) {
    fs.cpSync("public", "docs", { recursive: true });
    console.log("Static assets copied");
  }

  console.log("Build complete!");
}

buildSite().catch(console.error);
