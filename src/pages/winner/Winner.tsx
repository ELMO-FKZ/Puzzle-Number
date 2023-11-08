import MessageBanner from "../../components/messageBanner/MessageBanner"
import WinnerButtons from "../../components/winnerButtons/WinnerButtons"
import WinnerScore from "../../components/winnerScore/WinnerScore"

function Winner() {

    return (
        <>
        <MessageBanner message="Congratulations" />
        <WinnerScore />
        <WinnerButtons />
        </>
    )
}

export default Winner