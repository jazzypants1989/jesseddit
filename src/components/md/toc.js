let tocs = {
  "client-side-routing-1": {
    "1.) Introduction": "introduction",
    "2.) A Brief History of Client Side Routing":
      "a-brief-history-of-client-side-routing",
    "3.) Getting Started, Setting up a Server":
      "getting-started-setting-up-a-server",
    "4.) Introduction to State Management": "state-management",
    "5.) The Window Object": "the-window-object",
    "6.) The Location API and Parameters":
      "the-location-api-and-parameters#introduction-and-demo-one",
    "7.) The History API": "the-history-api#introduction-and-demo",
    "8.) The Web Storage API": "the-web-storage-api",
    "9.) Planning Our App": "planning-our-app",
    "10.) The Skeleton": "the-skeleton",
    "11.) The Router, The Link, and the Routes": "router-link-and-routes",
    "12.) Cart and Theme Storage": "cart-and-theme-storage",
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
