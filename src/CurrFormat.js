import React from 'react'
import CurrencyFormat from 'react-currency-format'

function CurrFormat({ price }) {
  return (
      <CurrencyFormat
        renderText={value => (
          <>
            {value}
          </>
        )}
        decimalScale={2}
        value={price}
        displayType={"text"}
        thousandSeparator={true}
        thousandSpacing={'2s'}
      />
  )
}

export default CurrFormat
