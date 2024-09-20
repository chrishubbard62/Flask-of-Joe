import { useState } from "react";
import { useDispatch } from "react-redux";
import { createImage } from '../../redux/coffee'
// import { useHistory } from "react-router-dom";


const UploadPicture = () => {
    // const history = useHistory(); // so that you can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        // formData.image = image
        // console.log("🚀 ~ handleSubmit ~ formData:", formData)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        await dispatch(createImage(formData));
        // history.push("/images");
    }

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
        </form>
    )
}
export default UploadPicture;
