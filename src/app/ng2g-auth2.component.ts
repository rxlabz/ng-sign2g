import {Component, OnInit} from "@angular/core";
import {GauthService, Profile} from "./gauth.service";

@Component({
    moduleId: module.id,
    selector: 'ng2g-auth2-app',
    templateUrl: 'ng2g-auth2.component.html',
    styleUrls: ['ng2g-auth2.component.css'],
    providers: [GauthService]
})
export class Ng2gAuth2AppComponent implements OnInit {

    SCOPES = ["profile", 'https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/spreadsheets'];

    title = 'Sign2G';

    currentProfile:Profile;

    private grantedScopes:string[];

    get isSignedIn():boolean {
        return this.service ? this.service.isSignedIn : false;
    }

    constructor(public service:GauthService) {
    }

    ngOnInit() {
        this.service.currentProfile$.subscribe(this.onProfile.bind(this));
    }

    onProfile(p:Profile) {
        console.log('onProfile', p);
        this.currentProfile = p;
        this.grantedScopes = p ? p.scope.split(' ') : [];
    }

    signIn() {
        console.log('Ng2gAuth2AppComponent.auth()...');
        this.service.signIn();
    }

    grant(scope:string, off:boolean = false) {
        this.service.grant(scope, off)
        /*if(off)
         else
         this.service.signIn(scope);*/
    }

    revoke() {
        this.service.revoke();
    }

    logout() {
        this.service.logout();
    }

}
