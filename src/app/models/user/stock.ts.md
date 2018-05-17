#in component.ts
## get users
this.userService.getUsers()
.subscribe(result => this.users = result);
# in component.html
## paginated list
`<div *ngIf="users">
  <ul>
    <li *ngFor="let user of users.data">{{user.name}}</li>
  </ul>
  <p>Showing users {{users.from}} to {{users.to}} of {{users.total}}</p>
  <p>Page {{users.current_page}} of {{users.last_page}}</p>
  <button (click)="prevPage()" [disabled]="!users.prev_page_url" >Prev</button>
  <button (click)="nextPage()" [disabled]="!users.next_page_url">Next</button>
</div>`
