import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { Store } from "@ngrx/store"
import { selectAuthenticated } from "../store/auth/auth.selectors";
import { map } from "rxjs";

export const loginGuard = () => {
    const store = inject(Store);
    const router = inject(Router);

    return store.select(selectAuthenticated).pipe(
        map(isAuthenticated => {
            if(isAuthenticated){
                return router.parseUrl('/profile');
            }
            return true;
        })
    )
}
