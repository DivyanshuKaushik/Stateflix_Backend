import React from "react";

export interface AContext {
    user: { role: string; name: string ; email:string;_id:string,accessToken:string};
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = React.createContext<AContext>({
    user: { role: "", name: "",email:"",_id:"",accessToken:"" },
    setUser: (user: any) => {},
});

interface Props {
    children: React.ReactChild;
}

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = React.useState({ role: "", name: "",email:"",_id:"",accessToken:"" });
    React.useEffect(() => {
        setUser(JSON.parse(String(localStorage.getItem("user"))) || {role: "", name: "",email:"",_id:"",accessToken:""});
        // async function getUser(){
        //     try{
        //         setUser(JSON.parse(String(localStorage.getItem("user"))));
        //     }catch(err){
        //         setUser({role: "", name: "",email:"",_id:""})
        //         localStorage.setItem("user", JSON.stringify({ role: "", name: "",email:"",_id:"" }))
        //     }
        // }
        // getUser();

    }, []);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
