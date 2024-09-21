import { useNavigate, useParams } from 'react-router-dom';

const useLocalNavigate = () => {
  const _navigate = useNavigate();

  const navigate = (path: string) => {
    if (path.startsWith('/')) {
      // For absolute paths, prepend the programSlug and navigate
      _navigate(`/program/filmbazi${path}`);
    } else {
      // For relative paths, navigate based on the current route
      _navigate(path);  // Relative navigation (within the current route)
    }
  };

  return navigate;
};

export default useLocalNavigate;
