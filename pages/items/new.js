import {useState} from "react";
import {useRequest} from "../../hooks/use-request";
import Router from "next/router";

const NewItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const {doRequest, errors} = useRequest({
    url: '/api/items',
    method: 'post',
    body: {
      title: title,
      price: price
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = event => {
    event.preventDefault();
    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create an item</h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={event => setPrice(event.target.value)}
            className="form-control"
          />
        </div>

        {errors}

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewItem;