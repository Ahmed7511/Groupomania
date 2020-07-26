<template>
<v-container>
  <v-toolbar>
    <v-toolbar-title>Welcome {{User}}</v-toolbar-title>
        <v-spacer></v-spacer>
    <v-btn color="white"  value="message">
          <span>Groupomania Messages</span>
        </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items >
      <v-btn @click="logout()">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
 <form class="add-new-post" name="add-new-post"  >
    <div class="form-group" >
      <label for="title" > title</label>
      <input type="text" class="form-control" name="title"  v-model="title">
    </div>
    <div class="form-group">
      <label for="post-content"> content</label>
      <textarea name="content"  v-model="content" ></textarea>
    </div> 
    <input type="file" @change="fileSelected" >
    <button type="submit" v-on:click.prevent="onUpload">upload</button><br>
    <button class="btn btn-primary btn-block" @click="post()">post</button>
  </form>
  <div class="message" v-for="message in messages" :key="message.id">
      <h3> {{message.pseudo}}</h3>
      <h4 > {{ message.title  }}</h4>
        <small><span class="glyphicon glyphicon-calendar" aria-hidden="false"></span>{{ message.createdAt }}</small>
      <p>
        {{ message.content }}</p> 
        <p>{{message.id}}</p>     
          <v-btn v-if="message.pseudo == User" color="primary"  @click="edit = message.id"  > edit  </v-btn>
         <v-btn depressed  v-if="message.pseudo == User"  color="error" @click="remove(message)">remove</v-btn>


<form class="add-new-post" name="add-new-post" v-if="edit === message.id" >
    <div class="form-group" >
      <label for="title" > title</label>
      <input type="text" class="form-control" name="title"  v-model="updatedTitle">
    </div>
    <div class="form-group">
      <label for="post-content"> content</label>
      <textarea name="content"  v-model="updatedContent" ></textarea>
    </div>    
  </form>   
            <button type="button" class="btn btn-success" color="succes"
                               data-dismiss="modal"
                              v-if="edit === message.id"  @click="modify(message)">Save Changes</button>
                               <button type="button" class="btn btn-default" color="primary"
                             data-dismiss="modal" v-if="edit === message.id"  @click="edit = !edit">Close</button>
    
  </div>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
          edit : false,
           updatedContent :'',
           updatedTitle : '',
            title : '',
            content : '',
            User : localStorage.getItem('user'),
            messages : [],
            selectedFile : null
        }
    },
    created() {
    axios.get('http://localhost:3000/message/messages', 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => 
      (this.messages = response.data.Messages) )
        .catch(err => console.log(err))
 
},    
    methods:{
        logout(){
            localStorage.clear();
           window.location.reload();
        },
        getOne(message)
        {axios.get('http://localhost:3000/message/messages/' + message.id, 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => 
      (this.updatedContent = response.data.message.content ,
        this.updatedTitle = response.data.message.title) )
        .catch(err => console.log(err))
 
},
        post(){ 
           axios.post('http://localhost:3000/message/message',{ 
       title: this.title,
       content: this.content
                }, 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
       .then(res => console.log(res))
       .catch(err =>console.log(err))
         },
 
          remove(message){
                  axios.delete('http://localhost:3000/message/messages/'+ message.id,
                   { headers : {Authorization: "Bearer " + localStorage.token } }
                         )
                .then(res => console.log(res))
                .catch(err =>console.log(err))
                  window.location.reload();

        },
        modify(message){
                  axios.put('http://localhost:3000/message/messages/' + message.id ,{
                    title : this.updatedTitle,
                    content : this.updatedContent
                  },       
                   { headers : {Authorization: "Bearer " + localStorage.token} }
                         )
                .then((res) => console.log(res) )
                .catch(err =>console.log(err))
                window.location.reload();
      
        },
        fileSelected(event){
          this.selectedFile = event.target.files[0]
        },
         onUpload(){
           const fd = new FormData();
           fd.append('file', this.selectedFile, this.selectedFile.name)
           axios.post('http://localhost:3000/image/images/', fd)
           .then(res => console.log(res))
           .catch(err => console.log(err))
         }
    }
    
}
</script>