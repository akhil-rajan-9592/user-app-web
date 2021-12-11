import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import * as uikit from 'uikit'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  registerFrom : FormGroup
  loginForm : FormGroup
  formsubmit = false
  formsubmit2 = false

  constructor(
    private fb : FormBuilder,
    private toast : ToastrService,
    private userservice : UsersService,
    private router: Router,

  ) {
    localStorage.clear()
    this.registerFrom = this.fb.group({
      name : ['',[Validators.required]],
      mail : ['',[Validators.required]],
      password : ['',[Validators.required]],
      cpassword : ['',[Validators.required]],
      usertype : ['',[Validators.required]],

    })
    this.loginForm = this.fb.group({
      mail : ['',[Validators.required]],
      password : ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  createuser(){
    this.formsubmit = true
    if(this.registerFrom.valid){
      let pass1 = this.registerFrom.value.password;
      let pass2 = this.registerFrom.value.cpassword;
      if(pass1 != pass2){
        this.toast.error('Password did not match: Please try again...');
        return false;
      }
      else{
        let data = {
          "name" : this.registerFrom.value.name ,
          "mail" : this.registerFrom.value.mail,
          "password" : this.registerFrom.value.password,
          "usertype" : this.registerFrom.value.usertype
        }

        this.userservice.register(data)
        .subscribe(res=>{
          //console.log(res);
          if(res.status == 'success'){
            this.toast.success('New User Added')
            this.closemodel()
          }
          else{
            this.toast.error(res.data)
          }
        },err=>{
          console.error(err);
        })
      }
    }
    else{
      this.toast.warning("Form Validation Error")
    }
  }
  login(){
    this.formsubmit2 = true
    if(this.loginForm.valid){
      this.userservice.login(this.loginForm.value)
      .subscribe(res=>{
        //console.log(res);
        if(res.status == 'success'){
          this.toast.success('Login success')
          localStorage.setItem('user',res.data._id)
          if(res.data.usertype == 'user'){
            this.router.navigateByUrl('/user-home')
          }
          if(res.data.usertype == 'admin'){
            this.router.navigateByUrl('admin-home')
          }
        }
        else{
          this.toast.error(res.data)
        }
      },err=>{
        console.error(err);
      })
    }
    else{
      this.toast.warning("Form Validation Error")
    }
  }

  openleaveform(){
    uikit.modal('#userregister').show()
  }

  closemodel(){
    uikit.modal('#userregister').hide();
  }
}
