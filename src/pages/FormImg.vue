<template>
  <q-btn 
    @click="logout"
    round 
    style=" display: block; margin: 0 0 0 auto; background: #EB1F0E; color: white" 
    icon="logout" />
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <div>
        <h2 class="text-h6 text-uppercase q-my-none text-weight-regular" 
          style="margin-bottom: 15px;">Upload</h2>
      </div>
      <q-form
        @submit.prevent="uploadImg"
        @reset="onReset"
        class="q-gutter-md"
      >
        <input
          type="file"
          accept="image/*"
          @change="clickImg($event)"
        />

        <div>
          <q-btn label="Submit" value="uploadImg" type="submit" color="primary"/>
        </div>
      </q-form>

      <!-- See Pictures -->
      <q-btn @click="viewPictures" 
        label="View Pictures" 
        type="submit"
        color="secondary" 
        style="margin-top: 15px; margin-bottom: 60px;"/>
        <div class=" items-center" v-for="img in pictures" v-bind:key="img">
          <div class="row" style="margin-bottom: 20px;">
            <div class="col">
              <img style=" width: 100px; height: 100px; margin-right: 20px;" :src="img" alt="">
            </div>
            <div class="col">
              <q-btn @click="downloadImg" label="Download" type="submit" color="primary"  />
              <q-btn  style="margin-top: 15px;" label="Delete" type="submit" color="red" />
            </div>
          </div>            
        </div>
    </div>
  </q-page>
  
    
        <!-- IMG -->
        
        
</template>

<script>
import { defineComponent } from 'vue';
import { getAuth, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL  } from "firebase/storage";

const storage = getStorage();
const auth = getAuth();

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'FormImg',
  data () {
    return {
      pictures: [],
      img: null,
      //imgList: false
    }
  },
  methods: {
    clickImg(e) {
      this.img = e.target.files[0];
      console.log(this.img);
    },
    async uploadImg() {
      //Create the refence
      const refImg = ref( storage, 'pictures/'+ this.img.name);
      const metadata = { contentType: 'img/jpeg'};
      //refImg.put(this.img, metadata).then( (e) => console.log(e) );
      const uploadTask = await uploadBytes(refImg, this.img , metadata);
    },
    async viewPictures() {
      const listRef = ref(storage, 'pictures');
      await listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((pictures) => {
        });
        res.items.forEach((img) => {
          console.log(img);
          // All the items under listRef.
          getDownloadURL(ref(storage, img._location.path_))
          .then( (url) => {
            this.pictures.push(url);
          });
          
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
    },
    logout () {
      signOut(auth).then(() => {
        // Sign-out successful.
        this.$router.push({ path: '/login' })
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
    },
    async downloadImg() {
      const listRef = ref(storage, 'pictures');
      await listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((pictures) => {
        });
        res.items.forEach((img) => {
          console.log(img);
          // All the items under listRef.
          getDownloadURL(ref(storage, img._location.path_))
          .then( (url) => {
            // `url` is the download URL for 'images/stars.jpg'
            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
              const blob = xhr.response;
              console.log(blob);
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
          });
          
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
    }
  }
}) 
</script>
