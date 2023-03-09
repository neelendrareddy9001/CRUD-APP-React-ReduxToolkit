import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from './Redux/features/PostSlice';
import Spinner from './Spinner';

const CreatePost = () => {

    const [values, setValues] = useState({title : "", body : ""});
    const [showPost, setShowPost] = useState(false);
    const [loading, post] = useState(state => ({...state.app}))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {title, body} = values;

    //handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({values}));
        setValues({title : "", body : ""});
        setShowPost(true);
    };
 
    //Show Create post Function
    const showCreatePost = () => {
        return (
            <>
                {loading ? (
                    <Spinner/>
                ) : (
                    <div className='card mt-4'>
                        <div className='card-body'>
                            <h5 className='card-title'>{post[0].title}</h5>
                            <p className='card-text'>{post[0].body}</p>
                        </div>
                    </div>
                )}
            </>
        );
    };
    
  return (
        <div className='container mt-4'>
            <h1 className='text-center bg-dark text-white p-2'>Create Post</h1>
            <form action="">
                <div className='mb-3 mt-4'>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setValues({...values, title : e.target.value})}
                        placeholder='Enter Post Title'
                        className='form-control'
                        id='exampleInputEmail'
                        aria-describedby='emailHelp'
                    />
                </div>
                <div className='form-floating'>
                    <textarea
                        className='form-control'
                        value={body}
                        onChange={(e) => setValues({...values, body: e.target.value})}
                        placeholder='add post description'
                        id="floatingTextarea"
                        // defaultValue={" "}
                    />
                    <label htmlFor='floatingTextarea'>add post description</label>
                </div>
                <div className='mt-4 d-flex align-items-end justify-content-end'>
                    <button className='btn btn-primary' onClick={() => navigate('/')}>Go Home</button>
                    <button className='btn btn-warning ms-4' type='submit' onClick={handleSubmit}>Submit</button>
                </div>
            </form>
            <div className='mt-4'>{showPost && <div>{showCreatePost()}</div>}</div>
        </div>
  )
}

export default CreatePost
