import { memo } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

const LoadingSpinner = memo(() => (
  <div data-testid='loadingSpinner'>
    <ClimbingBoxLoader />
  </div>
));

export default LoadingSpinner;
