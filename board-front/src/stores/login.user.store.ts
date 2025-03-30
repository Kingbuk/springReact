import { User } from "types/interface";
import { create } from "zustand";

interface LoginUserStore {
    loginUser : User | null;
    setLoginUser : (loginUser : User) => void;
    resetLoginUser : () => void;
};

const useLoginUserStore = create<LoginUserStore>(set=>({
    loginUser : null,
    //받아온 로그인 정보를 loginUser에 셋팅
    setLoginUser : loginUser => set(state => ({...state, loginUser})),
    //loginUser 객체에 null 설정
    resetLoginUser : () => set(state=>({...state, loginUser:null}))
}));

//전역적으로 사용하는 상태변수 선언
export default useLoginUserStore;