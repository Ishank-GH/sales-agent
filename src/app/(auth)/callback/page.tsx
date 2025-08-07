import { onAuthenticateUser } from "@/actions/auth"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic' //gets up-to-date data and no cache data

const AuthCallbackPage = async () => {
    const auth = await onAuthenticateUser()
    if(auth.status === 200 || auth.status === 201){
        redirect('/home')
    }
    else if (auth.status === 400 || auth.status === 403 || auth.status === 500){
        redirect('/')
    }
   
    return <div>Auth Page</div>
}

export default AuthCallbackPage