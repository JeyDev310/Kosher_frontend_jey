import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from 'app/service/user.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
// import { RUserModel } from 'app/model/user';


@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    googleLoginInfo: any;
    googleEmail: string;
    googleAavatar: string;
    email: string;
    password: string;
    // users: RUserModel[]=[];
    errMessage: string;
    private _unsubscribeAll: Subject<any>;
    /**
     * 
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userService: UserService,
    )
    {
        // Configure the layout
        this._unsubscribeAll = new Subject();
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]/), Validators.minLength(6)]]
        });
        
    }
    // login(): void{
    //     const credential = this.loginForm.value;
    //     this._userService.login(credential.email, credential.password)
    // }
    onGoogleLogin(): void{
        this._userService.doGoogleLogin().then((result) => {
          
            // this._router.navigate(['/welcome']); 
            window.location.href="/welcome";
        }).catch((err)=>{ this.errMessage = err.message;});
    }

    
    login(): void{
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        this._userService.login(email,password).then((result)=>{
            
                this._router.navigate(['/welcome']); 

        }).catch((err)=>{ 
            this.onCreateAccount();
        });
    }
    onCreateAccount(): void{

        const data: any = this.loginForm.getRawValue();

        this._userService.register(data).then((result)=>{

            this._router.navigate(['/welcome']); 

        }).catch((err)=>{ this.errMessage = err.message;
        
        });
    }
    
}
