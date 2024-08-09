import './App.css'

function App() {
  return (
    <>
      <Currency />
    </>
  )
}

export function Currency() {
  return (
    <div className='currency-app noto-serif-font'>
      <h1>Currency Converter</h1>
      <CurrencyForm />
    </div>
  )
}

export function CurrencyForm() {
  return (
    <form className='currency-form' onSubmit={(e) => e.preventDefault()}>
      <CurrencyInput />
      <CurrencyInput />
    </form>
  )
}

export function CurrencyInput() {
  return (
    <div className='currency-input'>
      <input type='text' />
      <select name='' id=''>
        <option value='IDR'>IDR</option>
        <option value='USD'>USD</option>
      </select>
    </div>
  )
}

export default App
