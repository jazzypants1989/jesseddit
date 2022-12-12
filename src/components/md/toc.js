let tocs = {
  "client-side-routing-1": {
    "1.) Introduction": "introduction",
    "2.) A Brief History of Client Side Routing":
      "a-brief-history-of-client-side-routing",
    "3.) Getting Started, Setting up a Server":
      "getting-started-setting-up-a-server",
    "4.) Introduction to State Management": "state-management",
    "5.) The Window Object": "the-window-object",
    "6.) The Location API and Parameters": "the-location-api-and-parameters",
    "7.) The History API": "the-history-api",
    "8.) The Web Storage API": "the-web-storage-api",
    "9.) The Router": "the-router",
    "10.) The Route Config": "the-route-config",
    "11.) The Link Component": "the-link-component",
    "12.) Theme Switching": "theme-switching",
    "13.) Nested and Dynamic Routes": "nested-and-dynamic-routes",
    "14.) Adding Reactive Search": "adding-reactive-search",
    "15.) XSS Attacks and Other Concerns": "xss-attacks-and-other-concerns",
    "16.) Conclusion": "conclusion",
  },
}

export const articleMatcher = (article) => {
  if (tocs[article]) {
    return tocs[article]
  }
}
