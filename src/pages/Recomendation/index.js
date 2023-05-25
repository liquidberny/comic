// import { makeStyles } from '@material-ui/styles';
// import theme from '../../styles/';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useSnackbar } from 'notistack';
// import { sendComic } from '../../auth/actions/comicActions';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import { connect } from "react-redux";
import '../../styles/create.css';

const CreateRecomendation = ({ user }) => {
    // const classes = useStyles();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { enqueueSnackbar } = useSnackbar();


    const navigate = useHistory();
    // const action = `${process.env.REACT_APP_API_URL}/comic/create/`;


    const submmit = () => {
        if (name === '' || description === '') {
            enqueueSnackbar('You have empty fields', {
                variant: 'error'
            });
        } else {
            const formData = new FormData();
            formData.append("name", name)
            formData.append("description", description)

            Axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/recomendation/create`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response) {
                console.log(response);
                navigate.push("/");
                enqueueSnackbar('Your comic recomendation is created', {
                    variant: 'success'
                }).then((result) => {
                    console.log(result);
                })
            }).catch(function (response) {
                console.log(response)
                // enqueueSnackbar('Error creating comic post', {
                //     variant: 'error'
                // });
            });
        }


    }
    return (
        <div>
            <br />
            {user.name ?
                <form>
                    <h1> Create Comic Recomendafdion </h1>

                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Comic name">
                                <Form.Control type="text" placeholder="Comic name"
                                    onChange={e => {
                                        setName(e.target.value)
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
                        <Row className="g-2">

                            <Button className='butonimage' variant="outline-secondary"
                                onClick={() => submmit()}
                            // type="submit"
                            >
                                Create comic post
                            </Button>
                        </Row>
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

export default connect(mapStateToProps)(CreateRecomendation);