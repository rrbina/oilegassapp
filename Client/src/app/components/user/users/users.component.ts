import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'desafio-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  public selectedUser: User;
  public users: User[];
  modalRef: BsModalRef;
  
  constructor(public userService: UserService, 
    private modalService: BsModalService) {
    this.getAllUsers();
  }

  public handleError(message: string, _this: any){    
    window.alert(message);
    _this.modalRef.hide(); 
  }

  public getUser() {
    this.userService.getUser(this.selectedUser.id,this,this.handleError)
    .subscribe(user => this.selectedUser = user);
  }

  public getAllUsers() {
    this.userService.getAllUsers(this,this.handleError).subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit(): void {
  }

  openModal(template: any, user: User) {
    this.selectedUser = user;
    this.modalRef = this.modalService.show(template);
  }

  removeUser(user: User, _this: any): void {
    var index = -1;
    for(var i=0;i<_this.users.length;i++){
      if(_this.users[i].id === user.id){
        index = i;
        break;
      }
    }
    if (index > -1) {
      _this.users.splice(index, 1);
    }
  }

  deletar(): void { 
    this.modalRef.hide();
    this.userService.deleteUser(this.selectedUser.id,
      this,
      this.handleError,
      this.removeUser);    
  }

}
