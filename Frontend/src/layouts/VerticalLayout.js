// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'
import { useDispatch } from 'react-redux';
import { initSocketConnection } from '../redux/chat';
import { useEffect } from 'react';

const VerticalLayout = props => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initSocketConnection());
  }, []);

  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
