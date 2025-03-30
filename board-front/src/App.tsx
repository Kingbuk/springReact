import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from 'views/Authentication';
import Main from 'views/Main';
import Search from 'views/Search';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import  './Constants/index';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from './Constants/index';

//          component : Application 컴포넌트               //
function App() {
  
  
  //          render : Application 컴포넌트 렌더링               //
  //          desctiption : 메인화면 : '/' - main   //
  //          desctiption 로그인 + 회원가입 화면: '/auth' - Authentication
  //          desctiption : 검색 화면 : '/search/:word' -Search //
  //          desctiption : 유저 페이지 : '/user/:userEmail' - user     //  
  //          desctiption : 게시물 상세보기 : '/board/detail/:boardNumber' - BoardDetail //
  //          desctiption : 게시물 작성하기 : '/board/write' - BoardWrite      //
  //          desctiption : 게시물 수정하기 : '/board/uodate' - BoardUpdate     //  
  return (
  <>
      <Routes>
        {/* 레이아웃 생성 */}
        {/* Route내에서 path하고 element 어트리뷰트를 통해 url 분기를 해주는게 신기방기다 */}
        
        <Route element={<Container/>}>
          {/* path 경로 element 어떤 컴포넌트 */}
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={AUTH_PATH()} element={<Authentication/>} />
          <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
          <Route path={USER_PATH(':userEmail')} element={<User />} />
          <Route path={BOARD_PATH()}>
            <Route path='write' element={<BoardWrite />}></Route>
            <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />}></Route>
            <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />}></Route>
          </Route>
        </Route>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
  </>
  );
}

export default App;
