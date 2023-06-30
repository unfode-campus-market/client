import axios from "axios";
import {useState} from "react";


export const useRequest = ({url, method, body, onSuccess}) => {
  const [errors, setErrors] = useState([]);

  const doRequest = async (props = {}) => {
    setErrors(null);
    try {
      const response = await axios[method](
        url,
        {
          ...body,
          ...props
        }
      );
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
          </ul>
        </div>
      );
    }
  };

  return {doRequest, errors};
};