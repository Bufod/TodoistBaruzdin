import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy{

  form!: FormGroup
  aSub!: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if(params["registered"]){
        // Теперь вы можете зайти
      } else if(params["accessDenied"]){
      //   Для начала надо авторизоваться
      }
    })

    if(localStorage.getItem("user") != null){
      this.router.navigate(['/dashboard'])
    }
  }
  ngOnDestroy(): void {
    if (this.aSub){
      // this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.form.disable()

    this.auth.logInWithEmailAndPassword(this.form.value.email, this.form.value.password).then(() => {
      this.router.navigate(["/dashboard"])
      this.form.enable()
      this.form.reset()
    }).catch((error) => {
    })

  }
}