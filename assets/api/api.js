import axios from "axios";

function aa() {
    this.$axios.get(`/users`)
        .then(function(response) {
            this.aa = response;
        })
        .catch(function(error) {
            console.log(error);
        });
}