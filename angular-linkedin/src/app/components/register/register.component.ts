import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.form.controls; }

  onSubmit(){

    this.submitted = true;

    if (this.form.invalid) {
      return;
  }
  this.loading = true;

  let formData: any = {
  first_name: this.form.get('firstName').value,
  last_name: this.form.get('lastName').value,
  username: this.form.get('username').value,
  password: this.form.get('password').value
  };

  this.userService.register(formData).subscribe(u =>{
      if(u == null){
        console.log("not accepted");
      }
      else{
        console.log("added user");
        this.router.navigateByUrl('');
      }
    })
  }

}
