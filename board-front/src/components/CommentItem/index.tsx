import React from "react"
import "./style.css";
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { CommentListItem } from "types/interface";
interface Props{
    commentListItem : CommentListItem;
}
//                  conponent : comment list item 컴포넌트                      //
export default function CommentItem({commentListItem} : Props) {

    //      state :  properties
    const {nickname, profileImage, writeDatetime, content} = commentListItem;


    return (
        <div className="comment-list-item">
            <div className="comment-list-item-top">
                <div className="comment-list-item-profile-box">
                    <div className="comment-list-item-profile-image" style={{backgroundImage:`url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
                </div>
                <div className="comment-list-item-nickname">{nickname}</div>
                <div className="comment-list-item-dvider">{'\|'}</div>
                <div className="comment-list-item-time">{writeDatetime}</div>
            </div>
            <div className="comment-list-item-main">
                <div className="comment-list-item-content">{content}</div>
            </div>
        </div>
        
        )
}