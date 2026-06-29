
import { LoaderStyleContainer } from './LoaderStyleContainer'


const Loader = () => {
    return (
        <LoaderStyleContainer initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeInOut" }}>
            <p>Server waking up</p>
        </LoaderStyleContainer>
    )
}

export default Loader
