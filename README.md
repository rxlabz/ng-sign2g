# Google Sign-In service in Angular 2 App

## Gauth.service

For now, the Gauth service exposes :
- **currentProfile$** : an Observable<Profile> which allows to get the authentication status.
- get **isSignedIn()**:boolean
- **signIn()**
- **grant(scope:string, offline:boolean = false)**
- revoke()
- logout()

### Usage

**Configuration**

- google js api
```html
<!-- Index.html -->
<script src="https://apis.google.com/js/platform.js"></script>
```

- Injected CLIENT_ID

```typescript
import {OpaqueToken} from "@angular/core";

export interface Config {
    client_id:string;
}

export let CONFIG:Config = {
    client_id: 'YOUR_APP_ID_LIKE_0123456789.apps.googleusercontent.com'
}

// create token used for DI
export let APP_CONFIG = new OpaqueToken('app.config');
```



```typescript
ngOnInit(){
    this.currentProfile$ = this.service.currentProfile$;
    this.currentProfile$.subscribe(this.onProfile.bind(this));
}

onProfile(p:Profile){
        this.currentProfile = p;
        this.grantedScopes = p ? p.scope.split(' ') : [];
    }
```

In this example, the service is injected in Ng2gAuthApp component.

```typescript
constructor(public service:GauthService) {}

ngOnInit() {
    this.service.currentProfile$.subscribe((value) => this.profile = value);
}
```