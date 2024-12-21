const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

async function compileTemplate(templatePath, outputPath, data = {}) {
  try {
    // Default data for different templates
    const defaultData = {
      title: 'Welcome',
      heading: 'Welcome to Cafésy',
      description: 'Experience the finest coffee and pastries in town'
    };

    const html = await ejs.renderFile(templatePath, { ...defaultData, ...data });
    
    // Ensure the output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, html);
    console.log(`Generated: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${templatePath}:`, error);
    throw error;  // Re-throw to handle in the main build process
  }
}

async function copyDirectory(source, destination) {
  if (!fs.existsSync(source)) {
    console.warn(`Warning: Source directory ${source} does not exist`);
    return;
  }

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      await copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

async function buildSite() {
  console.log('Building static site...');
  
  try {
    // Ensure docs directory exists
    if (!fs.existsSync('docs')) {
      fs.mkdirSync('docs', { recursive: true });
    }

    // Define all pages to be built
    const pages = [
      { 
        template: 'views/home.ejs', 
        output: 'docs/index.html',
        data: {
          title: 'Home | Cafésy',
          isHomePage: true
        }
      },
      { template: 'views/menu.ejs', output: 'docs/menu.html' },
      { template: 'views/about.ejs', output: 'docs/about.html' },
      { template: 'views/contact.ejs', output: 'docs/contact.html' },
      { 
        template: 'views/newsletter.ejs', 
        output: 'docs/newsletter.html',
        data: {
          title: 'Newsletter',
          heading: 'Subscribe to Our Newsletter',
          text: 'Stay updated with our latest news and special offers!',
          form_action: '/subscribe',
          btntext: 'Subscribe Now'
        }
      },
      { template: 'views/faqs.ejs', output: 'docs/faqs.html' }
    ];

    // Copy static assets first
    console.log('Copying static assets...');
    await copyDirectory('public', 'docs');

    // Build each page
    for (const page of pages) {
      await compileTemplate(page.template, page.output, page.data);
    }

    console.log('Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}
