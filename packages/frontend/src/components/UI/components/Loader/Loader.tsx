
import type { FC } from 'react';
import { LoaderStyleContainer } from './LoaderStyleContainer'

interface LoaderProps {
    isLoading: boolean;
}

const Loader: FC<LoaderProps> = ({ isLoading }) => {
    return (
        <LoaderStyleContainer initial={{ opacity: 1 }} animate={{ opacity: isLoading ? 0 : 1 }}>
            <p>Server waking up</p>
        </LoaderStyleContainer>
    )
}

export default Loader
