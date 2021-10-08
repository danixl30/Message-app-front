import { Typography } from "@material-ui/core"
import StyleHook from "../hooks/style.hook"

const ErrorMessage = (props) => {
    const [classes] = StyleHook();
    return (
        <>
            <Typography className={classes.errorMsg} variant="body2">{props.error}</Typography>
        </>
    )
}

export default ErrorMessage;