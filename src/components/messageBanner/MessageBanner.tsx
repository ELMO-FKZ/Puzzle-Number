import { memo } from "react"
import { FaFirstOrderAlt } from "react-icons/fa"
import { MessageBannerProps } from "../../@types/types"
import "./messageBanner.css"

const MessageBanner = memo(function MessageBanner({message}: MessageBannerProps) {

    return (
        <div className="msg-banner">
            <FaFirstOrderAlt />
            <span className="msg-banner__content">{message}</span>
            <FaFirstOrderAlt />
        </div>
    )
})

export default MessageBanner