import { Ng2gAuth2Page } from './app.po';

describe('ng2g-auth2 App', function() {
  let page: Ng2gAuth2Page;

  beforeEach(() => {
    page = new Ng2gAuth2Page();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng2g-auth2 works!');
  });
});
