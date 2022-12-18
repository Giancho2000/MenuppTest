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
              <img tag="download" id="myimg" style=" width: 100px; height: 100px; margin-right: 20px;" :src="img" alt="">
            </div>
            <div class="col">
              
              <q-btn @click="downloadImg(img)" color="primary" ><a :href="img">descarga</a></q-btn>
              <q-btn  @click="deleteImg(img)"  style="margin-top: 15px;" label="Delete" type="submit" color="red" />
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
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";

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
          //console.log(img);
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
    downloadImg( img ) {
      const imgRef = ref(storage, img);
      console.log(imgRef);
      getDownloadURL( imgRef )
      .then(async(url) => {
        console.log( url);
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = async (event) => {
          console.log('Entro a descargar  ' + xhr);
          const blob = await xhr.response;
        };
        await xhr.open('GET', url);
        await xhr.send();         
      })
      .catch((error) => {
        console.log(error);
      })
    },
    deleteImg(img) {
      const imgRef = ref(storage, img);
      deleteObject(imgRef).then(() => {
        // File deleted successfully
        window.deleteImg = this.deleteImg;
        console.log('Se elimino bien');
      }).catch((error) => {
        // Uh-oh, an error occurred!C
        console.log(error);
      })
    },
    
  }
}) 
</script>
