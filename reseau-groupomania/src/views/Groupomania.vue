<template>
   <v-container>
      <v-toolbar>
         <v-toolbar-title
            >Welcome
            <RouterLink to="Profile">{{ user.pseudo }}</RouterLink>
         </v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn color="white" value="message">
            <span><img src=''>GROUPOMANIA HOME</span>
         </v-btn>
         <v-spacer></v-spacer>
         <v-toolbar-items>
            <v-btn>
               <RouterLink to="Users">Users</RouterLink>
            </v-btn>
            <v-btn @click="logout()">Logout</v-btn>
         </v-toolbar-items>
      </v-toolbar>

      <form
         enctype="multipart/form-data"
         class="add-new-post"
         name="add-new-post"
         ref="MyForm"
      >
         <div class="form-group">
            <label for="title"> title : </label>
            <input
               type="text"
               class="form-control"
               name="title"
               v-model="title"
            />
         </div>
         <div class="form-group">
            <label for="post-content">
               content :
               <textarea name="content" rows="1" v-model="content"></textarea
            ></label>
         </div>
         <input type="file" ref="file" @change="selectFile"/>
         <button class="btn btn-primary btn-block" @click="post()">
            post
         </button>
      </form>

      <div class="message" v-for="message in messages" :key="message.id">
         <div class="text-right">
            <v-menu offset-y v-if="message.userId == user.id || user.isAdmin == true">
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
                     <v-list-item-title v-if="message.userId == user.id" @click="edit = message.id">{{
                        option.edit
                     }}</v-list-item-title
                     ><br />
                     <v-list-item-title v-if="message.userId == user.id || user.isAdmin == true" @click="remove(message)">{{
                        option.delete
                     }}</v-list-item-title>
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
         <p>{{ message.id }}</p>

         <form
            class="add-new-post"
            name="add-new-post"
            v-if="edit === message.id"
         >
            <div class="form-group">
               <label for="title">
                  title :
               </label>
               <input
                  type="text"
                  class="form-control"
                  name="title"
                  v-model="message.title"
               />
            </div>
            <div class="form-group">
               <label for="post-content">
                  content :
                  <textarea
                     name="content"
                     rows="1"
                     v-model="message.content"
                  ></textarea
               ></label>
            </div>

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
         </form>

         <div class="react">
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
                        <span :v-for="message.id">{{ countLike }}</span>
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
                        <span :v-for="message.id">{{ countDislike }}</span>
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

            <div class="comment"  >
            <textarea v-model="comment" placeholder="add comment"></textarea>
            <v-btn
               class="btn btn-primary btn-block"
               @click="postComment(message)"
               >add comment</v-btn
            >
         </div>

         
      </div>
   </v-container>
</template>

<script>
import axios from "axios";
export default {
   data() {
      return {
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
         countLike: "",
         countDislike: "",
         options: [{ edit: "Edit" }, { delete: "Delete" }],
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
               response 
            ) => //console.log(response)
              (this.messages = response.data.Messages)
         )
         .catch((err) => console.log(err));
      //get user
      axios.get("http://localhost:3000/user/", {
            headers: {
               Authorization: "Bearer " + localStorage.token,
            },
         })
         .then(response =>// console.log(response))
          (this.user = response.data.user))
         .catch((err) => console.log(err));
   },
   mounted() {
      axios.get("http://localhost:3000/comment/comments", {
            headers: {
               Authorization: "Bearer " + localStorage.token,
            },
         })
         .then(
            (
               response //  console.log(response))
            ) => (this.items = response.data.Comments)
         )
         .catch((err) => console.log(err));
   },
    
   methods: {
      logout() {
         localStorage.clear();
         window.location.reload();
      },
      getOne(message) {
         axios.get("http://localhost:3000/message/messages/" + message.id, {
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
      selectFile() {
         //console.log(this.$refs.file.files[0])
         this.file = this.$refs.file.files[0];
         // console.log(this.file.name)
      },
      post() {
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
            .catch(err => console.log(err));
      },

      remove(message) {
         axios.delete("http://localhost:3000/message/messages/" + message.id, {
               headers: {
                  Authorization: "Bearer " + localStorage.token,
               },
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
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
            .then(res => console.log(res))
            .catch(err => console.log(err));
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
         axios.delete("http://localhost:3000/comment/comments/" + item.id, {
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
            //.then(response => console.log(response.data.totale))
            .then((response) => (this.countLike = response.data.totale))
            .catch((err) => console.log(err));
      },
      userDislike(message) {
         axios.post(
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
            //.then(res => console.log(res.data.totale) )
            .then((res) => (this.countDislike = res.data.totale))
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
.react {
   display: flex;
}
.add-new-post {
   text-align: center;
   background-color: aqua;
}
.message {
   padding: 10px;
  border-radius: 5px black 50%;
   background-color: darkturquoise;
}
.image {
   width: 30px;
}
.comments {
  border-radius: 5px black 50%;
   padding-left: 10px;
}
</style>
