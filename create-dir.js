const fs = require('fs');
const path = require('path');

const pages = [
  ["Home","Navbar","",
    ["HeroHeaderSection"],
    ["FeatureSection"],
    ["FeaturesListSection"],
    ["HowItWorksSection"],
    ["TestimonialSection"],
    ["CTASection"],
    ["EarlyAccessSection"],
    ["ContactSection"],
    ["FAQSection"],
    ["TeamSection"],
    ["Footer"]
  ],
  ["Products","Navbar","",
    ["EcommerceProductsListSection"],
    ["FeatureSection"],
    ["TestimonialSection"],
    ["ReviewsSection"],
    ["PricingSection"],
    ["CTASection"],
    ["FAQSection"],
    ["LogoListSection"],
    ["ClientLogosListSection"],
    ["CTASection"],
    ["Footer"]
  ],
  ["Product","Navbar","",
    ["EcommerceProductHeaderSection"],
    ["EcommerceProductSection"],
    ["ReviewsSection"],
    ["PricingSection"],
    ["CTASection"],
    ["GallerySection"],
    ["FAQSection"],
    ["ContactFormSection"],
    ["TestimonialSection"],
    ["CTASection"],
    ["Footer"]
  ],
  ["AboutUs","Navbar","",
    ["HeaderSection"],
    ["AboutSection"],
    ["StatsSection"],
    ["TeamSection"],
    ["AwardLogosListSection"],
    ["ClientLogosListSection"],
    ["PartnerLogosListSection"],
    ["JobListingsSection"],
    ["CTASection"],
    ["Footer"]
  ],
  ["Blog","Navbar","",
    ["FeaturedBlogListHeaderSection"],
    ["BlogListSection"],
    ["CTASection"],
    ["NewsletterSection"],
    ["FAQSection"],
    ["Footer"]
  ],
  ["BlogPost","Navbar","",
    ["BlogPostHeaderSection"],
    ["BlogPostBodySection"],
    ["TestimonialSection"],
    ["ReviewsSection"],
    ["CTASection"],
    ["FAQSection"],
    ["LogoListSection"],
    ["AwardLogosListSection"],
    ["ClientLogosListSection"],
    ["Footer"]
  ],
  ["SellerDashboard","Navbar","",
    ["HeaderSection"],
    ["FeatureSection"],
    ["FeaturesListSection"],
    ["HowItWorksSection"],
    ["TestimonialSection"],
    ["CTASection"],
    ["ContactFormSection"],
    ["FAQSection"],
    ["JobListingsSection"],
    ["Footer"]
  ],
];



function createComponentFile(pageName, sectionName) {
    const componentName = sectionName
      ? `${sectionName.replace(/\s/g, '')}Section`
      : 'Page';
  
    // Ensure the directory exists
    const directoryPath = path.join('src', 'components', pageName);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
  
    const content = `import React from 'react';
  
  const ${componentName} = () => {
    return (
      <div>
        {/* Content for ${sectionName || pageName} goes here */}
      </div>
    );
  };
  
  export default ${componentName};
  `;
  
    const filePath = path.join(directoryPath, `${componentName}.js`);
  
    fs.writeFileSync(filePath, content);
    console.log(`File created: ${filePath}`);
  }
  
  function createPageFiles(page) {
    const [pageName, navbar, ...sections] = page;
  
    // Create pages directory if it doesn't exist
    const pagesDir = path.join('src', 'pages', pageName);
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir);
    }
  
    // Create Navbar component
    createComponentFile(pageName, navbar);
  
    // Create components for each section
    sections.forEach((section) => {
      createComponentFile(pageName, section[0]);
    });
  }
  
  function generateFiles() {
    // Create common directory if it doesn't exist
    const commonDir = path.join('src', 'components', 'common');
    if (!fs.existsSync(commonDir)) {
      fs.mkdirSync(commonDir);
    }
  
    // Generate files for each page
    pages.forEach(createPageFiles);
  
    // Create App.js
    const appContent = `import React from 'react';
  import './App.css';
  
  function App() {
    return (
      <div className="App">
        {/* Add your routing logic or page components here */}
      </div>
    );
  }
  
  export default App;
  `;
  
    fs.writeFileSync(path.join('src', 'App.js'), appContent);
    console.log('File created: src/App.js');
  
    // Create index.js
    const indexContent = `import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
  import './index.css';
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  `;
  
    fs.writeFileSync(path.join('src', 'index.js'), indexContent);
    console.log('File created: src/index.js');
  }
  
  generateFiles();