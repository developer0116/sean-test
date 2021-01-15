import { useState } from 'react'

export default function useInput(initialValue: any) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange,
  }
}
