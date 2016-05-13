export class Ng2gAuth2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng2g-auth2-app h1')).getText();
  }
}
