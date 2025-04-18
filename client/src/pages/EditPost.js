import React, { useEffect } from 'react'
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];

const EditPost = () => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [cover,setCover] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        // fetch('http://localhost:4000/post/'+id).then(response => {
        fetch('https://my-blog-ll68.onrender.com/post/'+id).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
        })
    },[])
    if (redirect) {
        return <Navigate to={"/"} />;
    }

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("id",id);
        if(files?.[0]){
            data.set("file", files?.[0]);
        }

        const response = await fetch('http://localhost:4000/post/',{
            method:'PUT',
            body:data,
            credentials:'include',
        });
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={`/post/${id}`}/>
    }
    return (
        <div>
            <h3>Here you can edit your Post.</h3>
            <form onSubmit={updatePost}>
                <input
                    type="title"
                    placeholder={"Title"}
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                />

                <input
                    type="summary"
                    placeholder={"Summary"}
                    value={summary}
                    onChange={(ev) => setSummary(ev.target.value)}
                />

                <input
                    type="file"
                    onChange={(ev) => setFiles(ev.target.files)}
                />

                <ReactQuill
                    value={content}
                    modules={modules}
                    formats={formats}
                    onChange={(newValue) => setContent(newValue)}
                />

                <button style={{ marginTop: "5px" }}>Update Post</button>
            </form>
        </div>
    );
};

export default EditPost