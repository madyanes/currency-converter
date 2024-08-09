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
      setConverted(data.rates[toCurrency].toFixed(2))
    }

    if (fromCurrency === toCurrency) return setConverted(amount)

    converterAPI()
  }, [amount, fromCurrency, toCurrency])

  return (
    <div className='currency-app noto-serif-font'>
      <h1>Currency Converter</h1>
      <CurrencyForm
        amount={amount}
        onAmountChange={(e) => setAmount(e.target.value ? e.target.value : 1)}
        fromCurrency={fromCurrency}
        onFromCurrencyChange={(e) => setFromCurrency(e.target.value)}
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
  onAmountChange,
  fromCurrency,
  onFromCurrencyChange,
  toCurrency,
  onToCurrencyChange,
  converted,
}) {
  return (
    <div>
      <form className='currency-form' onSubmit={(e) => e.preventDefault()}>
        <CurrencyInput
          value={{ state: amount, setState: onAmountChange }}
          result={{ state: fromCurrency, setState: onFromCurrencyChange }}
        />
        <CurrencyInput
          disabled
          value={{ state: converted }}
          result={{ state: toCurrency, setState: onToCurrencyChange }}
        />
      </form>
    </div>
  )
}

export function CurrencyInput({ disabled, value, result }) {
  return (
    <div className='currency-input'>
      <input
        type='text'
        value={value.state}
        disabled={disabled}
        onChange={value.setState}
      />
      <select name='' id='' value={result?.state} onChange={result?.setState}>
        <option value='IDR'>IDR</option>
        <option value='USD'>USD</option>
        <option value='JPY'>JPY</option>
      </select>
    </div>
  )
}

export default App
