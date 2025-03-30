import React from 'react'
import { FavoriteListItem } from 'types/interface'
import defaultrofileImage from 'assets/image/default-profile-image.png';

interface Props{
    favoriteListItem : FavoriteListItem;
}

//                  conponent : Favorit List Item 컴포넌트                  //
export default function FavoriteItem({favoriteListItem} : Props) {

   //           state : properties              //
    const {profileImage, nickname, email} = favoriteListItem;
    //              render : Favorit List Item 렌더링
  return (
    <div className='favorite-list-item'>
        <div className='favorite-list-item-profile-box'>
            <div className='favorite-list-item-profile-image' style={{backgroundImage:`url(${profileImage ? profileImage : defaultrofileImage})`}}></div>
        </div>
        <div className='favorite-list-item-nickname'>{'안녕하세요 저는 주코야끼'}</div>
    </div>
  )
}
