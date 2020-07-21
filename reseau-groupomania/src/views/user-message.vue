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
   <div class="message" :v-for='(message,index) '>
       <h3><input v-model="message.pseudo"><input>{{message.pseudo}} </h3>
      <h4> {{ message.title  }}</h4>
        <small><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>{{ message.createdAt }}</small>
      <p>
        {{ message.content }} {{message.id}}
      </p> 
              <v-btn depressed small color="error" @click="remove(message)">remove</v-btn>
              <v-btn depressed small color="primary" @click="modify(message)">edit</v-btn>
   </div>
</v-container> 
</template>
<script>
import axios from 'axios'
export default {
name: 'messageid' ,
 data() {
    return {
      message:{},
      User : localStorage.getItem('user'),
    };
  },
  created(){
   axios.get("http://localhost:3000/message/messages/" +  this.$route.params.id  ,
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => {
        if(response.data.message === null){
            this.$router.push({ name: 'messages' });
        }else{
         (this.message = response.data.message)
        }
      } )
        .catch(err => console.log(err))
  },
  methods:{
        remove(){
                  axios.delete('http://localhost:3000/message/messages/' + this.$route.params.id  , 
                   { headers : {Authorization: "Bearer " + localStorage.token} }
                         )
                .then(res => console.log(res))
                .catch(err =>console.log(err))
                  window.location.reload();

        },
        modify(){
                  axios.put('http://localhost:3000/message/messages/' + this.$route.params.id  , 
                           
                   { headers : {Authorization: "Bearer " + localStorage.token} }
                         )
                .then(() => {this.title = null ;
                              this.content = null;}  )
                .catch(err =>console.log(err))
      
        }
   }
}
  </script>