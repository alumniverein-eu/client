import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild } from '@angular/core';

import { User } from '@models/user/user.model';
import { AuthService } from '@helpers/services/auth/auth.service';
import { UserService } from '@models/user/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  user: User = new User;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getAuthUser()
    .subscribe(result => this.user = result);
  }

  onChangeImage() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("profile_image", fileBrowser.files[0], 'image.jpg')

      this.userService.updateUser(this.user.id, formData).subscribe(res => {
        console.log(res)// do stuff w/my uploaded file
      });

      /*
      this.projectService.upload(formData, this.project.id).subscribe(res => {
        // do stuff w/my uploaded file
      });
      */
    }
  }
}
