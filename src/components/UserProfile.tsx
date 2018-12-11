import * as React from 'react';
import { UserDetail } from '../ducks/index';
import { Link } from 'react-router-dom';
import { Divider } from 'semantic-ui-react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Statistic } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import UserProfileDesktop from './UserProfileDesktop'
import UserProfileMobile from './UserProfileMobile'
import { Sticky } from 'semantic-ui-react'
import '../index.css';

export interface Props {
    userDetail: UserDetail,
    onFetchUser: (login:string) => void,
    login: string
}

export interface State {
    loaded: boolean;
}

class UserProfile extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    async componentDidMount() {
        await this.props.onFetchUser(this.props.login);
        this.setState({loaded: true})
    }

    renderUserDetail() {
        return (
            <div>
                <div className="hide-for-mobile">
                    <UserProfileDesktop userDetail={this.props.userDetail}/>
                </div>

                <div className="hide-for-desktop">
                    <UserProfileMobile userDetail={this.props.userDetail}/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.loaded ? this.renderUserDetail() : null}
            </div>
        );
    }
}

export default UserProfile;
