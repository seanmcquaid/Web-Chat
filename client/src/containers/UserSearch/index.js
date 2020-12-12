import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { getAllUsers } from '../../api/userService';
import { LoadingSpinner } from '../../components';

const UserSearch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [users, setUsers] = useState([]);
  const isCurrent = useRef(true);

  useEffect(() => {
    if (isCurrent.current) {
      const cancelToken = Axios.CancelToken;
      const source = cancelToken.source();
      const config = {
        cancelToken: source.token,
      };
      getAllUsers(config)
        .then(({ data }) => {
          setUsers(data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
          source.cancel();
        });
    }
    return () => {
      isCurrent.current = false;
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <div></div>;
};

export default UserSearch;
