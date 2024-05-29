//@ts-nocheck
import React, { useState } from "react";
import styled from 'styled-components';
import { AppStore, PlayStore } from './icons';


// const [appStoreColor, setAppStoreColor] = useState('red');


const WhatsappHowToRegister = () => {
    // const [playStoreColor, setPlayStoreColor] = useState("#ffffffb3");
    return (
        <UnorderedList>
            <li>
                <strong>Add Unity Smart Banking to your Contacts</strong>
                <br />
                <br />
                <font color="##000000CC">
                Click or copy our official Whatsapp number +91 7669300225<br /></font>
                <br />
                <br />
            </li>
            <li>
                <strong>Send a “Hi” via your registered mobile no. on Whatsapp</strong>
                <br />
                <br />
                <font color="##000000CC">
                    We’ll start registration for Unity Smart Banking
                </font>
            </li>
            <li>
                <strong>Select if you’re Existing or a New Customer</strong>
                <br />
                <br />
                <font color="##000000CC">
                    Once you select your account type we’ll send you the OTP to verify
                </font>
            </li>
            <li>
                <strong>OTP will be sent to your registered number</strong>
                <br />
                <br />
                <font color="#000000CC">
                    Enter the OTP to complete the one time registration process 
                </font>
            </li>
        </UnorderedList>
    )
}


const UnorderedList = styled.ul`
  list-style: none;
   & li {
    position: relative;
    padding-left: 50px;
    padding-bottom: 32px;

    &::before {
        z-index: 2;
        content: "";
        position: absolute;
        top: 12px;
        left: 0px;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background: #EFD591;
        border-radius: 50%;
   }

    &::after {
        z-index: 1;
        content: "";
        position: absolute;
        width: 1px;
        height: 100%;
        top: 12px;
        left: 8px;
        border-left: 1px dotted #00000033;
    }
    &:last-child::after{
        content:none;
    }
}
`

export default WhatsappHowToRegister;