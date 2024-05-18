import { ArrowLeft, ChevronRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";
import { LogoLarge } from "./icons";
import Button from "./Button";
import Link from "next/link";
import { builder } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function MobileNav({
  style,
}: {
  style: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [page, setPage] = React.useState("main")
  const [save, setSave] = React.useState([])
  const [borrow, setBorrow] = React.useState([])
  const [insure, setInsure] = React.useState([])
  const [business, setBusiness] = React.useState([])
  const [company, setCompany] = React.useState([])
  const pathname = usePathname()

  React.useEffect(() => {
    builder
      .get('navigation', {
        query: {
          name: 'Save'
        },
      })
      .promise()
      .then((data: any) => {
        if (data) setSave(data.data.items);
        builder
          .get('navigation', {
            query: {
              name: 'Borrow'
            },
          })
          .promise()
          .then((data: any) => {
            if (data) setBorrow(data.data.items);
            builder
              .get('navigation', {
                query: {
                  name: 'Insure'
                },
              })
              .promise()
              .then((data: any) => {
                if (data) setInsure(data.data.items);
              });
          });
      });
  }, [])

  React.useEffect(() => {
    fetch("https://cdn.builder.io/api/v3/content/navigation?apiKey=21b44296fc364461abc19d1d5fa5792d&query.name=Business&limit=1")
      .then(res => res.json())
      .then((data: any) => {
        if (data.results) setBusiness(data.results[0].data.items);
      })
  }, [])

  React.useEffect(() => {
    fetch("https://cdn.builder.io/api/v3/content/navigation?apiKey=21b44296fc364461abc19d1d5fa5792d&query.name=Company&limit=1")
      .then(res => res.json())
      .then((data: any) => {
        if (data.results) setCompany(data.results[0].data.items);
      })
  }, [])

  React.useEffect(() => {
    handleClose()
  }, [pathname])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setPage("main")
  }

  return (
    <>
      <a onClick={handleOpen}>
        <Menu style={{ color: style === "light" ? "#000" : "#FFF" }} />
      </a>
      <MobileMenuContainer isOpen={isOpen}>
        {
          page !== "main" &&
          <div className="absolute top-6 left-6">
            <a onClick={() => setPage("main")}>
              <ArrowLeft />
            </a>
          </div>
        }
        <div className="absolute top-6 right-6">
          <a onClick={handleClose}>
            <X />
          </a>
        </div>
        {
          page === "main" &&
          <div className="flex flex-col justify-center items-center gap-8 h-full">
            <div className="mb-8"><LogoLarge /></div>
            <NavItem onClick={() => setPage("personal")}>Personal<ChevronRight className="ml-1" /></NavItem>
            <NavItem onClick={() => setPage("business")}>Business<ChevronRight className="ml-1" /></NavItem>
            <NavItem href="/inclusive-banking">Inclusive</NavItem>
            <NavItem onClick={() => setPage("company")}>Company<ChevronRight className="ml-1" /></NavItem>
            <NavItem href="/contact-us">Contact Us</NavItem>
          </div>
        }
        {
          page === "personal" &&
          <div className="mt-16 p-8">
            <h5 className="mb-10">Personal banking</h5>
            <div className="flex flex-col gap-8">
              {save.map((item: any) => (
                <Link key={item.link} href={item.link} className="flex items-center space-x-6">
                  <div dangerouslySetInnerHTML={{__html:item.icon}} />
                  <p className="text-sm font-medium">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        }
        {
          page === "business" &&
          <div className="mt-16 p-8">
            <h5 className="mb-10">Business banking</h5>
            <div className="flex flex-col gap-8">
              {business.map((item:any) => (
                <Link key={item.link} href={item.link} className="flex items-center space-x-6">
                  <div dangerouslySetInnerHTML={{__html:item.icon}} />
                  <p className="text-sm font-medium">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        }
        {
          page === "company" &&
          <div className="mt-16 p-8">
            <h5 className="mb-10">Company</h5>
            <div className="flex flex-col gap-8">
              {company.map((item: any) => (
                <Link key={item.link} href={item.link} className="flex items-center space-x-6">
                  <div dangerouslySetInnerHTML={{__html:item.icon}} />
                  <p className="text-sm font-medium">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        }
      </MobileMenuContainer>
    </>
  )
}

const MobileMenuContainer = styled.div<{isOpen: boolean;}>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100svh;
  background: #fff;
  z-index: 100;
  transform: ${({isOpen}) => isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.15s ease-in-out;
  overflow: auto;
`

const NavItem = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #000;
`
