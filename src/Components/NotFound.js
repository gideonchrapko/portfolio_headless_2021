import { useEffect } from 'react'
import ReactGa from 'react-ga'

const NotFound = () => {
    useEffect(() => {
        ReactGa.initialize('UA-241048002-1 ')
        ReactGa.pageview('/404')
    },[])

    return (
        <div>
            This page could not be found
        </div>
    )
}

export default NotFound