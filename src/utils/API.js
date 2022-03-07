import axios from "axios";

export default {
 
  getAllBooks: function () {
    return axios.get("/api/books")
  },
 
  saveBook: function (id) {
    return axios.post(`/api/books/${id}`)
  },

  searchBooks: function (search) {
    return axios.get(`/search/${search}`)
  },
 
  deleteAllUnsaved: function() {
    return axios.delete("/api/books")
  }, 

  deleteBook: function(id) {
    return axios.delete(`/api/books/${id}`)
  } 
}