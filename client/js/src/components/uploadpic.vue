<template>
  <div>
    <div>
      <div
        class="modal fade"
        id="addarticlemodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Upload logo</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addPost">
                <div class="custom-file">
                  <label class="custom-file-label text-truncate" for="inputGroupFile01">{{filename}}</label>
                  <input
                    type="file"
                    class="custom-file-input"
                    ref="myFiles"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    @change="previewFiles"
                    multiple
                  />
                </div>
                <br>
                <br>
                <button type="submit" class="btn btn-success" id="submitEdit">Post</button>
              </form>
            </div>
            <div class="d-flex justify-content-center" v-if="isLoading">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div v-if="this.error != ''" class="alert alert-danger" role="alert">{{error}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      picture: "",
      filename: "",
      error: "",
      message: "",
      isLoading: false
    };
  },
  methods: {
    previewFiles() {
      this.picture = this.$refs.myFiles.files[0];
      this.filename = this.$refs.myFiles.files[0].name;
    },
    addPost() {
      this.isLoading = true;
      console.log("add");
      console.log(this.picture);

      let newImage = new FormData();
      newImage.append("image", this.picture);

      console.log(newImage, "==");

      axios({
        method: "POST",
        url: `http://localhost:3000/logos`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: newImage
      })
        .then(({ data }) => {
          if (data.message !== undefined) {
            this.isLoading = false;
            this.message = data.message;
            Swal.fire({
              type: "error",
              text: `${this.message}`
            });
          } else {
            this.isLoading = false;
            Swal.fire({
              position: "top-end",
              type: "success",
              title: "Now you know the answer!",
              showConfirmButton: false,
              timer: 1500
            });

            this.$emit("add-image", data);
            console.log(data);
          }
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
          this.error = err.response.data.message;
        });
    }
  }
};
</script>

<style>
</style>
