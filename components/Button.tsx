import { ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import PopupForm from './PopupForm'
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer"
import useWindowWidth from '@/hooks/useWindowWidth'
import InterestRatesPopup from './InterestRatesPopup'

type ButtonProps = {
  text: string
  type: "primary" | "secondary" | "tertiary" | "link",
  action?: "link" | "form" | "submit",
  popup?: "interestRates" | "contact",
  withResume?: boolean,
  href: string,
  icon?: "arrow-right",
  width?: "full" | "fit",
  linkType?: "internal" | "external"
}

export default function Button({ text, type, action = "link", popup = "contact", withResume, href, linkType = "internal", icon, width = "fit" }: ButtonProps) {
  const windowWidth = useWindowWidth()
  const containerRef = React.useRef(null)

  return (
    <>
      {
        action === "link" && (
          <>
          {
            linkType === "external" ? (
              <a href={href} target="_blank" rel="noreferrer">
                <ButtonContainer type={type} className={`flex items-center justify-center ${width === "full" ? 'w-full' : 'w-fit'}`}>
                  {text}
                  {
                    icon &&
                    <span className='ml-2'>
                      {
                        icon === "arrow-right" && <ArrowRight size={16} />
                      }
                    </span>
                  }
                </ButtonContainer>
              </a>
            ) : (
              <Link href={href}>
                <ButtonContainer type={type} className={`flex items-center justify-center ${width === "full" ? 'w-full' : 'w-fit'}`}>
                  {text}
                  {
                    icon &&
                    <span className='ml-2'>
                      {
                        icon === "arrow-right" && <ArrowRight size={16} />
                      }
                    </span>
                  }
                </ButtonContainer>
              </Link>
            )
          }
          </>
        )
      }
      {
        action === "form" && (
          <div ref={containerRef}>
            {
              windowWidth > 768 ? (
                <Dialog>
                  <DialogTrigger>
                    <ButtonContainer type={type} className={`flex items-center justify-center ${width === "full" ? 'w-full' : 'w-fit'}`}>
                      {text}
                      {
                        icon &&
                        <span className='ml-2'>
                          {
                            icon === "arrow-right" && <ArrowRight size={16} />
                          }
                        </span>
                      }
                    </ButtonContainer>
                  </DialogTrigger>
                  <DialogContent className='bg-white p-12 max-h-[90%] overflow-auto' style={{maxWidth:'840px'}}>
                    { popup === "contact" && <PopupForm withResume={withResume} /> }
                    { popup === "interestRates" && <InterestRatesPopup /> }
                  </DialogContent>
                </Dialog>
              ) : (
                <Drawer>
                  <DrawerTrigger>
                    <ButtonContainer type={type} className={`flex items-center justify-center ${width === "full" ? 'w-full' : 'w-fit'}`}>
                      {text}
                      {
                        icon &&
                        <span className='ml-2'>
                          {
                            icon === "arrow-right" && <ArrowRight size={16} />
                          }
                        </span>
                      }
                    </ButtonContainer>
                  </DrawerTrigger>
                  <DrawerPortal>
                    <DrawerContent className='bg-white p-6 max-h-[96%]' style={{maxWidth:'860px'}}>
                    <DialogClose className='absolute top-4 right-4'>
                      <X/>
                    </DialogClose>
                      <div className='overflow-auto'>
                        { popup === "contact" && <PopupForm withResume={withResume} /> }
                        { popup === "interestRates" && <InterestRatesPopup /> }
                      </div>
                    </DrawerContent>
                  </DrawerPortal>
                </Drawer>
              )
            }
          </div>
        )
      }
      {
        action === "submit" && (
          <>
            <ButtonContainer type={type} className={`flex items-center justify-center ${width === "full" ? 'w-full' : 'w-fit'}`}>
              {text}
              {
                icon &&
                <span className='ml-2'>
                  {
                    icon === "arrow-right" && <ArrowRight size={16} />
                  }
                </span>
              }
            </ButtonContainer>
          </>
        )
      }
    </>
  )
}

const ButtonContainer = styled.button<{ type: string }>`
  padding: ${props => props.type === "link" ? "4px" : "12px 19px 12px 20px"};
  background: ${props => (
    props.type === 'primary' && '#FFCD1E' ||
    props.type === 'secondary' && '#FFF' ||
    props.type === 'tertiary' && '#F3F3F3' ||
    props.type === 'link' && 'transparent' 
  )};
  border: ${props => (
    props.type === 'secondary' && '1px solid rgba(0, 0, 0, 0.16)'
  )};
  border-radius: 99px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(96%);
  }

  &:active {
    translate: 0 3px;
  }
`