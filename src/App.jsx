import React, { useState } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip';


const CopyIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-clipboard"
    width="25"
    height="25"
    strokeWidth={2}
    stroke="white"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x={9} y={3} width={6} height={4} rx={2} />
  </svg>
)

const App = () => {

  const [number, setNumber] = useState(14);
  const [isCopied, setIsCopied] = useState(false);
  const [password, setPassword] = useState("/1r:V>,4+.qIee");

  const [rules, setRules] = useState([
    {
      id: 1,
      label: "Include Uppercase Letters",
      control: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      checked: true
    },
    {
      id: 2,
      label: "Include Lowercase Letters",
      control: "abcdefghijklmnopqrstuvwxyz",
      checked: true
    },
    {
      id: 3,
      label: "Include Numbers",
      control: "1234567890",
      checked: true
    },
    {
      id: 4,
      label: "Include Symbols",
      control: "!@#$%&'()*+,^-./:;<=>?[]_`{~}|",
      checked: false
    }
  ]);

  const copyPassword = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(password)
        setIsCopied(true)
      } catch (error) {
        console.error('Failed to copy: ', error);
      }
    }
    setIsCopied(false)
  }

  const handleUpdate = (i) => {

    const item = { ...rules[i], checked: !rules[i].checked };
    const newRules = [...rules];
    newRules[i] = item;
    setRules(newRules)

  }

  const generatePassword = () => {

    let generatePassword = "";
    const ruleChecked = rules.filter(item => item.checked)

    ruleChecked.forEach(element => {
      generatePassword += element.control;
    });

    let pass = ""
    for (let i = 1; i <= number; i++) {
      let char = generatePassword[Math.floor(Math.random(i) * generatePassword.length)]
      pass += char;
    }

    setPassword(pass);
  }

  const filterData = rules.filter(rule => rule.checked == true)
  const filterData2 = rules.filter(rule => rule.checked == false)

  return (
    <>
      <div className='w-11/12 md:w-3/4 lg:w-4/12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h4 className='text-smoke text-center text-md'>Password Generator</h4>
        <div className='bg-gray p-3 mt-3 flex items-center justify-between'>
          <span className='text-smoke text-lg font-[500]'>{password}</span>

          <Tooltip.Provider>
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger asChild>
                <button onClick={copyPassword} className="relative group">
                  <CopyIcon />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-white p-1 text-sm rounded-sm" sideOffset={5}>
                  {!isCopied ? "Click to copy" : "Copied"}
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

        </div>

        <div className='bg-gray p-3 mt-3'>
          <div className='flex items-center justify-between'>
            <span className='text-smoke text-md'>Character Length</span>
            <span className='text-green font-[500] text-md'>{number}</span>
          </div>

          <input type="range" value={number} onChange={(e) => { setNumber(e.target.value) }} className='w-full mt-3 h-2 bg-dark accent-green' min={8} max={18} name="" id="" />


          <div className='flex flex-col gap-1 mt-5'>
            {
              rules.map((item, i) => {
                return (
                  <div key={item.id} className='flex items-center gap-3'>
                    <input type="checkbox" checked={item.checked} onChange={() => handleUpdate(i)} className='w-4 h-4 bg-transparent accent-green text-white' name="" id="" />
                    <label className='text-white capitalize' htmlFor="">{item.label}</label>
                  </div>
                )
              })
            }
          </div>

          <div className='bg-dark p-3 flex items-center justify-between mt-5'>
            <span className='text-smoke capitalize'>STRENGTH</span>
            <div className='flex items-center gap-2'>

              {
                filterData.map((item, i) => {
                  return (
                    <span key={i} className='w-2 bg-yellow h-6'></span>
                  )
                })
              }

              {
                filterData2.map((item, i) => {
                  return (
                    <span key={i} className='w-2 border border-white h-6'></span>
                  )
                })
              }



            </div>
          </div>

          <button onClick={generatePassword} className='capitalize bg-green py-2 font-bold mt-3 w-full hover:bg-transparent border hover:text-green duration-200 hover:border hover:border-green'>GENERATE →</button>

        </div>

      </div>
    </>
  )
}

export default App