import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileserviceService } from 'src/app/services/fileservice.service';
import { UsersService } from 'src/app/services/users.service';
import * as uikit from 'uikit'

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  pdfFrom :FormGroup
  formsubmit = false
  userId : any
  allfiles : any
  user : any
  searchText : any

  constructor(
    private fb : FormBuilder,
    private toast : ToastrService,
    private fileservice : FileserviceService,
    private router: Router,
    private userservice : UsersService,

  ) {
    this.userId = localStorage.getItem('user')
    this.pdfFrom = this.fb.group({
      filename : ['',[Validators.required]],
      pdffile : ['',[Validators.required]]
    })
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
        this.allfiles = res.data.filter(item => item.userid._id == this.userId)
      }
    },err=>{
      console.error(err);

    })
  }

  savepadf(){
    this.formsubmit = true
    if(this.pdfFrom.valid){
      var formdata = new FormData();
      formdata.append('userid', this.userId)
      formdata.append('filename', this.pdfFrom.value.filename)
      formdata.append('pdffile', this.pdfFrom.get('pdffile').value)
      this.fileservice.addfile(formdata)
      .subscribe(res=>{
        //console.log(res);
        if(res.status == 'success'){
          this.toast.success('New PDF File Added')
          this.closemodel()
        }else{
          this.toast.error("The new PDF file can't added")
        }
      },err=>{
        console.error(err);
      })
    }
    else{
      this.toast.warning("Form Validation Error")
    }
  }

  fileUpload(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.pdfFrom.patchValue({
      pdffile: file
    });
    this.pdfFrom.get('pdffile').updateValueAndValidity()
  }
  addpdf(){
    uikit.modal('#addnewpdf').show()
  }
  closemodel(){
    uikit.modal('#addnewpdf').hide()
  }

}
