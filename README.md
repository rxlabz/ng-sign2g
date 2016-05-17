# Angular 2 Google Sign-In service

- projet generated witg Angular CLI

# Gauth.service

Gauth service exposes an Observable<Profile> which allows to get the authentication status.

**Usage**

```typescript
ngOnInit() {
    this.currentProfile$ = this.service.currentProfile$;
    this.currentProfile$.subscribe(this.onProfile.bind(this));
}

onProfile(p:Profile) {
        console.log('onProfile', p);
        this.currentProfile = p;
        this.grantedScopes = p ? p.scope.split(' ') : [];
    }
```