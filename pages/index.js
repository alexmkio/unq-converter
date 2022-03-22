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
      let withEdit = [...splitUrl, 'edit'].join('/')
      return withEdit.replace('x.unqork.io', '.unqork.io').replace('display', 'form')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setConvertedUrl(convertUrl)
  }

  const clearForm = () => {
    setUrl('')
    setCustomer('')
    setTheme('')
  }

  return (
    <>
      <Head>
        <title>Unqork Link Converter</title>
        <meta name="description" content="Unqork Styles Link Converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit}>

          <label>
            Url:
            <input
              type="text"
              value={url}
              onChange={(event)=> setUrl(event.target.value)}
              required
            />
          </label>

          <label>
            Customer:
            <input
              type="text"
              value={customer}
              onChange={(event)=> setCustomer(event.target.value)}
            />
          </label>

          <label>
            Theme:
            <input
              type="text"
              value={theme}
              onChange={(event)=> setTheme(event.target.value)}
            />
          </label>

          <input type="submit" value="Convert" />
        </form>
        <button onClick={clearForm}>Clear form</button>
        <section>
          {convertedUrl}
        </section>
      </main>
    </>
  )
}
