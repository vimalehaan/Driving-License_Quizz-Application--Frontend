import React, { useState, useRef } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

import { storage } from "./firebase";

function FileUploadSample() {

    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const uploadImage = () => {
        if (!image) return;
        const imageRef = ref(storage, `questions/${image.name}`)
        uploadBytes(imageRef, image).then(() => {
            alert("Image Uploaded");
        })
        const imageUrl = getDownloadURL(imageRef);
    }

    return (
        <div>
            <input onChange={handleImageChange} type="file"  ref={fileInputRef} />

            <button onClick={uploadImage}> upload </button>
            
        </div>
    );
}

export default FileUploadSample;