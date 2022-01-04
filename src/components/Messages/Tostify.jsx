import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Tostify = () => {
    return(
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}


export default Tostify