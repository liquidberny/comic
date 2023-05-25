import axios from "axios"
//snackbar
export const getComics = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/comic/read`
    ).then((response) => {
        console.log(response.data)
        const data = response.data;
        return data;
    }).catch((err) => {
        // enqueueSnackbar(`Error loading comics`, {
        //     variant: 'error'
        // });
        console.log(err)
    });
}

export const getComicbyId = async (id) =>{
    await axios.get(`${process.env.REACT_APP_API_URL}/comic/read/${id}`
    ).then((response) => {
        console.log(response.data)
        const data = response.data;
        return data;
    }).catch((err) => {
        // enqueueSnackbar(`Error loading comics`, {
        //     variant: 'error'
        // });
        console.log(err)
    });
}
 
export const sendComic = (comic, history, enqueueSnackbar) => {
    console.log("from sendComic: ",comic)

    axios.post(`${process.env.REACT_APP_API_URL}/comic/create/`,
        comic,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            const { data } = response;
            console.log("data:" ,data);
            if (data.status === "FAILED") {
                const { message } = data;
                enqueueSnackbar(message, {
                    variant: 'error'
                });
                //Checking for specific error
                if (message.includes("name")) {
                    enqueueSnackbar('You have an error in comic name', {
                        variant: 'error'
                    });
                } else if (message.includes("year")) {
                    enqueueSnackbar('You have an error in year', {
                        variant: 'error'
                    });
                } else if (message.includes("characters")) {
                    enqueueSnackbar('You have an error in your characters', {
                        variant: 'error'
                    });
                }



            } else if (data.status === "SUCCESS") {
                //Login user after succesful signup
                // const {email, password} = credentials;
                enqueueSnackbar('You comic post is created', {
                    variant: 'success'
                });
                history.push("/")

            }
        }).catch(err => console.error(err))
};