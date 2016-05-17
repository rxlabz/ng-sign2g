import {beforeEachProviders, it, describe, expect, inject} from "@angular/core/testing";
import {GauthService} from "./gauth.service";

describe('Gauth Service', () => {
    beforeEachProviders(() => [GauthService]);

    it('should ...',
        inject([GauthService], (service:GauthService) => {
            expect(service).toBeTruthy();
        }));
});
