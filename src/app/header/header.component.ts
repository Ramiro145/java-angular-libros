import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  rol:any
  constructor(private router:Router){

  }
  ngOnInit(){

  }
  ngAfterViewChecked(){
    this.rol = localStorage.getItem("role")
  }
  estaAutenticado(){
    if(localStorage.getItem("username"))return true;
    return false
  }
  logout(){
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    localStorage.removeItem("role")
    this.router.navigate(["/login"])
  }
}
