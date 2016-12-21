import { AnontownUserPage } from './app.po';

describe('anontown-user App', function() {
  let page: AnontownUserPage;

  beforeEach(() => {
    page = new AnontownUserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
