import { Outlet, useLocation } from 'react-router-dom'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
//              component : 레이아웃                   //
export default function Container() {


  //          state: 현재 페이지의 path name           //
  const {pathname} = useLocation();


  //          render : 레이아웃 렌더링               //
  return (
    <>
    
      <Header/>
      <Outlet />
      {pathname !== 'auth' &&  <Footer/>}
      
    
    </>
  )
}
