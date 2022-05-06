import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [customer, setCustomer] = useState('')
  const [theme, setTheme] = useState('')
  const [convertedUrl, setConvertedUrl] = useState('')

  const convertUrl = () => {
    let splitUrl = url.split('/')
    if (splitUrl[splitUrl.length - 1] === 'edit' && customer && theme) {
      splitUrl.pop()
      splitUrl.splice(3, 1, `?&style=${theme}&remoteRootCustomer=http://localhost:3002/${customer}/#`)
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
      let withEdit = `https://${splitUrl[2]}/#/${splitUrl[splitUrl.length - 2]}/${splitUrl[splitUrl.length - 1]}/edit`
      return withEdit.replace('x.unqork.io', '.unqork.io').replace('display', 'form')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let convertedUrl = convertUrl()
    setConvertedUrl(convertedUrl)
    copyToClipboard(convertedUrl)
  }

  const clearForm = () => {
    setUrl('')
    setCustomer('')
    setTheme('')
    setConvertedUrl('')
  }

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
  }

  return (
    <>
      <Head>
        <title>Unqork Link Converter</title>
        <meta name="description" content="Unqork Styles Link Converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col justify-center items-center h-screen bg-gray-100'>
        <form onSubmit={handleSubmit} className='flex flex-col w-5/6 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12'>

          <label className='label'>
            Url:
            <input
              className='input'
              type="text"
              value={url}
              onChange={(event)=> setUrl(event.target.value)}
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
                onChange={(event)=> setCustomer(event.target.value)}
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

          <div className='mt-8 flex justify-between'>
            <button onClick={clearForm} className='btn-primary'>Clear form</button>
            <input type="submit" value="Convert" className='btn-primary' />
          </div>
        </form>
        <section className='w-5/6 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 h-1/6 bg-green-300 rounded-md mt-8 px-4 py-2' onClick={copyToClipboard}>
          <div className='relative'>
            <p className='break-words'>{convertedUrl}</p>
          </div>
        </section>
      </main>
    </>
  )
}