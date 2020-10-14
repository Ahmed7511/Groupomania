<template>
<v-main>
<v-container> 
   <nav >
     <v-toolbar color="blue" class="hidden-sm-and-down">
          <v-toolbar-title>
     <RouterLink  class="title font-weight-bold text-decoration-none" to="moderation">last postes</RouterLink>
            </v-toolbar-title>
         <v-toolbar-title class="title font-weight-bold mx-auto">Groupomania Messages </v-toolbar-title>
            <v-toolbar-title >
    <RouterLink  class="title font-weight-bold text-decoration-none" to="Groupomania">HOME</RouterLink>
            </v-toolbar-title>
            </v-toolbar>
        <v-toolbar flat ap color="blue " class="hidden-md-and-up" >
      <v-icon @click="drawer =!drawer">mdi-menu</v-icon>
         <v-toolbar-title class="title font-weight-bold mx-auto" >Groupomania Messages </v-toolbar-title>
        </v-toolbar> 
         <v-navigation-drawer v-model="drawer" ap >
            <v-toolbar-items class="d-flex flex-column" >
            <v-toolbar-title >
     <RouterLink  class="title font-weight-bold text-decoration-none" to="moderation">last postes</RouterLink>
            </v-toolbar-title>
            <v-toolbar-title  >
    <RouterLink  class="title font-weight-bold text-decoration-none" to="Groupomania">HOME</RouterLink>
            </v-toolbar-title>
         </v-toolbar-items>
         </v-navigation-drawer>
         </nav>
     <v-card
      v-for="user in users" :key="user.id" 
       class="mx-auto pa-4 my-4"
         max-width="600">
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
            
     </v-card>
          

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
           drawer : false,
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

</style>