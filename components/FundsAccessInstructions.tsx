//@ts-nocheck
import React, { useState } from "react";
import styled from 'styled-components';
import { AppStore, PlayStore } from './icons';


// const [appStoreColor, setAppStoreColor] = useState('red');


const FundsAccessInstructions = () => {
    // const [playStoreColor, setPlayStoreColor] = useState("#ffffffb3");
    return (
        <UnorderedList>
            <li>
                <strong>Download Unity Mobile App and Update Profile</strong>
                <br />
                <br />
                <font color="#404040">
                    Download the app and Update the profile with PMC A/C details<br />,ID Proof (PAN, Aadhar, etc.)<br /></font>
                <br />
                <br />
                <div className="flex items-center space-x-6">
                    <div className="flex-col">
                        <a href="">
                            <AppStore />
                        </a>
                        <a href="" 
                        // onMouseEnter={() => setPlayStoreColor('#ffffd9')} 
                        // onMouseLeave={() => setPlayStoreColor('#ffffb3')}
                        >
                            <PlayStore 
                            // fill={playStoreColor} 
                            />
                        </a>
                    </div>
                    <img id='barcode'
                        src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100"
                        alt=""
                        title="HELLO"
                        width="50"
                        height="50" />
                </div>
            </li>
            <li>
                <strong>View Balance by 2nd half of Mar* 2022</strong>
                <br />
                <br />
                <font color="#404040">
                    View your account balance in PMC Account
                </font>
            </li>
            <li>
                <strong>Access funds (Up to ₹5 Lakhs)</strong>
                <br />
                <br />
                <font color="#404040">
                    To be confirmed. After approval of claim and receiving money
                    from DICGC.
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
        background: rgb(235, 233, 228);
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
        background: rgba(0, 0, 0, 0.125);
        border-radius: 50%;
    }
    &:last-child::after{
        content:none;
       }
}
`

export default FundsAccessInstructions;