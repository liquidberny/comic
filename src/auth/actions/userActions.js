import axios from "axios"
import { sessionService } from "redux-react-session";

export const loginUser = (credentials, navigate, setFieldError, setSubmitting, enqueueSnackbar) => {
    // console.log(`${process.env.REACT_APP_API_URL}/signin/`)
    // `${process.env.REACT_APP_API_URL}/signin/`
    axios.post(`${process.env.REACT_APP_API_URL}/user/signin/`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then((response) => {
        const { data } = response;
        if (data.status === 'FAILED') {
            const { message } = data;

            if (message.includes("credentials")) {
                setFieldError("email", message);
                setFieldError("password", message);
            } else if (message.includes("password")) {
                setFieldError("password", message);
            }
        } else if (data.status === "SUCCESS") {
            const userData = data.data[0];
            console.log("user data :", userData);
            console.log(userData.name);
            const token = userData._id;

            enqueueSnackbar(`Welcome ${userData.name}`, {
                variant: 'success'
            });
            sessionService.saveSession(token).then(() => {
                sessionService.saveUser(userData).then(() => {
                    navigate.push("/")

                }).catch(err => console.error(err))
            }).catch(err => console.error(err))
        }

        //Complete submission
        setSubmitting(false);

    }).catch(err => console.error(err))
}

export const signupUser = (credentials, history, setFieldError, setSubmitting, enqueueSnackbar) => {
    console.log("user actions")

    axios.post(`${process.env.REACT_APP_API_URL}/user/signup/`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            const { data } = response;

            if (data.status === "FAILED") {
                const { message } = data;

                //Checking for specific error
                if (message.includes("name")) {
                    setFieldError("name", message);
                } else if (message.includes("email")) {
                    setFieldError("email", message);
                } else if (message.includes("password")) {
                    setFieldError("password", message);
                }

                //Complete submission
                setSubmitting(false);

            } else if (data.status === "SUCCESS") {
                //Login user after succesful signup
                // const {email, password} = credentials;
                enqueueSnackbar('You were successfully registered, now please log in.', {
                    variant: 'success'
                });
                history.push("/")

            }
        }).catch(err => console.error(err))
};

export const logoutUser = (history) => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    history.push('/');

};