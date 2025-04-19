import React, { useEffect, useState } from "react";
import Post from "../Post";

const IndexPage = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("https://my-blog-ll68.onrender.com/post").then((response) => {
            response.json().then((posts) => {
                setPosts(posts);
                // console.log(posts);
            });
        });
    }, []);
    return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
};

export default IndexPage;
