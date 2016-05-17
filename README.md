# Google Sign-In service in Angular 2 App

## Gauth.service

For now, the Gauth service exposes :
- **currentProfile$** : an Observable<Profile> which allows to get the authentication status.
- get **isSignedIn()**:boolean
- **signIn()**
- **grant(scope:string, offline:boolean = false)**
- revoke()
- logout()
**Usage**

```html
<!-- Index.html -->
<script src="https://apis.google.com/js/platform.js"></script>
```

```typescript
ngOnInit() {
    this.currentProfile$ = this.service.currentProfile$;
    this.currentProfile$.subscribe(this.onProfile.bind(this));
}

onProfile(p:Profile) {
        this.currentProfile = p;
        this.grantedScopes = p ? p.scope.split(' ') : [];
    }
```

In this example, the service is injected in Ng2gAuthApp component.

