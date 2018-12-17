import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react'
import { User } from '../ducks/index';
import { Rating } from 'semantic-ui-react'

interface Props {
    user: User;
}

export const UserListRow:React.StatelessComponent<Props> = ({ user }) => {

    return (
        <Card fluid>
            <Link to={`/user/${user.login}`}>
                <Image src={user.avatar_url}/>
            </Link>
            <Card.Content>
                <Card.Header>
                    <Link style={{ color: '#050506' }} to={`/user/${user.login}`}>
                        {user.login}
                    </Link>

                </Card.Header>
            </Card.Content>
        </Card>
    );

};

export default UserListRow;
