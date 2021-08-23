import sanityClient from "../client.js";

class blogService {
  
  async getAllPostData() {
    return sanityClient
      .fetch(
        `*[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        slug,
        mainImage{
            asset->{
            _id,
            url
          }
        },
        body,
        "name": author->name,
        publishedAt,
        "category": category->title,
        "authorImage": author->image,
        'comments': *[_type == "comment" && post._ref == ^._id]{
            _id, 
            name, 
            email, 
            comment, 
            _createdAt
        }
      }`)
      .then((data) => { return data })
      .catch(console.error);
  }

  async getBlogBySlug(slug) {
    if(slug !== undefined){
    return sanityClient
      .fetch(
        `*[_type == "post" && slug.current == $slug]{
          _id,
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
        "name": author->name,
        publishedAt,
        "category": category->title,
        'comments': *[_type == "comment" && post._ref == ^._id]{
            _id, 
            name, 
            email, 
            comment, 
            _createdAt
        }
       }`,
        { slug }
      )
      .then((data) => { return data[0] })
      .catch(console.error);
    }
  }

  async getBlogTagsBySlug(slug) {
    if(slug !== undefined){
    return sanityClient
      .fetch(
        `*[_type == "post" && slug.current == $slug]{
          _id,
        tags,
       }`,
        { slug }
      )
      .then((data) => { return data[0] })
      .catch(console.error);
    
    }
  }

}
export default blogService;
