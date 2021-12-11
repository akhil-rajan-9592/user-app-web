import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileserviceService } from 'src/app/services/fileservice.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  userId : any
  allfiles : any
  user : any
  searchText
  constructor(
    private fileservice : FileserviceService,
    private router: Router,
    private userservice : UsersService,
  ) {
    this.userId = localStorage.getItem('user')
  }

  ngOnInit(): void {
    this.getUser()
    this.getAllPdfList()
  }

  getUser(){
    this.userservice.getuser(this.userId)
    .subscribe(res=>{
      //console.log(res);
      if(res.status == 'success'){
        this.user = res.data
      }
    },err=>{
      console.error(err);
    })
  }
  getAllPdfList(){
    this.fileservice.getallfiles()
    .subscribe(res=>{
      //console.log(res);
      if(res.status == 'success'){
        this.allfiles = res.data
      }
    },err=>{
      console.error(err);

    })
  }

}
