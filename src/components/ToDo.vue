<template>
<div class="todo-list">
  <h1>To Do List: </h1>
  <div class="add-task">
    <label for="task">Task:</label>
    <input type="text" name="task" placeholder="What Do You Need To Do" v-model="task">
    <button :disabled="task == ''" type="submit" @click.prevent="addData">Save Item</button>
    <button :disabled="toDo.length < 2" @click="deleteAll">Delete All</button>
  </div>
  <div class="task" v-for="(task, i) in toDo" :key="i">
    <p>{{task.text}}</p>
    <button @click="deleteToDo(task.index)">Delete</button>
    <button @click="done">Done</button>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "ToDo",
  data() {
    return {
      task: "",
      toDo: this.getAllTaks(),
    };
  },
  methods: {
    async addData(){
      await axios.post("http://localhost:5000/addToDo",{
        text : this.task    
      })
      .then(resp =>console.log(resp))
      .catch(err=>console.log(err));
      this.task = "";
    },
    async deleteToDo(index) {
      await axios
        .delete(`http://localhost:5000/deleteToDo/${index}`)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteAll(){  
      await axios.delete("http://localhost:5000/deleteAll")
      .then(resp =>console.log(resp))
      .catch(err=>console.log(err));
    },
    done($e) {
      $e.target.parentNode.className = "task done"
    },
    async getAllTaks(){
      await axios.get("http://localhost:5000/allList")
      .then(resp => {
        this.toDo = resp.data;
        this.getAllTaks()
      })
      .catch(err=>console.log(err));
    }
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.todo-list {
  width: 500px;
  margin: auto;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
}
.todo-list .add-task {
  margin-bottom: 20px;
}
.todo-list .add-task label {
  margin-right: 15px;
}
.todo-list .add-task input[type="text"] {
  outline: none;
  margin-right: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}
.todo-list .add-task button {
  outline: none;
  border: 1px solid mediumblue;
  background: mediumblue;
  color: #fff;
  cursor: pointer;
  padding: 10px 15px;
  margin-left: 5px;
  transition: 0.3s;
}
.todo-list .add-task button:hover {
  background: darkblue;
  border-color: darkblue;
} 

.todo-list .add-task button:disabled {
  opacity: 0.5;
}

.todo-list .task {
  border: 1px solid #ccc;
  padding: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 3px;
}
.todo-list .task p {
  float: left;
  margin: 5px 0 0;
}
.todo-list .task button {
  padding: 5px 15px;
  float: right;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  background-color: #cd0a0a;
  color: #fff;
  border: 1px solid #cd0a0a;
}
.todo-list .task button:hover {
  background-color: #931a25;
  border-color: #931a25;
}
.todo-list .task button:last-child {
  margin-right: 10px;
  background-color: green;
  border-color: green;
}
.todo-list .task button:last-child:hover {
  background: darkgreen;
  border-color: darkgreen;
}
.todo-list .done {
  color: blue;
  font-weight: bold;
}
.todo-list .done p {
  text-decoration: line-through;
}
</style>
