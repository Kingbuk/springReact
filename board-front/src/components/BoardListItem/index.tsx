import React from 'react'
import './style.css';
import type { BoardListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import DefaultrofileImage from 'assets/image/90099aae739a85fd4a9bdcce977492df.png'

interface Props {
    boardListItem : BoardListItem
}

//              conpmnent : Board List Item 컴포넌드                //
export default function BoardListItem({boardListItem}:Props) {
    
//        state : properties          //
const { boardNumber, title, content, boardTitleImage } = boardListItem;
const {favoriteCount, commentCount, viewCount} = boardListItem;
const {writeDatetime, writerNickname, writerProfileImage} = boardListItem;

//      function : 네비게이트 함수
//const navigator = useNavigate();


//      이벤트 핸들러 : 게시물 아이템 클릭 이벤트 처리 함수.
const onClickHandler = () => {
    //navigator(boardNumber);
}

//              render : Board List Item 컴포넌드 렌더링            //
  return (
    <div className='board-list-item' onClick={onClickHandler}>
        <div className='board-list-item-main-box'>
            <div className='board-list-item-top'>
                <div className='board-list-item-profile-box'>
                    <div className='board-list-profile-image' style={{backgroundImage : `url(${writerProfileImage ? writerProfileImage : DefaultrofileImage})`}}></div>
                </div>
                <div className='board-list-item-write-box'>
                    <div className='board-list-item-nickname'>{writerNickname}</div>
                    <div className='board-list-item-datetime'>{writeDatetime}</div>
                </div>
            </div>
            <div className='board-list-item-middle'>
                <div className='board-list-item-title'>{title}</div>
                <div className='board-list-item-content'>{content}</div>
            </div>
            <div className='board-list-item-bottom'>
                <div className='board-list-item-counts'>
                    {`댓글 ${commentCount} . 좋아요 ${favoriteCount} . 조회수 ${viewCount} `}
                </div>
            </div>
        </div>
        {boardTitleImage !== null && (
        <div className='board-list-item-image-box'>
            <div className='board-list-item-image' style={{backgroundImage : `url(${boardTitleImage})`}}></div>
        </div>
        )}
    </div>
  )
}
