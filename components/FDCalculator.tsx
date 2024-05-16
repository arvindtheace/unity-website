import React from 'react'
import styled from 'styled-components'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from './ui/input'
import { Slider } from './ui/slider'
import { Button } from './ui/button'
import CustomButton from './Button'
import { Switch } from './ui/switch'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import clsx from 'clsx'
import { CalendarIcon } from 'lucide-react'
import { addDays, addYears, addMonths, format } from 'date-fns'
import { Calendar } from './ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

type RateProps = {
  generalRate: number
  maxDays: number
  minDays: number
  reference: string
  seniorRate: number
  tenure: string
}

type RateModalProps = {
  interestRates: RateProps[]
}

const RatesModalComponent = ({ interestRates }: RateModalProps) => {
  console.log({ interestRates });
  return (
    <Dialog>
      <DialogTrigger>
        <a className='flex items-center font-semibold'>
          Click here&nbsp;
        </a>
      </DialogTrigger>
      <DialogContent className='bg-white max-h-[80%] overflow-auto' style={{ maxWidth: '840px' }}>
        <div className="p-4 flex flex-col">
          <div className='text-2xl font-semibold'>Fixed Deposit Rates</div>
          <div className="pt-4 relative h-80 overflow-auto">
            <table className="table-auto border-x border-y w-full">
              <thead>
                <tr>
                  <th className="font-bold p-2 border-b border-l  text-left bg-[#FBFAF4] border-bg-[#FBFAF4]">Tenure</th>
                  <th className="font-bold p-2 border-b border-l text-left  bg-[#FBFAF4] border-bg-[#FBFAF4]">General Rate</th>
                  <th className="font-bold py-2 px-4 border-b border-l text-left  bg-[#FBFAF4] border-bg-[#FBFAF4]">Senior Rate</th>
                </tr>
              </thead>
              <tbody>
                {interestRates?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="p-2 border-b text-left">{item.tenure}</td>
                    <td className="p-2 border-b text-left">{item.generalRate} %</td>
                    <td className="py-2 px-4 border-b text-left">{item.seniorRate} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ol className="p-3 mt-5 list-decimal" type="1">
            <li>For terms & conditions and any other detail, please contact Unity SFB branch officials.</li>
            <li>Interest rates are subject to change without prior notice.</li>
            <li>The above card rates are applicable for recurring deposits (Specific Tenors).</li>
            <li>For premature withdrawal of fixed deposit and recurring deposits, a premature penalty of 1.00% shall be charged to the rate applicable for the period the deposit has remained with the bank, or the contracted rate, whichever is lower.</li>
            <li>We hereby offer 1% more over Card Rates to Unity SFB employees.</li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const RatesModal = React.memo(RatesModalComponent);

export default function FDCalculator({ title, cta, ctaLink }: { title: string, cta: string, ctaLink: string }) {
  const [depositType, setDepositType] = React.useState('fd-monthly-interest')
  const [depositAmount, setDepositAmount] = React.useState(10000)
  const [years, setYears] = React.useState(1)
  const [months, setMonths] = React.useState(0)
  const [days, setDays] = React.useState(0)
  const [tenure, setTenure] = React.useState((years * 365 + months * 30 + days) / 365)
  const [date, setDate] = React.useState<Date>(new Date())
  const [isSeniorCitizen, setIsSeniorCitizen] = React.useState(false)
  const [returnAmount, setReturnAmount] = React.useState(0)
  const [interestRateMap, setInterestRateMap] = React.useState([])
  const [interestRate, setInterestRate] = React.useState(8.5)
  const [maturityDate, setMaturityDate] = React.useState(new Date())
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null)

  // Calculate tenure in years
  React.useEffect(() => {
    const tenureInYears = (years * 365 + months * 30 + +days) / 365;
    setTenure(tenureInYears);
  }, [years, months, days]);

  React.useEffect(() => {
    if (videoRef.current && depositAmount > 0) {
      const minp = 0;
      const maxp = 100;

      // The result should be between 100 an 10000000
      const minv = Math.log(10000);
      var maxv = Math.log(20000000);

      // calculate adjustment factor
      const scale = (maxv - minv) / (maxp - minp);
      const pos = minp + (Math.log(depositAmount) - minv) / scale;
      let currentTime = pos > 0 ? videoRef.current.duration * (pos / 100) : 0;
      if (currentTime == 0) {
        currentTime = 0.05
      }
      videoRef.current.currentTime = currentTime;
    }
  }, [depositAmount])

  React.useEffect(() => {
    //@ts-ignore
    const res = addYears(date, parseInt(years));
    //@ts-ignore
    const res1 = addMonths(res, parseInt(months));
    //@ts-ignore
    const maturityDate = addDays(res1, parseInt(days));
    setMaturityDate(maturityDate)
  }, [date, years, months, days]);

  // Fetch interest rates based on deposit type
  React.useEffect(() => {
    resetValues(depositType)
    fetch(`https://cdn.builder.io/api/v3/content/interest-rates?apiKey=21b44296fc364461abc19d1d5fa5792d&query.data.reference=${depositType}&limit=1`)
      .then(res => res.json())
      .then((data: any) => {
        if (data.results) {
          setInterestRateMap(data.results[0].data.tenures)
        }
      })
  }, [depositType])

  // Calculate interest rate based on tenure
  React.useEffect(() => {
    const tenureInDays = tenure * 365;
    const interestRate: any = interestRateMap.find((rate: any) => {
      return tenureInDays >= rate.minDays && tenureInDays <= rate.maxDays;
    });

    if (interestRate) {
      isSeniorCitizen ? setInterestRate(interestRate.seniorRate) : setInterestRate(interestRate.generalRate)
    } else {
      isSeniorCitizen ? setInterestRate(9) : setInterestRate(8.5)
    }
  }, [tenure, interestRateMap, isSeniorCitizen]);

  React.useEffect(() => {
    const calculateReturnAmount = () => {
      let returnAmount
      switch (depositType) {
        case 'fd-monthly-interest':
          returnAmount = depositAmount * tenure * (interestRate / 100);
          break;
        case 'fd-quarterly-interest':
          returnAmount = depositAmount * tenure * (interestRate / 100);
          break;
        case 'fd-short-term':
          returnAmount = depositAmount * tenure * (interestRate / 100);
          break;
        case 'fd-reinvestment':
          returnAmount = depositAmount * Math.pow(1 + (interestRate / 400), tenure * 4);
          break;
        default:
          // Fallback to simple interest
          returnAmount = depositAmount * tenure * (interestRate / 100);
          break;
      }

      // Quarterly compounding
      // returnAmount = depositAmount * Math.pow(1 + (interestRate / 400), tenure * 4);

      // Simple Interest
      // returnAmount = depositAmount * tenure * (interestRate / 100);

      setReturnAmount(returnAmount);
    };

    calculateReturnAmount();
  }, [depositAmount, tenure, interestRate]);

  function formatToIndianCurrency(num: number) {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }


  const resetValues = (depositType: string) => {
    switch (depositType) {
      case 'fd-monthly-interest':
        setDepositAmount(10000);
        setYears(1);
        setMonths(0);
        setDays(0);
        break;
      case 'fd-quarterly-interest':
        setDepositAmount(10000);
        setYears(1);
        setMonths(0);
        setDays(0);
        break;
      case 'fd-short-term':
        setDepositAmount(10000);
        setYears(0);
        setMonths(6);
        setDays(0);
        break;
      case 'fd-reinvestment':
        setDepositAmount(10000);
        setYears(1);
        setMonths(0);
        setDays(0);
        break;
      default:
        break;
    }
  }

  const handleDepositSlider = (e: number[]) => {
    if (videoRef.current) {
      const minp = 0;
      const maxp = 100;

      // The result should be between 100 an 10000000
      const minv = Math.log(10000);
      var maxv = Math.log(20000000);

      // calculate adjustment factor
      const scale = (maxv - minv) / (maxp - minp);
      const pos = minp + (Math.log(e[0]) - minv) / scale;
      const currentTime = videoRef.current.duration * (pos / 100);
      videoRef.current.currentTime = currentTime;
    }
  }

  return (
    <CalculatorContainer className='grid grid-cols-1 md:grid-cols-2'>
      <Controls className='flex flex-col gap-5 sm:gap-10 p-5 sm:p-6 lg:p-14'>
        <div className='text-2xl sm:text-3xl font-semibold'>{title}</div>

        <div className="flex flex-col md:flex-row sm:items-center sm:justify-between sm:flex-row flex-column gap-2">
          <div>
            <p className="text-lg">Type of Deposit</p>
          </div>
          <div>
            <Select onValueChange={(val) => setDepositType(val)} value={depositType}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Select deposit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fd-monthly-interest">Monthly Interest</SelectItem>
                <SelectItem value="fd-quarterly-interest">Quarterly Interest</SelectItem>
                <SelectItem value="fd-short-term">Short Term</SelectItem>
                <SelectItem value="fd-reinvestment">Re-investment Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Deposit amount</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">₹</span>
              <Input
                type="text"
                value={formatToIndianCurrency(depositAmount)}
                onChange={(e: any) => {
                  const rawValue = e.target.value;
                  const pureNumber = rawValue.replace(/,/g, '');
                  let val = parseInt(pureNumber);

                  if (isNaN(val)) {
                    val = 0
                  }
                  setDepositAmount(val)
                }}
                placeholder=""
                className='w-40 pl-8'
                onKeyDown={(e: any) => (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 8 ? null : e.preventDefault()}
              />
            </div>
          </div>
          <div className='py-4'>
            <div className="mb-2">
              <Slider
                defaultValue={[10000]}
                value={[depositAmount]}
                min={10000}
                max={20000000}
                step={500}
                onValueChange={(val: number[]) => setDepositAmount(val[0])}
              />
            </div>
            <div className="flex items-center justify-between text-gray-500">
              <div className="text-xs">₹ 10,000</div>
              <div className="text-xs">₹ 2 Crores</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg">Tenure</p>
            <div className="flex gap-1 sm:gap-3">
              {
                depositType !== "fd-short-term" &&
                <Select onValueChange={(e: any) => setYears(e)} value={String(years)}>
                  <SelectTrigger>
                    <SelectValue placeholder={years + " Years"} />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i} value={String(i)}>{i} Years</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              }
              <Select onValueChange={(e: any) => setMonths(e)} value={String(months)}>
                <SelectTrigger>
                  <SelectValue placeholder={months + " Months"} />
                </SelectTrigger>
                <SelectContent>
                  {
                    Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i} value={String(i)}>{i} Months</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <Select onValueChange={(e: any) => setDays(e)} value={String(days)}>
                <SelectTrigger>
                  <SelectValue placeholder={days + " Days"} />
                </SelectTrigger>
                <SelectContent>
                  {
                    Array.from({ length: 31 }, (_, i) => (
                      <SelectItem key={i} value={String(i)}>{i} Days</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg">Start Date</p>
          <Popover open={calendarOpen} onOpenChange={() => setCalendarOpen(true)}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={clsx(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full bg-white p-0">
              <Calendar
                mode="single"
                selected={date}
                // @ts-ignore
                onSelect={(date: Date) => {
                  setDate(date);
                  setCalendarOpen(false);
                }}
                initialFocus
                className='w-auto'
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg">Are you a Senior Citizen?</p>
          <Switch onCheckedChange={(value) => setIsSeniorCitizen(value => !value)} />
        </div>

        <div>
          * The interest rates shown are only for an estimation, to see actual interest rates <RatesModal interestRates={interestRateMap} />
        </div>

      </Controls>

      <Result className='relative sm:px-16 sm:pt-32 sm:pb-16 px-8 pt-16 pb-4'>
        <div className="bg absolute w-full left-10 top-20 pointer-events-none">
          <svg width={508} height={248} viewBox="0 0 508 248" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M470 93.54H479.07" stroke="#88D38F" strokeWidth="2.69687" strokeMiterlimit={10} strokeLinecap="round" />
            <path d="M474.53 89V98.0708" stroke="#88D38F" strokeWidth="2.69687" strokeMiterlimit={10} strokeLinecap="round" />
            <path d="M410.242 166C406.795 166 404.001 168.795 404.001 172.242C404.001 175.689 406.795 178.484 410.242 178.484C413.69 178.484 416.484 175.689 416.484 172.242C416.484 168.795 413.69 166 410.242 166Z" fill="#63ACF1" />
            <path d="M384 33.4766C396.353 32.9469 403.94 25.3532 404.477 13C405.006 25.3532 412.6 32.9398 424.953 33.4766C412.6 34.0062 405.013 41.5999 404.477 53.9531C403.947 41.5999 396.353 34.0134 384 33.4766Z" fill="#F0C045" />
            <path d="M469.785 229H460" stroke="#EE80C2" strokeWidth="2.69687" strokeMiterlimit={10} strokeLinecap="round" />
            <path d="M24.0002 235.545C30.965 235.843 35.2424 240.125 35.545 247.09C35.8436 240.125 40.125 235.847 47.0898 235.545C40.125 235.246 35.8477 230.965 35.545 224C35.2464 230.965 30.965 235.242 24.0002 235.545Z" fill="#F0C045" />
            <path d="M59.2424 85.4839C55.7951 85.4839 53.0005 82.6893 53.0005 79.242C53.0005 75.7946 55.7951 73 59.2424 73C62.6897 73 65.4844 75.7946 65.4844 79.242C65.4844 82.6893 62.6897 85.4839 59.2424 85.4839Z" fill="#EE80C2" />
            <path d="M123.718 21.4349C117.799 21.4349 113.001 16.6366 113.001 10.7175C113.001 4.79837 117.799 0 123.718 0C129.637 0 134.436 4.79837 134.436 10.7175C134.436 16.6366 129.637 21.4349 123.718 21.4349Z" fill="#63ACF1" />
            <path d="M107.596 199.192C104.505 199.192 102 196.686 102 193.596C102 190.505 104.505 188 107.596 188C110.686 188 113.191 190.505 113.191 193.596C113.191 196.686 110.686 199.192 107.596 199.192Z" fill="#88D38F" />
          </svg>
        </div>

        <video ref={videoRef} width="100%" height="auto" playsInline className='-mt-24'>
          <source src="/calculator-animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="sm text-center mb-6">
          <div className='text-3xl sm:text-4xl font-extrabold mb-3'>
            {/* <span className='text-3xl mr-3'>₹</span> */}
            ₹ {formatToIndianCurrency(+depositAmount + +returnAmount)}
          </div>
          <p className='text-gray-500'>Amount on maturity</p>
        </div>

        <div className="w-max mx-auto rounded-xl flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 mb-16">
          <p>@</p>
          <div className='font-semibold text-2xl'>{interestRate}%</div>
          <p>Interest rate</p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <p>Invested amount</p>
          <div className='text-xl font-bold'>
            ₹ {formatToIndianCurrency(depositAmount)}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <p>Total earnings</p>
          <div className='text-xl font-bold'>
            ₹ {formatToIndianCurrency(returnAmount)}
          </div>
        </div>

        <div className="flex items-center justify-between mb-10">
          <p>Maturity Date</p>
          <div className='text-xl font-bold'>
            {/* {format(addDays(date, ((years * 365) + (months * 30) + +days)), "PPP")} */}
            {format(maturityDate, 'PPP')}
          </div>
        </div>

        <CustomButton
          text={cta}
          type="primary"
          href={ctaLink}
          linkType='external'
          icon="arrow-right"
          width="full"
        />
      </Result>
    </CalculatorContainer>
  )
}

const CalculatorContainer = styled.div`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.18);
  overflow: hidden;
`

const Controls = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.10);
`

const Result = styled.div`
  border-radius: 24px;
  background-color: rgb(250,255,248);
  overflow: hidden;
`
