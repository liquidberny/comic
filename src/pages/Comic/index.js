import {
    Card,
    Col,
    Row
} from 'react-bootstrap';

//styles
import { makeStyles } from '@material-ui/styles';
import '../../styles/comic.css'
import theme from '../../styles';
//import { getComics } from "../../auth/actions/comicActions"
import { useEffect, useState } from 'react';
//snackbar
import { useSnackbar } from 'notistack';
import axios from "axios"
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

const Comic = ({ user }) => {
    const classes = useStyles();
    const [comics, setComics] = useState([]);
    const { enqueueSnackbar } = useSnackbar();




    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/comic/read`
        ).then((response) => {
            setComics(response.data)
        }).catch((err) => {
            enqueueSnackbar(`Error loading comics`, {
                variant: 'error'
            });
        });

    }, [enqueueSnackbar])

    console.log(comics)
    return (

        <div className={classes.container}>

            {user.admin ? <h1>Unapproved posts</h1> : null}
            {user.admin ?

                <Row xs={1} md={3} className="g-4">

                    {comics.map((val, key) => {
                        if (!val.approved) {

                            return (
                                <Col>
                                    <Card className='comiccard'>
                                        <Link to={"/comic/" + val._id} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            <Card.Img className='imagecomic' variant="top"
                                                src={`${process.env.REACT_APP_API_URL}/comic/image/${val._id}`}
                                            />
                                            <Card.Body>
                                                <Card.Title className='comictitle'>{val.name}</Card.Title>
                                            </Card.Body>
                                        </Link>
                                    </Card>
                                </Col>
                            )
                        } else {
                            return (
                                console.log("comics no aprovados")
                            )
                        }
                    })}
                </Row>

                : null}

            <br />
            <h1>Posts</h1>
            <Row xs={1} md={4} className="g-4">
                {comics.map((val, key) => {
                    if (val.approved) {

                        return (
                            <Col>
                                <Card className='comiccard'>
                                    <Link to={"/comic/" + val._id} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <Card.Img className='imagecomic' variant="top" src={`${process.env.REACT_APP_API_URL}/comic/image/${val._id}`} />
                                        <Card.Body>
                                            <Card.Title className='comictitle'>{val.name}</Card.Title>
                                            {/* <Card.Text>
                                                {val.description}
                                            </Card.Text> */}
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        )
                    } else {
                        return (
                            console.log("comics aprovados")
                        )
                    }
                })}
            </Row>
            <br />
        </div>
    );
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

export default connect(mapStateToProps)(Comic);
// export default Comic;