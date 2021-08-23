import sanityClient from "../client.js";

class commentService {
  
  async getAllComments(slug) {
    if(slug !== undefined){
      return sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug] | order(_createdAt desc) {
            'comments': *[_type == "comment" && post._ref == ^._id]{
                _id, 
                name, 
                email, 
                comment, 
                _createdAt
            }
        }`,{ slug }).then((data) => { return data[0] }).catch(console.error);
    }
  }

  async createComments(formData) {
    if(formData){
      return sanityClient.create({
        _type: 'comment',
        post: {
          _type: 'reference',
          _ref: formData._id,
        },
       name: formData.name,
       email: formData.email,
       comment: formData.comment,
      }).then((res) => { return "Success" }).catch((err) => { return "Error" });
    }
  }

}
export default commentService;
