//styles
import { makeStyles } from '@material-ui/styles';
import theme from '../../styles';
import '../../styles/details.css'

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const ComicDetails = ({ user }) => {
    const { comicId } = useParams();
    const [comic, setComic] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useHistory();

    const classes = useStyles();
    // useEffect(() => {

    //     setComic(getComicbyId(comicId))

    // }, [comicId]);
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/comic/read/${comicId}`
        ).then((response) => {
            setComic(response.data)
        }).catch((err) => {
            enqueueSnackbar(`Error loading comic details`, {
                variant: 'error'
            });
        });

    }, [enqueueSnackbar, comicId])
    const approve = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/comic/approve/`, {
            id: comic._id
        })
        window.location.reload();
    }
    const deleteComic = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/comic/delete/${comic._id}`).then(
            enqueueSnackbar(`Comic deleted`, {
                variant: 'success'
            })
        )
        navigate.push("/")
    }
    const updateComic = () => {
        navigate.push(`/updateComic/${comic._id}`)
    }
    return (
        <div className={classes.container} >
            <img
                className='comic-image'
                src={`${process.env.REACT_APP_API_URL}/comic/image/${comic._id}`}
                alt={"imagen de comic"}
            />
            <div className='details'>
                <p className='text-details'>
                    <strong>Title:</strong> {comic.name}
                </p>
                <p className='text-details'>
                    <strong>Editorial:</strong>{" "}
                    {comic.editorial}
                </p>
                <p className='text-details'>
                    <strong>Genres:</strong>{" "}
                    {comic.genre}
                </p>
                <p className='text-details'>
                    <strong>Year:</strong>{" "}
                    {comic.year}
                </p>
                <p className='text-details'>
                    <strong>Characters:</strong>{" "}
                    {comic.characters}
                </p>
                <p className='text-details'>
                    <strong>Description:</strong> {comic.description}
                </p>
                {user.admin ? <>
                    {comic.approved ? null : <button
                        className='butonapprove'
                        onClick={() => approve()}
                    >
                        Approve
                    </button>}
                    &nbsp;
                    <button className='butondelete'
                        onClick={() => deleteComic()}
                    >
                        Delete
                    </button>
                    &nbsp;
                    <button className='butonupdate'
                        onClick={() => updateComic()}
                    >
                        Update
                    </button>
                </> : null}



            </div>
        </div >
    )

}

const useStyles = makeStyles({
    container: {
        ...theme.globals.containerYFlexstart,
        paddingTop: '20px',
        paddingBottom: "20px",

        [theme.breakpoints.down('sm')]: {
            padding: '20px 30px',
        },
    }
});
const mapStateToProps = ({ session }) => ({
    user: session.user
})

export default connect(mapStateToProps)(ComicDetails);
// export default ComicDetails;