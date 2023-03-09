import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPost } from './Redux/features/PostSlice';
import Spinner from './Spinner';

const Posts = () => {
    const [id, setId] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, post, edit} = useSelector(state => ({...state.app}))

    //function
    const handleFetchData = (e) => {
        e.preventDefault();
        if(!id) {
            window.alert("Please Provide Post ID");
        } else {
            dispatch(getPost({id}));
            setId(" ");
        }
    }

    //Delete handler 
    const handleDelete = ({id}) => {
        dispatch(deletePost({id : post[0].id}));
        window.location.reload();
        window.alert("Post Deleted !");
    };


    //Create Handler 
    
  return (
    <>
        <div className='row d-flex align-items-center justify-content-center mt-4'>
            <div className='col-md-8'>
                <form action=''>
                <div className='mb-3'>
                    <label htmlFor='exampleInputEmail' className='form-label'>
                        Search By ID:
                    </label>
                    <input
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        type='number'
                        className="form-control"
                        id="exampleInputElement"
                        aria-describedby='emailHelp'
                    />
                </div>
                <button onClick={handleFetchData} type="submit" className="btn btn-primary mt-2">
                    Fetch Post
                </button>
                <button onClick={() => navigate('/createpost')} type="button" className="btn btn-warning ms-4 mt-2">
                    Create Post
                </button>
                </form>
            </div>
        </div>

        <div className='container'>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    {post.length > 0 &&(
                        <>
                        <div className='card mt-4'>
                        <div className='card-body'>
                            <h5 className='card-title'>{post[0].title}</h5>
                            <p className='card-text'>{post[0].body}</p>
                            <div className='d-flex justify-content-end align-items-end'>
                                <button className='btn btn-primary mt-3'>Edit</button>
                                <button className='btn btn-danger mx-3 mt-3' onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                        </div>
                        </>
                    )}
                </>
            )}
        </div>
    </>
  )
}

export default Posts