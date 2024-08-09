import { useEffect, useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <Currency />
    </>
  )
}

export function Currency() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('IDR')
  const [converted, setConverted] = useState(0)

  useEffect(() => {
    async function converterAPI() {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      )
      const data = await response.json()
      setConverted(data.rates[toCurrency])
    }

    converterAPI()
  }, [amount, fromCurrency, toCurrency])

  return (
    <div className='currency-app noto-serif-font'>
      <h1>Currency Converter</h1>
      <CurrencyForm
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onToCurrencyChange={(e) => {
          setToCurrency(e.target.value)
        }}
        converted={converted}
      />
    </div>
  )
}

export function CurrencyForm({
  amount,
  fromCurrency,
  toCurrency,
  onToCurrencyChange,
  converted,
}) {
  return (
    <div>
      <form className='currency-form' onSubmit={(e) => e.preventDefault()}>
        <CurrencyInput />
        <CurrencyInput
          disabled
          converted={converted}
          toCurrency={toCurrency}
          onToCurrencyChange={onToCurrencyChange}
        />
      </form>
    </div>
  )
}

export function CurrencyInput({
  disabled,
  converted,
  toCurrency,
  onToCurrencyChange,
}) {
  return (
    <div className='currency-input'>
      <input type='text' value={converted} disabled={disabled} />
      <select name='' id='' value={toCurrency} onChange={onToCurrencyChange}>
        <option value='IDR'>IDR</option>
        <option value='USD'>USD</option>
        <option value='JPY'>JPY</option>
      </select>
    </div>
  )
}

export default App
