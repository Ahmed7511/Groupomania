<template>
<v-container>
     <v-toolbar>
    <v-toolbar-title>Welcome {{user.pseudo}}</v-toolbar-title>
        <v-spacer></v-spacer>
    <RouterLink to="Groupomania">HOME</RouterLink>
     </v-toolbar>
     <div class="user"> 
                 <p> Pseudo : {{user.pseudo}}</p>
                <p>  Email : {{user.email}}</p>
                <p> created at :{{user.createdAt}} </p>
          <v-btn color="error"  @click="deleteUser(user) "  > delete  </v-btn>
          <v-btn color="primary" @click="edit = user.id" > Edit  </v-btn>
            </div>
             <form class="edit-user" v-if="edit">
                   <textarea v-model="user.pseudo " > </textarea><br>
                   <textarea v-model="user.email " > </textarea>
                    <v-btn type="button" class="btn btn-success" color="succes"
                               data-dismiss="modal"
                          @click="updateUser(user) " >Save Changes</v-btn>
                               <v-btn type="button" class="btn btn-default" color="primary"
                         data-dismiss="modal"  @click="edit = !edit">Close</v-btn>

             </form>             
</v-container>
</template>
<script>
    import axios from 'axios';
export default {
    data(){
        return{
            user : '',
            edit : false,

        }
    },
    created (){
  axios.get('http://localhost:3000/user/', 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => // console.log(response) ) 
                 this.user = response.data.user )
        .catch(err => console.log(err))
    }, 
    methods : {
        deleteUser(user){
            axios.delete('http://localhost:3000/user/' + user.id , 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => console.log(response) )
        .catch(err => console.log(err))
        window.location.reload();
        },
        updateUser(user){
            axios.put('http://localhost:3000/user/' + user.id , {
                email : user.email,
                pseudo : user.pseudo
            },
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => console.log(response) )
        .catch(err => console.log(err))
        window.location.reload();
        }
         }
  
}
</script>