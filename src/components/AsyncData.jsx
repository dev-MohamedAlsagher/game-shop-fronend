import Loader from './Loader';
import Error from './Error';
import PropTypes from 'prop-types';


export default function AsyncData({
  loading,
  error,
  children,
}) {
  // 👇 2
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Error error={error} /> 
      {children} 
    </>
  );
}

AsyncData.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.object]),
  children: PropTypes.node.isRequired,
};

