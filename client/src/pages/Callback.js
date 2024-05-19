import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Callback() {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('code'); // assuming 'code' is the parameter name
    
        const sendToken = async () => {
            if (token) {
                try {
                    const response = await axios.post('/api/auth/twitter', { token });
                    console.log('Token sent successfully:', response.data);
                    // Save the response data here
                    // For example, if you want to save it to a state variable:
                    // setMyStateVariable(response.data);
                    console.log(response);
                } catch (error) {
                    console.error('Error sending token:', error);
                }
            }
        };
    
        sendToken();
    }, [location]);
    return(
        <>
            <h1 className="mt-9 text-center bold">auth was successful!</h1>
            <h1 className="text-center bold">loading tweet analysis now</h1>
        </>
    );
}

export default Callback