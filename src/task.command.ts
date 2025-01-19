import { Command, CommandRunner, Option } from 'nest-commander';
import * as fs from "fs"

interface MyCommandOptions {
  id?:number,
  title?: string;
  description?: string;
  status?:string,
  updatedAt: Date;
}

@Command({
  name: 'task-cli',
  description: 'Task tracker is a project used to track and manage your tasks',
})
export class TaskManager extends CommandRunner {
  constructor() {
    super();
  }

  async run(passedParams: string[], options?: MyCommandOptions): Promise<void> {
    if(passedParams[0] === 'add'){
      this.addTask(options);
    }else if(passedParams[0] === 'update'){
      this.updateTask(options)
    }else if(passedParams[0] === 'list'){
      this.listAll()
    }else if(passedParams[0] === 'delete'){
      this.deleteTask(options)
    }else if(passedParams[0]==="mark-in-progress"){
      this.markInPogress(options)
    }else if(passedParams[0]==="mark-done"){
      this.done(options)
    }else if(passedParams[0]==="list-done"){
      this.listDone()
    }else if(passedParams[0]==="list-todo"){
      this.listTodo()
    }else if(passedParams[0]==="list-in-progress"){
      this.listInProgress()
    }
  }

  @Option({
    flags: '-t, --title [string]',
    description: 'Provide a title to your task',
  })
  parseName(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --description [string]',
    description: 'Provide a description for the task',
  })
  parseDescription(val: string): string {
    return val;
  }

  @Option({
    flags: '-i, --id [number]',
    description: 'Provide a id of the task',
  })
  parseId(id: string): number {
    return parseInt(id);
  }

  async addTask(options: MyCommandOptions): Promise<void> {
    try {
      console.log(options)
      if (!options || !options.title) {
        console.log('Error: Task name and description are required.');
        return;
      }

      // Create the task object
      const taskFile = 'task-data.json';
      let tasks = [];

      if (fs.existsSync(taskFile)) {
        const fileData = fs.readFileSync(taskFile, 'utf-8');
        tasks = fileData.trim() ? JSON.parse(fileData) : [];;
      }
      const newTask= {
        id: Math.floor(Math.random() * 10000), // Generate a random ID (you can replace this with a DB-generated ID)
        title: options.title,
        description: options.description,
        status: 'pending', // Default status for a new task
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add the new task to the array
      tasks.push(newTask);

      // Save the task using the AppService
      // Write the updated array back to the file
    fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2), 'utf-8');
    console.log(`Task "${newTask.title}" added successfully (ID: ${newTask.id})!`);
    } catch (error) {
      console.log
      console.error('Error adding task:', error.message);
    }
  }

  async updateTask(options: MyCommandOptions): Promise<void> {
    try {
      if (!options || !options.id) {
        console.log('Error: Task ID and description are required.');
        return;
      }

      const taskFile = 'task-data.json';

      if (!fs.existsSync(taskFile)) {
        console.log('Error: No tasks found to update.');
        return;
      }

      // Read existing tasks
      const fileData = fs.readFileSync(taskFile, 'utf-8');
      const tasks: MyCommandOptions[] = JSON.parse(fileData);
      // Find the task by ID
      const taskIndex = tasks.findIndex((task) => task.id === options.id);

      if (taskIndex === -1) {
        console.log(`Error: Task with ID ${options.id} not found.`);
        return;
      }

      // Update the task
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title:options.title,
       description: options.description,
       updatedAt: new Date(),
      };

      // Write the updated task list back to the file
      fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2), 'utf-8');
      console.log(`Task with ID ${options.id} updated successfully!`);
    } catch (error) {
      console.log(error)
      console.error('Error updating task:', error.message);
    }
  }

  async deleteTask(options: MyCommandOptions): Promise<void> {
    try {
      if (!options || !options.id) {
        console.log('Error: Task ID and description are required.');
        return;
      }

      const taskFile = 'task-data.json';

      if (!fs.existsSync(taskFile)) {
        console.log('Error: No tasks found to update.');
        return;
      }

      // Read existing tasks
      const fileData = fs.readFileSync(taskFile, 'utf-8');
      const tasks: MyCommandOptions[] = JSON.parse(fileData);
     // Find the task by ID
      const taskIndex = tasks.findIndex((task) => task.id === options.id);

      if (taskIndex === -1) {
        console.log(`Error: Task with ID ${options.id} not found.`);
        return;
      }

      // Remove the task from the array
      tasks.splice(taskIndex, 1);

      // Write the updated task list back to the file
      fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2), 'utf-8');
      console.log(`Task with ID ${options.id} deleted successfully!`);
    } catch (error) {
      console.log(error)
      console.error('Error updating task:', error.message);
    }
  }

  async markInPogress(options: MyCommandOptions): Promise<void> {
    try {
      if (!options || !options.id) {
        console.log('Error: Task ID and description are required.');
        return;
      }

      const taskFile = 'task-data.json';

      if (!fs.existsSync(taskFile)) {
        console.log('Error: No tasks found to update.');
        return;
      }

      // Read existing tasks
      const fileData = fs.readFileSync(taskFile, 'utf-8');
      const tasks: MyCommandOptions[] = JSON.parse(fileData);
     // Find the task by ID
      const taskIndex = tasks.findIndex((task) => task.id === options.id);

      if (taskIndex === -1) {
        console.log(`Error: Task with ID ${options.id} not found.`);
        return;
      }

      // Update the task
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        status:"In-progress"
      };

      // Write the updated task list back to the file
      fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2), 'utf-8');
      console.log(`Task with ID ${options.id} is mark in progress successfully!`);
    } catch (error) {
      console.log(error)
      console.error('Error updating task status:', error.message);
    }
  }
  async done(options: MyCommandOptions): Promise<void> {
    try {
      if (!options || !options.id) {
        console.log('Error: Task ID and description are required.');
        return;
      }

      const taskFile = 'task-data.json';

      if (!fs.existsSync(taskFile)) {
        console.log('Error: No tasks found to update.');
        return;
      }

      // Read existing tasks
      const fileData = fs.readFileSync(taskFile, 'utf-8');
      const tasks: MyCommandOptions[] = JSON.parse(fileData);
     // Find the task by ID
      const taskIndex = tasks.findIndex((task) => task.id === options.id);

      if (taskIndex === -1) {
        console.log(`Error: Task with ID ${options.id} not found.`);
        return;
      }

      // Update the task
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        status:"Done"
      };

      // Write the updated task list back to the file
      fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2), 'utf-8');
      console.log(`Congratulations you have completed your Task with ID ${options.id} successfully!`);
    } catch (error) {
      console.log(error)
      console.error('Error updating task status:', error.message);
    }
  }
  async listAll(){
   try {
    const taskFile = 'task-data.json';
    let tasks = [];

    if (fs.existsSync(taskFile)) {
      const fileData = fs.readFileSync(taskFile, 'utf-8');
      tasks = fileData.trim() ? JSON.parse(fileData) : [];;
      console.log(fileData)
    }else{
      console.log("There is no task is present")
    }
   } catch (error) {
    console.log(error)
    console.error('Error deleting your tasks:', error.message);
   }
  }

  async listDone(){
    try {
     const taskFile = 'task-data.json';
     let tasks = [];
 
     if (fs.existsSync(taskFile)) {
       const fileData = fs.readFileSync(taskFile, 'utf-8');
       tasks = fileData.trim() ? JSON.parse(fileData) : [];
       const filtereData = tasks.filter((task)=> task.status === "Done");
       console.log(filtereData)
     }else{
       console.log("There is no task is present")
     }
    } catch (error) {
     console.log(error)
     console.error('Error deleting your tasks:', error.message);
    }
   }
   async listTodo(){
    try {
     const taskFile = 'task-data.json';
     let tasks = [];
 
     if (fs.existsSync(taskFile)) {
       const fileData = fs.readFileSync(taskFile, 'utf-8');
       tasks = fileData.trim() ? JSON.parse(fileData) : [];
       const filtereData = tasks.filter((task)=> task.status === "pending");
       console.log(filtereData)
     }else{
       console.log("There is no task is present")
     }
    } catch (error) {
     console.log(error)
     console.error('Error deleting your tasks:', error.message);
    }
   }
   async listInProgress(){
    try {
     const taskFile = 'task-data.json';
     let tasks = [];
 
     if (fs.existsSync(taskFile)) {
       const fileData = fs.readFileSync(taskFile, 'utf-8');
       tasks = fileData.trim() ? JSON.parse(fileData) : [];
       const filtereData = tasks.filter((task)=> task.status === "In-progress");
       if(filtereData.length === 0){
        console.log("no task is in-Progress");
        return;
      }
       console.log(filtereData)
     }else{
       console.log("There is no task is present")
     }
    } catch (error) {
     console.log(error)
     console.error('Error deleting your tasks:', error.message);
    }
   }
  }
