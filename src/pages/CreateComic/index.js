// import { makeStyles } from '@material-ui/styles';
// import theme from '../../styles/';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSnackbar } from 'notistack';
// import { sendComic } from '../../auth/actions/comicActions';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import { connect } from "react-redux";
import '../../styles/create.css';

const CreateComic = ({ user }) => {
    // const classes = useStyles();
    const [name, setName] = useState("");
    const [editorial, setEditorial] = useState("Marvel");
    const [genre, setGenre] = useState("Action");
    const [character, setCharacter] = useState("");
    const [list, setList] = useState([]);
    const [year, setYear] = useState(0);
    const [description, setDescription] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const [image, setImage] = useState("");
    const [imagen, setImagen] = useState("");

    const navigate = useHistory();
    // const action = `${process.env.REACT_APP_API_URL}/comic/create/`;

    const addCharacter = () => {
        setList([...list, character])
        console.log(list)
    }
    // const validation = () => {
    //     if (name === '' || list === [] || description === '' || year === 0 || image === '') {
    //         enqueueSnackbar('You have empty fields', {
    //             variant: 'error'
    //         });
    //     } else if (imagen.type === "image/jpeg" || imagen.type === "image/png") {
    //         if (imagen.size >= 40000000000) {
    //             enqueueSnackbar('Your image size is too big', {
    //                 variant: 'error'
    //             });
    //         } else {
    //             enqueueSnackbar('You have createated a comic succesfully', {
    //                 variant: 'success'
    //             });
    //             document.insert.submit();
    //             navigate.push("/");


    //         }


    //     }
    // }
    const submmit = () => {
        if (name === '' || list === [] || description === '' || year === 0 || image === '') {
            enqueueSnackbar('You have empty fields', {
                variant: 'error'
            });
        } else if (imagen.type === "image/jpeg" || imagen.type === "image/png") {
            if (imagen.size >= 400000) {
                enqueueSnackbar('Your image size is too big', {
                    variant: 'error'
                });
            } else {
                const formData = new FormData();
                formData.append("name", name)
                formData.append("editorial", editorial)
                formData.append("genre", genre)
                formData.append("characters", list)
                formData.append("year", year)
                formData.append("description", description)
                formData.append("image", imagen)

                Axios({
                    method: "post",
                    url: `${process.env.REACT_APP_API_URL}/comic/create/`,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                }).then(function (response) {
                    console.log(response);
                    navigate.push("/");
                    enqueueSnackbar('Your comic post is created', {
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
                // sendComic(
                //     {
                //         name,
                //         editorial,
                //         genre,
                //         list,
                //         year,
                //         description,
                //         imagen,
                //     },
                //     navigate,
                //     enqueueSnackbar
                // )
            }
        } else {
            enqueueSnackbar('Image format not permited', {
                variant: 'error'
            });
        }

    }
    return (
        <div>
            <br />
            {user.name ?
                <form>
                    <h1> Create Comic Post </h1>

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
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Editorial"
                                onChange={e => {
                                    setEditorial(e.target.value)
                                }}
                            >
                                <Form.Select aria-label="Editorial">
                                    <option value="Marvel">Marvel</option>
                                    <option value="DC">DC</option>
                                    <option value="Dark horse">Dark Horse</option>
                                    <option value="Image">Image Comics</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Genre"
                            >
                                <Form.Select aria-label="Genre"
                                    onChange={e => {
                                        setGenre(e.target.value)
                                    }}
                                >
                                    <option value="Action">Action</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Horror">Horror</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <br />
                    <Row className="g-2">
                        <Col md>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    className="formcharacter"
                                    placeholder="Characters"
                                    aria-label="Add comic character appearance"
                                    aria-describedby="basic-addon2"
                                    onChange={e => setCharacter(e.target.value)}
                                />
                                <Button className="buttoncharacter" variant="outline-secondary" id="button-addon2"
                                    onClick={() => addCharacter()}
                                >
                                    Add Character
                                </Button>
                            </InputGroup>
                            <Form.Text muted>
                                {list.map(char => {
                                    return (
                                        <li>
                                            {char}
                                        </li>
                                    )
                                })}
                            </Form.Text>
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
                        <Row className="g-2">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className='uploadtext'>Upload an image</Form.Label>
                                <Form.Control type="file"
                                    onChange={(event) => {
                                        setImage(event.target.value);
                                        setImagen(event.target.files[0]);
                                    }} />
                            </Form.Group>
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

export default connect(mapStateToProps)(CreateComic);

// export default CreateComic;