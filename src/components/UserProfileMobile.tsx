import * as React from 'react';
import { UserDetail } from '../ducks/index';
import { Link } from 'react-router-dom';
import { Divider } from 'semantic-ui-react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Statistic } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

export interface Props {
    userDetail: UserDetail
}

export const UserProfileMobile:React.StatelessComponent<Props> = ({ userDetail }) => {

    const formatDate = (dateString:string) => {
        return dateString.substring(0, dateString.indexOf('T'));
    }

    return (
        <div style={{"marginLeft": "10%", "width": "80%", "marginTop": "2%", "marginBottom": "10%"}}>

            <div style={{margin: "auto",  width: "fit-content", paddingTop: "20px"}}>
                <Statistic.Group size={"mini"}>
                    <Statistic>
                        <Statistic.Value>{userDetail.user.public_repos}</Statistic.Value>
                        <Statistic.Label>Repos</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{userDetail.user.public_gists}</Statistic.Value>
                        <Statistic.Label>Gists</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{userDetail.user.followers}</Statistic.Value>
                        <Statistic.Label>Followers</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </div>

            <Divider />

            <Card fluid>
                <Image src={userDetail.user.avatar_url} wrapped/>
                <Card.Content>
                    <Card.Header>{userDetail.user.login}</Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            Joined in {userDetail.user.created_at ? formatDate(userDetail.user.created_at): null}
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        {userDetail.user.bio ? userDetail.user.bio: "User has no Biography" }
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                </Card.Content>
            </Card>
            <Button as={ Link } name='Back' to='/' positive>Back</Button>

        </div>
    );

}

export default UserProfileMobile;
