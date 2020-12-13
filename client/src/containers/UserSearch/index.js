import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { getAllUsers } from '../../api/userService';
import { LoadingSpinner } from '../../components';
import Fuse from 'fuse.js';

const UserSearch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [originalUsers, setOriginalUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      const cancelToken = Axios.CancelToken;
      const source = cancelToken.source();
      const config = {
        cancelToken: source.token,
        headers: {},
      };
      getAllUsers(config)
        .then(({ data }) => {
          setOriginalUsers(data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
          source.cancel();
        });
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <div></div>;
};

export default UserSearch;
