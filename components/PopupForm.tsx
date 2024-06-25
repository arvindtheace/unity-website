import React, { useEffect, useState } from 'react';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import Button from './Button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { usePathname } from 'next/navigation';
import { cities } from '@/utils/cities';
import { states } from '@/utils/states';
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID_CONTACT = "INrMWErhT";
const FORMSPARK_FORM_ID_CAREERS = "J0UxzSlOO";


const topicValues = [
  {
    title: "Personal Banking",
    path: "/"
  },
  {
    title: "Business Banking",
    path: "/business"
  },
  {
    title: "Inclusive Banking",
    path: "/inclusive-banking"
  },
  {
    title: "Savings Account",
    path: "/personal/savings-account"
  },
  {
    title: "Fixed Deposits",
    path: "/personal/fixed-deposits"
  },
  {
    title: "Recurring Deposit",
    path: "/personal/recurring-deposit"
  },
  {
    title: "Lockers",
    path: "/personal/lockers"
  },
  {
    title: "Insurance",
    path: "/personal/insurance"
  },
  {
    title: "Personal Loans",
    path: "/personal/loans"
  },
  {
    title: "NRI Banking",
    path: "/personal/nri-banking"
  },
  {
    title: "Current Account",
    path: "/business/current-account"
  },
  {
    title: "MSME Loans",
    path: "/business/msme-loans"
  },
  {
    title: "Digital Lending",
    path: "/business/digital-lending"
  },
  {
    title: "Supply Chain Finance",
    path: "/business/supply-chain-finance"
  },
  {
    title: "Social Infra Finance",
    path: "/business/social-infra-finance"
  },
  {
    title: "Careers",
    path: "/careers"
  },
]

const PopupForm: React.FC<any> = ({ withResume }: { withResume: boolean }) => {
  const [pincodeError, setPincodeError] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [topicData, setTopicData] = useState('');
  const [cityData, setCityData] = useState('');
  const [stateData, setStateData] = useState('');
  const [formID, setFormID] = useState(FORMSPARK_FORM_ID_CONTACT);
  const pathname = usePathname()

  const [submitContact, submittingContact] = useFormspark({
    formId: formID,
  });


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    topic: '',
    message: '',
    termsAgreed: true
  });

  // in useEffect, setTopic to the title if current pathname matches the path
  useEffect(() => {
    const currentTopic = topicValues.find((topic) => topic.path === pathname);
    if (currentTopic) {
      setTopicData(currentTopic.title);
    }
  }, [pathname]);

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    console.log(type)
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleChangeTopic = (value:any) => {
    if(value === "Careers"){
      setTopicData(value)
      setFormID(FORMSPARK_FORM_ID_CAREERS)
    }else {
      setTopicData(value)
      setFormID(FORMSPARK_FORM_ID_CONTACT)
    }
    
    setFormData(prevData => ({
      ...prevData,
      topic: value
    }));
  };

  const handleChangeCity = (value:any) => {
    setCityData(value)
    
    setFormData(prevData => ({
      ...prevData,
      city: value
    }));
  };

  const handleChangeState = (value:any) => {
    
    setStateData(value)
    setFormData(prevData => ({
      ...prevData,
      state: value
    }));
  };

  const validatePIN = (event: any) => {
    const regex = /^\d{6}$/;
    const { value } = event.target;
    if (!regex.test(value)) {
      setPincodeError(true);
    } else {
      setPincodeError(false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await submitContact({ formData });
    
    setResultMessage('Form Submitted Successfully!')
  };

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
    {/* // <form className='flex flex-col gap-6' action={'https://submit-form.com/INrMWErhT'}> */}
      <h5>Reach out to us</h5>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="email">Email ID</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="pincode">Pincode</Label>
          <Input type="text" maxLength={6} onKeyUp={validatePIN} id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
          {pincodeError && <span className="text-red-500 text-xs">Please enter a valid pincode</span>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <Label>City/Town</Label>
          <Select value={cityData} onValueChange={handleChangeCity}>
            <SelectTrigger className="max-w-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              {
                cities.map((city, index) => (
                  <SelectItem key={index} value={city}>{city}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>State</Label>
          <Select value={stateData} onValueChange={handleChangeState}>
            <SelectTrigger className="max-w-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              {
                states.map((state, index) => (
                  <SelectItem key={index} value={state.label}>{state.label}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Topic</Label>
        <Select name="topic" value={topicData} onValueChange={handleChangeTopic}>
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            {
              topicValues.map((topic, index) => (
                <SelectItem key={index} value={topic.title}>{topic.title}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} />
      </div>
      {
        withResume && (
          <div>
            <Label htmlFor="resume">Resume</Label>
            <Input type="file" id="resume" name="resume" onChange={handleChange} />
          </div>
        )
      }
      <div className='flex items-center space-x-3'>
        <Checkbox 
          checked={formData.termsAgreed}
          id="termsAgreed"
          onCheckedChange={(checked) => {
            return checked
              ? setFormData(prevData => ({ ...prevData, termsAgreed: true }))
              : setFormData(prevData => ({ ...prevData, termsAgreed: false }));
          }}
        />
        <label
          htmlFor="termsAgreed"
          className="text-sm leading-relaxed text-gray-400 mt-[4px]"
        >
          I confirm that the above details are accurate and I agree with the <a href="/terms-and-conditions">Terms and Conditions</a>
        </label>
      </div>
      <div>
        <Button
          text="Submit"
          href=""
          action="submit"
          type="primary"
          icon="arrow-right"
        />
      </div>
      <div id="message" className={resultMessage !== '' ? "py-4 px-4 bg-[#E1F7CD]" : ""}>
        {resultMessage}
      </div>
    </form>
  );
};

export default PopupForm;