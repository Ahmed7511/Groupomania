<template>
<v-container >

  <v-toolbar>
    <v-toolbar-title >Welcome <RouterLink to="Profile">{{User}}</RouterLink>
</v-toolbar-title>
        <v-spacer></v-spacer>
    <v-btn color="white"  value="message">
          <span>Groupomania Home</span>
        </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items >
               <v-btn>
                          <RouterLink to="Users">Users</RouterLink> 
               </v-btn>
      <v-btn @click="logout()">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
   
 <form enctype="multipart/form-data" class="add-new-post" name="add-new-post" ref="MyForm" >
    <div class="form-group" >
      <label for="title" > title : </label>
      <input type="text" class="form-control" name="title"  v-model="title">
    </div>
    <div class="form-group">
      <label for="post-content"> content : 
      <textarea name="content" rows="1" v-model="content" ></textarea></label>
    </div> 
   <input type="file" ref="file" @change="selectFile" >  
  <button class="btn btn-primary btn-block" @click="post()">post</button>
  </form>
  <div class="message" v-for="message in messages" :key="message.id">
      <h3> {{message.pseudo}}</h3>
      <h4 > {{ message.title  }}</h4>
        <small><span class="glyphicon glyphicon-calendar" aria-hidden="false"></span>{{ message.createdAt }}</small>
      <p>
        {{ message.content }}</p> 
         <img :src='message.imageUrl'>
        <p>{{message.id}}</p>  
      <form class="add-new-post" name="add-new-post" v-if="edit === message.id" >
              <div class="form-group" >
                      <label for="title" > title : </label>
                         <input type="text" class="form-control" name="title"  v-model="message.title">
              </div>
              <div class="form-group">
                     <label for="post-content"> content :
                         <textarea name="content" rows="1"  v-model="message.content" ></textarea></label>

              </div>    
          <input type="file" ref="newFile" @change="selectNewFile" >  
     
            <v-btn type="button" class="btn btn-success" color="succes"
                               data-dismiss="modal"
                              v-if="edit === message.id"  @click="modify(message)">Save Changes</v-btn>
                               <v-btn type="button" class="btn btn-default" color="primary"
                             data-dismiss="modal" v-if="edit === message.id"  @click="edit = !edit">Close</v-btn>
          </form>
         <div class="text-right">
    <v-menu offset-y v-if="message.pseudo == User">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(option, index) in options"
          :key="index"
        >
         <v-list-item-title @click="edit = message.id" >{{ option.edit }}</v-list-item-title><br>
        <v-list-item-title @click="remove(message)">{{ option.delete }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
         <div class="react" > 
           <div class="likes" > 
                    <v-tooltip top>
                    <template  v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"><v-icon color="green" @click="userLike(message)" >mdi-thumb-up</v-icon>
                    <span v-if="message.id">{{countLike}}</span> </v-btn>
                    </template>
                    <span >J'aime !</span> 
                    </v-tooltip>
                </div>
                <div class="dislikes"  >
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"><v-icon color="red"   @click="userDislike(message) " >mdi-thumb-down</v-icon>
                          <span v-if="message.id" >{{countDislike}}</span> </v-btn>
                    </template>
                    <span>J'aime pas !</span>
                    </v-tooltip>
                </div>
         </div>
                <div class="comments"  v-for="item in items" :key="item.id">
              <h5  v-if="item.messageId == message.id"> {{item.pseudo}} </h5> 
                 <p  v-if="item.messageId == message.id">{{ item.comment }} </p>
                
                  <small  v-if="item.messageId == message.id">{{item.createdAt}} </small>
       <v-btn  v-if="item.messageId == message.id"  color="primary"  @click="edit = item.id"  > edit comment  </v-btn>  
        <v-btn  v-if="item.messageId == message.id" class="btn btn-primary btn-block" @click="removeComment(item)">remove comment</v-btn>
                <form class="edit-comment" v-if="edit === item.id">
                   <textarea v-model="item.comment " > </textarea>
                    <v-btn type="button" class="btn btn-success" color="succes"
                               data-dismiss="modal"
                          @click="modifyComment(item)">Save Changes</v-btn>
                               <v-btn type="button" class="btn btn-default" color="primary"
                         data-dismiss="modal" v-if="edit === item.id"  @click="edit = !edit">Close</v-btn>
      
                 </form>
                </div>

                <div class="comment" :v-for="message.id" >       
<textarea  v-model="comment" placeholder="add comment" ></textarea>
  <v-btn class="btn btn-primary btn-block" @click="postComment(message)">add comment</v-btn>
                
                   
             </div>  
        

      </div>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
          like : 1,
          disLike : -1,
          comment: '',
          edit : false,
          image: '',
            title : '',
            content : '',
            User : '',
            messages : [],
            items : [],
            reacts : [],
            countLike : 0,
            countDislike : 0 ,
             options: [
        { edit : 'Edit' },
        { delete : 'Delete'}
      ],
        }
    },
    created() {
    axios.get('http://localhost:3000/message/messages', 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => //console.log(response))
      (this.messages = response.data.Messages ) )
        .catch(err => console.log(err))
        //get user
        axios.get('http://localhost:3000/user/' + 106, 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => 
      (this.User = response.data.user.pseudo ) )
        .catch(err => console.log(err))
        //get react like
        axios.get('http://localhost:3000/react/like/'+ 106,
         { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => //console.log(response) )
         (this.countLike = response.data) )
        .catch(err => console.log(err))
          //get dislike
           axios.get('http://localhost:3000/react/dislike/' + 109,
         { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => //console.log(response) )
        (this.countDislike = response.data) )
        .catch(err => console.log(err))
},
mounted() {
  axios.get('http://localhost:3000/comment/comments', 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response =>//  console.log(response))
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
       //console.log(this.$refs.file.files[0])
        this.file = this.$refs.file.files[0];
       // console.log(this.file.name)
      },
      post() {
         let fd= new FormData()
          fd.append("image", this.file)
          fd.append("title", this.title)
          fd.append("content", this.content)
        //  console.log(fd)
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
        selectNewFile(){
          console.log(this.$refs.newfile)
        //this.newfile = this.$refs.file.files[0]; 
        },
        modify(message){
                  axios.put('http://localhost:3000/message/messages/' + message.id ,{title :message.title,
                   content : message.content
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
                  axios.put('http://localhost:3000/comment/comments/' + item.id ,{
                    messageId : item.messageId,
                    comment : item.comment
                  },       
                   { headers : {Authorization: "Bearer " + localStorage.token} }
                         )
                .then((res) => console.log(res) )
                .catch(err =>console.log(err))
                window.location.reload();
    },
      
    userLike(message){
     axios.post('http://localhost:3000/react',{
       messageId: message.id,
       userId : message.userId,
       likeType : this.like
     },       
         { headers : {Authorization: "Bearer " + localStorage.token} }
                         )
                .then(response => console.log(response))
               // (this.countLike = response.data) )
                .catch(err =>console.log(err))
   },
    userDislike(message){
        axios.post('http://localhost:3000/react' ,{
                messageId: message.id,
                userId : message.userId,
               likeType : this.disLike
              },       
         { headers : {Authorization: "Bearer " + localStorage.token} }
                         )
                .then((res) => console.log(res) )
                  //  (this.countDislike = res.data) )
                .catch(err =>console.log(err))
   },
//   getLike(message){
// // compture de reaction
//         axios.get('http://localhost:3000/react/like/' + message.id ,      
//          { headers : {Authorization: "Bearer " + localStorage.token} }
//                          )
//                 .then( response => //console.log(response))
//                 (this.countLike = response.data) )
      
//                 .catch(err =>console.log(err))
//                // window.location.reload() 
//   },
// // compture de reaction
//      getDisLike(message){
//           axios.get('http://localhost:3000/react/dislike/' + message.id ,      
//          { headers : {Authorization: "Bearer " + localStorage.token} }
//                          )
//                 .then( res => //console.log(res))
//                 (this.countDislike = res.data))
      
//                 .catch(err =>console.log(err))
//              //  window.location.reload()

    
    
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
