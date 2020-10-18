<template>
<v-main>
   <v-container>
         <nav >
         <v-toolbar 
               prominent
               src="../assets/icon-left-font.svg" 
               color="#F44336" class="hidden-sm-and-down ">
            <v-toolbar-title class="mx-4 " v-if="user.isAdmin == true">
               <RouterLink to="Users" style="text-decoration: none; color: inherit;">Users</RouterLink>
            </v-toolbar-title>
          <v-spacer></v-spacer>
            <v-toolbar-title class="mx-4"  @click="logout()">Logout</v-toolbar-title>  
         </v-toolbar>
      <v-toolbar ap src="../assets/icon-left-font.svg" class="hidden-md-and-up">
      <v-icon @click="drawer =!drawer" >mdi-menu</v-icon>
      </v-toolbar> 
         <v-navigation-drawer  v-model="drawer" ap >
            <v-toolbar-title>
            <RouterLink style="text-decoration: none; color: inherit;" to="Profile" >
               <v-list-item-avatar color="grey darken-3">
              <v-img
                     class="elevation-6"
                     alt="avatar"
                     src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
               </v-list-item-avatar>
               {{user.pseudo}} </RouterLink>
            </v-toolbar-title>
            <v-toolbar-items class="d-flex flex-column"  >
            <v-toolbar-title class="mx-4" v-if="user.isAdmin == true">
               <RouterLink style="text-decoration: none; color: inherit;" to="Users">Users</RouterLink>
            </v-toolbar-title>
            <v-toolbar-title class="mx-4"  color="blue" @click="logout()">Logout</v-toolbar-title>
         </v-toolbar-items>
         </v-navigation-drawer>
      </nav>
      <v-card class="mx-auto pa-4 mt-4" max-width="600px" >
         <v-toolbar flat color="#FFAB">
            <v-icon>mdi-account</v-icon>
            <v-toolbar-title class="font-weight-bold" color="blue-grey">
               <RouterLink class="text-decoration-none" to="Profile" >{{ user.pseudo }}</RouterLink>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
               fab
               small
               @click="isEditing = !isEditing"
            >
               <v-icon v-if="isEditing">
                  mdi-close
               </v-icon>
               <v-icon v-else>
                  mdi-pencil
               </v-icon>
            </v-btn>
         </v-toolbar>
         <v-form
            enctype="multipart/form-data"
            class="add-post"
            name="add-post"
            ref="MyForm"
         >
            <v-text-field
               :disabled="!isEditing"
               v-model="title"
               color="white"
               label="title"
            ></v-text-field>
            <v-text-field
               :disabled="!isEditing"
               v-model="content"
               color="white"
               item-text="name"
               label="content"
            >
            </v-text-field>
            <v-file-input ref="file" @change="selectFile"></v-file-input>

            <v-divider></v-divider>
            <v-spacer></v-spacer>
           <v-row align="center" justify="space-around"> <v-btn :disabled="!isEditing" color="success" @click="post">
               post
            </v-btn>
           </v-row>
         </v-form>
      </v-card>
      <v-card
         v-for="message in messages"
         :key="message.id"
         class="mx-auto pa-4 my-4"
         color="#fff"
         max-width="600"
      >
   
  
      <div class="text-right" >
       
            <v-menu
               offset-y
               v-if="message.userId == user.id || user.isAdmin == true"
            >
               <template
                  v-slot:activator="{
                     on,
                     attrs,
                  }"
               >
                  <v-btn v-bind="attrs" v-on="on">
                     V
                  </v-btn>
               </template>
               <v-list class="d-flex flex-column"> 
                     <v-icon color="blue"
                        v-if="message.userId == user.id"
                        @click="edit = message.id"  >
                             mdi-pencil
                          
                         </v-icon>
                     <v-icon
                        color="red"
                        v-if="message.userId == user.id || user.isAdmin == true"
                        @click="remove(message)"
                        >mdi-delete</v-icon>
               </v-list>
            </v-menu>
         </div>
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
               <v-card-title>
                  {{ message.title }}
               </v-card-title>
               <v-img :src='message.imageUrl' max-width="300px" ></v-img>
               <p>
                  {{ message.content }}
               </p>
               <small>{{ message.createdAt }} </small>
           <v-form
               class="add-new-post"
               name="add-new-post"
               v-if="edit === message.id"
            >
               <label for="title">
                  title :
               </label>
               <input
                  type="text"
                  class="form-control"
                  name="title"
                  id="title"
                  v-model="message.title"
               >
               <br>
               <label for="content">
                  content :
                  <textarea
                  id="content"
                     name="content"
                     rows="0"
                      cols="40"
                     v-model="message.content"
                  ></textarea
               >
                  </label>
                   <br>
               <v-btn
                  type="button"
                  class="btn btn-success"
                  color="green"
                  data-dismiss="modal"
                  v-if="edit === message.id"
                  @click="modify(message)"
                  >Save </v-btn
               >
               <v-btn
                  type="button"
                  class="btn btn-default"
                  color="primary"
                  data-dismiss="modal"
                  v-if="edit === message.id"
                  @click="edit = !edit"
                  >X</v-btn
               ></v-form>
  
         <div class="react">
            <div class="likes" >
               <v-tooltip top>
                  <template
                     v-slot:activator="{
                        on,
                        attrs,
                     }" >
                      <v-icon class="px-2" v-bind="attrs" v-on="on" color="green" @click="userLike(message)"
                           >mdi-thumb-up</v-icon >
                        <span >{{ countLike }} </span>
                  </template>
                  <span>J'aime !</span>
               </v-tooltip>
            </div>
            <div class="dislikes" >
               <v-tooltip top>
                  <template
                     v-slot:activator="{
                        on,
                        attrs,
                     }"
                  >
                        <v-icon class="px-2" color="red" v-bind="attrs" v-on="on" @click="userDislike(message)"
                           >mdi-thumb-down</v-icon >
                        <span >{{ countDisLike }}</span>
                   
                  </template>
                  <span>J'aime pas !</span>
               </v-tooltip>
            </div>
         </div>
         <v-card elevation="2"  color="#F3E5F5">
            <div class="pa-2 my-2" v-for="item in items" :key="item.id">
            <h5 v-if="item.messageId == message.id">
               {{ item.pseudo }}
            </h5>
            <p v-if="item.messageId == message.id">
               {{ item.comment }}
            </p>

            <small v-if="item.messageId == message.id"
               >{{ item.createdAt }}
            </small>
            <v-icon
               v-if="item.messageId == message.id"
               color="primary"
               @click="edit = item.id"
            >
                  mdi-pencil
               </v-icon>
           
            <v-icon
               v-if="item.messageId == message.id"
               
               class="btn"
               @click="removeComment(item)"
               >mdi-delete</v-icon
            >
            <form class="edit-comment" v-if="edit === item.id">
              <label for='message.message_id'> {{ item.pseudo}} : </label><br>
                <textarea id='message.message_id' rows="1" v-model="item.comment"> </textarea>
               <v-icon
                  type="button"
                  class="btn btn-success"
                  color="succes"
                  data-dismiss="modal"
                  @click="modifyComment(item)"
                  >mdi-arrow-up-bold-box-outline</v-icon
               >
               <v-icon
                  type="button"
                  class="btn btn-default"
                  color="primary"
                  data-dismiss="modal"
                  v-if="edit === item.id"
                  @click="edit = !edit"
                  >x</v-icon
               >
            </form>
         </div>

            <div class="comment"  color="red" >
               <label for="add-comment" class="bold"> {{ user.pseudo}}</label><br>
            <textarea id="add-comment" rows="1" v-model="comment" placeholder="add comment"></textarea>
            
            <v-icon
               class="btn btn-primary btn-block"
               @click="postComment(message)"
               >mdi-message-text</v-icon
            >
         </div>
             </v-card>
         
      </v-card>
   </v-container>
   <v-footer class="footer"  >
         <v-card flat tile class="text-center" color="#F3E5F5">
            <v-card-text>
               <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4 black--text"
                  icon
               >
                  <v-icon size="24px">
                     {{ icon }}
                  </v-icon>
               </v-btn>
            </v-card-text>

            <v-card-text  class="black--text pt-0">
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
            <strong> 
              {{ new Date().getFullYear() }}

                 </strong>
            <v-divider></v-divider>

                  <img src="../assets/icon-left-font-monochrome-black.png" alt="groupomania" width="120px" >
            
         </v-card>
      </v-footer>
</v-main>
</template>

<script>
import axios from "axios";
export default {
   data() {
      return {
         drawer : false,
         isEditing: null,
         like: 1,
         disLike: -1,
         comment: "",
         edit: false,
         file: "",
         title: "",
         content: "",
         user: [],
         messages: [],
         items: [],
         rows: [],
         reacts: [],
         messageId:"",
         countLike: "",
         countDisLike: "",
         options: [{ edit: "Edit" }, { delete: "Delete" }],
         icons: [
            "mdi-facebook",
            "mdi-twitter",
            "mdi-linkedin",
            "mdi-instagram",
         ],
         nav: [
        {
          icon: 'home',
          text: 'Home',
          title: 'Back to Home page',
          active: true
        },
        {
          icon: 'info',
          text: 'About',
          title: 'About this demo',
          active: false
        },
        {
          icon: 'assignment_turned_in',
          text: 'Todos',
          title: 'Some stuff that needs doing',
          active: false
        },
        {
          icon: 'email',
          text: 'Contact',
          title: 'Our Contact info',
          active: false
        }
      ]
    
      };
   },
   created() {
      axios.get("http://localhost:3000/message/messages", {
            headers: {
               Authorization: "Bearer " + localStorage.token,
            },
         })
         .then(
            (
               response //console.log(response)
            ) => (this.messages = response.data.Messages)
         )
         .catch((err) => console.log(err));
      //get user
      axios.get("http://localhost:3000/user/", {
            headers: {
               Authorization: "Bearer " + localStorage.token,
            },
         })
         .then(
            (
               response // console.log(response))
            ) => (this.user = response.data.user)
         )
         .catch((err) => console.log(err));
   },
   mounted() {
      axios.get("http://localhost:3000/comment/comments", {
            headers: {
               Authorization: "Bearer " + localStorage.token,
            },
         })
         .then((response) => (this.items = response.data.Comments))
         .catch((err) => console.log(err));
   },

   methods: {
      logout() {
         localStorage.clear();
         window.location.reload();
      },
      getOne(message) {
         axios
            .get("http://localhost:3000/message/messages/" + message.id, {
               headers: {
                  Authorization: "Bearer " + localStorage.token,
               },
            })
            .then(
               (response) => (
                  (this.updatedContent = response.data.message.content),
                  (this.updatedTitle = response.data.message.title)
               )
            )
            .catch((err) => console.log(err));
      },
      selectFile(e) {
         // console.log(e)
         this.file = e;
      },
      post() {
         //  this.isEditing = !this.isEditing
         // this.hasSaved = true
         let fd = new FormData();
         fd.append("image", this.file);
         fd.append("title", this.title);
         fd.append("content", this.content);
         //  console.log(fd)
         axios.post("http://localhost:3000/message/message", fd, {
               headers: {
                  Authorization: "Bearer " + localStorage.token,
               },
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
         window.location.reload();
      },

      remove(message) {
         axios.delete("http://localhost:3000/message/messages/" + message.id, {
               headers: {
                  Authorization: "Bearer " + localStorage.token,
               },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
         window.location.reload();
      },
      modify(message) {
         axios.put(
               "http://localhost:3000/message/messages/" + message.id,
               {
                  title: message.title,
                  content: message.content,
               },
               {
                  headers: {
                     Authorization: "Bearer " + localStorage.token,
                  },
               }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
         window.location.reload();
      },
      postComment(message) {
         axios.post(
               "http://localhost:3000/comment/comments",
               {
                  messageId: message.id,
                  comment: this.comment,
               },
               {
                  headers: {
                     Authorization: "Bearer " + localStorage.token,
                  },
               }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
         window.location.reload();
      },
      removeComment(item) {
         axios
            .delete("http://localhost:3000/comment/comments/" + item.id, {
               headers: {
                  Authorization: "Bearer " + localStorage.token,
               },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
         window.location.reload();
      },
      modifyComment(item) {
         axios.put(
               "http://localhost:3000/comment/comments/" + item.id,
               {
                  messageId: item.messageId,
                  comment: item.comment,
               },
               {
                  headers: {
                     Authorization: "Bearer " + localStorage.token,
                  },
               }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
         window.location.reload();
      },

      userLike() {
         alert('on travaille pour dévelloper cette fonctionnalité ! ');
         // axios.post(
         //       "http://localhost:3000/react/",
         //       {
         //          likeType : this.like,
         //          messageId : message.id
         //       },
         //       {
         //          headers: {
         //             Authorization: "Bearer " + localStorage.token,
         //          },
         //       }
         //    )
         //    // .then(response =>
         //    //     console.log(response.data))
         //    .then(
         //       (response) => console.log(response))
         //       //  (
         //       //    (this.countLike = response.data.count)
         //       //  ) )
            
         //    .catch((err) => console.log(err));
      },
      userDislike() {
         alert('on travaille pour dévelloper cette fonctionnalité ! ');

         // axios.post(
         //        "http://localhost:3000/react/",
         //       {
         //         likeType: this.disLike,
         //          messageId : message.id

         //       },
         //       {
         //          headers: {
         //             Authorization: "Bearer " + localStorage.token,
         //          },
         //       }
         //    )
         //    .then(res => console.log(res) )
         //    // .then(
         //    //    (res) => (
         //    //       (this.countDislike = res.data.count)
         //    //    )
         //    // )
         //    .catch((err) => console.log(err));
      },
      
   },
};
</script>
<style scoped>
.react {
   display: flex;
}
.add-post {
   background-image: url("../assets/icon.png");
       background-position: center;
    background-size: contain;
}

</style>
