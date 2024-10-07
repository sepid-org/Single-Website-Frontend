import React from 'react'

import SecureHTMLDisplay from 'commons/components/organisms/SecureHTMLDisplay'

const TinyPreview = ({ content = '', styles = {} }) => {

  return (
    <SecureHTMLDisplay
      content={content}
      customStyle={{ direction: 'rtl', ...styles }}
    />
  )
}

export default TinyPreview
