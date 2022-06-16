import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUrl } from '../../services/api';

const Redirect = (params) => {
  const { shortenedId } = useParams();
  useEffect(() => {
    (async () => {
      const url = await getUrl(shortenedId);
      console.log(url);
      window.location.href = url;
    })()
  }, [])
  return (
    <h1>Redirecting...</h1>
  )
}

export default Redirect
