/// <reference path="../../typings/globals/gapi.auth2/index.d.ts" />

import {Injectable, NgZone} from "@angular/core";
import {Http} from "@angular/http";
import {Observable, Observer} from "rxjs/Rx";
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import BasicProfile = gapi.auth2.BasicProfile;

//declare var gapi:any;

@Injectable()
export class GauthService {

    CLIENT_ID = '239214892766-ut7q6g37f2m1cj4j88e1b2k702bbb5sh.apps.googleusercontent.com';

    private currentUser:GoogleUser;

    private currentProfile:Profile;
    currentProfile$:Observable<Profile>;
    profileOb$r:Observer<Profile>;

    auth:GoogleAuth;

    get isSignedIn():boolean {
        return this.auth ? this.auth.isSignedIn.get() : false;
    }

    constructor(private http:Http, private ngZone:NgZone) {
        console.log('GauthService');
        this.currentProfile$ = new Observable<Profile>(obs => this.profileOb$r = obs).share();
        this.loadApi(this.CLIENT_ID);
    }

    loadApi(CLIENT_ID:string) {
        gapi['load']('auth2', this.onApi.bind(this));
    }

    onApi() {
        console.log('Gauth ready');
        this.initAuth();
    }

    initAuth() {
        console.log('api loaded');
        this.auth = gapi.auth2.init({
            client_id: this.CLIENT_ID
        });
        this.auth.isSignedIn.listen(this.onUserSignedResult);
        this.auth.currentUser.listen(this.onCurrentUser.bind(this));
    }

    onUserSignedResult(signed) {
        console.log('onUserSigned', signed);
    }

    onCurrentUser(gUser:GoogleUser) {
        console.log("onCurrentUser", gUser);
        this.zRun(()=> {
            // !!! gUser.isSignIn must be run in the zone to avoid to run logout in ngzone
            if (gUser.isSignedIn()) {
                this.currentUser = gUser;
                this.currentProfile = new Profile(gUser.getBasicProfile(), gUser.getGrantedScopes());
                this.profileOb$r.next(this.currentProfile);
                console.log("onCurrentUser", gUser.getBasicProfile());
            }
            else
                console.log('not authenticated');
        });
    }

    signIn(scope:string = ''):Observable<Profile> {
        let options = new gapi.auth2.SigninOptionsBuilder();
        options.setScope(scope);

        let res = this.auth.signIn();
        res.then(() =>console.log("signIn()... Signin done !"));

        return this.currentProfile$;
    }

    grant(scope:string, offline:boolean = false) {
        if (offline)
            this.currentUser.grantOfflineAccess(scope);
        else {
            let options = new gapi.auth2.SigninOptionsBuilder();
            options.setPrompt('none');
            options.setScope(scope);
            this.currentUser.grant(options).then(
                (success) => console.log("grant OK"),
                (fail) => console.log("grant Error", fail)
            );
        }
    }

    logout() {
        this.auth.signOut().then(function () {
            console.log('logout');
            this.zRun(()=> {
                this.currentUser = null;
                this.currentProfile = null;
                this.profileOb$r.next(null);
            });
        }.bind(this));
    }

    revoke() {
        this.currentUser.disconnect();
    }

    zRun(action:any) {
        this.ngZone.run(action);
    }
}

export class Profile {
    constructor(private p:BasicProfile, public scope:string) {
    }

    getId():string {
        return this.p.getId();
    }

    getName():string {
        return this.p.getName();
    }

    getGivenName():string {
        return this.p['getGivenName']();
    }

    getFamilyName():string {
        return this.p['getFamilyName']();
    }

    getImageUrl():string {
        return this.p.getImageUrl();
    }

    getEmail():string {
        return this.p.getEmail();
    }
}