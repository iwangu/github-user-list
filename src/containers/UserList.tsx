import UserList from '../components/UserList';
import * as users from '../ducks/users';
import { StoreState } from '../ducks/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapStateToProps({userList}: StoreState) {
    return {
        users: userList.items,
        current: userList.currentPage,
        next: userList.nextPage
    }
}

export function mapDispatchToProps(dispatch:Dispatch) {
    return {
        onFetchUsers: () => dispatch<any>(users.fetchUsers()),
        onNext: () => dispatch<any>(users.next()),
        onBack: () => dispatch<any>(users.back())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);