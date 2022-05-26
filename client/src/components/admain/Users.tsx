import { useEffect, useState } from 'react'
import { getAllUSers } from '../../server/index'

const Users = () => {

    const [users, setUsers] = useState([])



useEffect(() => {

    const Users = async () => {
        await getAllUSers().then(item => {
            setUsers(item.data)
            console.log(item.data);
        })
    }

    Users()

}, [])



    return (
        <div>
            <h1 className='flex text-4xl'>hello world </h1>
            
            {users && users.map((item: any) => (
                <div className="flex">
                    <p>{item.name}</p>
                    <p>{item.email}</p>
                </div>
            ))}

        </div>
    )
}

export default Users