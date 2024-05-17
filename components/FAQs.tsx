import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import styled from 'styled-components';


type FAQs = {
  theme: string;
  faqs: {
    question: string
    answer: string
  }[]
}

export default function FAQs({ theme = "light", faqs }: FAQs) {
  return (
    <FAQContainer theme={theme}>
      <Accordion type="single" collapsible>
        {
          faqs.map((faq, index) => {
            const { question, answer } = faq;
            return (
              <div key={index}>
                <AccordionItem value={index.toString()} className='max-w-4xl mx-auto py-8'>
                  <AccordionTrigger className='text-left'>
                    <p className='text-xl pr-8'>{question}</p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p dangerouslySetInnerHTML={{ __html: answer }} />
                  </AccordionContent>
                </AccordionItem>
              </div>
            )
          })
        }
      </Accordion>
    </FAQContainer>
  )
}

const FAQContainer = styled.div<{theme:string;}>`
  color: ${props => props.theme === "dark" ? "white" : "black"};

  & p {
    color: ${props => props.theme === "dark" ? "white" : "black"};
  }
`
