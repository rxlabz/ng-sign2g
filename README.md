# Angular 2 Google Sign-In service

- generated with Angular CLI

# Gauth.service

The Gauth service exposes an Observable<Profile> which allows to get the authentication status.

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