<template>
<v-main>
<v-container>
    <v-toolbar>
        <v-spacer></v-spacer>
      <v-btn color="white"  value="message">
         <span>Groupomania Users </span>
        </v-btn>
        <v-spacer></v-spacer>
    <RouterLink to="Groupomania">HOME</RouterLink>
    </v-toolbar>
     <v-card
         v-for="message in messages"
         :key="message.id"
         class="mx-auto"
         color="#26c6da"
         dark
         max-width="600"
      >
     <v-card-title>
            <v-icon large left> </v-icon>
            <span class="title font-weight-bold"> {{ message.pseudo }}</span>
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
               <h3>
                  {{ message.title }}
               </h3>
               <v-img :src='message.imageUrl' max-width="300px" ></v-img>
               <p>
                  {{ message.content }}
               </p>
                  {{ message.id }}

               <small>{{ message.createdAt }} </small>
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
            user : [],
            messages : [],
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
         .catch(err => console.log(err))
    }

}
    </script>
    <style  scoped>
    .v-main {
       background-color: blueviolet;
    }
    </style>