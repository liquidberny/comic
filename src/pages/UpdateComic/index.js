import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Axios from 'axios';
import { useSnackbar } from 'notistack';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
const UpdateComic = ({ user }) => {
    const { comicId } = useParams();
    const [comic, setComic] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useHistory();


    const [name, setName] = useState(comic.name);
    const [year, setYear] = useState(comic.year);
    const [description, setDescription] = useState(comic.description);


    useEffect(() => {

        Axios.get(`${process.env.REACT_APP_API_URL}/comic/read/${comicId}`
        ).then((response) => {
            setComic(response.data)
        }).catch((err) => {
            enqueueSnackbar(`Error loading comic details`, {
                variant: 'error'
            });
        });

    }, [enqueueSnackbar, comicId])

    const updateComic = () => {

        if (name === ''  || description === '') {
            enqueueSnackbar(`You have empty fields`, {
                variant: 'error'
            });
        } else {
          Axios.put(`${process.env.REACT_APP_API_URL}/comic/updateComic`, {
            id: comicId,
            name: name,
            year: year,
            description: description,
          });
          navigate.push(`/comic/${comicId}`);
        }
    
      };
    return (
        <div>
            <br />
            {user.name ?
                <form>
                    <h3> Update Comic </h3>

                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Comic name">
                                <Form.Control type="text" placeholder={comic.name}
                                    onChange={e => {
                                        setName(e.target.value)
                                    }} />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Year of comic publication">
                                <Form.Control type="number" placeholder="20XX"
                                    onChange={e => {
                                        setYear(e.target.value)
                                    }} />
                            </FloatingLabel>

                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Comic Description">
                                <Form.Control type="text" placeholder="Comic description"
                                    onChange={e => {
                                        setDescription(e.target.value)
                                    }} />
                            </FloatingLabel>
                        </Col>

                    </Row>
                    <br />
                    <Row className="g-2">

                        <Button variant="outline-secondary"
                            onClick={() => updateComic()}
                        // type="submit"
                        >
                            Update comic post
                        </Button>


                    </Row>
                </form>
                : <h3>You need to log in</h3>}

            <br />
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
})

export default connect(mapStateToProps)(UpdateComic);