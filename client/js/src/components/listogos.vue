<template>
  <div> 
    
    <!-- Logo Frame -->
    
      <!-- <div class="d-flex flex-row justify-content-around" border> -->
        <div class="card d-flex margin-l" style="width: 400px; height: 200px;">
          <img :src="mylogos.picture" class="img-thumbnail" alt="..." style="width: 150px; height: 150px"/>
          <div class="card-body" style="padding: 5px">
            <small>
              <a
                href="#"
                class="card-text" @click="checkDetail"
              >
                Didn't know
                this logo?
            <button class="btn btn-primary" @click="deleteLogos(mylogos._id)" v-if="checkUser(mylogos.user_id)">delete</button>
              </a>
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
        url: `http://localhost:3000/logos`,
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
    }
  }
};
</script>

<style>
</style>
