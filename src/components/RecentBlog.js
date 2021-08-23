import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../client.js";
import * as moment from 'moment';
import imageUrlBuilder from "@sanity/image-url";
import blogService from './../services/blogService';
import '../assets/css/style.css';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function RecentBlog() {

  const [recentPost, setRecentPost] = useState([]);
  useEffect(() => {
      new blogService().getAllPostData().then(data => {
        setRecentPost(data)
        const daysAgo = []
        for(var j=0; j<=6; j++) {
          daysAgo[j] = moment().subtract(j, 'days').format("YYYY-MM-DD")
        }
        const recentDate = [];
          if(data){
            for(var i = 0; i <= data.length; i++){
              if(data[i]){
                if(daysAgo.includes(moment(data[i].publishedAt).format("YYYY-MM-DD")))
                {
                  recentDate.push(data[i]);
                }
              }
            }
          }
          setRecentPost(recentDate);
      });
  }, []);

  return (
    <>
    <div className="container mt-4" data-aos="clogo" data-aos-once="true" data-aos-duration="1200">
      <div className="row pb-5">
        <h2>Recent Blog</h2>
        {recentPost && recentPost.map((post, index) => (
          <div className="col-sm-4" key={index}>
              <div className="entry2">
                <div className="recentblogimg">
                    <Link to={"/blog-detail/" + post.slug.current}><img src={post.mainImage.asset.url} alt="Image1" className="img-fluid rounded"/></Link>
                </div>
                <div className="excerpt">
                  <span className="post-category ">{post.categories}</span>
                  <h2><Link className="text-capitalize" to={"/blog-detail/" + post.slug.current}>{post.title}</Link></h2>
                  <div className="post-meta align-items-center text-left clearfix">
                    <figure className="author-figure"><img src={urlFor(post.authorImage).url()} alt="Image2" className="img-fluid"/></figure>
                    <span className="d-inline-block mt-1">By <Link to="#">{post.name}</Link></span>
                    <span>&nbsp;-&nbsp; {moment(post.publishedAt).format('MMM DD, YYYY')}</span>
                  </div>
                </div>
                <div className="col-12 col-md-8 whats-next">
                <BlockContent blocks={post.body} 
                projectId={sanityClient.clientConfig.projectId}
                dataset={sanityClient.clientConfig.dataset}/>
              </div>
              </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default RecentBlog;
