import {bootstrap} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {Ng2gAuth2AppComponent, environment} from "./app";

if (environment.production) {
  enableProdMode();
}

bootstrap(Ng2gAuth2AppComponent, [HTTP_PROVIDERS]);
