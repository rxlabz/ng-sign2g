import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Ng2gAuth2AppComponent } from '../app/ng2g-auth2.component';

beforeEachProviders(() => [Ng2gAuth2AppComponent]);

describe('App: Ng2gAuth2', () => {
  it('should create the app',
      inject([Ng2gAuth2AppComponent], (app: Ng2gAuth2AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng2g-auth2 works!\'',
      inject([Ng2gAuth2AppComponent], (app: Ng2gAuth2AppComponent) => {
    expect(app.title).toEqual('ng2g-auth2 works!');
  }));
});
