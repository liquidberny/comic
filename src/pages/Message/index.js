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

const CreateMessage = ({ user }) => {
    // const classes = useStyles();
    const [content, setContent] = useState("");
    const { enqueueSnackbar } = useSnackbar();


    const navigate = useHistory();
    // const action = `${process.env.REACT_APP_API_URL}/comic/create/`;


    const submmit = () => {
        if (content === '') {
            enqueueSnackbar('You have empty fields', {
                variant: 'error'
            });
        } else {
            const formData = new FormData();
            formData.append("content", content)

            Axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/message/create`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response) {
                console.log(response);
                navigate.push("/");
                enqueueSnackbar('Your message is created', {
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
                    <h1> Create message </h1>

                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Content of message">
                                <Form.Control type="text" placeholder="This will appear on the footer of page"
                                    onChange={e => {
                                        setContent(e.target.value)
                                    }} />
                            </FloatingLabel>
                        </Col>


                        <Row className="g-2">

                            <Button className='butonimage' variant="outline-secondary"
                                onClick={() => submmit()}
                            // type="submit"
                            >
                                Send Message
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

export default connect(mapStateToProps)(CreateMessage);