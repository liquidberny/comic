import React, { useState, useEffect } from 'react';
import {
    Row,
    Container,
    Col,
    Card,
    Tab,
    Tabs
} from 'react-bootstrap';
import '../../styles/footer.css'
import { useSnackbar } from 'notistack';
import axios from "axios"

const Footer = () => {
    const [marvel, setMarvel] = useState([]);
    const [dc, setDC] = useState([]);
    const [image, setImage] = useState([]);
    const [key, setKey] = useState('popular');
    const { enqueueSnackbar } = useSnackbar();
    const [recomendations, setRecomendation] = useState([]);
    const [message, setMessage] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/comic/readby/Marvel`
        ).then((response) => {
            setMarvel(response.data)
        }).catch((err) => {
            enqueueSnackbar(`Error loading comics`, {
                variant: 'error'
            });
        });
        axios.get(`${process.env.REACT_APP_API_URL}/comic/readby/DC`
        ).then((response) => {
            setDC(response.data)
        }).catch((err) => {
            enqueueSnackbar(`Error loading comics`, {
                variant: 'error'
            });
        });
        axios.get(`${process.env.REACT_APP_API_URL}/comic/readby/Image`
        ).then((response) => {
            setImage(response.data)
        }).catch((err) => {
            enqueueSnackbar(`Error loading comics`, {
                variant: 'error'
            });
        });
        axios.get(`${process.env.REACT_APP_API_URL}/recomendation/readLatest`
        ).then((response) => {
            setRecomendation(response.data)
        }).catch((err) => {
            enqueueSnackbar(`Error loading comics`, {
                variant: 'error'
            });
        });

        axios.get(`${process.env.REACT_APP_API_URL}/message/readLatest`
        ).then((response) => {
            setMessage(response.data)
        }).catch((err) => {
            enqueueSnackbar(`Error loading comics`, {
                variant: 'error'
            });
        });

    }, [enqueueSnackbar])
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Card className='card-category' style={{ minHeight: '200px' }}>
                        <Card.Body>
                            <Card.Title>Important message</Card.Title>
                            <Card.Text>
                                {message.map((val) => {
                                    return (
                                        <p>
                                            An admin says: {val.content}
                                        </p>
                                    )
                                })}
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='card-recomended' style={{ minHeight: '200px' }}>
                        <Card.Body>
                            <Card.Title>Recomendations for today</Card.Title>
                            <Card.Text>
                                {recomendations.map((val) => {
                                    return (
                                        <p>
                                            Comic: {val.name}
                                        </p>
                                    )
                                })}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} border="dark">
                    <Tabs
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                        <Tab eventKey="marvel" title="Marvel posts" >
                            {marvel.map((val) => {
                                return (<a className='comic' href={`/comic/${val._id}`}>{val.name}&ensp;</a>)
                            })}


                        </Tab>
                        <Tab eventKey="dc" title="DC post">
                            {dc.map((val) => {
                                return (<a className='comic' href={`/comic/${val._id}`}>{val.name}&ensp;</a>)
                            })}
                        </Tab>
                        <Tab eventKey="comments" title="Image Comics Posts" >
                            {image.map((val) => {
                                return (<a className='comic' href={`/comic/${val._id}`}>{val.name}&ensp;</a>)
                            })}
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <br />
            <Row>

                <hr className='hrfooter' />
                <Col md={4} className='footer'>
                    <a className='home' href="/">Home</a>
                    <a> | </a>
                    <a className='about' href="/">About Us</a>
                    <a> | </a>
                    <a className='contact' href="/">Contact Us</a>
                </Col>
                {/* <Col md={2}>A cerca de nosotros</Col>
                <Col md={1}>Contactanos</Col> */}
                <Col className='copyt' md={{ span: 4, offset: 4 }} align="right">
                    <a className='copy' href="/">Copyright</a>
                </Col>
            </Row>
        </Container>
    );
}
export default Footer;