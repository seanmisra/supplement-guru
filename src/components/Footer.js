import React from 'react'
import WarningIcon from '@mui/icons-material/Warning';

const Footer = () => {
    return(
        <div class='footer-wrapper'>
            <WarningIcon id="medical-disclaimer-icon"></WarningIcon> 
            <span id="medical-disclaimer">Please consult with a qualified physician before taking any supplements</span>
        </div>
    )
}

export default Footer;