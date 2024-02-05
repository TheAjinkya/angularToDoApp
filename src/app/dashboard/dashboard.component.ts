import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  taskList: any[] = [];
  counter: number = 1;
  task: any = `Task ${this.counter}`;
  selectedItem = true;
  selectedTaskName: any;
  completedTaskList: any[] = [];
  selectedValue: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.updateTaskList();
    console.log('taskList', this.taskList);
  }

  updateTaskList() {
    var items = localStorage.getItem('taskList');
    console.log('items', items);
    if (items !== null) {
      console.log('items', JSON.parse(items));
      this.taskList = JSON.parse(items);
    } else {
      this.taskList.length = 0;
    }
  }

  addTask(taskName: any) {
    this.taskList.push({ taskName: taskName, completed: false });
    this.counter = this.counter + 1;
    // this.task = `Task ${this.counter}`;
    this.saveToLocalhost(this.taskList);
    console.log('localStorage', localStorage);
  }

  saveToLocalhost(taskList: any) {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  deleteAll() {
    localStorage.clear();
    this.updateTaskList();
  }

  completedTask(taskName: any) {
    this.selectedTaskName = taskName;
    const duplicateName = this.completedTaskList.some(
      (elm) => elm.taskName === taskName.taskName
    );
    console.log('duplicateName', duplicateName);
    if (!duplicateName) {
      this.completedTaskList.push({ ...taskName, completed: true });
    }

    // const makeUncompleteTask = this.completedTaskList.find(
    //   (elm) => elm.taskName === taskName.taskName && elm.completed === true
    // );
    // console.log('makeUncompleteTask', makeUncompleteTask);

    // if (makeUncompleteTask) {
    //   this.completedTaskList = this.completedTaskList.map((el) => {
    //     return { ...el, completed: false };
    //   });
    // }
    console.log('completedTaskList', this.completedTaskList);

    this.taskList = this.taskList.map((elm) => {
      const updatedTask = this.completedTaskList.find(
        (compElm) => compElm.taskName === elm.taskName
      );
      if (updatedTask) {
        return updatedTask;
      } else {
        return elm;
      }
    });
    this.saveToLocalhost(this.taskList);
    console.log('updated TaskList', this.taskList);
  }

  getCustomCss(taskName: any) {
    console.log('getCustomCss taskName', taskName);
    if (taskName.completed) {
      return 'completedTask';
    } else {
      return '';
    }
  }

  deleteTask(taskName: any) {
    this.taskList = this.taskList.filter((task) => task !== taskName);
    localStorage.setItem('taskList', JSON.stringify(this.taskList));
  }

}
