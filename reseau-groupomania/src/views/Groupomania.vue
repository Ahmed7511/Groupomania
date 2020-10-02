<template >
<v-main>
   <v-container>
      <v-toolbar color="blue ">
       <v-toolbar-title>Welcome 
       
          </v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn color="blue" value="message">
               <img src="../assets/icon-left-font-monochrome-black.png" width="150px" >     
         </v-btn>
         <v-spacer></v-spacer>
         <v-toolbar-items>
            <v-btn v-if="user.isAdmin == true">
               <RouterLink to="Users">Users</RouterLink>
            </v-btn>
            <v-btn color="blue" @click="logout()">Logout</v-btn>
         </v-toolbar-items>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-card class="mx-auto px-4" color="blue lighten-2" dark max-width="600px" >
         <v-toolbar flat color="blue lighten-2">
            <v-icon>mdi-account</v-icon>
            <v-toolbar-title class="font-weight-bold" color="blue-grey">
               <RouterLink to="Profile" >{{ user.pseudo }}</RouterLink>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
               color="blue"
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
            class="add-new-post"
            name="add-new-post"
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

         <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
            Your have posted
         </v-snackbar>
      </v-card>
      <v-card
         v-for="message in messages"
         :key="message.id"
         class="mx-auto px-4"
         color="#26c6da"
         dark
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
                  <v-btn color="blue" v-bind="attrs" v-on="on">
                     V
                  </v-btn>
               </template>
               <v-list> 
                  <v-list-item v-for="(option, index) in options" :key="index">
                     <v-list-item-title
                        v-if="message.userId == user.id"
                        @click="edit = message.id"  >
                     
                        {{ option.edit }}
                         </v-list-item-title
                     ><br />
                     <v-list-item-title
                        v-if="message.userId == user.id || user.isAdmin == true"
                        @click="remove(message)"
                        >{{ option.delete }}</v-list-item-title
                     >
                  </v-list-item>
                 
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
               <h3>
                  {{ message.title }}
               </h3>
               <v-img :src='message.imageUrl' max-width="300px" ></v-img>
               <p>
                  {{ message.content }}
               </p>
                  {{ message.id }}

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
                  v-model="message.title"
               /><br>
               <label for="post-content">
                  content :
                  <textarea
                     name="content"
                     rows="1"
                     v-model="message.content"
                  ></textarea
               ></label>
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
                        <span v-for="react in reacts" :key="react.messageId">{{ react }} </span>
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
                        <span>{{ countDislike }}</span>
                   
                  </template>
                  <span>J'aime pas !</span>
               </v-tooltip>
            </div>
         </div>
         <v-card elevation="2"  color="blue-grey lighten-2">
            <div class="comments" v-for="item in items" :key="item.id">
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
               <textarea v-model="item.comment"> </textarea>
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
            <textarea v-model="comment" placeholder="add comment"></textarea>
            <v-icon
               class="btn btn-primary btn-block"
               @click="postComment(message)"
               >mdi-message-text</v-icon
            >
         </div>
             </v-card>
         
      </v-card>

      <!-- <div class="message" v-for="message in messages" :key="message.id">
         <div class="text-right">
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
               <v-list>
                  <v-list-item v-for="(option, index) in options" :key="index">
                     <v-list-item-title
                        v-if="message.userId == user.id"
                        @click="edit = message.id"
                        >{{ option.edit }}</v-list-item-title
                     ><br />
                     <v-list-item-title
                        v-if="message.userId == user.id || user.isAdmin == true"
                        @click="remove(message)"
                        >{{ option.delete }}</v-list-item-title
                     >
                  </v-list-item>
               </v-list>
            </v-menu>
         </div>
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
         <p>{{ message.id }}</p> -->

         <!-- <v-row justify="center"> -->
            <!-- <template  v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          v-if="message.userId == user.id" @click="edit = message.id"
        >
                open
        </v-btn>
      </template >
      <v-card >
        <v-card-title>
          <span class="headline">User post</span>
        </v-card-title>
        <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                v-model="message.title"
                  label="title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                v-model="message.content"
                  label="content"
                ></v-text-field>
              </v-col>
             
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="modify(message)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
            <!-- <v-dialog
      v-model="dialog"
      max-width="600px"
    > -->
            <!-- <v-form
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
                  v-model="message.title"
               />
               <label for="post-content">
                  content :
                  <textarea
                     name="content"
                     rows="1"
                     v-model="message.content"
                  ></textarea
               ></label>
               <v-btn
                  type="button"
                  class="btn btn-success"
                  color="succes"
                  data-dismiss="modal"
                  v-if="edit === message.id"
                  @click="modify(message)"
                  >Save Changes</v-btn
               >
               <v-btn
                  type="button"
                  class="btn btn-default"
                  color="primary"
                  data-dismiss="modal"
                  v-if="edit === message.id"
                  @click="edit = !edit"
                  >Close</v-btn
               >
            </v-form>
             </v-dialog>
         </v-row> -->
         <!-- <div class="react">
            <div class="likes">
               <v-tooltip top>
                  <template
                     v-slot:activator="{
                        on,
                        attrs,
                     }"
                  >
                     <v-btn v-bind="attrs" v-on="on"
                        ><v-icon color="green" @click="userLike(message)"
                           >mdi-thumb-up</v-icon
                        >
                        <span>{{ countLike }} </span>
                     </v-btn>
                  </template>
                  <span>J'aime !</span>
               </v-tooltip>
            </div>
            <div class="dislikes">
               <v-tooltip top>
                  <template
                     v-slot:activator="{
                        on,
                        attrs,
                     }"
                  >
                     <v-btn v-bind="attrs" v-on="on"
                        ><v-icon color="red" @click="userDislike(message)"
                           >mdi-thumb-down</v-icon
                        >
                        <span>{{ countDislike }}</span>
                     </v-btn>
                  </template>
                  <span>J'aime pas !</span>
               </v-tooltip>
            </div>
         </div>
         <div class="comments" v-for="item in items" :key="item.id">
            <h5 v-if="item.messageId == message.id">
               {{ item.pseudo }}
            </h5>
            <p v-if="item.messageId == message.id">
               {{ item.comment }}
            </p>

            <small v-if="item.messageId == message.id"
               >{{ item.createdAt }}
            </small>
            <v-btn
               v-if="item.messageId == message.id"
               color="primary"
               @click="edit = item.id"
            >
               edit
            </v-btn>
            <v-btn
               v-if="item.messageId == message.id"
               class="btn"
               @click="removeComment(item)"
               >X</v-btn
            >
            <form class="edit-comment" v-if="edit === item.id">
               <textarea v-model="item.comment"> </textarea>
               <v-btn
                  type="button"
                  class="btn btn-success"
                  color="succes"
                  data-dismiss="modal"
                  @click="modifyComment(item)"
                  >Save Changes</v-btn
               >
               <v-btn
                  type="button"
                  class="btn btn-default"
                  color="primary"
                  data-dismiss="modal"
                  v-if="edit === item.id"
                  @click="edit = !edit"
                  >Close</v-btn
               >
            </form>
         </div>

         <div class="comment">
            <textarea v-model="comment" placeholder="add comment"></textarea>
            <v-btn
               class="btn btn-primary btn-block"
               @click="postComment(message)"
               >add comment</v-btn
            >
         </div> -->
      <!-- </div> -->
      
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
//import Dialog from "./dialog"
import axios from "axios";
export default {
   // components : { Dialog },
   data() {
      return {
         dialog: false,
         hasSaved: false,
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
         countLike: "",
         countDislike: "",
         options: [{ edit: "Edit" }, { delete: "Delete" }],
         icons: [
            "mdi-facebook",
            "mdi-twitter",
            "mdi-linkedin",
            "mdi-instagram",
         ],
      };
   },
   created() {
      axios
         .get("http://localhost:3000/message/messages", {
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
      axios
         .get("http://localhost:3000/user/", {
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
         axios
            .delete("http://localhost:3000/message/messages/" + message.id, {
               headers: {
                  Authorization: "Bearer " + localStorage.token,
               },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
         window.location.reload();
      },
      modify(message) {
         axios
            .put(
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

      userLike(message) {
         axios.post(
               "http://localhost:3000/react",
               {
                  messageId: message.id,
                  likeType: this.like,
               },
               {
                  headers: {
                     Authorization: "Bearer " + localStorage.token,
                  },
               }
            )
            .then(response =>
                console.log(response.data))
            // .then(
            //    (response) => (
            //       (this.countLike = response.data.count),
            //       (this.key = response.data.messageId),
            //       (this.reacts = response.data.reacts)
            //    )
            // )
            .catch((err) => console.log(err));
      },
      userDislike(message) {
         axios
            .post(
               "http://localhost:3000/react",
               {
                  messageId: message.id,
                  likeType: this.disLike,
               },
               {
                  headers: {
                     Authorization: "Bearer " + localStorage.token,
                  },
               }
            )
            //.then(res => console.log(res) )
            .then(
               (res) => (
                  (this.countDislike = res.data.count),
                  (this.key = res.data.messageId),
                  (this.reacts = res.data.reacts)
               )
            )
            .catch((err) => console.log(err));
      },
      //   getLike(message){
      // // compture de reaction
      // console.log(message.id)
      //         axios.get('http://localhost:3000/react/like/' + message.id ,
      //          { headers : {Authorization: "Bearer " + localStorage.token} }
      //                          )
      //                 .then( response => console.log(response))
      //                         //(this.countLike = response.data) )

      //                 .catch(err =>console.log(err))
      //                // window.location.reload()
      //},
      // compture de reaction
      //  getDisLike(message){
      //       axios.get('http://localhost:3000/react/dislike/' + message.id ,
      //      { headers : {Authorization: "Bearer " + localStorage.token} }
      //                      )
      //             .then( res => //console.log(res))
      //             (this.countDislike = res.data))

      //             .catch(err =>console.log(err))
      //  window.location.reload()
      //  }
   },
};
</script>
<style scoped>
.v-main{
   background-color: blueviolet;
}
.react {
   display: flex;
}

</style>
