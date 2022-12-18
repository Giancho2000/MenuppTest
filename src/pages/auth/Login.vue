<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        <div class="col text-h6 ellipsis flex justify-center">
          <h2 class="text-h6 text-uppercase q-my-none text-weight-regular">Login</h2>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-form class="q-gutter-md" @submit.prevent="singIn">

          <!-- Email -->
          <q-input 
              outlined 
              v-model="email"
              label="Email"
              lazy-rules
              :rules="[  (val, rules) => rules.email(val) || 'Please enter a valid email address' ]" 
              style="margin-bottom: auto;"/>
          <!-- Password -->
          <q-input 
            outlined 
            v-model="password" 
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your password']" 
            filled :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <!-- button -->
          <q-btn 
            outline 
            style="color: goldenrod; margin-bottom: 10px;" 
            label="Login" 
            type="submit"
            rounded/>
          <!-- Links -->
          <div class="text-center q-mt-sm q-gutter-lg">
            <router-link class="text-black" to="/register">New user</router-link>
            <router-link class="text-black" to="">Lost my password</router-link>
          </div>
        </q-form>
      </q-card-actions>

    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data () {
    return {
        email:'',
        password:''
    }
  },
  methods: {
    async singIn (){
      console.log(auth);
      await signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in 
        this.$router.push({ path: '/uploads' })
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    }
  }
})
</script>
