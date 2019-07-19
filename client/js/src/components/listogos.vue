<template>
  <div> 
    
    <!-- Logo Frame -->
    
      <!-- <div class="d-flex flex-row justify-content-around" border> -->
        <div class="card d-flex margin-l" style="width: 300px; height: 200px;">
          <img :src="mylogos.picture" class="img-thumbnail" alt="..." style="width: 150px; height: 150px"/>
          <div class="card-body" style="padding: 5px">
            <small>
              <a
                href="#"
                class="card-text" @click="checkDetail"
              >
                Didn't know
                this logo?
            <button class="btn btn-default" @click="deleteLogos(mylogos._id)" v-if="checkUser(mylogos.user_id)"><i class="fa fa-lg fa-trash"></i></button>
              </a>
                <button class="btn btn-default" data-js="twitter-share" @click="twitter(mylogos.picture)"><i class="fa fa-lg fa-twitter"></i></button>
    <button class="btn btn-default" data-js="facebook-share" @click="facebook(mylogos.picture)"><i class="fa fa-lg fa-facebook"></i></button>
            </small>
          </div>
    <modaldetail v-if="isDetail" :mylogo="mylogos"/>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import modaldetail from './modal'
export default {
  name: "each-logo",
  props: ["mylogos"],
  data(){
    return {
      isDetail : false
    }
  },
  components: {
    modaldetail
  },
  created() {
    console.log("lislogos");
    console.log(this.mylogos);
  },
  methods: {
    checkDetail(){
      if(this.isDetail == false){
        this.isDetail = true
      }else{
        this.isDetail= false
      }
    },
    checkUser(id) {
      console.log("check");
      console.log(localStorage.getItem("user"));

      if (localStorage.getItem("user") == id) {
        return true;
      } else {
        return false;
      }
    },
    deleteLogos(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/logos/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data, "====");
          this.$emit('delete-logo',data)

        })
        .catch(err => {
          console.log(err);
        });
    },
    twitter(links){
      console.log('twitt');
      
      var twitterShare = document.querySelector('[data-js="twitter-share"]');

        twitterShare.onclick = function(e) {
        e.preventDefault();
        var twitterWindow = window.open('https://twitter.com/share?url=' + links, 'twitter-popup', 'height=350,width=600');
        if(twitterWindow.focus) { twitterWindow.focus(); }
            return false;
        }
    },
    facebook(links){
      var facebookShare = document.querySelector('[data-js="facebook-share"]');

        facebookShare.onclick = function(e) {
        e.preventDefault();
        var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + links, 'facebook-popup', 'height=350,width=600');
        if(facebookWindow.focus) { facebookWindow.focus(); }
            return false;
        }

    }
  }
};

</script>

<style>
</style>
