<template>
<v-container>
  <v-toolbar>
    <v-toolbar-title>Welcome {{User}}</v-toolbar-title>
        <v-spacer></v-spacer>
    <router-link :to="{name: 'messages'}"><v-btn color="white"  value="message">
          <span>Messages</span>
        </v-btn>
      </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items >
      <v-btn @click="logout()">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
 <form class="add-new-post" name="add-new-post" >
    <div class="form-group">
      <label for="title"> title</label>
      <input type="text" class="form-control" name="title" v-model="title">
    </div>
    <div class="form-group">
      <label for="post-content"> content</label>
      <textarea name="content" v-model="content" rows="5"></textarea>
    </div>    
    <button class="btn btn-primary btn-block" @click="post()">post</button>
  </form>
  <div class="message" v-for="message in messages" :key="message.id">
      <h3> {{message.pseudo}}</h3>
      <h4 > {{ message.title  }}</h4>
        <small><span class="glyphicon glyphicon-calendar" aria-hidden="false"></span>{{ message.createdAt }}</small>
      <p>
        {{ message.content }}</p>
       <p> {{message.id}}   </p> 
     
              <v-btn depressed  v-if="message.pseudo == User"  color="error" @click="remove(message.id)">remove</v-btn>
              <router-link  :to =" {name: 'message-id',params: { id: message.id }}">
              <v-btn v-if="message.pseudo == User" color="primary" >
                <span>edit</span>
              </v-btn>
               </router-link> 
    </div>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            title : '',
            content : '',
            User : localStorage.getItem('user'),
            messages : []
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
 
          remove(){
                  axios.delete('http://localhost:3000/message/messages/'+ this.id,
                   { headers : {Authorization: "Bearer " + localStorage.token } }
                         )
                .then(res => console.log(res))
                .catch(err =>console.log(err))
                //  window.location.reload();

        }
    
    }
    
}
</script>