import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './EditUserProfile.css';
import UserContext from '../context/user';

function EditUserProfile() {
    const { editUserById } = useContext(UserContext);
    const location = useLocation();
    const [image, setImage] = useState(location.state.image);

    function convertImageToBase64(imgUrl, callback) {
        const image = new Image();
        image.crossOrigin='anonymous';
        image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = image.naturalHeight;
        canvas.width = image.naturalWidth;
        ctx.drawImage(image, 0, 0);
        const dataUrl = canvas.toDataURL();
        callback && callback(dataUrl)
        }
        image.src = imgUrl;
    }

    const handleFileChange = (event) => {
        const file = URL.createObjectURL(event.target.files[0]);
        convertImageToBase64(file, removeTypeAndSave)
    }

    const removeTypeAndSave = (base64Image) => {
        const updatedImage = base64Image.replace(
        "data:image/png;base64,", "" );
        setImage(updatedImage);
    }
               
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        const newData = {
            "name": data.userName,
            "userid": data.userId,
            "email": data.email,
            "bio": data.bio,
            "password": "password",
            "image": data.image[0]
        }
        editUserById(location.state.id, newData);
      };

    return (<>
        <h1>Welcome, {location.state.name}!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div name="picture">
                {image && 
                <img src={image} alt="profile"></img>}
                {!image &&
                <img src={location.state.image} alt="profile"></img>}

                <div><input 
                type="file" 
                onChange={handleFileChange}
                {...register("image", {
                    required: true
                })}
                />
                </div>
            </div>
            <div name="theRest">

                <label>Name</label>
                <div><input 
                    defaultValue={location.state.name} 
                    {...register("userName", {
                        required: true
                    })}/>
                </div>

                <label>User Id</label>
                <div><input 
                    defaultValue={location.state.userid} 
                    {...register("userId", {
                        required: "userId is required.",
                        pattern: {
                          value: /^[a-z0-9]+$/,
                          message: "userId is not valid."
                        }})}/>
                    {errors.userId && <p className="errorMsg">{errors.userId.message}</p>}
                </div>

                <label>Email</label>
                <div><input 
                    defaultValue={location.state.email}
                    {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                          message: "Email is not valid."
                        }})}/>
                    {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                </div>

                <label>Bio</label>
                <div><input 
                    defaultValue={location.state.bio} 
                    {...register("bio", {
                        required: true,
                        maxLength: 100
                        })}/>
                    {errors.bio && <p className="errorMsg">Bio too long</p>}
                </div>
            </div>
            <div name="submit">
                <button type="submit">Save</button>
            </div>
        </form>
    </>)
}

export default EditUserProfile;