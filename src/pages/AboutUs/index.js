import { makeStyles } from '@material-ui/styles';
import theme from '../../styles';
import about from '../../assets/images/about.jpg'
import '../../styles/about.css'

const About = ({ user }) => {
    const classes = useStyles();

    return (
        <div className={classes.container} >

            <div >
                <p >
                    <h1>About us</h1>
                </p>
                <img
                    className='imagenabout'
                    src={about} alt="imagen1"
                />

                <div className="space">
                    <p className='textabout'>
                        Este es un proyecto realizado para la materia de Practica de Desarrollo 2{" "}
                    </p>

                    <p className='textabout'>
                        <strong>Equipo:</strong>{" "}
                        Anaya Arias •
                        Dueñas Salman •
                        Castillo Morales •
                        Mazon Flores •
                        Urguijo Mungarro
                    </p>
                    <p className='textabout'>
                        <strong>2022</strong>{" "}
                    </p>

                </div>
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

export default About;