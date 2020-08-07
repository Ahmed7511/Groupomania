<template>
<v-container >
  <v-toolbar>
    <v-toolbar-title>Welcome {{User}}</v-toolbar-title>
        <v-spacer></v-spacer>
    <v-btn color="white"  value="message">
          <span>Groupomania Home</span>
        </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items >
      <v-btn @click="logout()">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
 <form enctype="multipart/form-data" class="add-new-post" name="add-new-post" ref="MyForm" >
    <div class="form-group" >
      <label for="title" > title</label>
      <input type="text" class="form-control" name="title"  v-model="title">
    </div>
    <div class="form-group">
      <label for="post-content"> content</label>
      <textarea name="content"  v-model="content" ></textarea>
    </div> 
   <input type="file" ref="file" @change="selectFile" >  
  <button class="btn btn-primary btn-block" @click="post()">post</button>
  </form>
  <div class="message" v-for="message in messages" :key="message.id">
         <img src="`http://localhost:3000/images/`" > 
      <h3> {{message.pseudo}}</h3>
      <h4 > {{ message.title  }}</h4>
        <small><span class="glyphicon glyphicon-calendar" aria-hidden="false"></span>{{ message.createdAt }}</small>
      <p>
        {{ message.content }}</p> 
        <p>{{message.id}}</p>  

          <v-btn v-if="message.pseudo == User" color="primary"  @click="edit = message.id"  > edit  </v-btn>
         <v-btn depressed  v-if="message.pseudo == User"  color="error" @click="remove(message)">remove</v-btn>
         <div class="react">  
           <div class="likes" >
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"><v-icon color="green">mdi-thumb-up</v-icon></v-btn>
                    </template>
                    <span>J'aime !</span>
                    </v-tooltip>
                </div>
                <div class="dislikes" >
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"><v-icon color="red">mdi-thumb-down</v-icon></v-btn>
                    </template>
                    <span>J'aime pas !</span>
                    </v-tooltip>
                </div>
         </div>
                <div class="comments"  v-for="item in items" :key="item.id">
              <h5> {{item.pseudo}} </h5> 
                 <p>{{ item.comment }} </p>
                  <p>{{item.createdAt}} </p>
       <v-btn v-if="item.pseudo == User" color="primary"  @click="edit = item.id"  > edit comment  </v-btn>  
        <v-btn class="btn btn-primary btn-block" @click="removeComment(item)">remove comment</v-btn>
                <form class="edit-comment" v-if="edit === item.id">
                   <textarea v-model="updatedComment" ></textarea>
                    <v-btn type="button" class="btn btn-success" color="succes"
                               data-dismiss="modal"
                          @click="modifyComment(item)">Save Changes</v-btn>
                               <v-btn type="button" class="btn btn-default" color="primary"
                             data-dismiss="modal" v-if="edit === item.id"  @click="edit = !edit">Close</v-btn>
          
                </form>
                </div>
              <div>
<textarea v-model="comment" placeholder="add comment" ></textarea>
  <button class="btn btn-primary btn-block" @click="postComment(message)">add comment</button>

                   
                </div>  
        
<form class="add-new-post" name="add-new-post" v-if="edit === message.id" >
    <div class="form-group" >
      <label for="title" > title</label>
      <input type="text" class="form-control" name="title"  v-model="updatedTitle">
    </div>
    <div class="form-group">
      <label for="post-content"> content</label>
      <textarea name="content"  v-model="updatedContent" ></textarea>
    </div>    
     
            <v-btn type="button" class="btn btn-success" color="succes"
                               data-dismiss="modal"
                              v-if="edit === message.id"  @click="modify(message)">Save Changes</v-btn>
                               <v-btn type="button" class="btn btn-default" color="primary"
                             data-dismiss="modal" v-if="edit === message.id"  @click="edit = !edit">Close</v-btn>
          </form>
      </div>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
          updatedComment : '',
          comment: '',
          edit : false,
          file: '',
           updatedContent :'',
           updatedTitle : '',
            title : '',
            content : '',
            User : localStorage.getItem('user'),
            messages : [],
            items : []
        }
    },
    created() {
    axios.get('http://localhost:3000/message/messages', 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => 
      (this.messages = response.data.Messages ) )
        .catch(err => console.log(err))
},
mounted() {
  axios.get('http://localhost:3000/comment/comments', 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => // console.log(response))
      (this.items = response.data.Comments ) )
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
      selectFile(){
      // console.log(this.$refs.file.files[0])
        this.file = this.$refs.file.files[0];
      },
      post() {
         let fd= new FormData()
          fd.append("file", this.file)
          fd.append("title", this.title)
          fd.append("content", this.content)
           axios.post('http://localhost:3000/message/message',fd, 
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
        postComment(message){
          axios.post('http://localhost:3000/comment/comments', { messageId : message.id,
             comment : this.comment},
             { headers : {Authorization: "Bearer " + localStorage.token}} ) 
             .then((res) => console.log(res) )
              .catch(err =>console.log(err))
           window.location.reload();

        },
        removeComment(item){
          axios.delete('http://localhost:3000/comment/comments/'+ item.id,
            { headers : {Authorization: "Bearer " + localStorage.token } }
                         )
                .then(res => console.log(res))
                .catch(err =>console.log(err))
                  window.location.reload();
        },
        modifyComment(item){
                  axios.put('http://localhost:3000/message/messages/' + item.id ,{
                    
                    comment : this.updatedComment
                  },       
                   { headers : {Authorization: "Bearer " + localStorage.token} }
                         )
                .then((res) => console.log(res) )
                .catch(err =>console.log(err))
                window.location.reload();
    }
    }
}
</script>
<style scoped>
.react  {
  display: flex;
}
.add-new-post{
  text-align : center;
  background-color: aqua;
}
.message{
  background-color: darkturquoise;
}
</style>