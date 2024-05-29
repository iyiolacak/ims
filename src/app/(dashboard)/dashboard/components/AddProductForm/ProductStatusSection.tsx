import React from 'react'
import FormCard from './FormCard'
import ProductStatusDropdown from './ProductStatusDropdown'

const ProductStatusSection = () => {
  return (
    <FormCard title='Status'>
        <div>
          <ProductStatusDropdown/>
        </div>
    </FormCard>
  )
}

export default ProductStatusSection