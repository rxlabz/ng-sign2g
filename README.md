# Google Sign-In service in Angular 2 App

<a target="_blank" href="https://developers.google.com/identity/sign-in/web/sign-in">Google Sign-In intro</a>

## Gauth.service

The Gauth service exposes :
- **currentProfile$** : an Observable<Profile> which allows to get the user profile.
- get **isSignedIn()**:boolean
- **signIn()**
- **grant(scope:string, offline:boolean = false)** : request additionnal permissions
- revoke() : cancel all app permissions
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
// app/config.ts
export interface Config {
    client_id:string;
}

export let CONFIG:Config = {
    client_id: 'YOUR_APP_ID_LIKE_0123456789.apps.googleusercontent.com'
}

// create token used for DI
export let APP_CONFIG = new OpaqueToken('app.config');


// app/gauth.service.ts
constructor(@Inject(APP_CONFIG) private cfg:Config, private http:Http, private ngZone:NgZone) {
    this.CLIENT_ID = cfg.client_id;
    this.currentProfile$ = new Observable<Profile>(obs => this.profileOb$r = obs).share();
    this.loadApi(this.CLIENT_ID);
}

loadApi(CLIENT_ID:string) {
    gapi['load']('auth2', this.onApi.bind(this));
}

```



In this example, the service is injected in Ng2gAuthApp component.

```typescript
// ng2-auth2.components.ts
constructor(public service:GauthService) {}

ngOnInit(){
    this.currentProfile$ = this.service.currentProfile$;
    this.currentProfile$.subscribe((value)=>this.profile = value);
}

onProfile(p:Profile){
        this.currentProfile = p;
        this.grantedScopes = p ? p.scope.split(' ') : [];
    }
```
