import { Component } from '@angular/core';
import { Login } from '../modelos/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: Login = new Login()
  invalido?:boolean;
  constructor(private http: HttpClient, private router:Router){

  }

  ngOnInit(){
    this.invalido = false;
  }

  autenticar(){
    this.invalido = false
    let usuario = this.login.username + ":" + this.login.password
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Requested-With' : 'XMLHttpRequest',
        'Authorization' : 'Basic ' + btoa(usuario)
      })
    }
    this.http.get("/api/v1/login", httpOptions).subscribe((data)=>{
      //usuario existe
      localStorage.setItem("username", this.login.username)
      localStorage.setItem("password", this.login.password)
      let rol = Object.values(data)[0]["authority"]
      localStorage.setItem("role", rol)
      switch(rol){
        case "ROLE_ADMIN":
          this.router.navigate(['/admin'])
          break
        case "ROLE_COOR":
          this.router.navigate(['/materias'])
          break
        case "ROLE_BIBL":
          this.router.navigate(['/libros'])
          break
      }
      console.log(data);
    }, (error)=>{
      //usuario no existe
      this.invalido = true;
    })
  }
}
