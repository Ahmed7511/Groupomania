<template>
<v-container>
    <v-toolbar>
        <v-spacer></v-spacer>
      <v-btn color="white"  value="message">
         <span>Groupomania Users </span>
        </v-btn>
        <v-spacer></v-spacer>
    <RouterLink to="Groupomania">HOME</RouterLink>
    </v-toolbar>
     <div class="text-center" v-for="message in messages" :key="message.id">
    
         <h3>{{ message.pseudo }}</h3>
         <h4>{{ message.title }}</h4>
         <small
            ><span
               class="glyphicon glyphicon-calendar"
               aria-hidden="false"
            ></span
            >{{ message.createdAt }}</small
         >
         <p>
            {{ message.content }}
         </p>
         <img :src="message.imageUrl" /> 
         <p>{{ message.id }}</p>
     </div>
     {{ error }}
</v-container>
</template>
<script>
    import axios from 'axios';
export default {
    data(){
        return{
            user : [],
            messages : [],
            error : ''
        }
    },
    created (){
  axios.get("http://localhost:3000/user/", {
            headers: {
               Authorization: "Bearer " + localStorage.token,
            },
         })
         .then(response =>// console.log(response))
          (this.user = response.data.user))
         .catch((err) => console.log(err));
         //get messages 
         axios.get("http://localhost:3000/admin/messages/", {
            headers: {
               Authorization: "Bearer " + localStorage.token,
            },
         })
         .then(response => //console.log(response))
          (this.messages = response.data.messages))
         .catch(err => this.error =  'Autorisation refusée, seuls les admins peuvent utiliser cette route !');
    }

}
    </script>