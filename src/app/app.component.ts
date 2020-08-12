import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

import { users } from './users';
import { User } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public users: any[] = users;
  public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();
  public itemToRemove: any;

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
    this.removeConfirmation = this.removeConfirmation.bind(this);
  }

  public createFormGroup(args: any): any {
    const item = args.isNew ? new User() : args.dataItem;

    const formGroup = this.formBuilder.group({
      UserID: item.UserID,
      FirstName: item.FirstName,
      LastName: item.LastName,
      Email: [item.Email, Validators.compose([
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
            ]),
      ],
      Password: item.Password,
      RoleID: [
        item.RoleID,
        Validators.compose([
          Validators.required,
          Validators.pattern('^([1-3])$'),
        ]),
      ],
    });

    return formGroup;
  }

  public confirmRemove(shouldRemove: boolean): void {
    this.removeConfirmationSubject.next(shouldRemove);

    this.itemToRemove = null;
  }

  public removeConfirmation(dataItem): Subject<boolean> {
    this.itemToRemove = dataItem;

    return this.removeConfirmationSubject;
  }
}
