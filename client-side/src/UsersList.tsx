import React, { useState, useEffect } from 'react';

export interface User {
    id: number;
    username: string;
}

export function UsersList() {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsersAsync()
            .then((userData) => {
                setUsers(userData);
                console.log('Users after async call: ' + users);
            });
        console.log('Users: ' + users);
    }, []); // effect hook that only fetches data when the component mounts, see https://www.robinwieruch.de/react-hooks-fetch-data/

    async function getUsersAsync() {
        let response = await fetch('/users');
        console.log('Response body: ' + response.body);
        let userData: User[] = await response.json();
        console.log(userData);
        return userData;
    }

    return (
        <div>
            {/* Users list, populated from backend! Following https://daveceddia.com/create-react-app-express-backend/ , progress/guide location found if you ctrl-f "Open up client/src"*/}
            <h1>Users </h1>
            {users.map(user =>
                <p key={user.id} >
                    {user.username}
                </p>
            )}
        </div >
    );
}

export default UsersList;
