<template>
<v-main>
     <v-container >
          <img src="../assets/icon-left-font-monochrome-white.svg">
          <v-tabs grow right class="elevation-2" background-color="white">
               <v-tab to="/user/login">Login</v-tab>
               <v-tab to="/user/signup">Register</v-tab>
          </v-tabs>
          <v-form ref="form" lazy-validation>
               <v-container>
                    <v-col>
                         <v-row>
                              <v-text-field
                                   v-model="email"
                                   label="Adresse Email"
                                   class="ma-2"
                                   :rules="emailRules"
                                   required
                              ></v-text-field>
                         </v-row>
                         <v-row>
                              <v-text-field
                                   v-model="password"
                                   label="password"
                                   required
                                   :rules="passwordRules"
                                   type="password"
                              ></v-text-field>
                         </v-row>

                         <v-row justify="center">
                              <v-btn
                                   class="mt-4"
                                   outlined
                                   color="green"
                                   @click="submit()"
                                   >login</v-btn
                              >
                         </v-row>
                    </v-col>
               </v-container>
          </v-form>
     </v-container>
</v-main>
</template>

<script>
import Axios from "axios";
export default {
     data() {
          return {
               pseudo: "",
               pseudoRules: [(v) => v.length >= 3 || "Minimum 3 caracters "],
               email: "",
               emailRules: [
                    (v) => !!v || "merci de renseigner votre adresse email !",
                    (v) =>
                         /.+@.+\..+/.test(v) ||
                         "Merci de renseigner une adresse email valide",
               ],
               password: "",
               passwordRules: [
                    (v) => !!v || "Merci de renseigner votre mot de passe !",
               ],
          };
     },
     methods: {
          submit() {
               if (this.$refs.form.validate()) {
                    Axios.post("http://localhost:3000/user/login", {
                         email: this.email,
                         password: this.password,
                    })
                         .then((res) => {
                              let token = res.data.token;
                              localStorage.setItem("token", token);
                              this.$router.push("/user/groupomania");
                         })
                         .catch((err) => console.log(err));
               } else {
                    alert("veuillez renseigner tout les schamps ! ");
               }
          },
     },
};
</script>
<style scoped>
.v-main{
     background-color: blue;
}
</style>