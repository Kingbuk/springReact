import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_PATH, SEARCH_PATH, USER_PATH , AUTH_PATH} from 'Constants';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';

//              component : 헤더 레이아웃                   //
export default function Header() {
  //        state : 로그인 유저 상태         //
  const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();


  //        state : cookie 상태         //
  // const [cookie, useCookie] = useCookies();

  //        state : 로그인 상태         //
  const [isLogin, setLogin] = useState<boolean>(false);



  //        function : 네비게이트 함수            //
  const navigate = useNavigate();

  //      event handler : 로고 클릭 이벤트 처리 함수        //
  const onLogoClickHandler = () =>{
    debugger
    navigate(MAIN_PATH());
  }


  //          component : 검색버튼 컴포넌트             //
  const SearchButton = () => {

    //        state : 검색 버튼 요소 참조 상태        //
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    //        state : 검색 버튼 상태        //
    const [status, setStatus] = useState<boolean>(false);
    //        state : 검색어 상태        //
    const [word, setWord] = useState<string>('');
    //        state : 검색어 path variable 상태        //
    const {searchWord} = useParams();
    
    //        event handler : 검색 아이콘 변경 이벤트 처리 함수           //
    const onSearchWordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setWord(value);
    }
    //        event handler : 검색어 키 이벤트 처리 함수           //
    const onSearchWordKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) =>{

      if(event.key !== 'Enter') return;
      if(!searchButtonRef.current) return;

      searchButtonRef.current?.click();

    }
    //        event handler : 검색 아이콘 클릭 이벤트 처리 함수           //
    const onSearchButtonClickHandler = () => {
      debugger
      if(!status){
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    }
    //        effect : 검색어 path variable 변경 될때마다 실행될 함수           //
    useEffect(()=>{

      if(!searchWord){
        navigate(MAIN_PATH());
        return;
      }
      if(searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
      

    }, [searchWord])




    if(!status)
    //          render : 검색버튼 컴포넌트 렌더링 (클릭 false상태)              //
    return (
    <div className="icon-button" onClick={onSearchButtonClickHandler}>
      <div className="icon search-light-icon"></div>
    </div>);
    //          render : 검색버튼 컴포넌트 렌더링 (클릭 false상태)              //
    return (
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler} placeholder='검색어를 입력해주세요.'/>
        <div ref={searchButtonRef} className="icon-button" onClick={onSearchButtonClickHandler}>
          <div className="icon search-light-icon"></div>
        </div>
      </div>
    )
    


  }
//          component : 로그인 또는 마이페이지 버튼 컴포넌트             //
  const MyPageButton = () => {
    //       state : userEmail path variable 상태               //
    const {userEmail} = useParams();
    


    //        event handler : 마이페이지 버튼 클릭 이벤트 처리 함수       //
    const onMyPageButtonClickHandler = () => {
      //로그인이 안되어 있으면 그대로 있기
      if(!loginUser) return;
      //로그인이 되어이ㅆ다면 email을 셋팅 후 마이페이지 경로로 이동하기
      const {email} = loginUser;
      
      navigate(USER_PATH(''));

      
    }
    //        event handler : 로그인 버튼 클릭 이벤트 처리 함수       //
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    }

     //        event handler : 마이페이지 버튼 클릭 이벤트 처리 함수       //
     const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      navigate(MAIN_PATH());

      
    }

    


    if(isLogin && userEmail === loginUser?.email)
      //          render : 로그아웃 버튼 컴포넌트 렌더링              //
      return (<div onClick={onSignOutButtonClickHandler} className='white-button'>{'로그아웃'}</div>);


      //          render : 마이페이지 버튼 컴포넌트 렌더링              //
      if(isLogin)
      return (<div onClick={onMyPageButtonClickHandler} className='white-button'>{'마이페이지'}</div>);
      //          render : 로그인 버튼 컴포넌트 렌더링               //
      return (<div className='black-button'>{'로그인'}</div>);
    

    
  }

    //          render : 헤더 레이아웃 렌더링               //
  return (
    <div id='header'>
      <div className="header-container">
        <div className="header-left-box" onClick={onLogoClickHandler}>
          <div className="icon-box">
            <div className="icon logo-dark-icon"></div>
          </div>
          <div className="header-logo">{'Hoons Board'}</div>
        </div>
        <div className="header-right-box">
          <SearchButton/>
          <MyPageButton/>
        </div>
      </div>
    </div>
  )
}
