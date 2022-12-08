let tocs = {
  "client-side-routing-1": {
    "1.) Introduction": "introduction",
    "2.) A Brief History of Client Side Routing":
      "a-brief-history-of-client-side-routing",
    "3.) Getting Started, Setting up a Server":
      "getting-started-setting-up-a-server",
    "4.) Introduction to State Management": "introduction-to-state-management",
    "5.) The Connection Between State Management and Routing":
      "state-and-routing",
    "6.) The Window Object": "the-window-object",
    "7.) The Location API and Parameters": "the-location-api-and-parameters",
    "8.) The History API": "the-history-api",
    "9.) The Web Storage API": "the-web-storage-api",
    "10.) The Router": "the-router",
    "11.) The Route Config": "the-route-config",
    "12.) The Link Component": "the-link-component",
    "13.) Theme Switching": "theme-switching",
    "14.) Nested and Dynamic Routes": "nested-and-dynamic-routes",
    "15.) Adding Reactive Search": "adding-reactive-search",
    "16.) XSS Attacks and Other Concerns": "xss-attacks-and-other-concerns",
    "17.) Conclusion": "conclusion",
  },
}

export const articleMatcher = (article) => {
  if (tocs[article]) {
    return tocs[article]
  }
}
