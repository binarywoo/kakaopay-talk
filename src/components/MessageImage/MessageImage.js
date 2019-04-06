import React, { useState, useCallback, useEffect } from 'react'
import ImageModal from '../ImageModal/index'
import { scrollToBottom } from '../../libs/chatAppUtils'

const MessageImage = ({ src }) => {
  const [showImageModal, setShowImageModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded) scrollToBottom()
  }, [isLoaded])

  const onClickImg = useCallback(() => {
    setShowImageModal(true)
  }, [src])

  return (
    <div>
      <img
        style={{ maxWidth: 200, cursor: 'pointer' }}
        src={src}
        alt={src}
        onClick={onClickImg}
        onLoad={() => setIsLoaded(true)}
      />
      <ImageModal
        visible={showImageModal}
        title={null}
        img={src}
        onClose={() => setShowImageModal(false)}
        alt={src}
      />
    </div>
  )
}

export default MessageImage
