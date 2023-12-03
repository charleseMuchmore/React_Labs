import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import PostsContext from '../context/posts';
import UserContext from '../context/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';

function EditPost() {
    const { categories, editPostById, createPost } = useContext(PostsContext);
    const { user } = useContext(UserContext);
    const location = useLocation();
    const [image, setImage] = useState();
    const [content, setValue] =  useState("");

    const renderedCategories = categories.map((cat) => {
        return <option value={cat.name} key={cat.name}>{cat.name}</option> ;
    })

    const  modules  = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

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

      const onEditSubmit = (data) => {
        const newData = {
            "title": data.title,
            "userId": user.id,
            "datetime": data.date,
            "category": data.category,
            "content": content,
            "image": data.image[0]
        }
        editPostById(location.state.id, newData);
      }
      
      const onNewSubmit = (data) => {
        console.log(data);
        const newData = {
            "title": data.title,
            "userId": user.id,
            "datetime": data.date,
            "category": data.category,
            "content": content,
            "image": data.image[0]
        }
        createPost(newData);
      };

    return (
        <>
        {location.state === null && location.pathname === "/posts/new" && 
        <div>
            <h1>Add Post</h1>
            <form onSubmit={handleSubmit(onNewSubmit)}>
                Post Image: 
                <div>
                    <input 
                    type="file"
                    onChange={handleFileChange}
                    {...register("image", {
                        required: true
                    })}/>
                    {errors.image && <p className="errorMsg">Please choose an image</p>}
                </div><br/>

                Date: 
                <input 
                type="date" 
                {...register("date", {
                    required: true
                })}/><br/>

                Title: 
                <div>
                    <input 
                    type="text"
                    {...register("title", {
                            required: true,
                            maxLength: 100
                        })}/>
                    {errors.title && <p className="errorMsg">Title too long</p>}
                </div>
                <br/>

                <label htmlFor="categories">Choose a Category </label> 
                <select 
                name="categories" 
                id="categories"
                {...register("category", {
                    required: true
                })}> 
                    {renderedCategories}
                </select><br/>

                <ReactQuill  
                modules={modules} 
                onChange={setValue}
                theme="snow" 
                placeholder="Content goes here..."  
                // {...register("content", {
                //     required: true
                // })}
                /><br/>

                <input type="submit"/>
            </form>
        </div>
        }
        {location.state !== null && 
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit(onEditSubmit)}>
                Post Image: 
                <img src={image} alt="post"></img>
                <input 
                type="file"
                // defaultValue={location.state.image}
                onChange={handleFileChange}
                {...register("image", {
                    required: true
                })}
                /><br/>

                Date: 
                <input 
                type="date" 
                defaultValue={location.state.date}
                {...register("date", {
                    required: true
                })}/><br/>

                Title: 
                <div>
                    <input 
                    type="text"
                    defaultValue={location.state.title}
                    {...register("title", {
                        required: true,
                        maxLength: 100
                    })}/>
                    {errors.title && <p className="errorMsg">Title too long</p>}
                </div>
                <br/>

                <div>
                    <label htmlFor="categories">Choose a Category </label> 
                    <select 
                    name="categories" 
                    id="categories"
                    defaultValue={location.state.category}
                    {...register("category", {
                        required: true,
                        // pattern: {
                        //     value: /[^--]/,
                        //     message: "Please choose a category"
                        // }
                    })}> 
                        {/* <option value="--">--</option>  */}
                        {renderedCategories}
                    </select>
                    {errors.category && <p className="errorMsg">Please choose a Category</p>}
                </div>
                <br/>

                <div>
                    <ReactQuill  
                    modules={modules} 
                    onChange={setValue}
                    theme="snow" 
                    placeholder="Content goes here..."  
                    defaultValue={location.state.content}
                    // {...register("content", {
                    //     required: true,
                    // })}
                    />
                </div>
                <br/>

                <input type="submit"/>
            </form>
        </div>}
        </>)
}

export default EditPost;