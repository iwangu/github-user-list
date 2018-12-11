import UserDetail from '../components/UserProfile';
import * as userDetail from '../ducks/userDetail';
import { StoreState } from '../ducks/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapStateToProps({userDetail}: StoreState, ownProps:any) {
    return {
        login: ownProps.match.params.login || "",
        userDetail: userDetail
    }
}

export function mapDispatchToProps(dispatch:Dispatch) {
    return {
        onFetchUser: (login:string) => dispatch<any>(userDetail.fetchUser(login))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);