import {
    Card,
    Col,
    Row,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from "axios"
import '../../styles/cardsection.css'
import { Link } from 'react-router-dom';

const CardSection = () => {

    const [comics, setComics] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/comic/readLatest`
        ).then((response) => {
            setComics(response.data)
        }).catch((err) => {
            // enqueueSnackbar(`Error loading comics`, {
            //     variant: 'error'
            // });
        });

    }, [enqueueSnackbar])
    return (
        <>
            <h1>Recent Comics</h1>
            <hr className='hrcards'></hr>
            <Row xs={1} md={4} className="g-4">
                {comics.map((val) => (
                    <Col>
                        <Link to={"/comic/" + val._id} style={{ color: 'inherit', textDecoration: 'none' }}>

                            <Card className='homecard'>
                                <Card.Img
                                    className='imagecard'
                                    variant="top"
                                    src={`${process.env.REACT_APP_API_URL}/comic/image/${val._id}`}
                                // width="473"
                                // height="160"
                                />
                                <Card.Body>
                                    <Card.Title className='cardtitle'>{val.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
}
export default CardSection;