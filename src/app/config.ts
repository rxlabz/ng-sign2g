import {OpaqueToken} from "@angular/core";

export interface Config {
    client_id:string;
}

export let CONFIG:Config = {
    client_id: 'YOUR_APP_ID_LIKE_0123456789.apps.googleusercontent.com'
}

// create token used for DI
export let APP_CONFIG = new OpaqueToken('app.config');