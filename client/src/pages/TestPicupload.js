import React, { useState } from 'react';
import Axios from 'axios';
import { Image } from 'cloudinary-react';

const TestPicUpload = () => {

    const [imageSelected, setImageSelected] = useState("");

    const uploadImage = (files) => {
        console.log(files[0]);

        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "yun8815z");

        Axios.post(
            "https://api.cloudinary.com/v1_1/du119g90a/image/upload", 
            formData
        ).then((response) => {
            console.log("response");
            console.log(response);
            console.log("public ID");
            console.log(response.data.public_id);
        });

    };

    return (
        <div>
            <input 
                type="file" 
                onChange={(event) => {
                setImageSelected(event.target.files[0]);
            }}/>

            <div>
                {imageSelected ? (
                    <img src={URL.createObjectURL(imageSelected)} className="imagepreview" alt=""></img>
                ) : (
                    <h1>No Image</h1>
                )}
            </div>

            {/* <img src={URL.createObjectURL(imageSelected)} className="imagepreview" alt=""></img> */}

            <button onClick={uploadImage}>
                Submit Images
            </button>

            {/* <Image cloudName="du119g90a" public_id="pwnexgvvtirluakwa9ee"/> */}
        </div>
    );
}

export default TestPicUpload;