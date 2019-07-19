<template>
  <div>
    <img :src="mylogos.picture" alt="logo" />
    <p>{{mylogos.name}}</p>
    <p>{{mylogos.description}}</p>
    <button @click="deleteLogos(mylogos._id)" v-if="checkUser(mylogos.user_id)">delete</button>
    <!-- Logo Frame -->
    <div class="col-sm-10 border" style="padding: 30px;">
      <h1 style="text-align: center">Welcome, name</h1>
      <p style="text-align: center; padding-bottom: 20px">
        <img src="./img/wavy-line.png" />
      </p>
      <div class="d-flex flex-row justify-content-around">
        <div class="card d-flex;" style="width: 15rem;">
          <img
            :src="mylogos.picture"
            class="img-thumbnail"
            alt="..."
          />
          <div class="card-body" style="padding: 5px">
            <small>
              <a
                href="#"
                class="card-text"
                data-toggle="modal"
                data-target="#exampleModalScrollable"
              >
                Didn't know
                this logo?
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Logo-->
    <div
      class="modal fade"
      id="exampleModalScrollable"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalScrollableTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content" style="text-align: justify; padding: 5px; height: 400px;">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalScrollableTitle">{{mylogos.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{mylogos.description}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "each-logo",
  props: ["mylogos"],
  created() {
    console.log("lislogos");
    console.log(this.mylogos);
  },
  methods: {
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

          let index = this.mylogos.indexOf(data);
          this.mylogos.splice(index, 1);
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
