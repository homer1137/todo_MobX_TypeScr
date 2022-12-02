import { makeAutoObservable } from "mobx";
import axios from "axios";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  userId?:number;
  login: string;
  password: string;
}




class Store {
  todos:Todo[] = [
    {
      userId: 1,
      id: 1,
      title: 'string',
      completed: false
    }
  ];
  user:User = {userId: null,
    login: '',
    password: ''} 
  isAuth = false;
  loading = false;
  error='';

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(todo: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }) {
    this.todos.push(todo);
  }

  removeTodo() {
    this.todos = this.todos.filter((item) => item.completed !== true);
  }

  

  fetchTodos(id: number = 1) {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}/todos/`,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((resp) => {
        this.todos = [...resp.data];
      });
  }

  fetchTodosCompleted(id: number = 1) {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users/${id}/todos/?completed=true`,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((resp) => {
        this.todos = [...this.todos, ...resp.data];
      });
  }

  fetchTodosNotCompleted(id: number = 1) {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users/${id}/todos/?completed=false`,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        } 
      )
      .then((resp) => {
        this.todos = [...this.todos, ...resp.data];
      });
  }
  async postTodo(data: Todo) {
    this.loading=true;
    await axios
      .post(
        `https://jsonplaceholder.typicode.com/users/${data.userId}/todos/?completed=false`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )

      .then((resp) => {
        this.todos.push(resp.data);
      });
      this.loading=false;
  }

  updateTodo(id: number,) {
    console.log('id:', id, )
    this.todos[id].completed =
        !this.todos[id].completed;
    axios
      .put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {...this.todos[id], completed: !this.todos[id].completed },
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
       
      .then((resp) => {
        console.log('rerr', resp.data.completed)
        
      });
  }

  async deleteTodo (id: number = 1) {
    this.loading=true;
    await axios
      .delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
      )
      .then((resp) => {
        this.todos = this.todos.filter(item=>item.id!==id);
      });
      this.loading=false;
  }

  async login(data: User) {
    
    if(data.login && data.password){
      
      this.loading=true;
      await  axios
      .post(
        `https://jsonplaceholder.typicode.com/users/1/todos/?completed=false`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((resp) => {
        if(resp.data.login==='user'&&resp.data.password==='123'){
          this.isAuth = true;
          this.user = {
            userId: resp.data.userId,
            login: resp.data.login,
            password: '1111'
          }
          this.error='';
        } else{
          this.loading=false;
          this.error='Login or password not correct';
        }
        this.loading=false;
      });
          
    } 
    
  }
  logout() {
    this.isAuth = false;
    this.user = {
      userId: null,
    login: '',
    password: ''
    }
  }
}

export default new Store();
