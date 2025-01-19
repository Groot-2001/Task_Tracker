## Introduction
<b>Task tracker </b> is a project used to track and <b>manage your tasks</b>. In this task, you will build a simple <b> command line interface (CLI)  </b> to track what you need to do, what you have done, and what you are currently working on. This project will help you practice your programming skills, including working with the filesystem, handling user inputs, and building a simple CLI application.

## Requirements
The application should run from the <b>command line</b>, <b>accept user actions  </b>and  <b>inputs as arguments </b>, and store the tasks in a  <b> JSON file </b>. The user should be able to:

- <b> Add </b>,  <b>Update </b>, and  <b>Delete </b> tasks
- Mark a task as in  <b>progress </b> or  <b>done </b>
- List all tasks
- List all tasks  <b>that are done </b>
- List all tasks  <b>that are not done </b>
- List all tasks   <b>that are in progress </b>

## constraints

- You can use any <b>programming language</b> to build this project.

- Use<b> positional arguments</b> in command line to <b>accept user inputs</b>.

- Use a<b> JSON file</b> to store the tasks in the current directory.

- The JSON file should be created if <b>it does not exist</b>.

- Use the native <b>file system</b> module of your programming language to interact with the JSON file.

- Ensure to <b>handle errors</b> and <b>edge cases</b> gracefully.

## Example

The list of commands and their usage is given below:

```bash
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress

```

## Task Properties

Each task should have the following properties:

``` js

{
    id: A unique identifier for the task
    description: A short description of the task
    status: The status of the task (todo, in-progress, done)
    createdAt: The date and time when the task was created
    updatedAt: The date and time when the task was last updated
}
```

Make sure to add these properties to the JSON file when adding a new task and update them when updating a task.

## usage

1. adding the task into json file

```bash
pnpm run start:cli task-cli add -t "buy groceries" -d "Finish the math assignment"
``
2. updating the task into json file

```bash
pnpm run start:cli task-cli update -i 1984 -d "Updated description for the task"
``
3. list all the task into json file

```bash
pnpm run start:cli task-cli list
``
4. delete one task into json file

```bash
pnpm run start:cli task-cli delete -i 1984
``
5. mark in Progress task into json file

```bash
pnpm run start:cli task-cli mark-in-progress -i 1984
``
6. list done the task into json file

```bash
pnpm run start:cli task-cli list-done 
``
7. list todo task into json file

```bash
pnpm run start:cli task-cli list-todo 
``
8. list in-Progress task into json file

```bash
pnpm run start:cli task-cli list-in-progress 
``

Happy coding!
