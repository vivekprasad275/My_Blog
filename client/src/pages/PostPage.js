import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import {formatISO9075} from "date-fns";
import { UserContext } from '../UserContext';

const PostPage = () => {
    const [postInfo,setPostInfo] = useState(null);
    const {id} = useParams();
    const {userInfo} = useContext(UserContext);
    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        })
    },[])
    if(!postInfo) return '';
  return (
    <div className='post-page'>
    <h1>{postInfo.title}</h1>
    <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
    <div className='author'>by- @{postInfo.author.username}</div>
    {userInfo.id === postInfo.author._id && (
        <div className='edit-row'>
            <Link to={`/edit/${postInfo._id}`} className="edit-btn">Edit this post</Link>
        </div>
    )}
    <div className='image'>
        <img src={`http://localhost:4000/${postInfo.cover}`} />
    </div>
    {/* <p>{postInfo.content}</p> */}
    <div><h3 className='summary'>{postInfo.summary}</h3></div>
    <div className='para' dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
    </div>
  )
}

export default PostPage