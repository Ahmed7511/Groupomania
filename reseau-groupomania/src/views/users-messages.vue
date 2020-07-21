
<template>

<v-container> 
    <v-toolbar>  
           
      <v-toolbar-title>Welcome {{User}}</v-toolbar-title>
      <v-spacer></v-spacer>
       <router-link to="/user/Groupomania">
       <v-btn color="white"  value="message" name="message">
          <span>Post message</span>
       </v-btn>
      </router-link>
      <v-spacer></v-spacer>
        <v-toolbar-items >
      <v-btn name="logout" @click="logout()">Logout</v-btn>
    </v-toolbar-items>
    </v-toolbar>
    
    <div class="message" v-for="message in messages" :key="message.id">
      <h3> {{message.pseudo}}</h3>
      <h4> {{ message.title  }}</h4>
        <small><span class="glyphicon glyphicon-calendar" aria-hidden="false"></span>{{ message.createdAt }}</small>
      <p>
        {{ message.content }}
        {{message.userId}}
      </p> 
     
              <v-btn depressed  v-if="message.pseudo == User" color="error" @click="remove()">remove</v-btn>
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
//name: 'messages' ,
 data() {
    return {
      messages: [],
      User : localStorage.getItem('user')
    };
  },
   methods:{
        logout(){
            localStorage.clear();
          window.location.reload();
        }, remove(){
                  axios.delete('http://localhost:3000/message/messages/' + this.$route.params.id  , 
                   { headers : {Authorization: "Bearer " + localStorage.token} }
                         )
                .then(res => console.log(res))
                .catch(err =>console.log(err))

        }
        },
  mounted() {
    axios.get('http://localhost:3000/message/messages', 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => 
      (this.messages = response.data.Messages) )
      
        .catch(err => console.log(err))
 
}    


}    
  

</script>