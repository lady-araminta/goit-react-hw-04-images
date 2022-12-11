import { ThreeCircles } from 'react-loader-spinner';
import { LoaderCont } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderCont role="alert">
      <ThreeCircles color="#3f51b5" />
    </LoaderCont>
  );
};
