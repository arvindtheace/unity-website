import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ExternalLinkIcon } from '@radix-ui/react-icons';

type Partner = {
    address: string
    contactHeader: string
    email: string
    lightLogo: string
    darkLogo: string
    personName: string
    personTitle: string
    title: string
    type: string
    links?: [{ title: string, url: string }]
}



type LendingPartnerProps = {
    data: Partner;
}

export default function DigitalLendingPartners() {

    const [lendingPartners, setLendingPartners] = useState<LendingPartnerProps[]>([]);
    useEffect(() => {
        fetch(`https://cdn.builder.io/api/v3/content/digital-lending-partners?apiKey=21b44296fc364461abc19d1d5fa5792d`)
            .then(res => res.json())
            .then((data: any) => {
                if (data.results) {
                    setLendingPartners(data.results)
                    console.log(data.results);
                }
            })
    }, [])
    if (lendingPartners.length == 0) {
        return <div />
    }
    return (
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center gap-5">
            {
                lendingPartners.map(({ data }) => {
                    return (
                        <Dialog key={data.title}>
                            <DialogTrigger>
                                <Button className="flex flex-col items-center justify-center">
                                    <img src={data.lightLogo} />
                                </Button>
                            </DialogTrigger>
                            {/* bg-[#FBFAF4]  grid md:grid-cols-5*/}
                            <DialogContent className='bg-white overflow-auto' style={{ maxWidth: '840px', minHeight: '500px' }}>
                                <div className="grid grid-cols-1 sm:grid-cols-5 items-stretch">
                                    <div className="flex flex-col items-center justify-center p-6 bg-[#FBFAF4] sm:border sm:border-r-[1px] col-span-2 h-full w-full">
                                        <img src={data.darkLogo} />
                                        <div className='text-lg font-semibold mt-5'>{data.title}</div>
                                        <LenderType>{data.type}</LenderType>
                                    </div>
                                    <div className="flex flex-col col-span-3 items-stretch">
                                        <div className="h-full p-10">
                                            <div className="border rounded h-fit p-3 sm:p-6">
                                                <div className="text-lg font-semibold">{data.contactHeader}</div>
                                                <Title>{data.personTitle}:</Title>
                                                <Value>{data.personName}</Value>
                                                <Title>Address:</Title>
                                                <Value>{data.address}</Value>
                                                <Title>Email ID:</Title>
                                                <Value>{data.email}</Value>
                                            </div>
                                            {data.links ? data.links.map((link) => {
                                                return (
                                                    <div className="border rounded p-4 mt-5 flex flex-row justify-between items-center">
                                                        {link.title} <a href={link.url}><ExternalLinkIcon/></a>
                                                    </div>
                                                )
                                            }) : <div/> }
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    );
                })}
        </div>
    );
}

const Button = styled.div`
    padding: 32px 32px 40px 32px;
    background: #323232;
    border-radius: 16px;
    width: 364px;
    max-width: 90vw;
    margin: 0 auto;
    height:140px;
    cursor: pointer;
`

const LenderType = styled.div`
    color: #000;
    opacity: 0.8;
    font-size: 14px;
`

const Title = styled.div`
    color: #000;
    opacity: 0.62;
    font-size: 13px;
    margin-top: 15px;
    margin-bottom: 5px;
`

const Value = styled.div`
    color: #000;
    font-size: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
`


