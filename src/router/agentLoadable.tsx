/* eslint-disable prettier/prettier */
import loadable from '@loadable/component';
import { Loading } from '@/components';
const handleCatchChunkError = () => {
    // window.location.reload();

    return { default: Loading };
};


export const AgentLayout = loadable(
    () => import('@/pages').then(({ ServiceAgentLayout }) => ({ default: ServiceAgentLayout })).catch(handleCatchChunkError),
    { fallback: <Loading /> },
);

export const Videos = loadable(
    () => import('@/pages').then(({ Videos }) => ({ default: Videos })).catch(handleCatchChunkError),
    { fallback: <Loading /> },
);