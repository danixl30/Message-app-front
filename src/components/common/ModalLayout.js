import { Modal, Backdrop, Fade, Slide, Zoom } from "@material-ui/core"
import StyleHook from "../hooks/style.hook"

const ModalLayout = (props) => {

    const [classes] = StyleHook();

    return(
        <>
            <Modal 
                className={classes.modal}
                open={props.open}
                closeAfterTransition
                onClose={props.onClose}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <Zoom in={props.open}>
                    <div className={classes.paperModal}>
                        {props.children}
                    </div>
                </Zoom>
            </Modal>
        </>
    )
}

export default ModalLayout;