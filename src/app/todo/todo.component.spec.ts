import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToDoService } from './todo.service';
import { Store } from '@ngrx/store';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let comp: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(() => {
    const toDoServiceStub = {
      todoStatusChanged: {
        subscribe: () => ({})
      },
      getToDoStatus: () => ({}),
      todosChanged: {
        subscribe: () => ({})
      },
      getToDos: () => ({})
    };
    const storeStub = {
      select: () => ({})
    };
    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ToDoService, useValue: toDoServiceStub },
        { provide: Store, useValue: storeStub }
      ]
    });
    fixture = TestBed.createComponent(TodoComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const toDoServiceStub: ToDoService = fixture.debugElement.injector.get(
        ToDoService
      );
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(comp, 'showToDo');
      spyOn(toDoServiceStub, 'getToDoStatus');
      spyOn(storeStub, 'select');
      comp.ngOnInit();
      expect(comp.showToDo).toHaveBeenCalled();
      expect(toDoServiceStub.getToDoStatus).toHaveBeenCalled();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });

  describe('showToDo', () => {
    it('makes expected calls', () => {
      const toDoServiceStub: ToDoService = fixture.debugElement.injector.get(
        ToDoService
      );
      spyOn(toDoServiceStub, 'getToDos');
      comp.showToDo();
      expect(toDoServiceStub.getToDos).toHaveBeenCalled();
    });
  });
});
