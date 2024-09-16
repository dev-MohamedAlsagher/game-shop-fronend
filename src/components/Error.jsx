import { isAxiosError } from 'axios';
import PropTypes from 'prop-types';


export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">Oops, er is iets mis gegaan</h4>
        <p>
          {error.response?.data?.message || error.message}
          {error.response?.data?.details && (
            <>
              :
              <br />
              {JSON.stringify(error.response.data.details)}
            </>
          )}
        </p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">Oops, er is iets mis gegaan</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null;
}
Error.propTypes = {
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.object]),
};

