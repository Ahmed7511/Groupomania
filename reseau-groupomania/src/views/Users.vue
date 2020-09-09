<template>
<v-container>
    <v-toolbar>
        <v-spacer></v-spacer>
      <v-btn color="white"  value="message">
         <span>Groupomania Users</span>
        </v-btn>
        <v-spacer></v-spacer>
    <RouterLink to="Groupomania">HOME</RouterLink>
    </v-toolbar>   
            <div class="user" v-for="user in users" :key="user.id" >
                 <p> Pseudo : {{user.pseudo}}</p>
                <p>  Email : {{user.email}}</p>
                <p> created at :{{user.createdAt}} </p>
          <v-btn color="error"   @click="deleteUser(user) "  > delete  </v-btn>

            </div>
         {{ error }}
</v-container>
</template>
<script>
    import axios from 'axios';
export default {
    data(){
        return{
            users : [],
            error : ''
        }
    },
    created (){
  axios.get('http://localhost:3000/user/users/', 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => (this.users = response.data.users) )
        .catch(err => (this.error = err) )
    }, 
    methods : {
        deleteUser(user){
            axios.delete('http://localhost:3000/user/' + user.id , 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => console.log(response) )
        .catch(err => console.log(err))
        window.location.reload();
        }
    }
}
</script>