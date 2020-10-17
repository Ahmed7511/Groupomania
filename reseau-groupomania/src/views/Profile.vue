<template>
    <v-main>
      <v-container>
          <v-toolbar >
               <v-toolbar-title>Welcome {{ user.pseudo }}</v-toolbar-title>
               <v-spacer></v-spacer>
               <RouterLink class="text-decoration-none" to="Groupomania">HOME</RouterLink>
          </v-toolbar>
          <v-card-text class="mx-auto pa-4 mt-4" max-width="600px" >
         <v-card-actions>
            <v-list-item>
               <v-list-item-avatar color="grey darken-3">
                  <v-img
                     class="elevation-6"
                     alt="avatar"
                     src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
               </v-list-item-avatar>   
            </v-list-item>
            
         </v-card-actions>
          <span class="title font-weight-bold">pseudo : {{ user.pseudo }}</span>

               <p class="title font-weight-bold">Email : {{ user.email }}</p>
               <p class="title font-weight-bold">created at :{{ user.createdAt }}</p>
               <v-btn color="error" @click="deleteUser(user)"> delete </v-btn>
               <v-btn color="primary" @click="edit = user.id"> Edit </v-btn>
          
          <form class="edit-user" v-if="edit">
               <label class="title font-weight-bold" for="user"> pseudo :  </label><br>
               <textarea id="user" v-model="user.pseudo"> </textarea><br>
               <label class="title font-weight-bold" for="user-email"> email : </label><br>
               <textarea id="user-email" v-model="user.email"> </textarea>
               <v-btn
                    type="button"
                    class="btn btn-success"
                    color="green"
                    data-dismiss="modal"
                    @click="updateUser(user)"
                    >Save </v-btn
               >
               <v-btn
                    type="button"
                    class="btn btn-default"
                    color="primary"
                    data-dismiss="modal"
                    @click="edit = !edit"
                    >X</v-btn
               >
          </form>
          </v-card-text>
     </v-container>
     <v-footer class="footer"  padless >
         <v-card flat tile class="lighten-1 white--text text-center" color="grey">
              
             <v-card-text>
               <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4 red--text"
                  icon
               >
                  <v-icon size="24px">
                     {{ icon }}
                  </v-icon>
               </v-btn>
            </v-card-text>
            

            <v-card-text class="black--text pt-0">
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

            <v-card-text class="black--text">
               {{ new Date().getFullYear() }} — <strong>GROUPOMANIA</strong>
            </v-card-text>

         </v-card>

      </v-footer>
    </v-main>
</template>
<script>
import axios from "axios";
export default {
     data() {
          return {
               user: "",
               edit: false,
               icons: [
            "mdi-facebook",
            "mdi-twitter",
            "mdi-linkedin",
            "mdi-instagram",
         ],
          };
     },
     created() {
          axios.get("http://localhost:3000/user/", {
               headers: { Authorization: "Bearer " + localStorage.token },
          })
               .then(
                    (
                         response // console.log(response) )
                    ) => (this.user = response.data.user)
               )
               .catch((err) => console.log(err));
     },
     methods: {
          deleteUser(user) {
               axios.delete("http://localhost:3000/user/" + user.id, {
                    headers: { Authorization: "Bearer " + localStorage.token },
               })
                    .then((response) => console.log(response))
                    .catch((err) => console.log(err));
               localStorage.clear();
               window.location.reload();
          },
          updateUser(user) {
               axios.put(
                    "http://localhost:3000/user/" + user.id,
                    {
                         email: user.email,
                         pseudo: user.pseudo,
                    },
                    {
                         headers: {
                              Authorization: "Bearer " + localStorage.token,
                         },
                    }
               )
                    .then((response) => console.log(response))
                    .catch((err) => console.log(err));
               window.location.reload();
          },
     },
};
</script>
<style scoped>
.v-card{
   background: url('../assets/icon-above-font.png');
   background-repeat: round;
}
</style>