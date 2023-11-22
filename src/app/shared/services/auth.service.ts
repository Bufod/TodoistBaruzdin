import {Injectable, signal} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any

  constructor(private firebaseAuthenticationService: AngularFireAuth,
              private router: Router) {
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    })
  }
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
      })
      .catch((error) => {
        alert(error.message);
      })
  }
  signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
      })
      .catch((error) => {
        alert(error.message);
      })
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null
  }

  loggut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem("task")
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}
