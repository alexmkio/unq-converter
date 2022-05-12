import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [customer, setCustomer] = useState('')
  const [theme, setTheme] = useState('')
  const [convertedUrl, setConvertedUrl] = useState('')
  const [matchingCustomer, setMatchingCustomer] = useState(false)
  const [matchingTheme, setMatchingTheme] = useState(false)
  const [command, setCommand] = useState('')

  const convertUrl = () => {
    let splitUrl = removeProtocol(url).split('/')
    if (splitUrl[2] === 'workflow') {
      return `${splitUrl[0]}/workspaces`.replace('x.unqork.io', '.unqork.io')
    } else if (splitUrl[splitUrl.length - 1] === 'edit' && customer && theme) {
      splitUrl.pop()
      splitUrl.splice(1, 1, `?&style=${theme}&remoteRootCustomer=http://localhost:3002/${customer}/#`)
      let withoutEdit = splitUrl.join('/')
      return withoutEdit.replace('.unqork.io', 'x.unqork.io').replace('form', 'display')
    } else if (splitUrl[splitUrl.length - 1] === 'edit') {
      splitUrl.pop()
      let withoutEdit = splitUrl.join('/')
      return withoutEdit.replace('.unqork.io', 'x.unqork.io').replace('form', 'display')
    } else {
      if (!splitUrl[splitUrl.length - 1].length) {
        splitUrl.pop()
      }
      let withEdit = `${splitUrl[0]}/#/${splitUrl[splitUrl.length - 2]}/${splitUrl[splitUrl.length - 1]}/edit`
      return withEdit.replace('x.unqork.io', '.unqork.io').replace('display', 'form')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let convertedUrl = convertUrl()
    setConvertedUrl(convertedUrl)
    copyToClipboard(convertedUrl)
    constructCommand()
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
    findTheme(event.target.value)
    if (matchingCustomer) findCustomer(event.target.value)
  }

  const handleCustomerChange = (event) => {
    if (matchingTheme) setTheme(event.target.value)
    setCustomer(event.target.value)
  }

  const handleMatchingCustomer = () => {
    !matchingCustomer && url.length ? findCustomer(url) : setCustomer('')
    setMatchingCustomer(!matchingCustomer)
  }

  const handleMatchingTheme = () => {
    !matchingTheme ? setTheme(customer) : setTheme('')
    setMatchingTheme(!matchingTheme)
  }

  const findCustomer = (url) => {
    let environment = removeProtocol(url)
    if (environment.includes('.')) {
      environment = environment.split('.')[0]
    }
    if (environment.includes('-staging')) {
      setCustomer(environment.split('-staging')[0])
      if (matchingTheme) setTheme(environment.split('-staging')[0])
    } else if (environment.split('')[environment.split('').length - 1] === 'x') {
      let splitEnvironment = environment.split('')
      splitEnvironment.pop()
      setCustomer(splitEnvironment.join(''))
      if (matchingTheme) setTheme(splitEnvironment.join(''))
    } else {
      setCustomer(environment)
      if (matchingTheme) setTheme(environment)
    }
  }

  const findTheme = (url) => {
    if (url.includes('style=')) {
      setTheme(url.split('style=')[1].split(/[#&]/)[0])
    }
  }

  const clearForm = () => {
    setUrl('')
    setCustomer('')
    setTheme('')
    setConvertedUrl('')
    setMatchingCustomer(false)
    setMatchingTheme(false)
  }

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
  }

  const copyCommandToClipboard = () => {
    navigator.clipboard.writeText(command)
  }

  const removeProtocol = (url) => {
    if (url.includes('https://')) {
      return url.split('https://')[1]
    }
    return url
  }

  const constructCommand = () => {
    if (customer === theme) {
      setCommand(`yarn start ${customer}`)
    }
    if ((customer && theme) && customer !== theme) {
      setCommand(`yarn start ${customer} ${theme}`)
    }
  }

  return (
    <>
      <Head>
        <title>Unqork Link Converter</title>
        <meta name="description" content="Unqork Styles Link Converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col justify-center items-center h-screen bg-gray-50'>
        <form onSubmit={handleSubmit} className='flex flex-col w-5/6 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12'>

          <label className='label'>
            Url:
            <input
              className='input'
              type="text"
              value={url}
              onChange={(event)=> handleUrl(event)}
              placeholder="Required"
              required
            />
          </label>

          <div className='sm:flex justify-between'>
            <label className='label sm:w-5/12 mt-8'>
              Customer:
              <input
                className='input'
                type="text"
                value={customer}
                onChange={(event)=> handleCustomerChange(event)}
              />
            </label>

            <label className='label sm:w-5/12 mt-8'>
              Theme:
              <input
                className='input'
                type="text"
                value={theme}
                onChange={(event)=> setTheme(event.target.value)}
              />
            </label>
          </div>

          <div className='sm:flex justify-between'>
            <label className='sm:w-5/12 flex items-center'>
              Same as Environment
              <input
                className='mr-2 order-first'
                type="checkbox"
                checked={matchingCustomer}
                onChange={handleMatchingCustomer}
              />
            </label>

            <label className='sm:w-5/12 flex items-center'>
              Same as Customer
              <input
                className='mr-2 order-first'
                type="checkbox"
                checked={matchingTheme}
                onChange={handleMatchingTheme}
              />
            </label>
          </div>

          <div className='mt-8 flex justify-between'>
            <button type="button" onClick={clearForm} className='btn-primary'>Clear form</button>
            <input type="submit" value="Convert" className='btn-primary' />
          </div>
        </form>

        <section className='relative w-5/6 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 h-1/6 bg-green-300 rounded-md mt-8 px-4 py-2' onClick={copyToClipboard}>
          <div>
            <p className='break-words'>{convertedUrl}</p>
          </div>
          <p className='absolute bottom-2 right-2 text-blue-700'>This has been automatically copied to your clipboard</p>
        </section>

        <section className='w-5/6 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 h-12 bg-green-300 rounded-md mt-8 px-4 py-2' onClick={copyCommandToClipboard}>
          <div className='relative'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-0 right-0 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <p className='break-words'>{command}</p>
          </div>
        </section>

      </main>
    </>
  )
}