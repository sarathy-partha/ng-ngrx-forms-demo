import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TodoComponent } from './todo.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { ToDoRoutingModule } from './todo-routing.module';
import { ToDoService } from './todo.service';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    SharedModule,
    ToDoRoutingModule
  ],
  exports: [],
  providers: [ToDoService]
})
export class ToDoModule {}
