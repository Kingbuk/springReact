import  { ChangeEvent, Dispatch, forwardRef, KeyboardEvent, SetStateAction } from 'react'
import './style.css';
//              interface : Input box 컴포넌트 Properties           //

interface Props{
    label : string;
    type : 'text' | 'password';
    placeholder : string;
    value : string;
    //App.tsx에서 전역 state로 선언된거같음.
    setValue : Dispatch<SetStateAction<string>>;
    error : boolean;
    //필수가 아닌요소
    icon? : string;
    onButtonClick? : ()=> void;
    
    message? : string;

    onKeyDown? : (event:KeyboardEvent<HTMLInputElement>) => void;

}
//              component : Input box 컴포넌트      USEREF를 만들기 위해서 생성            //
const InputBox = forwardRef<HTMLInputElement, Props>((props:Props, ref)=>{

//              state : properties
    const {label, type, error, value, placeholder, icon, message} = props;
    const {setValue, onButtonClick, onKeyDown} = props;

//          event handler : input값 변경 이벤트 처리 함수.          //
    const onChahgeHandler = (event : ChangeEvent<HTMLInputElement>) =>{
        const {value} = event.target;
    }
//          event handler : input 키 이벤트 처리.          //
    const onKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>)=>{
        if(!onKeyDown) return;  //onkeydown이벤트가 아니면 리턴
        onKeyDown(event);
    }


//              render : Input box 컴포넌트                  //
    return (
        <div className='inputbox'>
            <div className="inputbox-label">{label}</div>
            {/* 에러가 있을경우에 따라서 클래스명 변경 */}
            <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                {/* 커서를 올린 상태에서 엔터를 누를시 커러를 옮기는 목적의 ref 키보드 이벤트 필요 */}
                <input ref={ref} className="input" type={type} placeholder={placeholder} value={value} onChange={onChahgeHandler} onKeyDown={onKeyDownHandler}/>
                {onButtonClick !== undefined &&(
                    <div className='icon-button'>
                        {icon !== undefined && ( <div className={`icon ${icon}`}></div> )}
                    </div>
                ) }
            </div>
            {message !== undefined && (
                <div className="inputbox-message">{message}</div>
            )}
            
        </div>
    )

})

export default InputBox;