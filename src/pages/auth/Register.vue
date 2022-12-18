<template>
    <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        <div class="col-6 text-h6 ellipsis flex justify-center">
          <h2 class="text-h6 text-uppercase q-my-none text-weight-regular">Your Welcome</h2>
        </div>
      </q-card-section>

      <q-card-actions vertical>
        <q-form class="q-gutter-md" @submit.prevent="register">        
            <!-- Name -->
            <q-input 
                outlined  
                v-model="name"
                label="Name"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your name']" 
                style="margin-bottom: auto; width: 300px;"/>
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
                :rules="[ val => val && val.length > 0 || 'Please type your password', 
                val => val && val.length > 6 || 'You need 6 characters for create a password']" 
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
                class="btn-fixed-width"
                style="color: goldenrod; margin-bottom: 10px;" 
                label="Register" 
                type="submit"
                rounded/>
        </q-form>  
      
      </q-card-actions>

    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

//console.log(auth);
export default defineComponent ({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Register',
    data () {
        return {
            name:  '',
            email: '',
            password: '',
            error: false
        }
    },
    methods: {
        async register() {
            if ( this.password.length < 6 ) {
                this.error= true
            }
            await createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                this.$router.push({ path: '/uploads' })
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
        }
    }
})

</script>