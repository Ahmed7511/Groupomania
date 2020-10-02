<template>
<v-main>
<v-container> 
    <v-toolbar >
        <v-btn >
     <RouterLink to="moderation">last postes</RouterLink>
        </v-btn>
        <v-spacer></v-spacer>
      <v-btn color="white"  value="message">
         <span  >Groupomania Users </span>
        </v-btn>
        <v-spacer></v-spacer>
    <RouterLink to="Groupomania">HOME</RouterLink>
    </v-toolbar>   
     <div class="user"  v-for="user in users" :key="user.id" >
               <v-card-title>
            <v-icon large left> </v-icon>
         </v-card-title>

         <v-card-actions>
            <v-list-item>
               <v-list-item-avatar color="grey darken-3">
                  <v-img
                     class="elevation-6"
                     alt=""
                     src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
               </v-list-item-avatar>   
            </v-list-item>
            
         </v-card-actions>
          <span class="title font-weight-bold">pseudo : {{ user.pseudo }}</span>

               <p class="title font-weight-bold">Email : {{ user.email }}</p>
               <p class="title font-weight-bold">created at :{{ user.createdAt }}</p>
               <v-btn color="error" @click="deleteUser(user)"> delete </v-btn>
            
          </div>
          

         {{ error }}
</v-container>
<v-footer class="footer" dark padless >
         <v-card flat tile class=" lighten-1 white--text text-center"  color="blue">
            <v-card-text>
               <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4 white--text"
                  icon
               >
                  <v-icon size="24px">
                     {{ icon }}
                  </v-icon>
               </v-btn>
            </v-card-text>

            <v-card-text class="white--text pt-0">
               Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit
               amet. Mauris cursus commodo interdum. Praesent ut risus eget
               metus luctus accumsan id ultrices nunc. Sed at orci sed massa
               consectetur dignissim a sit amet dui. Duis commodo vitae velit et
               faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue
               vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum
               eu ipsum vel diam elementum tempor vel ut orci. Orci varius
               natoque penatibus et magnis dis parturient montes, nascetur
               ridiculus mus.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
               {{ new Date().getFullYear() }} — <strong>GROUPOMANIA</strong>
            </v-card-text>
         </v-card>
      </v-footer>
</v-main>
</template>
<script>
    import axios from 'axios';
export default {
    data(){
        return{
            user : '',
            users : [],
            error : '',
            icons: [
            "mdi-facebook",
            "mdi-twitter",
            "mdi-linkedin",
            "mdi-instagram",
         ],
        }
    },
    created (){
  axios.get('http://localhost:3000/admin/users/', 
           { headers : {Authorization: "Bearer " + localStorage.token}
       })
      .then(response => (this.users = response.data.users) )
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
        }
    }
}
</script>
<style scoped>
.v-main{
   background-color: blueviolet;
}
</style>