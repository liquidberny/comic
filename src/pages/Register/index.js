import {
    StyledFormArea,
    StyledFormButton,
    StyledTitle,
    colors,
    ButtonGroup,
} from "../../components/Styles";
import '../../styles/register.css'

//Formik
import { Formik, Form } from "formik";
import { TextInput } from "../../components/FormLib";
import * as Yup from "yup";

//Icons
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { makeStyles } from '@material-ui/styles';
import theme from '../../styles';
//Audio-Spinner
import { Rings } from "react-loader-spinner";

//Auth&redux
import { signupUser } from '../../auth/actions/userActions';

import { useHistory } from "react-router-dom";

//snackbar
import { useSnackbar } from 'notistack';

const Signup = () => {
    const navigate = useHistory();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <div className={classes.container}>
            <StyledFormArea>

                <StyledTitle
                    color={colors.dark1}
                    size={30}>
                    Sign up
                </StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        repeatPassword: "",
                        name: ""
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        password: Yup.string()
                            .min(8, "Password is too short")
                            .max(30, "Password is too long")
                            .required("Required"),
                        name: Yup.string().required("Required"),
                        repeatPassword: Yup.string()
                            .required("Required")
                            .oneOf([Yup.ref("password")], "Password must match"),
                    })}
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        console.log(values);
                        signupUser(values, navigate,
                            setFieldError, setSubmitting, enqueueSnackbar);
                    }}>
                    {({ isSubmitting }) => (
                        <Form>

                            <TextInput
                                className='inputname'
                                name="name"
                                type="text"
                                label="User Name"
                                placeholder="John Johnson"
                                icon={<FiUser />}
                            />

                            <TextInput
                                className='inputmail'
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="email@somethin.com"
                                icon={<FiMail />}
                            />

                            <TextInput
                                className='inputpass'
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="*******"
                                icon={<FiLock />}
                            />
                            <TextInput
                                className='inputpass2'
                                name="repeatPassword"
                                type="password"
                                label="Repeat Password"
                                placeholder="*******"
                                icon={<FiLock />}
                            />
                            <ButtonGroup>
                                {!isSubmitting &&
                                    <StyledFormButton
                                        className='registerbutton'
                                        type="submit">
                                        Sign Un
                                    </StyledFormButton>}
                                {isSubmitting && (
                                    <Rings
                                        color={colors.theme}
                                        height={100}
                                        width={100}
                                        radius="6"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel="rings-loading"
                                    />
                                )}
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>

            </StyledFormArea>
            <br></br>
        </div>
    )
};
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
export default Signup;
