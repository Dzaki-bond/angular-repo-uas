import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.checkLogin();
  }
  mode:string='side';

  checkLogin()
  {
    this.api.get('bookswithauth/status').subscribe(res=>{
      return;
    },error=>{
      this.router.navigate(['login']);
    })
  }

  logout()
  {
    let conf=confirm('Keluar aplikasi?');
    if(conf)
    {
      localStorage.removeItem('appToken');
      window.location.reload();
    }
  }

}

