import * as React from 'react';
import { Icon, Button} from 'semantic-ui-react'

export interface Props {
    next: () => void;
    back: () => void;
}

class Footer extends React.Component<Props, {}> {

    constructor(props:Props) {
        super(props);
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
    }

    back() {
        this.props.back();
    }

    next() {
        this.props.next();
    }

    render() {
        return (
            <div
                style={{margin: "calc(50% - 130px)", width: "260px", height: "50px", marginTop: "30px", marginBottom: "30px"}}>
                <div style={{float: "left"}}>
                    <Button size={"large"} onClick={this.back} icon labelPosition='left'>
                        Back
                        <Icon name='angle left'/>
                    </Button>
                </div>
                <div style={{float:"left"}}>
                    <Button size={"large"} onClick={this.next} icon labelPosition='right'>
                        Next
                        <Icon name='angle right'/>
                    </Button>
                </div>
            </div>
        );
    }

}

export default Footer;