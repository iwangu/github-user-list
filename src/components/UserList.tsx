import * as React from 'react';
import { User } from '../ducks/index';
import { Link } from 'react-router-dom';
import UserListRow from './UserListRow'
import { Card } from 'semantic-ui-react'
import { Sticky } from 'semantic-ui-react'
import { Icon, Header, Divider, Menu, Button } from 'semantic-ui-react'
import StickyHeader from './StickyHeader'
import Footer from './Footer'
import '../index.css';

export interface Props {
    users: User[];
    onFetchUsers: () => void;
    onNext: () => void;
    onBack: () => void;
    current: string,
    next: string
}

export interface State {
    contextRef: any;
}

class UserList extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            contextRef: ""
        }

        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
    }

    componentDidUpdate(prevProps:Props) {

    }

    public componentDidMount() {
        this.props.users.length > 0 ? null : this.props.onFetchUsers()
    }

    next() {
        this.props.onNext();
        this.props.onFetchUsers()

    }

    back() {
        this.props.onBack();
        this.props.onFetchUsers()
    }

    handleContextRef = (contextRef:any) => this.setState({contextRef})

    render() {

        const { contextRef } = this.state

        return (

            this.props.users.length > 0 ?

                <div ref={this.handleContextRef}>
                    <StickyHeader contextRef={contextRef}/>
                    <div style={{width: "80%",marginLeft: "10%"}}>
                        <Card.Group
                            doubling={true}
                            itemsPerRow={6}>
                            {this.props.users.map(user => (<UserListRow
                                key={user.id}
                                user={user}
                            />))}
                        </Card.Group>
                    </div>
                    <Footer next={this.next} back={this.back}/>
                </div>: null
        );

    }
}

export default UserList;